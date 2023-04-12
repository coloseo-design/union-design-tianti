/* eslint-disable no-nested-ternary */
import React, { ReactNode, isValidElement } from 'react';
import classNames from 'classnames';
import Icon from '../../icon';
import Tooltip from '../../tooltip';
import { ConfigConsumerProps, ConfigConsumer } from '../../config-provider/context';

export interface SubMenuProps {
  icon?: string | ReactNode;
  key: string;
  title: string;
  onTitleClick?: (key: string) => void;
  openKeys?: string[];
  itemKey?: string;
  changeOpenKeys?: (key: string) => void;
  level?: number;
  selectedKeys?: string[];
  changeSelectedKeys?: (key: string) => void;
  AllKeys?: string[];
  hasFirstSelected?: (b: boolean) => void;
  firstSelected?: boolean;
  isTooltip?: boolean;
  menuRef?: any;
  mode?: string;
}

type SubMenuState = {
  firstSelected: boolean;
}

class SubMenu extends React.Component<SubMenuProps, SubMenuState> {
  handleExpand = () => {
    const { itemKey = '', changeOpenKeys } = this.props;
    changeOpenKeys?.(itemKey);
  }

  renderItem = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      children,
      icon,
      itemKey = '',
      title,
      openKeys = [],
      changeOpenKeys,
      changeSelectedKeys,
      level = 1,
      selectedKeys = [],
      AllKeys = [],
      hasFirstSelected,
      firstSelected,
      isTooltip,
      mode,
    } = this.props;
    const prefix = getPrefixCls('new-menu-submenu');
    const iconPrefix = getPrefixCls('new-menu-icon');
    const titlePrefix = getPrefixCls('new-menu-title');
    const childKeys: string[] = [];
    const TChildren = React.Children.map(children, (child) => {
      if (isValidElement(child)) {
        childKeys.push(child.key as string || '');
        return React.cloneElement(child as any, {
          openKeys,
          itemKey: child.key,
          selectedKeys,
          changeOpenKeys,
          changeSelectedKeys,
          hasFirstSelected,
          parentIcon: Boolean(icon),
          level: (level || 0) + 1,
          AllKeys: [...AllKeys, child.key],
          isTooltip,
        });
      }
      return null;
    });

    return (
      <>
        <div
          className={classNames(prefix, {
            [`${prefix}-first-selected`]: firstSelected && level === 1,
          })}
          onClick={this.handleExpand}
          style={{ paddingLeft: level === 1 ? 16 : level === 2 ? 42 : 42 + (level - 2) * 14 }}
        >
          {icon && (
            <div className={classNames(`${iconPrefix}-left`)}>
              {isValidElement(icon) ? isValidElement(icon) : <Icon type={icon as string} />}
            </div>
          )}
          <div className={classNames(`${iconPrefix}-right`)}>
            <Icon type={openKeys.includes(itemKey) && mode === 'inline' ? 'down2-line' : 'right2-line'} />
          </div>
          <Tooltip message={title} placement="bottom">
            <div
              className={titlePrefix}
              style={{ maxWidth: (level === 1 || level === 2) ? 112 : 112 - (level - 2) * 14 }}
            >
              {title}
            </div>
          </Tooltip>
        </div>
        {openKeys?.includes(itemKey) && mode === 'inline' && (
        <>
          {TChildren}
        </>
        )}
      </>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderItem}
      </ConfigConsumer>
    );
  }
}

export default SubMenu;
