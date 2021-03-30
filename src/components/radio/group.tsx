/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Radio from './radio';

export interface RadioGroupProps {
  /* 用户自定义类前缀，默认uni-input */
  prefixCls?: string;
  // 选项变化时的回调函数
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  // 以配置形式设置子元素
  options?: string[] | Array<{ label: string; value: string; disabled?: boolean }>;
  // 用于设置当前选中的值
  value?: string;
  // 默认选中的值
  defaultValue?: any;
  // RadioGroup 下所有 input[type="radio"] 的 name 属性
  name?: string;
  style?: {[key: string] : unknown};
  // 禁选所有子单选器
  disabled?: boolean;
}

export interface RadioGroupState {
   value?: any;
}

class Group extends Component<RadioGroupProps, RadioGroupState> {
  static defaultProps: RadioGroupProps = {
    value: '',
    onChange: () => {},
  };

  constructor(props: RadioGroupProps) {
    super(props);
    // 劫持value
    this.state = {
      value: props.value || props.defaultValue,
    };
  }

  renderRadioGroup = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      onChange, prefixCls, children, options, name, disabled, style,
    } = this.props;
    const { value } = this.state;
    const prefix = getPrefixCls('radio-group', prefixCls);
    const mainClass = classNames(prefix, {
      // [`${prefix}-checked`]: checked,
    });

    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ value: e.target.value });
      if (onChange) {
        (onChange as React.ChangeEventHandler<HTMLInputElement>)(e);
      }
    };

    if (children) {
      return (
        <div className={mainClass} style={style}>
          {(React.Children.toArray(children) || []).map((item) => (
            <Radio
              key={item.props.value}
              disabled={disabled}
              value={item.props.value}
              checked={value === item.props.value}
              name={name}
              onChange={onchange}
              style={item.props.style || {}}
            >
              {item.props.children}
            </Radio>
          ))}
        </div>
      );
    }

    return (
      <div className={mainClass} style={style}>
        {(options || []).map((item: { value: string; label: React.ReactNode; }) => (
          <Radio
            key={item.value}
            disabled={disabled}
            value={item.value}
            checked={value === item.value}
            name={name}
            onChange={onchange}
          >
            {item.label}
          </Radio>
        ))}
      </div>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderRadioGroup}
      </ConfigConsumer>
    );
  }
}

export default Group;
