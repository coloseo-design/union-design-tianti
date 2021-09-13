/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, {
  CSSProperties, ReactNode,
} from 'react';
import classnames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
import Icon from '../icon';
import Option from './option';
import { SelectContext } from './context';
import Portal from '../common/portal';

export const tuple = <T extends string[]>(...args: T) => args;

/**
 * default - 基本选择器
 * search - 可搜索
 * group - 分组
 * multiple - 多选
 * tags - 标签选择器
 */
const SelectTypes = tuple('default', 'search', 'group', 'multiple', 'tags');

export type SelectType = (typeof SelectTypes)[number];

interface CommonParams {
  placeholder?: string,
  noContent?: string,
  dropdownMatchSelectWidth?: boolean,
  defaultValue?: string | string[],
  children: ReactNode,
}

export interface SelectProps extends CommonParams {
  prefixCls?: string,
  type?: SelectType,
  allowClear?: boolean,
  value?: string | string[],
  disabled?: boolean,
  dropdownClassName?: string,
  dropdownStyle?: CSSProperties,
  className?: string,
  style?: CSSProperties,
  remoteSearch?: boolean,
  maxTagCount?: number,
  maxTagTextLength?: number,
  onChange?: (value: string | string[], label: string | obj[]) => void,
  onSelect?: (value: string | string[], label: string | obj[], checked?: boolean) => void,
  onSearch?: (value: string) => void,
  onClick?: () => void,
  getPopupContainer?: () => HTMLElement;
}

export interface obj {
  value: string | string[] | undefined,
  label: string | ReactNode,
}

export interface SelectState extends CommonParams {
  showDropdown?: boolean,
  renderObj?: obj,
  newChildren?: ReactNode,
  isSearch?: boolean,
  selectedOptions?: Array<obj>,
  left: number,
  top: number,
  width: number | string,
  firstRender?: boolean;
}

class Select extends React.Component<SelectProps, SelectState> {
  static defaultProps: SelectProps = {
    type: 'default',
    children: null,
    allowClear: false,
    value: '',
    defaultValue: '',
    disabled: false,
    placeholder: '请选择',
    noContent: '暂无数据',
    dropdownMatchSelectWidth: true,
    remoteSearch: false,
  }

  static Option: typeof Option;

  node: HTMLSpanElement | undefined;

  constructor(props: SelectProps) {
    super(props);
    const {
      children,
      placeholder,
      noContent,
      dropdownMatchSelectWidth,
    } = props;
    const stateObj = {
      placeholder,
      noContent,
      showDropdown: false, // 是否展示下拉框
      dropdownMatchSelectWidth,
      children,
      isSearch: false,
      selectedOptions: [],
      left: 0,
      top: 0,
      width: 0,
      firstRender: false,
    };
    this.state = stateObj;
  }

