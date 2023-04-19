/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, {
  CSSProperties, ReactNode, createRef,
} from 'react';
import omit from 'omit.js';
import classnames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
import Icon from '../icon';
import Option from './option';
import OptGroup from './opt-group';
import { getOffset } from '../utils/getOffset';
import { SelectContext } from './context';
import Portal from '../common/portal';

type SelectType = 'default' | 'search' | 'multiple';

export interface OptionType {
  value: string | string[];
  label?: string | ReactNode;
  children?: string | ReactNode;
}

type ValueType = string | string[] | OptionType | OptionType[]

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'|'onSelect'|'onSearch'|'onClick' | 'defaultValue' | 'value'> {
  prefixCls?: string;
  placeholder?: string;
  noContent?: string;
  defaultValue?: ValueType;
  type?: SelectType;
  allowClear?: boolean;
  value?: ValueType;
  disabled?: boolean;
  dropdownClassName?: string,
  dropdownStyle?: CSSProperties,
  className?: string;
  style?: CSSProperties;
  remoteSearch?: boolean;
  maxTagCount?: number;
  maxTagTextLength?: number,
  onChange?: (value: ValueType) => void,
  onSelect?: (value: ValueType, checked?: boolean) => void,
  onSearch?: (value: string) => void,
  onClick?: () => void,
  getPopupContainer?: () => HTMLElement | null;
  LabelInValue?: boolean;
  icon?: string | ReactNode;
  // children?: ReactNode;
}

export interface SelectState {
  visible?: boolean;
  left: number;
  top: number;
  width?: number | string;
  valueObj?: OptionType | OptionType[] | null;
  inputValue?: string;
  childProps?: OptionType[];
  isClear?: boolean;
  initSearchValue?: OptionType;
}

class Select extends React.Component<SelectProps, SelectState> {
  static Option: typeof Option;

  static OptGroup: typeof OptGroup;

  private selectRef = createRef<HTMLDivElement>();

  private selectDropRef = createRef<HTMLDivElement>();

