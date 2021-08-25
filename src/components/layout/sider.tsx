/* eslint-disable no-underscore-dangle */
import React, { Component, CSSProperties, ReactElement } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon';
import { MENU_TAG_MENU } from '../menu/menu';

export interface SiderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'collapsed' | 'defaultCollapsed'> {
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
  static typeName: string;

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
      theme = 'dark', collapsible, onCollapse, collapsed: _collapsed, defaultCollapsed, ...rest
    } = this.props;
    const { collapsed } = this.state;

    const prefix = getPrefixCls('layout-sider', prefixCls);
    const mainClass = classNames(prefix, className, {
      [`${prefix}-${theme}`]: theme,
      [`${prefix}-collapsible`]: collapsible,
    });

    const onClick = () => {
      // this.setState({ collapsed: !collapsed });
      if (onCollapse) {
        setTimeout(() => {
          onCollapse(!collapsed);
        }, 200);
      }
    };

    const _width = collapsed ? collapsedWidth : width;

    return (
      <aside {...rest} className={mainClass} style={{ width: _width, flex: `0 0 ${_width}px`, ...style }}>
        <div className={`${prefix}-children`}>
          {React.Children.map(children, (child) => {
            const type = (child as ReactElement)?.type ?? {};
            const tag = (type as unknown as { [key: string]: unknown }).tag as string;

            if (React.isValidElement(child) && tag === MENU_TAG_MENU) {
              return React.cloneElement(child, {
                theme,
                inlineCollapsed: collapsed,
                inlineCollapsedIcon: false,
                inlineCollapsedWidth: _width,
              });
            }
            return child;
          })}
        </div>
        {collapsedWidth && collapsible && (
          <div className={`${prefix}-trigger`} style={{ left: _width }} onClick={onClick}>
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

Sider.typeName = 'Sider';

export default Sider;
