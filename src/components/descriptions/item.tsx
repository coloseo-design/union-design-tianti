import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface ItemProps extends
React.HTMLAttributes<HTMLTableDataCellElement | HTMLTableHeaderCellElement> {
  /** 内容的描述 */
  label?: string | React.ReactNode;
  /* 包含列的数量 */
  span?: number;
  /* 用户自定义类前缀，默认uni-input */
  prefixCls?: string;
  /** 是否展示边框 */
  bordered?: boolean;
}

class Item extends Component<ItemProps> {
  renderItem = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, children, label, span = 1, bordered, className, ...rest
    } = this.props;
    const prefix = getPrefixCls('descriptions-item', prefixCls);
    const mainClass = classNames(prefix, className, {
      // [`${prefix}-label`]: label,
    });
    if (bordered) {
      return (
        <>
          <th>{label}</th>
          <td colSpan={span}>{children}</td>
        </>
      );
    }
    return (
      <td {...rest} colSpan={span} className={mainClass}>
        <span className={`${prefix}-label`}>{label}</span>
        <span className={`${prefix}-content`}>{children}</span>
      </td>
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
