/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable eqeqeq */
import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Menus from './menus';
import Result from './result';
import { CascaderOptionType } from './types/common';
import { CascaderProps } from './types/cascader';
import { arrayTreeFilter, uuid, getFieldName } from './utils';

export interface CascaderState {
  inputValue: string;
  inputFocused: boolean,
  value: string[];
  popupVisible: boolean | undefined;
  flattenOptions: CascaderOptionType[][] | undefined;
  // prevProps: CascaderProps;
  actionValue: string[],
  currentIcon: string,
}

function flattenTree(
  options: CascaderOptionType[],
  props: CascaderProps,
  ancestor: CascaderOptionType[] = [],
) {
  let flattenOptions: CascaderOptionType[][] = [];
  const childrenName = getFieldName('children', props.fieldNames);
  options.forEach((option) => {
    const path = ancestor.concat(option);
    if (props.changeOnSelect || !option[childrenName] || !option[childrenName].length) {
      flattenOptions.push(path);
    }
    if (option[childrenName]) {
      flattenOptions = flattenOptions.concat(flattenTree(option[childrenName], props, path));
    }
  });
  return flattenOptions;
}

// 用于渲染默认的label展示
const defaultDisplayRender = (label: string[]) => label.join(' / ');
class Cascader extends React.Component<CascaderProps, CascaderState> {
  static defaultProps = {
    transitionname: 'slide-up',
    popupPlacement: 'bottomLeft',
    prefixCls: 'uni-cascader',
    options: [],
    disabled: false,
    allowClear: true,
  };

  constructor(props: CascaderProps) {
    super(props);
    this.state = {
      actionValue: props.value || props.defaultValue || [],
      value: props.value || props.defaultValue || [],
      inputValue: '',
      inputFocused: false,
      popupVisible: props.popupVisible,
      flattenOptions: props.showSearch ? flattenTree(props.options, props) : undefined,
      currentIcon: 'expand',
    };
  }

  componentDidUpdate(preProps: CascaderProps) {
    const { value } = this.props;
    if (value != preProps.value) {
      this.setState({ value });
    }
  }

  private tag = uuid();

  private clickOutclosePopup = (target: HTMLElement) => {
    if (target.getAttribute('data-tag') === this.tag) return;
    if (target.nodeName === 'BODY') {
      this.setState({ inputFocused: false }, () => {
        this.handlePopupVisibleChange(false);
      });
      return;
    }
    target.parentNode && this.clickOutclosePopup(target.parentNode as HTMLElement);
  };

  private documentBodyOnClick = (event: Event) => {
    if (!this.state.popupVisible) return;
    event.target && this.clickOutclosePopup(event.target as HTMLElement);
  };

  componentDidMount = () => {
    document.body.addEventListener('click', this.documentBodyOnClick);
    if (!this.props.showSearch) {
      this.input.readOnly = true;
    }
  };

  componentWillUnmount = () => {
    document.body.removeEventListener('click', this.documentBodyOnClick);
  }

  private input!: HTMLInputElement;

  saveInput = (node: HTMLInputElement) => {
    this.input = node;
  }

  getSelectOptions() {
    const { options, fieldNames } = this.props;
    const valueKeyName = getFieldName('value', fieldNames);
    const childrenKeyName = getFieldName('children', fieldNames);
    const { value = [] } = this.state;
    const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
    const selectedOptions: CascaderOptionType[] = arrayTreeFilter(
      options,
      (o: CascaderOptionType, level: number) => o[valueKeyName] === unwrappedValue[level],
      { childrenKeyName },
    );
    return selectedOptions;
  }

  getLabel() {
    const { displayRender = defaultDisplayRender as Function } = this.props;
    const labelKeyName = getFieldName('label', this.props.fieldNames);
    const selectedOptions = this.getSelectOptions();
    const label = selectedOptions.map((o) => o[labelKeyName]);
    return displayRender(label, selectedOptions);
  }

  handlePopupVisibleChange = (popupVisible: boolean) => {
    const { onPopupVisibleChange } = this.props;
    if (onPopupVisibleChange) {
      onPopupVisibleChange(popupVisible);
      return;
    }
    this.setState({ popupVisible });
    if (!popupVisible) {
      this.setState({ inputValue: '' });
    }
  }

  // 阻止切换行为（popupVisible）
  handleCascaderClick = (e: React.MouseEvent<HTMLElement>) => {
    const { inputFocused, popupVisible } = this.state;
    if (inputFocused || popupVisible) {
      e.stopPropagation();
      if (e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
      }
    }
  }

  handleInputClick = () => {
    const { props } = this;
    const { disabled, showSearch } = props;
    if (!disabled) { // 非禁用
      this.setState({ inputFocused: true });
      if (showSearch) {
        this.handlePopupVisibleChange(true);
        return;
      }
      this.handlePopupVisibleChange(!this.state.popupVisible);
      return;
    }
    if (showSearch) {
      this.input.blur();
    }
  };

