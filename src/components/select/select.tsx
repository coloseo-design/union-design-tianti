/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, {
  CSSProperties, ReactElement, ReactNode,
} from 'react';
import classnames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
import Icon from '../icon';
import Option, { OptionProps } from './option';
import { SelectContext } from './context';

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

  constructor(props: SelectProps) {
    super(props);
    const {
      children,
      placeholder,
      noContent,
      dropdownMatchSelectWidth,
      defaultValue,
    } = props;
    const childrenProps = React.Children.toArray(children);
    const currentLabel: ReactElement<OptionProps> | undefined = childrenProps.find((i: ReactElement<OptionProps>) => i.props.value === defaultValue) as ReactElement<OptionProps> | undefined;
    const stateObj = {
      placeholder,
      noContent,
      showDropdown: false, // 是否展示下拉框
      dropdownMatchSelectWidth,
      children,
      isSearch: false,
      selectedOptions: [],
    };
    if (currentLabel) {
      Object.assign(stateObj, {
        renderObj: {
          value: defaultValue,
          label: currentLabel.props.children,
        },
      });
    }
    this.state = stateObj;
  }

  componentDidUpdate(prevProps: SelectProps) {
    const { children, remoteSearch, value } = this.props;
    const _children: unknown = children;
    if (remoteSearch && _children.length && prevProps.children !== _children) {
      this.setState({
        children,
      });
    }

    if (value !== prevProps.value) {
      const childrenProps = React.Children.toArray(children).map((i) => i.props);
      const currentLabel = (childrenProps || []).find((i) => i.value === value);
      this.setState({
        renderObj: {
          value,
          label: currentLabel ? currentLabel.children : '',
        },
      });
    }
  }

  onClick = () => {
    const { showDropdown } = this.state;
    const _showDropdown = !showDropdown;
    this.setState({
      showDropdown: _showDropdown,
    });
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

  onSelect = (value: string | string[], label: string, checked?: boolean) => {
    const { onChange, onSelect, type } = this.props;
    const { selectedOptions } = this.state;
    if (type === 'multiple' || type === 'tags') {
      const optionObj: obj = {
        value,
        label,
      };
      let arr: Array<obj> | undefined = selectedOptions;
      if (checked) {
        arr?.push(optionObj);
      } else {
        arr = arr?.filter((i) => i.value !== value);
      }
      this.setState({
        selectedOptions: arr,
      });
      const valueArr: any[] = (arr || []).map((s) => (s.value));
      if (onChange) {
        onChange(valueArr, arr);
      }
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
    } = this.props;
    const {
      showDropdown,
      placeholder,
      renderObj,
      children,
      newChildren,
      isSearch,
      selectedOptions,
    } = this.state;
    const prefix = getPrefixCls('select', customizePrefixCls);
    const wrapperClass = classnames(`${prefix}-wrapper`);
    const mainClass = classnames(`${prefix}`, {
      [`${prefix}-disabled`]: disabled,
      [`${prefix}-active`]: showDropdown,
    });
    const itemClass = classnames(`${prefix}-item`);
    const inputClass = classnames(`${prefix}-input`);
    const dropdownClass = classnames(`${prefix}-dropdown`, {
      [`${prefix}-dropdoen-show`]: showDropdown,
      [`${prefix}-dropdown-hide`]: !showDropdown,
      [`${prefix}-dropdown-match-select-width`]: dropdownMatchSelectWidth,
    });

    const noContentClass = classnames(`${prefix}-dropdown-noContent`);

    let num = 0;
    if (selectedOptions?.length && maxTagCount) {
      num = selectedOptions.length - maxTagCount;
    }

    return (
      <div className={wrapperClass} style={style}>
        <div onClick={!disabled ? this.onClick : () => {}} className={mainClass}>
          {type === 'search'
            ? (
              <>
                <input onChange={this.handleInputChange} value={renderObj?.label || ''} className={inputClass} />
                <span style={{ display: `${renderObj?.label ? 'none' : 'inline-block'}` }} className={`${prefix}-placeholder`}>{placeholder}</span>
                <span className={`${prefix}-iconWrapper`}><Icon className={`${prefix}-iconWrapper-icon`} type="search" /></span>
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
                                <div key={idx} className={itemClass}>
                                  <span>{temp ? `${_label.substr(0, maxTagTextLength)}...` : _label}</span>
                                  <span onClick={(el) => this.handleItemDelete(el, i)}>
                                    <Icon type="close" />
                                  </span>
                                </div>
                              );
                            })
                            : (
                              selectedOptions?.map((i, idx) => (
                                <div key={idx} className={itemClass}>
                                  <span>{i.label}</span>
                                  <span onClick={(el) => this.handleItemDelete(el, i)}>
                                    <Icon type="close" />
                                  </span>
                                </div>
                              ))
                            )}
                          {num ? (
                            <span className={itemClass}>
                              +
                              {num}
                              ...
                            </span>
                          ) : null}
                        </div>
                      )
                      : <span className={`${prefix}-value`}>{renderObj?.label}</span>
                  )
                  : <span className={`${prefix}-placeholder`}>{placeholder}</span>}
                {allowClear && renderObj?.label
                  ? <span onClick={this.handleClear}><Icon type="close" /></span>
                  : <span className={`${prefix}-iconWrapper`}><Icon className={`${prefix}-iconWrapper-icon`} type={`${showDropdown ? 'up' : 'down'}`} /></span>}
              </>
            )}
        </div>
        <div className={dropdownClass} style={dropdownStyle}>
          <SelectContext.Provider
            value={{
              value: `${value || defaultValue}`,
              label: `${children}`,
              onSelect: this.onSelect,
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
