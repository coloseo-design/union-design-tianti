import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /* 用户自定义类前缀，默认uni-layout */
  prefixCls?: string;
  /* 指定样式 */
  style?: CSSProperties;
}

class Header extends Component<HeaderProps> {
  renderHeader = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, children, style, className, ...rest
    } = this.props;

    const prefix = getPrefixCls('layout-header', className, prefixCls);
    const mainClass = classNames(prefix, {
      // [`${prefix}-bordered`]: bordered,
    });

    return (
      <header {...rest} className={mainClass} style={style}>
        {children}
      </header>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderHeader}
      </ConfigConsumer>
    );
  }
}

export default Header;