  // eslint-disable-next-line no-useless-constructor
  constructor(props: SelectProps) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
      visible: false,
      valueObj: null as OptionType | OptionType[] | null,
      inputValue: '',
      childProps: [],
      width: 0,
      isClear: false,
      initSearchValue: {} as OptionType,
    };
  }

  componentDidMount(): void {
    const { defaultValue, value, type } = this.props;
    const val = value || defaultValue;
    this.getData(val);
    this.setState({ childProps: this.getChildProps() });
    document.addEventListener('click', this.bodyClick, true);
    if (type === 'search') {
      this.setState({
        initSearchValue: {
          value: (val as OptionType)?.value || '',
          label: (val as OptionType)?.label || '',
        },
      });
    }
  }

  componentDidUpdate(prevProps: Readonly<SelectProps>): void {
    const { children } = this.props;
    if (children !== prevProps.children) {
      this.setState({
        childProps: this.getChildProps(),
      });
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.bodyClick, true);
  }

  AllDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const { type, onChange, LabelInValue } = this.props;
    let singleValue: string | OptionType = '';
    if (LabelInValue) {
      singleValue = { label: '', value: '' };
    }
    const v = type === 'multiple' ? [] : singleValue;
    this.setState({
      valueObj: type === 'multiple' ? [] : { label: '', value: '' },
      inputValue: '',
      visible: false,
    });
    onChange?.(v);
  }

  bodyClick = (e: Event) => {
    const dropRef = this.selectDropRef?.current;
    const target = e.target as HTMLElement;
    if (dropRef && !dropRef.contains(target)) {
      this.setState({ visible: false });
    }
  }

  handleClick = () => {
    const { disabled } = this.props;
    const { visible } = this.state;
    if (!disabled) {
      this.setState({ visible: !visible });
      this.getLocation();
    }
  }

  getChildProps = () => {
    const { children } = this.props;
    const childProps: OptionType[] = React.Children.toArray(children).map((i: any) => i.props);
    return childProps;
  }

  getSingleText = () => {
    const { childProps, valueObj } = this.state;
    const current: undefined | OptionType = (childProps || []).find((i) => {
      if ((valueObj as OptionType)?.value === i.value) {
        return i;
      }
      return null;
    });
    return current?.children || current?.label || (valueObj as OptionType)?.label || '';
  }

  getData = (val?: string | string[] | OptionType | OptionType[]) => {
    const { type } = this.props;
    if (val) {
      let temp: OptionType | OptionType[];
      if (type === 'multiple') {
        temp = ((val || []) as string[] | OptionType[]).map((item) => {
          if (typeof item === 'string') {
            return {
              label: '',
              value: item,
            };
          }
          return item;
        }) || [];
      } else {
        temp = (typeof val === 'string' ? { label: '', value: val } : val) as OptionType;

        if (type === 'search') {
          this.setState({
            inputValue: typeof val === 'string' ? '' : (val as OptionType)?.label as string,
          });
        }
      }
      this.setState({ valueObj: temp });
    } else {
      this.setState({ valueObj: type === 'multiple' ? [] : { label: '', value: '' } });
    }
  }

  getLocation = () => {
    const { getPopupContainer } = this.props;
    setTimeout(() => {
      if (this.selectRef.current) {
        const {
          height, width,
        } = this.selectRef.current.getBoundingClientRect();
        const container = getPopupContainer && getPopupContainer();
        const { left: offsetLeft, top: offsetTop } = getOffset(this.selectRef.current, container);
        this.setState({
          left: offsetLeft,
          top: offsetTop + height + 4,
          width,
        });
      }
    }, 30);
  };

  handleDelete = (key: string) => {
    const { valueObj } = this.state;
    const { onChange, LabelInValue, disabled } = this.props;
    if (!disabled) {
      const val: OptionType[] = (valueObj as OptionType[]).filter((i) => i.value !== key);
      this.setState({
        valueObj: val,
      });
      onChange?.(LabelInValue ? val : val.map((i) => i.value) as string[]);
    }
  };

  handleSelect = (current: OptionType) => {
    const {
      type, LabelInValue, onChange, onSelect,
    } = this.props;
    const { valueObj } = this.state;
    let checked = false;
    if (type !== 'multiple') {
      this.setState({
        visible: false,
        valueObj: current,
        inputValue: (current?.label || '') as string,
      });
      onChange?.(LabelInValue ? current : current?.value);
      onSelect?.(LabelInValue ? current : current?.value, true);
    } else {
      let t = (valueObj || []) as OptionType[];
      if (t.some((i: OptionType) => i.value === current.value)) {
        t = t.filter((i) => i.value !== current.value);
        checked = false;
      } else {
        t.push(current);
        checked = true;
      }
      this.setState({ valueObj: [...t] });
      onChange?.(LabelInValue ? t as OptionType[] : t.map((i) => i.value) as string[]);
      onSelect?.(LabelInValue ? t as OptionType[] : t.map((i) => i.value) as string[], checked);
      this.getLocation();
    }
  }

  InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onSearch, onChange } = this.props;
    const value = (e.target as HTMLInputElement)?.value;
    onSearch?.(value);
    onChange?.(value);
    this.setState({ inputValue: value });
  }

  renderTag = (list: OptionType[] = [], prefix: string) => {
    const { maxTagCount } = this.props;
    const { childProps } = this.state;
    const data = maxTagCount ? list.slice(0, maxTagCount) : list;
    const tagContain = classnames(`${prefix}-tag-contain`);
    const tagCls = classnames(`${prefix}-tag`);
    const count = list.length - (maxTagCount || 0);
    return (
      <div className={tagContain}>
        {(data || []).map((item) => {
          const tem = childProps?.find((i) => i.value === item.value);
          return (
            <div className={tagCls} key={item.value as string}>
              <span>{tem?.label || tem?.children || item.label || item?.children || ''}</span>
              <Icon
                type="close"
                onClick={() => this.handleDelete((tem?.value || item.value) as string)}
              />
            </div>
          );
        })}
        {maxTagCount && count > 0 && <div className={tagCls}>{`+${count}...`}</div>}
      </div>
    );
  }

  renderSelect = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      className,
      type,
      disabled,
      icon,
      placeholder = '请选择',
      children,
      LabelInValue,
      allowClear,
      getPopupContainer,
      noContent = '暂无数据',
      dropdownStyle,
      dropdownClassName,
      onChange,
      ...rest
    } = this.props;
    const {
      left, top, visible, valueObj, inputValue, width, isClear, initSearchValue,
    } = this.state;
    const prefix = getPrefixCls('select');
    const selectCls = classnames(prefix, {
      [`${prefix}-${type}`]: type,
      [`${prefix}-disabled`]: disabled,
    }, className);

    const restProps = omit(rest, ['value', 'defaultValue', 'onSearch', 'maxTagCount', 'onSelect']);
    const hasValue = (Array.isArray(valueObj) && valueObj.length > 0)
      || (valueObj as OptionType)?.value;

    const wrapper = classnames(`${prefix}-wrap`, {
      [`${prefix}-wrap-has-icon`]: icon,
      [`${prefix}-wrap-placeholder`]: !hasValue,
    });

    const hasNoChildren = React.Children.toArray(children).length === 0;
    return (
      <div
        {...restProps}
        className={selectCls}
        ref={this.selectRef}
        onClick={this.handleClick}
        onMouseEnter={() => {
          if (allowClear && hasValue && !disabled) {
            this.setState({ isClear: true });
          }
        }}
        onMouseLeave={() => {
          if (isClear) {
            this.setState({ isClear: false });
          }
        }}
      >
        {icon && (
        <div className={`${prefix}-prefix-icon`}>
          {typeof icon === 'string' ? <Icon type={icon} /> : icon}
        </div>
        )}
        <div className={wrapper}>
          {type === 'search' ? (
            <input
              value={inputValue}
              onChange={this.InputChange}
              placeholder={placeholder}
              onBlur={() => {
                if (hasNoChildren) {
                  if (LabelInValue) {
                    this.setState({
                      inputValue: (initSearchValue?.label || '') as string,
                      valueObj: initSearchValue || { label: '', value: '' },
                    });
                    onChange?.(initSearchValue || { label: '', value: '' });
                  } else {
                    this.setState({
                      inputValue: ((initSearchValue as OptionType)?.label || '') as string,
                      valueObj: { label: '', value: '' },
                    });
                    onChange?.('');
                  }
                }
              }}
            />
          ) : (
            <>{ type === 'multiple' ? this.renderTag((valueObj || []) as OptionType[], prefix) : <div>{this.getSingleText() || placeholder}</div>}</>
          )}
        </div>
        <div
          className={`${prefix}-suffix-icon`}
          style={{ color: isClear ? '#ACAFB9' : undefined }}
          onClick={this.AllDelete}
        >
          <Icon type={isClear ? 'close1-surface' : visible ? 'up' : 'down'} />
        </div>
        {visible && (
        <Portal {...({ getPopupContainer })}>
          <div
            className={classnames(`${prefix}-drop`, {
              [`${prefix}-drop-noContent`]: hasNoChildren,
            }, dropdownClassName)}
            style={{
              top, left, width, ...dropdownStyle,
            }}
            ref={this.selectDropRef}
          >
            {hasNoChildren ? noContent : (
              <SelectContext.Provider
                value={{
                  multiple: type === 'multiple',
                  valueObj,
                  onSelect: this.handleSelect,
                }}
              >
                {children}
              </SelectContext.Provider>
            )}
          </div>
        </Portal>
        )}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderSelect}
      </ConfigConsumer>
    );
  }
}

