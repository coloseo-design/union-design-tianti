import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../icon/index';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface SpinProps {
  /* 用户自定义类前缀，默认uni-input */
  prefixCls?: string;
  /* 是否为加载中状态 */
  spinning?: boolean;
}

export interface SpinState {
  /* 是否为加载中状态 */
  spinning?: boolean;
}

class Spin extends Component<SpinProps, SpinState> {
  static defaultProps: SpinProps = {
    spinning: true,
  };

  static getDerivedStateFromProps(props: SpinProps, state: SpinState) {
    if (props.spinning !== state.spinning) {
      return {
        spinning: props.spinning,
      };
    }
    return null;
  }

  constructor(props: SpinProps) {
    super(props);
    this.state = {
      spinning: props.spinning,
    };
  }

  renderSpin = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls } = this.props;
    const { spinning } = this.state;

    const prefix = getPrefixCls('rate', prefixCls);
    const mainClass = classNames(prefix, {
      // [`${prefix}-allowHalf`]: allowHalf,
    });

    return (
      <div className={mainClass} style={{ display: spinning ? 'inline-block' : 'none' }}>
        <Icon type="loading" />
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
