/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { Component, CSSProperties, ReactElement } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { MenuTheme, MENU_TAG_MENU } from '../menu/menu';

export type SiderProps = {
  /* 用户自定义类前缀，默认uni-layout */
  prefixCls?: string;
  /* 容器 className */
  className?: string;
  /* 当前收起状态 */
  collapsed?: boolean;
  /* 收缩宽度 */
  collapsedWidth?: number;
  /* 是否可收起 */
  collapsible?: boolean;
  /* 是否默认收起 */
  defaultCollapsed?: boolean;
  /* 主题颜色 */
  theme?: MenuTheme;
  /* 宽度 */
  width?: number;
  /* 展开-收起时的回调函数 */
  onCollapse?: (collapsed: boolean) => void;
  /* 指定样式 */
  style?: CSSProperties;
  // children?: any;
}

export type SiderState = {
  collapsed: boolean;
};

class Sider extends Component<SiderProps, SiderState> {
  static defaultProps: SiderProps = {
    collapsedWidth: 80,
    theme: 'dark',
    width: 200,
    className: '',
  };

  constructor(props: SiderProps) {
    super(props);
    this.state = {
      collapsed: props.defaultCollapsed ?? false,
    };
  }

  renderSider = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, className, children, style, width, collapsedWidth, theme, collapsible,
    } = this.props;

    const { collapsed } = this.state;

    const prefix = getPrefixCls('layout-sider', prefixCls);
    const mainClass = classNames(prefix, {
      [`${prefix}-${theme}`]: theme,
      [`${prefix}-collapsible`]: collapsible,
    });

    const tempWidth = collapsed! ? collapsedWidth! : width!;

    const newStyle = {
      ...style,
      flex: `0 0 ${tempWidth}px`,
      width: tempWidth,
    };

    return (
      <aside className={`${className} ${mainClass}`} style={newStyle}>
        {React.Children.map(children, (child) => {
          const type = (child as ReactElement)?.type ?? {};
          const tag = (type as unknown as { [key: string]: unknown }).tag as string;

          if (React.isValidElement(child) && tag === MENU_TAG_MENU) {
            return React.cloneElement(child, {
              theme,
              inlineCollapsed: collapsed,
              inlineCollapsedIcon: true,
              inlineCollapsedMinWidth: collapsedWidth!,
              inlineCollapsedMaxWidth: width,
              onCollapsed: (c: boolean) => this.setState({ collapsed: c }),
            });
          }

          return child;
        })}
      </aside>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderSider}
      </ConfigConsumer>
    );
  }
}

export default Sider;