const ComposeSelect = Select;
ComposeSelect.Option = Option;
ComposeSelect.OptGroup = OptGroup;

export default ComposeSelect;

// export interface SelectState extends CommonParams {
//   showDropdown?: boolean,
//   renderObj?: obj,
//   newChildren?: ReactNode,
//   isSearch?: boolean,
//   selectedOptions?: Array<obj>,
//   left: number,
//   top: number,
//   width: number | string,
//   firstRender?: boolean;
//   isHover?: boolean;
// }

// class Select extends React.Component<SelectProps, SelectState> {
//   static defaultProps: SelectProps = {
//     type: 'default',
//     children: null,
//     allowClear: false,
//     value: '',
//     defaultValue: '',
//     disabled: false,
//     placeholder: '请选择',
//     noContent: '暂无数据',
//     dropdownMatchSelectWidth: true,
//     remoteSearch: false,
//   }

//   static Option: typeof Option;

//   node: HTMLSpanElement | undefined;

//   private popupRef = createRef<HTMLDivElement>();

//   constructor(props: SelectProps) {
//     super(props);
//     const {
//       children,
//       placeholder,
//       noContent,
//       dropdownMatchSelectWidth,
//     } = props;
//     const stateObj = {
//       placeholder,
//       noContent,
//       showDropdown: false, // 是否展示下拉框
//       dropdownMatchSelectWidth,
//       children,
//       isSearch: false,
//       selectedOptions: [],
//       left: 0,
//       top: 0,
//       width: 0,
//       firstRender: false,
//       isHover: false,
//     };
//     this.state = stateObj;
//   }

