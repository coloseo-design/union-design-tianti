/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Meta from './meta';

export interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** 列表操作组, 位置在最右侧 */
  actions?: Array<React.ReactNode>;
  /* 用户自定义类前缀，默认uni-list-item */
  prefixCls?: string;
}

class Item extends Component<ItemProps> {
  static defaultProps: ItemProps = {
    actions: [],
  };

  static Meta: typeof Meta;

  renderItem = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, children, actions, className, ...rest
    } = this.props;

    const prefix = getPrefixCls('list-item', prefixCls);
    const mainClass = classNames(prefix, className, {
      // [`${prefix}-checked`]: checked,
    });

    return (
      <li {...rest} className={mainClass}>
        {children}
        {actions && actions.length > 0 && (
          <ul className={`${prefix}-actions`}>
            {actions.map((item, index) => <li key={`${index}`}>{item}</li>)}
          </ul>
        )}
      </li>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderItem}
      </ConfigConsumer>
    );
  }
}

Item.Meta = Meta;

export default Item;
