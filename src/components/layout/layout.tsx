import React, { Component, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Header from './header';
import Content from './content';
import Footer from './footer';
import Sider from './sider';

export interface LayoutProps {
  /* 用户自定义类前缀，默认uni-layout */
  prefixCls?: string;
  /* 容器 className */
  className?: string;
  /* 指定样式 */
  style?: CSSProperties;
}

class Layout extends Component<LayoutProps> {
  static defaultProps: LayoutProps = {
    className: '',
  };

  static Header: typeof Header;

  static Content: typeof Content;

  static Footer: typeof Footer;

  static Sider: typeof Sider;

  renderLayout = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, className, children, style,
    } = this.props;
    // eslint-disable-next-line max-len
    const childrenProps = React.Children.toArray(children).map((child: ReactNode) => (React.isValidElement(child) ? child.props : {}));
    const siders = childrenProps.filter((i) => i.children === 'Sider');
    const prefix = getPrefixCls('layout', prefixCls);
    const mainClass = classNames(prefix, {
      [`${prefix}-has-sider`]: siders.length > 0,
    });

    return (
      <section className={`${className} ${mainClass}`} style={style}>
        {children}
      </section>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderLayout}
      </ConfigConsumer>
    );
  }
}

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Sider = Sider;

export default Layout;