//   static getDerivedStateFromProps(nextProps: SelectProps, nextState: SelectState) {
//     const {
//       children, value, defaultValue, type,
//     } = nextProps;
//     const childrenProps = React.Children.toArray(children);
//     const { firstRender } = nextState;
//     const m = type === 'multiple' || type === 'tags';
//     const t = type === 'default' || type === 'search';
//     if (childrenProps.length) {
//       if (!firstRender) { // 第一次children有值渲染的时候
//         const temp = {};
//         let currentLabel;
//         let selectOp;
//         if (m) {
//           if ((value && Object.prototype.toString.call(value) !== '[object Array]')
//           || (defaultValue && Object.prototype.toString.call(defaultValue) !== '[object Array]')) {
//             throw new Error('多选模式 或者标签选择器 value和defaultValue 类型应是 Array');
//           } else {
//             const mergeValue = [...(value || []), ...(defaultValue || [])];
//             const tempOp = (childrenProps || []).filter((i:any) => mergeValue.indexOf(i.props.value) >= 0);
//             selectOp = tempOp.map((i: any) => ({ value: i.props.value, label: i.props.children }));
//           }
//         } else if (t) {
//           if ((value && typeof value !== 'string')
//           || (defaultValue && typeof defaultValue !== 'string')) {
//             throw new Error('单选选模式value和defaultValue 类型应是 String');
//           } else {
//             currentLabel = (childrenProps || []).find((i: any) => i.props.value?.toString() === value?.toString() || i.props.value?.toString() === defaultValue?.toString());
//           }
//         }
//         if (currentLabel) {
//           Object.assign(temp, {
//             value: defaultValue,
//             label: currentLabel?.props.children,
//           });
//         }
//         return {
//           children,
//           renderObj: temp,
//           selectedOptions: selectOp || [],
//           firstRender: true,
//         };
//       }
//       return {
//         children,
//       };
//     }
//     return null;
//   }

//   componentDidMount() {
//     document.addEventListener('click', this.hideDrop, true);
//   }

//   componentDidUpdate(prevProps: SelectProps) {
//     const { children, value, type } = this.props;
//     if (value !== prevProps.value) {
//       const childrenProps = React.Children.toArray(children).map((i) => i.props);
//       const currentLabel = (childrenProps || []).find((i) => i.value === value);
//       if (type === 'default' || type === 'search') {
//         this.setState({
//           renderObj: {
//             value,
//             label: currentLabel ? currentLabel.children : '',
//           },
//         });
//       }
//       if (type === 'multiple' || type === 'tags') {
//         const temp = childrenProps.filter((i: any) => (value || []).indexOf(i.value) >= 0);
//         this.setState({
//           selectedOptions: (temp || []).map((i: any) => ({ value: i.value, label: i.children })),
//         });
//       }
//     }
//   }