  static getDerivedStateFromProps(nextProps: SelectProps, nextState: SelectState) {
    const {
      children, value, defaultValue, type,
    } = nextProps;
    const childrenProps = React.Children.toArray(children);
    const { firstRender } = nextState;
    const m = type === 'multiple' || type === 'tags';
    const t = type === 'default' || type === 'search';
    if (childrenProps.length) {
      if (!firstRender) { // 第一次children有值渲染的时候
        const temp = {};
        let currentLabel;
        let selectOp;
        if (m) {
          if ((value && Object.prototype.toString.call(value) !== '[object Array]')
          || (defaultValue && Object.prototype.toString.call(defaultValue) !== '[object Array]')) {
            throw new Error('多选模式 或者标签选择器 value和defaultValue 类型应是 Array');
          } else {
            const mergeValue = [...(value || []), ...(defaultValue || [])];
            const tempOp = (childrenProps || []).filter((i:any) => mergeValue.indexOf(i.props.value) >= 0);
            selectOp = tempOp.map((i: any) => ({ value: i.props.value, label: i.props.children }));
          }
        } else if (t) {
          if ((value && typeof value !== 'string')
          || (defaultValue && typeof defaultValue !== 'string')) {
            throw new Error('单选选模式value和defaultValue 类型应是 String');
          } else {
            currentLabel = (childrenProps || []).find((i: any) => i.props.value?.toString() === value?.toString() || i.props.value?.toString() === defaultValue?.toString());
          }
        }
        if (currentLabel) {
          Object.assign(temp, {
            value: defaultValue,
            label: currentLabel?.props.children,
          });
        }
        return {
          children,
          renderObj: temp,
          selectedOptions: selectOp || [],
          firstRender: true,
        };
      }
      return {
        children,
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('click', this.hideDrop);
  }

  componentDidUpdate(prevProps: SelectProps) {
    const { children, value, type } = this.props;
    if (value !== prevProps.value) {
      const childrenProps = React.Children.toArray(children).map((i) => i.props);
      const currentLabel = (childrenProps || []).find((i) => i.value === value);
      if (type === 'default' || type === 'search') {
        this.setState({
          renderObj: {
            value,
            label: currentLabel ? currentLabel.children : '',
          },
        });
      }
      if (type === 'multiple' || type === 'tags') {
        const temp = childrenProps.filter((i: any) => (value || []).indexOf(i.value) >= 0);
        this.setState({
          selectedOptions: (temp || []).map((i: any) => ({ value: i.value, label: i.children })),
        });
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDrop);
  }

  getLocation = () => {
    setTimeout(() => {
      if (this.node?.getBoundingClientRect) {
        const {
          height, top, left, width,
        } = this.node.getBoundingClientRect();
        const offsetTop = Math.ceil(window.pageYOffset + top);
        const offsetLeft = Math.ceil(window.pageXOffset + left);
        this.setState({
          left: offsetLeft,
          top: offsetTop + height + 4,
          width,
        });
      }
    }, 30);
  };

  getNode = (node: HTMLDivElement) => {
    this.node = node;
  };

  hideDrop = () => {
    this.setState({ showDropdown: false });
  };

  onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const { showDropdown } = this.state;
    const _showDropdown = !showDropdown;
    this.setState({
      showDropdown: _showDropdown,
    });
    this.getLocation();
  }

  handleInputChange = (e: any) => {
    const val = e.target.value;
    const { onSearch, remoteSearch } = this.props;
    const { children } = this.state;
    const stateObj = {
      renderObj: {
        label: val,
        value: '',
      },
      showDropdown: true,
      isSearch: true,
    };
    if (!remoteSearch) { // 如果用户需要远程搜索则不需要本地过滤
      const childrenArr = React.Children.toArray(children);
      const newChildren = childrenArr.filter((i: any) => i.props.children.indexOf(val) !== -1);
      Object.assign(stateObj, {
        newChildren,
      });
    }
    this.setState(stateObj);
    if (onSearch) {
      onSearch(val);
    }
  }

  handleClear = () => {
    this.setState({
      renderObj: {
        value: '',
        label: '',
      },
    });
  }

  onSelect = (value: string | string[], label: string) => {
    const { onChange, onSelect, type } = this.props;
    const { selectedOptions } = this.state;
    if (type === 'multiple' || type === 'tags') {
      const optionObj: obj = {
        value,
        label,
      };
      let arr: Array<obj> | undefined = selectedOptions;
      if ((arr || []).map((i: any) => i.value).indexOf(value) === -1) {
        arr?.push(optionObj);
      } else {
        arr = arr?.filter((i: any) => i.value !== value);
      }

      this.setState({
        selectedOptions: arr,
      });
      const valueArr: any[] = (arr || []).map((s) => (s.value));
      if (onChange) {
        onChange(valueArr, arr);
      }
      this.getLocation();
    } else {
      this.setState({
        renderObj: {
          value,
          label,
        },
        showDropdown: false,
      });
      if (onChange) {
        onChange(value, label);
      }
      if (onSelect) {
        onSelect(value, label);
      }
    }
  }

  handleItemDelete = (e: any, item: any) => {
    e.stopPropagation();
    e.cancelBubble = true;
    const { onChange } = this.props;
    const { selectedOptions } = this.state;
    const newOptions: Array<obj> | undefined = selectedOptions?.filter((i) => i.value !== item.value);
    this.setState({
      selectedOptions: newOptions,
    });
    const valueArr: any[] = (newOptions || []).map((s) => (s.value));
    if (onChange) {
      onChange(valueArr, newOptions);
    }
    this.getLocation();
  }

  renderSelect = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      disabled,
      value,
      defaultValue,
      dropdownMatchSelectWidth,
      type,
      style,
      dropdownStyle,
      allowClear,
      remoteSearch,
      maxTagCount,
      maxTagTextLength,
      getPopupContainer,
    } = this.props;
    const {
      showDropdown,
      placeholder,
      renderObj,
      children,
      newChildren,
      isSearch,
      selectedOptions,
      left,
      top,
      width,
    } = this.state;
    const prefix = getPrefixCls('select', customizePrefixCls);
    const wrapperClass = classnames(`${prefix}-wrapper`);
    const mainClass = classnames(`${prefix}`, {
      [`${prefix}-disabled`]: disabled,
      [`${prefix}-active`]: showDropdown,
      [`${prefix}-single`]: !(type === 'multiple' || type === 'tags'),
    });
    const itemClass = classnames(`${prefix}-item`);
    const inputClass = classnames(`${prefix}-input`);
    const dropdownClass = classnames(`${prefix}-dropdown`, {
      [`${prefix}-dropdoen-show`]: showDropdown,
      [`${prefix}-dropdown-hide`]: !showDropdown,
      [`${prefix}-dropdown-match-select-width`]: dropdownMatchSelectWidth,
    });

    const noContentClass = classnames(`${prefix}-dropdown-noContent`);

    const iconStyle = classnames(`${prefix}-iconWrapper`, {
      [`${prefix}-iconWrapper-disabled`]: disabled,
    });

    let num = 0;
    if (selectedOptions?.length && maxTagCount) {
      if (selectedOptions.length - maxTagCount > 0) {
        num = selectedOptions.length - maxTagCount;
      }
    }

    return (
      <div className={wrapperClass}>
        <div
          onClick={!disabled ? this.onClick : () => {}}
          className={mainClass}
          ref={this.getNode}
          style={{
            minHeight: type === 'multiple' ? 32 : undefined,
            height: type !== 'multiple' ? 32 : undefined,
            ...style,
          }}
        >
          {type === 'search'
            ? (
              <>
                <input onChange={this.handleInputChange} value={renderObj?.label || ''} className={inputClass} />
                <span style={{ display: `${renderObj?.label ? 'none' : 'inline-block'}` }} className={`${prefix}-placeholder`}>{placeholder}</span>
                <span className={iconStyle}><Icon type="search" /></span>
              </>
            )
            : (
              <>
                {(renderObj?.label || selectedOptions?.length)
                  ? (
                    type === 'multiple'
                      ? (
                        <div className={`${prefix}-item-wrapper`}>
                          {maxTagCount
                            ? selectedOptions?.slice(0, maxTagCount).map((i, idx) => {
                              let temp = false;
                              const _label: unknown = i.label;
                              if (i.label && _label.length && maxTagTextLength) {
                                temp = _label.length > maxTagTextLength;
                              }
                              return (
                                <div key={idx} title={_label} className={itemClass}>
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      maxWidth: '70%',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      wordBreak: 'break-all',
                                      whiteSpace: 'nowrap',
                                      color: 'rgba(0,0,0,0.65)',
                                    }}
                                  >
                                    {temp ? `${_label.substr(0, maxTagTextLength)}...` : _label}
                                  </span>
                                  <span
                                    onClick={(el) => this.handleItemDelete(el, i)}
                                    style={{ float: 'right', display: 'inline-block', marginRight: 4 }}
                                  >
                                    <Icon type="close" style={{ marginTop: -5, color: '#ACAFB9', fontSize: 12 }} />
                                  </span>
                                </div>
                              );
                            })
                            : (
                              selectedOptions?.map((i, idx) => (
                                <div key={idx} className={itemClass}>
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      maxWidth: '70%',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      wordBreak: 'break-all',
                                      color: 'rgba(0,0,0,0.65)',
                                    }}
                                    title={i.label || ''}
                                  >
                                    {i.label}
                                  </span>
                                  <span
                                    onClick={(el) => this.handleItemDelete(el, i)}
                                    style={{ float: 'right', display: 'inline-block', marginRight: 4 }}
                                  >
                                    <Icon type="close" style={{ color: '#ACAFB9', fontSize: 12 }} />
                                  </span>
                                </div>
                              ))
                            )}
                          {num ? (
                            <span className={itemClass}>
                              <span>+</span>
                              <span>
                                {num}
                                ...
                              </span>
                            </span>
                          ) : null}
                        </div>
                      )
                      : <span className={`${prefix}-value`} title={renderObj?.label || ''} style={{ color: disabled ? 'rgba(0,0,0,0.45)' : undefined }}>{renderObj?.label}</span>
                  )
                  : <span className={`${prefix}-placeholder`}>{placeholder}</span>}
                {allowClear && renderObj?.label
                  ? <span className={`${prefix}-iconWrapper`} onClick={this.handleClear}><Icon type="close" /></span>
                  : <span className={iconStyle}><Icon type={`${showDropdown ? 'up' : 'down'}`} /></span>}
              </>
            )}
        </div>
        <Portal {...({ getPopupContainer })}>
          {showDropdown && (
          <div
            className={dropdownClass}
            style={{
              left, top, width, ...dropdownStyle,
            }}
          >
            <SelectContext.Provider
              value={{
                value: `${value || defaultValue}`,
                label: `${children}`,
                onSelect: this.onSelect,
                renderObj,
                multiple: type === 'multiple' || type === 'tags',
                selectedOptions,
              }}
            >
              {
                /**
                 * 如果是远程搜索，则直接展示数据children
                 * 否则判断newChildren是否为空，如果不为空则代表是搜索，展示搜索出的数据newChildren
                 */
              }
              {remoteSearch
                ? children
                : newChildren && Object.keys(newChildren).length
                  ? newChildren
                  : (
                    isSearch
                      ? <div className={noContentClass}>暂无数据</div>
                      : children
                  )}
            </SelectContext.Provider>
          </div>
          )}
        </Portal>
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

const ComposedSelect = Select;
ComposedSelect.Option = Option;

export default ComposedSelect;
