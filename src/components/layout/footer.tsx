import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /* 用户自定义类前缀，默认uni-layout */
  prefixCls?: string;
  /* 指定样式 */
  style?: CSSProperties;
}

class Footer extends Component<FooterProps> {
  renderFooter = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, children, style, className, ...rest
    } = this.props;

    const prefix = getPrefixCls('layout-footer', prefixCls);
    const mainClass = classNames(prefix, className, {
      // [`${prefix}-bordered`]: bordered,
    });

    return (
      <footer {...rest} className={mainClass} style={style}>
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