//   componentWillUnmount() {
//     document.removeEventListener('click', this.hideDrop, true);
//   }

//   getLocation = () => {
//     const { getPopupContainer } = this.props;
//     setTimeout(() => {
//       if (this.node) {
//         const {
//           height, width,
//         } = this.node.getBoundingClientRect();
//         const containter = getPopupContainer && getPopupContainer();
//         const { left: offsetLeft, top: offsetTop } = getOffset(this.node, containter);
//         this.setState({
//           left: offsetLeft,
//           top: offsetTop + height + 4,
//           width,
//         });
//       }
//     }, 30);
//   };

//   getNode = (node: HTMLDivElement) => {
//     this.node = node;
//   };

//   hideDrop = (e: MouseEvent) => {
//     const inputChild = this.node?.contains(e.target as HTMLDivElement);
//     const popChild = this.popupRef?.current?.contains(e.target as HTMLDivElement);
//     if ((this.node && !inputChild) && (this.popupRef?.current && !popChild)) { // 只有在点击这两个node之外的dom才捕获成
//       this.setState({ showDropdown: false });
//     }
//   };

//   onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     event.stopPropagation();
//     event.nativeEvent.stopImmediatePropagation();
//     const { showDropdown } = this.state;
//     const _showDropdown = !showDropdown;
//     this.setState({
//       showDropdown: _showDropdown,
//     });
//     this.getLocation();
//   }

//   handleInputChange = (e: any) => {
//     const val = e.target.value;
//     const { onSearch, remoteSearch } = this.props;
//     const { children } = this.state;
//     const stateObj = {
//       renderObj: {
//         label: val,
//         value: '',
//       },
//       showDropdown: true,
//       isSearch: true,
//     };
//     if (!remoteSearch) { // 如果用户需要远程搜索则不需要本地过滤
//       const childrenArr = React.Children.toArray(children);
//       const newChildren = childrenArr.filter((i: any) => i.props.children.indexOf(val) !== -1);
//       Object.assign(stateObj, {
//         newChildren,
//       });
//     }
//     this.setState(stateObj);
//     if (onSearch) {
//       onSearch(val);
//     }
//   }

//   handleClear = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
//     e.stopPropagation();
//     e.nativeEvent.stopImmediatePropagation();
//     const { type } = this.props;
//     const mul = type === 'multiple' || type === 'tags';
//     if (mul) {
//       this.setState({ selectedOptions: [] });
//     }
//     this.setState({
//       renderObj: {
//         value: '',
//         label: '',
//       },
//       isHover: false,
//     });
//     this.getLocation();
//   }

//   onSelect = (value: string | string[], label: string) => {
//     const { onChange, onSelect, type } = this.props;
//     const { selectedOptions } = this.state;
//     if (type === 'multiple' || type === 'tags') {
//       const optionObj: obj = {
//         value,
//         label,
//       };
//       let arr: Array<obj> | undefined = selectedOptions;
//       if ((arr || []).map((i: any) => i.value).indexOf(value) === -1) {
//         arr?.push(optionObj);
//       } else {
//         arr = arr?.filter((i: any) => i.value !== value);
//       }

//       this.setState({
//         selectedOptions: arr,
//       });
//       const valueArr: any[] = (arr || []).map((s) => (s.value));
//       if (onChange) {
//         onChange(valueArr, arr);
//       }
//       this.getLocation();
//     } else {
//       this.setState({
//         renderObj: {
//           value,
//           label,
//         },
//         showDropdown: false,
//       });
//       if (onChange) {
//         onChange(value, label);
//       }
//       if (onSelect) {
//         onSelect(value, label);
//       }
//     }
//   }

