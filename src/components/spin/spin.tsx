import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@union-design/icon';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';

export interface SpinProps extends React.HTMLAttributes<HTMLDivElement> {
  /* 用户自定义类前缀，默认uni-input */
  prefixCls?: string;
  /* 是否为加载中状态 */
  spin?: boolean;
}

export interface SpinState {
  /* 是否为加载中状态 */
  spin?: boolean;
}

class Spin extends Component<SpinProps, SpinState> {
  static defaultProps: SpinProps = {
    spin: true,
  };

  static getDerivedStateFromProps(props: SpinProps, state: SpinState) {
    if (props.spin !== state.spin) {
      return {
        spin: props.spin,
      };
    }
    return null;
  }

  constructor(props: SpinProps) {
    super(props);
    this.state = {
      spin: props.spin,
    };
  }

  renderSpin = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, className, ...rest
    } = this.props;
    const { spin } = this.state;
    const prefix = getPrefixCls('spain', prefixCls);
    const mainClass = classNames(prefix, className);

    return (
      <div {...rest} className={mainClass}>
        <Icon type="loading" spin={spin} />
      </div>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderSpin}
      </ConfigConsumer>
    );
  }
}

export default Spin;
