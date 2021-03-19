import React, { Component, CSSProperties } from 'react';
import { ConfigConsumer, ConfigConsumerProps } from './../config-provider';
import classNames from 'classnames';

export interface FooterProps {
  /* 用户自定义类前缀，默认uni-layout */
  prefixCls?: string;
  /* 指定样式 */
  style?: CSSProperties;
  children?: any;
}

class Footer extends Component<FooterProps> {

  constructor(props: FooterProps) {
    super(props);
  }

  renderFooter = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls, children } = this.props;

    const prefix = getPrefixCls('layout-footer', prefixCls);
    const mainClass = classNames(prefix, {
      // [`${prefix}-bordered`]: bordered,
    });
    
    return (
      <footer className={mainClass}>
        {children}
      </footer>
    )
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderFooter}
      </ConfigConsumer>
    )
  }
}

export default Footer;