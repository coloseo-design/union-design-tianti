/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';

export const tuple = <T extends string[]>(...args: T) => args;

const SwitchTypes = tuple('default', 'text', 'icon');

export type SwitchType = (typeof SwitchTypes)[number];

export interface BaseSwitchProps {
   prefixCls?: string;
   type?: SwitchType,
   checked?: boolean,
   className?: string,
   defaultChecked?: boolean,
   disabled?: boolean,
   onChange?: (value:boolean, event:React.MouseEvent<HTMLElement>) => void;
}

export interface BaseSwitchState {
  checked: boolean;
}

class Switch extends React.Component<BaseSwitchProps, BaseSwitchState> {
  static defaultProps: BaseSwitchProps = {
    checked: false,
    defaultChecked: false,
    disabled: false,
  };

  constructor(props:BaseSwitchProps) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked || false,
    };
  }

  componentDidUpdate(prevProps: BaseSwitchProps) {
    const { checked } = this.props;
    if (checked !== undefined && checked !== prevProps.checked) {
      this.setState({ checked });
    }
  }

  handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { checked } = this.state;
    const { disabled, onChange } = this.props;
    if (disabled) return;
    this.setState({ checked: !checked });
    if (onChange) {
      onChange(!checked, e);
    }
  };

  renderSwitch = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      className, disabled, type, prefixCls,
    } = this.props;
    const { checked } = this.state;
    const prefix = getPrefixCls('switch', prefixCls);

    const classname = classNames(`${prefix}-parent`, {
      [`${prefix}-checked`]: checked,
      [`${prefix}-disabled`]: disabled,
    }, className);
    let node = null;
    if (type && type !== 'default') {
      node = (
        <div className={`${prefix}-content`}>
          {
            type === 'icon' ? checked ? <Icon type="checkout" /> : <Icon type="close" /> : checked ? '开' : '关'
          }
        </div>
      );
    }
    return (
      <button
        className={classname}
        onClick={this.handleClick}
        type="button"
      >
        <div className={`${prefix}-round`} />
        {node}
      </button>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderSwitch}
      </ConfigConsumer>
    );
  }
}

export default Switch;
