import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface FooterProps {
  /* 用户自定义类前缀，默认uni-layout */
  prefixCls?: string;
  /* 指定样式 */
  style?: CSSProperties;
}

class Footer extends Component<FooterProps> {
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
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderFooter}
      </ConfigConsumer>
    );
  }
}

export default Footer;
