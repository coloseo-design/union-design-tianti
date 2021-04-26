/* eslint-disable no-underscore-dangle */
import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon';

export interface SiderProps {
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
  theme?: 'light' | 'dark';
  /* 宽度 */
  width?: number;
  /* 展开-收起时的回调函数 */
  onCollapse?: (collapsed: boolean) => void;
  /* 指定样式 */
  style?: CSSProperties;
}

export interface SiderState {
  /* 当前收起状态 */
  collapsed?: boolean;
}

class Sider extends Component<SiderProps, SiderState> {
  static defaultProps: SiderProps = {
    collapsedWidth: 80,
    collapsible: false,
    defaultCollapsed: false,
    theme: 'dark',
    width: 200,
    className: '',
  };

  constructor(props: SiderProps) {
    super(props);
    this.state = {
      collapsed: props.collapsed || props.defaultCollapsed,
    };
  }

  static getDerivedStateFromProps(nextProps: SiderProps, nextState: SiderState) {
    const { collapsed } = nextProps;
    if (collapsed !== nextState.collapsed) {
      return {
        collapsed,
      };
    }
    return null;
  }

  renderSider = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, className, children, style, width = 200, collapsedWidth = 80,
      theme = 'dark', collapsible, onCollapse,
    } = this.props;
    const { collapsed } = this.state;

    const prefix = getPrefixCls('layout-sider', prefixCls);
    const mainClass = classNames(prefix, {
      [`${prefix}-${theme}`]: theme,
      [`${prefix}-collapsible`]: collapsible,
    });

    const onClick = () => {
      // this.setState({ collapsed: !collapsed });
      if (onCollapse) {
        onCollapse(!collapsed);
      }
    };

    const _width = collapsed ? collapsedWidth : width;

    return (
      <aside className={`${className} ${mainClass}`} style={{ width: _width, flex: `0 0 ${_width}px`, ...style }}>
        <div className={`${prefix}-children`}>
          {children}
        </div>
        {collapsedWidth && collapsible && (
          <div className={`${prefix}-trigger`} style={{ left: collapsed ? collapsedWidth : width }} onClick={onClick}>
            {collapsed
              ? <Icon type="right" />
              : <Icon type="left" />}
          </div>
        )}
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
