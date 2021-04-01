/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/ban-types */
import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Group from './group';

export interface RadioProps {
  // 指定当前是否选中
  checked?: boolean;
  // 初始是否选中
  defaultChecked?: boolean;
  // 禁用 Radio
  disabled?: boolean;
  // 根据 value 进行比较，判断是否选中
  value?: string;
  /* 用户自定义类前缀，默认uni-input */
  prefixCls?: string;
  // 变化时的回调
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  style?: {[key: string] : unknown};
  // RadioGroup 下所有 input[type="radio"] 的 name 属性
  name?: string;
  forwardedRef?: React.MutableRefObject<HTMLInputElement>;
}

export interface RadioState {
  // 指定当前是否选中
  checked?: boolean;
}

class Radio extends Component<RadioProps, RadioState> {
  static Group: typeof Group;

  static defaultProps: RadioProps = {
    checked: false,
    disabled: false,
    defaultChecked: false,
  };

  // static getDerivedStateFromProps(props: RadioProps, state: { checked: boolean | undefined; }) {
  //   if (props.checked !== state.checked) {
  //     return {
  //       checked: props.checked,
  //     };
  //   }
  //   return null;
  // }

  constructor(props: RadioProps) {
    super(props);
    // 劫持checked
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  componentDidUpdate(prevProps: RadioProps) {
    const { checked } = this.props;
    if (checked !== prevProps.checked) {
      this.setState({ checked });
    }
  }

  renderRadio = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      forwardedRef, onChange, prefixCls, children, disabled, style, name = 'radio', defaultChecked, ...rest
    } = this.props;
    const { checked } = this.state;
    const prefix = getPrefixCls('radio', prefixCls);
    const mainClass = classNames(prefix, {
      // [`${prefix}-checked`]: checked,
    });
    const onchange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (onChange) {
        (onChange as React.ChangeEventHandler<HTMLInputElement>)(e);
      }
    };
    return (
      <label className={mainClass} style={{ ...style, cursor: disabled ? 'not-allowed' : 'pointer' }}>
        <input {...rest} ref={forwardedRef} type="radio" disabled={disabled} checked={checked} name={name} onChange={onchange} />
        <span />
        <span>{children}</span>
      </label>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderRadio}
      </ConfigConsumer>
    );
  }
}

const RadioRef = React.forwardRef((props: RadioProps, ref: React.MutableRefObject<HTMLInputElement>) => (
  <Radio {...props} forwardedRef={ref} />
));

RadioRef.Group = Group;

export default RadioRef;
