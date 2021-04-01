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

interface LayoutState {
  hasSider: boolean;
}

// 判断是否含有Sider子组件
const judeSider = (children: unknown) => {
  let hasSider = false;
  React.Children.forEach(children, (child) => {
    if (child.type.name === 'Sider') { // 这里使用child的type.name进行判断
      hasSider = true;
    }
  });
  return hasSider;
};

class Layout extends Component<LayoutProps, LayoutState> {
  static defaultProps: LayoutProps = {
    className: '',
  };

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

  componentDidMount() {
    const { children } = this.props;

    this.setState({ hasSider: judeSider(children) });
  }

  renderLayout = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, className, children, style,
    } = this.props;
    const { hasSider } = this.state;
    // eslint-disable-next-line max-len
    const prefix = getPrefixCls('layout', prefixCls);
    const mainClass = classNames(prefix, {
      [`${prefix}-has-sider`]: hasSider,
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
