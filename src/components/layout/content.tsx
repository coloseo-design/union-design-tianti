import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
export interface ContentProps {
  /* 用户自定义类前缀，默认uni-layout */
  prefixCls?: string;
  /* 指定样式 */
  style?: CSSProperties;
  children?: any;
}

class Content extends Component<ContentProps> {

  constructor(props: ContentProps) {
    super(props);
  }

  renderContent = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls, children, style } = this.props;

    const prefix = getPrefixCls('layout-content', prefixCls);
    const mainClass = classNames(prefix, {
      // [`${prefix}-bordered`]: bordered,
    });
    
    return (
      <main className={mainClass} style={style}>
        {children}
      </main>
    )
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderContent}
      </ConfigConsumer>
    )
  }
}

export default Content;