//   handleItemDelete = (e: any, item: any) => {
//     e.stopPropagation();
//     e.cancelBubble = true;
//     const { onChange } = this.props;
//     const { selectedOptions } = this.state;
//     const newOptions: Array<obj> | undefined = selectedOptions?.filter((i) => i.value !== item.value);
//     this.setState({
//       selectedOptions: newOptions,
//     });
//     const valueArr: any[] = (newOptions || []).map((s) => (s.value));
//     if (onChange) {
//       onChange(valueArr, newOptions);
//     }
//     this.getLocation();
//   }

//   renderSelect = ({ getPrefixCls }: ConfigConsumerProps) => {
//     const {
//       prefixCls: customizePrefixCls,
//       disabled,
//       value,
//       defaultValue,
//       dropdownMatchSelectWidth,
//       type,
//       style,
//       dropdownStyle,
//       allowClear,
//       remoteSearch,
//       maxTagCount,
//       maxTagTextLength,
//       getPopupContainer,
//     } = this.props;
//     const {
//       showDropdown,
//       placeholder,
//       renderObj,
//       children,
//       newChildren,
//       isSearch,
//       selectedOptions,
//       left,
//       top,
//       width,
//       isHover,
//     } = this.state;
//     const prefix = getPrefixCls('select', customizePrefixCls);
//     const wrapperClass = classnames(`${prefix}-wrapper`);
//     const mainClass = classnames(`${prefix}`, {
//       [`${prefix}-disabled`]: disabled,
//       [`${prefix}-active`]: showDropdown,
//       [`${prefix}-single`]: !(type === 'multiple' || type === 'tags'),
//     });
//     const itemClass = classnames(`${prefix}-item`);
//     const inputClass = classnames(`${prefix}-input`);
//     const dropdownClass = classnames(`${prefix}-dropdown`, {
//       [`${prefix}-dropdoen-show`]: showDropdown,
//       [`${prefix}-dropdown-hide`]: !showDropdown,
//       [`${prefix}-dropdown-match-select-width`]: dropdownMatchSelectWidth,
//     });

//     const noContentClass = classnames(`${prefix}-dropdown-noContent`);

//     const iconStyle = classnames(`${prefix}-iconWrapper`, {
//       [`${prefix}-iconWrapper-disabled`]: disabled,
//     });

//     let num = 0;
//     if (selectedOptions?.length && maxTagCount) {
//       if (selectedOptions.length - maxTagCount > 0) {
//         num = selectedOptions.length - maxTagCount;
//       }
//     }

