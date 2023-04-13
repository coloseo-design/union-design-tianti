/* eslint-disable no-nested-ternary */
import React, { ReactNode, isValidElement } from 'react';
import classNames from 'classnames';
import Icon from '../../icon';
// import Tooltip from '../../tooltip';
import { ConfigConsumerProps, ConfigConsumer } from '../../config-provider/context';

export interface ItemProps {
  icon?: string | ReactNode;
  key: string;
  title?: string;
  onClick?: (key: string) => void;
  openKeys?: string[];
  selectedKeys?: string[];
  itemKey?: string;
  parentIcon?: boolean;
  level?: number;
  changeSelectedKeys?: (key: string, firstK: string) => void;
  AllKeys?: string[];
  firstKeys?: string[];
}

class Item extends React.Component<ItemProps> {
  handleSelected = () => {
    const {
      itemKey = '',
      changeSelectedKeys,
      AllKeys = [],
    } = this.props;
    changeSelectedKeys?.(itemKey, AllKeys.length > 0 ? AllKeys[0] : '');
  }

  renderItem = ({ getPrefixCls }: ConfigConsumerProps) => {
    const prefix = getPrefixCls('new-menu-item');
    const iconPrefix = getPrefixCls('new-menu-icon');
    const titlePrefix = getPrefixCls('new-menu-title');
    const {
      title, icon, level = 1, selectedKeys = [], itemKey = '', children, parentIcon,
    } = this.props;

    const defaultGap = parentIcon ? 112 : 86;
    const maxWidth = level <= 2 ? defaultGap : defaultGap - (level - 2) * 14;
    return (
      <div
        className={classNames(prefix, {
          [`${prefix}-selected`]: selectedKeys.includes(itemKey),
          [`${prefix}-selected-bg`]: selectedKeys.includes(itemKey) && level !== 1,
        })}
        style={{ paddingLeft: level === 1 ? 16 : level === 2 ? 42 : 42 + (level - 2) * 14 }}
        onClick={this.handleSelected}
      >
        {icon && (
        <div className={classNames(`${iconPrefix}-left`)}>
          {isValidElement(icon) ? isValidElement(icon) : <Icon type={icon as string} />}
        </div>
        )}
        <div
          style={{ maxWidth }}
          className={titlePrefix}
        >
          {title || children}
        </div>
      </div>
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

export default Item;
