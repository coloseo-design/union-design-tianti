import React from 'react';
import { ConfigConsumer } from '../config-provider';

export interface EmptyProps {
  prefixCls?: string,
}

class Empty extends React.Component<EmptyProps> {
  renderEmpty = () => {
    const { props } = this;
    const { prefixCls } = props;

    return (
      <span className={`${prefixCls}-empty`}>暂无数据</span>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderEmpty}
      </ConfigConsumer>
    );
  }
}

export default Empty;
