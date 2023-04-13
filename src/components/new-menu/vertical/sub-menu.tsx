/* eslint-disable no-nested-ternary */
import React, { ReactNode, isValidElement } from 'react';
import classNames from 'classnames';
import Icon from '../../icon';
// import Tooltip from '../../tooltip';
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
  changeSelectedKeys?: (key: string, firstK: string) => void;
  AllKeys?: string[];
  firstKeys?: string[];
  isTooltip?: boolean;
  menuRef?: any;
  mode?: string;
  parentIcon?: boolean;
}

class SubMenu extends React.Component<SubMenuProps> {
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
      isTooltip,
      mode,
      firstKeys,
      parentIcon,
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
          firstKeys,
          parentIcon: Boolean(icon),
          level: (level || 0) + 1,
          AllKeys: [...AllKeys, child.key],
          isTooltip,
          mode,
        });
      }
      return null;
    });

    const defaultGap = parentIcon ? 112 : 86;
    const maxWidth = level <= 2 ? defaultGap : defaultGap - (level - 2) * 14;
    return (
      <>
        <div
          className={classNames(prefix, {
            [`${prefix}-first-selected`]: firstKeys?.includes?.(itemKey) && level === 1,
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
          <div
            className={titlePrefix}
            style={{ maxWidth }}
          >
            {title}
          </div>
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
