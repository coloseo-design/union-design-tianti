import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';

export interface ContentProps extends React.HTMLAttributes<HTMLElement> {
  /* 用户自定义类前缀，默认uni-layout */
  prefixCls?: string;
  /* 指定样式 */
  style?: CSSProperties;
}

class Content extends Component<ContentProps> {
  renderContent = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, children, style, className, ...rest
    } = this.props;

    const prefix = getPrefixCls('layout-content', prefixCls);
    const mainClass = classNames(prefix, className, {
      // [`${prefix}-bordered`]: bordered,
    });

    return (
      <main {...rest} className={mainClass} style={style}>
        {children}
      </main>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderContent}
      </ConfigConsumer>
    );
  }
}

export default Content;
