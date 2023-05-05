/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@union-design/icon';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 百分比 */
  percent?: number;
  /** 状态，可选：success exception normal */
  status?: string;
  /* 用户自定义类前缀，默认uni-progress */
  prefixCls?: string;
  size?: string;
}

export interface ProgressState {
  /** 百分比 */
  percent?: number;
}

class Progress extends Component<ProgressProps, ProgressState> {
  static defaultProps: ProgressProps = {
    percent: 0,
    status: 'normal',
  };

  static getDerivedStateFromProps(props: ProgressProps, state: ProgressState) {
    if (props.percent !== state.percent) {
      return {
        percent: props.percent,
      };
    }
    return null;
  }

  constructor(props: ProgressProps) {
    super(props);
    // 劫持checked
    this.state = {
      percent: props.percent,
    };
  }

  renderProgress = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, status, size, className, ...rest
    } = this.props;
    const { percent } = this.state;
    const _status = percent === 100 ? 'success' : status;
    const prefix = getPrefixCls('progress', prefixCls);
    const mainClass = classNames(prefix, className, {
      [`${prefix}-status-${_status}`]: _status,
    });
    const textMapping = {
      success: <Icon type="success" />,
      exception: <Icon type="delete" />,
      normal: `${percent}%`,
    };

    return (
      <div {...rest} className={mainClass}>
        <div className={`${prefix}-outer`}>
          <div className={`${prefix}-inner`}>
            <div className={`${prefix}-bg`} style={{ width: `${percent}%`, height: size === 'small' ? 6 : 8 }} />
          </div>
        </div>
        <span className={`${prefix}-text`}>{textMapping[_status]}</span>
      </div>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderProgress}
      </ConfigConsumer>
    );
  }
}

export default Progress;
