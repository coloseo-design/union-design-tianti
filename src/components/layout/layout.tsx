import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';
import Header from './header';
import Content from './content';
import Footer from './footer';
import Sider from './sider';

export interface LayoutProps extends React.HTMLAttributes<HTMLElement> {
  /* 用户自定义类前缀，默认uni-layout */
  prefixCls?: string;
}

interface LayoutState {
  hasSider: boolean;
}

// 判断是否含有Sider子组件
const judeSider = (children: unknown) => {
  let hasSider = false;
  React.Children.forEach(children, (child: any) => {
    if (child && child?.type?.typeName === 'Sider') { // 这里使用child的type.name进行判断
      hasSider = true;
    }
  });
  return hasSider;
};

class Layout extends Component<LayoutProps, LayoutState> {
  static Header: typeof Header;

  static Content: typeof Content;

  static Footer: typeof Footer;

  static Sider: typeof Sider;

  constructor(props: LayoutProps) {
    super(props);
    this.state = {
      hasSider: false,
    };
  }

  static getDerivedStateFromProps(nextProps: LayoutProps) {
    const { children } = nextProps;
    if (children) {
      return {
        hasSider: judeSider(children),
      };
    }
    return null;
  }

  renderLayout = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, className, children, ...rest
    } = this.props;
    const { hasSider } = this.state;
    // eslint-disable-next-line max-len
    const prefix = getPrefixCls('layout', prefixCls);
    const mainClass = classNames(prefix, className, {
      [`${prefix}-has-sider`]: hasSider,
    });

    return (
      <section {...rest} className={mainClass}>
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
