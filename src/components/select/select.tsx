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
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';
import Icon from '@union-design/icon';
import { getOffset } from '@union-design/utils';
import Portal from '@union-design/portal';
import Option from './option';
import OptGroup from './opt-group';
import { SelectContext } from './context';

type SelectType = 'default' | 'search' | 'multiple';

export interface OptionType {
  value: string | string[];
  label?: string | ReactNode;
  children?: string | ReactNode;
}

export type ValueType = string | string[] | OptionType | OptionType[]

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
  focus?: boolean;
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
      focus: false,
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
    this.setState({ focus: false });
  }

  handleClick = () => {
    const { disabled } = this.props;
    const { visible } = this.state;
    if (!disabled) {
      this.setState({ visible: !visible, focus: true });
      this.getLocation();
    }
  }

  loopChild = (data: any[], list: OptionType[]) => {
    data.forEach((item) => {
      if (item?.props && item?.type?.isOption) {
        list.push(item?.props);
      }
      const child = item?.props.children;
      const TChild = Array.isArray(child) ? child : React.isValidElement(child) ? React.Children.toArray(child) : null;
      if (TChild) {
        this.loopChild(TChild, list);
      }
    });
  }

  getChildProps = () => {
    const { children } = this.props;
    const temp:OptionType [] = [];
    this.loopChild(React.Children.toArray(children), temp);
    return temp;
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
    const { getPopupContainer, type } = this.props;
    const temp = () => {
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
    };

    if (type === 'multiple') {
      const time = setTimeout(() => {
        clearTimeout(time);
        temp();
      }, 0);
    } else {
      temp();
    }
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
    this.setState({ focus: true });
  }

  InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onSearch, onChange } = this.props;
    const value = (e.target as HTMLInputElement)?.value;
    onSearch?.(value);
    onChange?.(value);
    this.setState({ inputValue: value });
  }

  InputBlur = () => {
    const { children, LabelInValue, onChange } = this.props;
    const { initSearchValue } = this.state;
    if (React.Children.toArray(children).length === 0) {
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
  }

  renderTag = (list: OptionType[] = [], prefix: string) => {
    const { maxTagCount, placeholder } = this.props;
    const { childProps } = this.state;
    const data = maxTagCount ? list.slice(0, maxTagCount) : list;
    const tagContain = classnames(`${prefix}-tag-contain`);
    const tagCls = classnames(`${prefix}-tag`);
    const count = list.length - (maxTagCount || 0);
    return (
      <>
        {list.length === 0 ? placeholder : (
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
        )}
      </>
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
      allowClear,
      getPopupContainer,
      noContent = '暂无数据',
      dropdownStyle,
      dropdownClassName,
      ...rest
    } = this.props;
    const {
      left, top, visible, valueObj, inputValue, width, isClear, focus,
    } = this.state;
    const prefix = getPrefixCls('select');
    const selectCls = classnames(prefix, {
      [`${prefix}-${type}`]: type,
      [`${prefix}-disabled`]: disabled,
      [`${prefix}-focus`]: focus,
    }, className);

    const restProps = omit(rest, ['value', 'defaultValue', 'onSearch', 'maxTagCount', 'onSelect', 'LabelInValue', 'onChange']);
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
              onBlur={this.InputBlur}
            />
          ) : (
            <>{ type === 'multiple' ? this.renderTag((valueObj || []) as OptionType[], prefix) : <div>{this.getSingleText() || placeholder}</div>}</>
          )}
        </div>
        <div
          className={`${prefix}-suffix-icon`}
          style={{ color: isClear ? '#ACAFB9' : undefined }}
          onClick={(e) => {
            isClear && this.AllDelete(e);
          }}
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
