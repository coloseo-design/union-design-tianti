import React, { Component, CSSProperties } from 'react';
import { ConfigConsumer, ConfigConsumerProps } from './../config-provider';
import classNames from 'classnames';

export interface HeaderProps {
  /* 用户自定义类前缀，默认uni-layout */
  prefixCls?: string;
  /* 指定样式 */
  style?: CSSProperties;
  children?: any;
}

class Header extends Component<HeaderProps> {

  constructor(props: HeaderProps) {
    super(props);
  }

  renderHeader = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls, children } = this.props;

    const prefix = getPrefixCls('layout-header', prefixCls);
    const mainClass = classNames(prefix, {
      // [`${prefix}-bordered`]: bordered,
    });
    
    return (
      <header className={mainClass}>
        {children}
      </header>
    )
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderHeader}
      </ConfigConsumer>
    )
  }
}

export default Header;