//     return (
//       <div className={wrapperClass}>
//         <div
//           onClick={!disabled ? this.onClick : () => {}}
//           className={mainClass}
//           ref={this.getNode}
//           style={{
//             minHeight: type === 'multiple' ? 32 : undefined,
//             height: type !== 'multiple' ? 32 : undefined,
//             ...style,
//           }}
//           onMouseOver={() => {
//             const mul = type === 'multiple' || type === 'tags';
//             if (allowClear && ((mul && selectedOptions?.length) || (!mul && renderObj?.label))) {
//               this.setState({ isHover: true });
//             }
//           }}
//           onMouseLeave={() => {
//             this.setState({ isHover: false });
//           }}
//         >
//           {type === 'search'
//             ? (
//               <>
//                 <input onChange={this.handleInputChange} value={renderObj?.label || ''} className={inputClass} />
//                 <span style={{ display: `${renderObj?.label ? 'none' : 'inline-block'}` }} className={`${prefix}-placeholder`}>{placeholder}</span>
//                 <span className={iconStyle}><Icon type="search" /></span>
//               </>
//             )
//             : (
//               <>
//                 {(renderObj?.label || selectedOptions?.length)
//                   ? (
//                     type === 'multiple'
//                       ? (
//                         <div className={`${prefix}-item-wrapper`}>
//                           {maxTagCount
//                             ? selectedOptions?.slice(0, maxTagCount).map((i, idx) => {
//                               let temp = false;
//                               const _label: unknown = i.label;
//                               if (i.label && _label.length && maxTagTextLength) {
//                                 temp = _label.length > maxTagTextLength;
//                               }
//                               return (
//                                 <div key={idx} title={_label} className={itemClass}>
//                                   <span
//                                     style={{
//                                       display: 'inline-block',
//                                       maxWidth: '70%',
//                                       overflow: 'hidden',
//                                       textOverflow: 'ellipsis',
//                                       wordBreak: 'break-all',
//                                       whiteSpace: 'nowrap',
//                                       color: 'rgba(0,0,0,0.65)',
//                                     }}
//                                   >
//                                     {temp ? `${_label.substr(0, maxTagTextLength)}...` : _label}
//                                   </span>
//                                   <span
//                                     onClick={(el) => this.handleItemDelete(el, i)}
//                                     style={{ float: 'right', display: 'inline-block', marginRight: 4 }}
//                                   >
//                                     <Icon type="close" style={{ marginTop: -5, color: '#ACAFB9', fontSize: 12 }} />
//                                   </span>
//                                 </div>
//                               );
//                             })
//                             : (
//                               selectedOptions?.map((i, idx) => (
//                                 <div key={idx} className={itemClass}>
//                                   <span
//                                     style={{
//                                       display: 'inline-block',
//                                       maxWidth: '70%',
//                                       overflow: 'hidden',
//                                       textOverflow: 'ellipsis',
//                                       whiteSpace: 'nowrap',
//                                       wordBreak: 'break-all',
//                                       color: 'rgba(0,0,0,0.65)',
//                                     }}
//                                     title={i.label || ''}
//                                   >
//                                     {i.label}
//                                   </span>
//                                   <span
//                                     onClick={(el) => this.handleItemDelete(el, i)}
//                                     style={{ float: 'right', display: 'inline-block', marginRight: 4 }}
//                                   >
//                                     <Icon type="close" style={{ color: '#ACAFB9', fontSize: 12 }} />
//                                   </span>
//                                 </div>
//                               ))
//                             )}
//                           {num ? (
//                             <span className={itemClass}>
//                               <span>+</span>
//                               <span>
//                                 {num}
//                                 ...
//                               </span>
//                             </span>
//                           ) : null}
//                         </div>
//                       )
//                       : <span className={`${prefix}-value`} title={renderObj?.label || ''} style={{ color: disabled ? 'rgba(0,0,0,0.45)' : undefined }}>{renderObj?.label}</span>
//                   )
//                   : <span className={`${prefix}-placeholder`}>{placeholder}</span>}
//                 {allowClear && isHover
//                   ? <span className={`${prefix}-iconWrapper`} onClick={this.handleClear}><Icon type="delete" /></span>
//                   : <span className={iconStyle}><Icon type={`${showDropdown ? 'up' : 'down'}`} /></span>}
//               </>
//             )}
//         </div>
//         {showDropdown && (
//         <Portal {...({ getPopupContainer })}>
//           <div
//             className={dropdownClass}
//             style={{
//               left, top, width, ...dropdownStyle,
//             }}
//             ref={this.popupRef}
//           >
//             <SelectContext.Provider
//               value={{
//                 value: `${value || defaultValue}`,
//                 label: `${children}`,
//                 onSelect: this.onSelect,
//                 renderObj,
//                 multiple: type === 'multiple' || type === 'tags',
//                 selectedOptions,
//               }}
//             >
//               {
//                 /**
//                  * 如果是远程搜索，则直接展示数据children
//                  * 否则判断newChildren是否为空，如果不为空则代表是搜索，展示搜索出的数据newChildren
//                  */
//               }
//               {remoteSearch
//                 ? children
//                 : newChildren && Object.keys(newChildren).length
//                   ? newChildren
//                   : (
//                     isSearch
//                       ? <div className={noContentClass}>暂无数据</div>
//                       : children
//                   )}
//             </SelectContext.Provider>
//           </div>
//         </Portal>
//         )}
//       </div>
//     );
//   }

//   render() {
//     return (
//       <ConfigConsumer>
//         {this.renderSelect}
//       </ConfigConsumer>
//     );
//   }
// }

// const ComposedSelect = Select;
// ComposedSelect.Option = Option;

// export default ComposedSelect;
