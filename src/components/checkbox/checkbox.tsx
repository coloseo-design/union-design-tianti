/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import classnames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Group, { CheckboxGroupConsumer, GroupCheckboxConsumerProps } from './group';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<any>, 'onChange'> {
  prefixCls?: string;
  /** 是否选中  */
  checked: boolean;
  /** 默认选中状态（仅在初始化有效） */
  defaultChecked: boolean;
  /** 当前空间是否禁止状态 */
  disabled: boolean;
  /** onChange切换选择状态的回调(为了将来兼容form， 所以输入组件必须对value和onChange进行处理) */
  onChange: (checkedValue: boolean) => void;
  /** checkbox选中的值(为了将来兼容form， 所以输入组件必须对value和onChange进行处理) */
  value?: string;
  /** 设置 indeterminate 状态，只负责样式控制 */
  indeterminate: boolean;
}

export interface CheckboxState {
  checked: boolean;
}

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  static Group: typeof Group;

  static defaultProps: CheckboxProps = {
    checked: false,
    autoFocus: false,
    disabled: false,
    defaultChecked: false,
    indeterminate: false,
    onChange: () => {},
  };

  constructor(props: CheckboxProps) {
    super(props);
    // 劫持checked
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  componentDidUpdate(props: CheckboxProps) {
    const { checked } = this.props;
    if (props.checked !== checked) {
      this.setState({
        checked,
      });
    }
  }

  onClick = () => {
    const { onChange, disabled } = this.props;
    if (disabled) return;
    const { checked } = this.state;
    const checkedC = !checked;
    this.setState({
      checked: checkedC,
    });
    onChange && onChange(checkedC);
  }

  renderCheckbox = (contextProps: ConfigConsumerProps & GroupCheckboxConsumerProps) => {
    const { getPrefixCls, ...groupContextProps } = contextProps;
    const { onGroupChange, value: values = [] } = groupContextProps;
    const {
      children,
      prefixCls: customizePrefixCls,
      disabled,
      className,
      value,
      indeterminate, // 是否是未确定状态
    } = this.props;
    let { checked } = this.state;
    // eslint-disable-next-line no-underscore-dangle
    const _value = value || children;
    // 如果是来自于group的values
    if (groupContextProps && 'value' in groupContextProps) {
      checked = values.includes(_value as string);
    }
    const prefix = getPrefixCls('checkbox', customizePrefixCls);
    const wrapperClass = classnames(`${prefix}-wrapper`, {
      [`${prefix}-wrapper-checked`]: checked,
      [`${prefix}-wrapper-disabled`]: disabled,
    }, className);
    const mainClass = classnames(prefix, {
      [`${prefix}-indeterminate`]: indeterminate,
      [`${prefix}-checked`]: checked,
      [`${prefix}-disabled`]: disabled,
    });
    const inputClass = classnames(`${prefix}-input`, {
      [`${prefix}-input-disabled`]: disabled,
    });
    const innerClass = classnames(`${prefix}-inner`);
    const onClick = () => {
      onGroupChange && onGroupChange({
        label: children as string,
        value: _value as string,
      });
      this.onClick();
    };
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label className={wrapperClass}>
        <span className={mainClass}>
          <input type="checkbox" className={inputClass} onClick={onClick} />
          <span className={innerClass} />
        </span>
        <span>{children}</span>
      </label>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {
          ({ getPrefixCls }: ConfigConsumerProps) => (
            <CheckboxGroupConsumer>
              {
                (props) => this.renderCheckbox({
                  getPrefixCls,
                  ...props,
                })
              }
            </CheckboxGroupConsumer>
          )
        }
      </ConfigConsumer>
    );
  }
}
Checkbox.Group = Group;
export default Checkbox;