  clearSelection = () => {
    this.setState({
      actionValue: [],
      value: [],
      inputValue: '',
    });
  };

  handleIconClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    const { props, state } = this;
    const { disabled } = props;
    if (disabled) return;
    const { popupVisible, currentIcon } = state;
    if (currentIcon === 'clear') {
      this.clearSelection();
      return;
    }
    this.handlePopupVisibleChange(!popupVisible);
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    this.setState({ inputValue });
    if (inputValue) {
      this.setState({ currentIcon: 'clear' });
      return;
    }
    this.setState({ currentIcon: 'expand' });
  };

  handleMenuSelect = (targetOption: CascaderOptionType, index: number, e: React.MouseEvent<HTMLElement>) => {
    if (targetOption.disabled) return;
    const childrenKeyName = getFieldName('children', this.props.fieldNames);
    const valueKeyName = getFieldName('value', this.props.fieldNames);
    const { actionValue } = this.state;
    actionValue[index] = targetOption[valueKeyName];
    this.input?.blur();
    this.setState({ actionValue });
    if (!targetOption[childrenKeyName]) {
      const value = [...actionValue];
      this.setState({ value, inputFocused: false }, () => {
        this.handlePopupVisibleChange(false);
        if (this.props.onChange) {
          const selectedOptions = this.getSelectOptions();
          this.props.onChange(value, selectedOptions);
        }
      });
    }
  };

  handleMouseEnter = () => {
    const { props, state } = this;
    const { allowClear, disabled } = props;
    const { value } = state;
    if (!allowClear || disabled) return;
    if (value && value.length > 0) {
      this.setState({ currentIcon: 'clear' });
    }
  };

  handleMouseLeave = () => {
    const { props } = this;
    const { allowClear, disabled } = props;
    if (!allowClear || disabled) return;
    this.setState({ currentIcon: 'expand' });
  };

  // 缺少数据为空时的展示处理
  renderCascader = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { props, state } = this;
    const {
      prefixCls: customizePrefixCls,
      size,
      className,
      disabled,
      showSearch,
      children,
      style,
      placeholder = '请选择',
    } = props;
    const { value, inputFocused, currentIcon } = state;

    const prefixCls = getPrefixCls('cascader', customizePrefixCls);

    const pickerCls = classNames(className, `${prefixCls}-picker`, {
      [`${prefixCls}-picker-with-value`]: state.inputValue,
      [`${prefixCls}-picker-${size}`]: !!size,
      [`${prefixCls}-picker-show-search`]: !!showSearch,
      [`${prefixCls}-picker-focused`]: inputFocused,
      [`${prefixCls}-picker-disabled`]: disabled,
    });
    const iconCls = classNames(`${prefixCls}-icon`, {
      [`${prefixCls}-icon-disabled`]: disabled,
    });
    const inputCls = classNames(`${prefixCls}-input`, {
      [`${prefixCls}-input-disabled`]: disabled,
    });
    const clearIcon = <Icon type="delete" />;
    const inputIcon = <Icon type={state.popupVisible ? 'up' : 'down'} />;
    const isSearch = inputFocused && showSearch;

    const input = children || (
      <span
        style={style}
        className={pickerCls}
        onClick={this.handleInputClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <span className={`${prefixCls}-label`} />
        <input
          className={inputCls}
          ref={this.saveInput}
          placeholder={(value && value.length > 0) && isSearch ? this.getLabel() : placeholder}
          value={isSearch ? state.inputValue : this.getLabel()}
          type="text"
          onChange={this.handleInputChange}
        />
        <span className={iconCls} onClick={this.handleIconClick}>
          {currentIcon === 'clear' ? clearIcon : inputIcon}
        </span>
      </span>
    );

    const menusWidthStyle = state.inputValue ? { width: '100%' } : {};

    return (
      <span
        className={`${prefixCls}`}
        data-tag={this.tag}
        onClick={this.handleCascaderClick}
      >
        {input}
        {state.popupVisible && (
          <div className={`${prefixCls}-menus-wrapper`}>
            <div className={`${prefixCls}-menus`} style={menusWidthStyle}>
              {state.inputValue ? (
                <Result
                  {...this.props}
                  prefixCls={prefixCls}
                  fieldNames={this.props.fieldNames}
                  flattenOptions={state.flattenOptions}
                  inputValue={state.inputValue}
                  onSelect={this.handleMenuSelect}
                />
              ) : (
                <Menus
                  {...this.props}
                  prefixCls={prefixCls}
                  fieldNames={this.props.fieldNames}
                  onSelect={this.handleMenuSelect}
                  activeValue={state.actionValue}
                />
              )}
            </div>
          </div>
        )}
      </span>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderCascader}
      </ConfigConsumer>
    );
  }
}

export default Cascader;
