import React, { Component, ReactNode } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface ItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  /* 用户自定义类前缀，默认uni-breadcrumb-item */
  prefixCls?: string;
  /* 链接的目的地 */
  href?: string;
  /* 单击事件 */
  onClick?: (e: any) => void;
  /* 分隔符自定义 */
  separator?: ReactNode;
}

class Item extends Component<ItemProps> {
  renderItem = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, children, className, separator, href, onClick, ...rest
    } = this.props;
    const prefix = getPrefixCls('breadcrumb-item', prefixCls);
    const mainClass = classNames(prefix, {
      // [`${prefix}-has-sider`]: siders.length > 0,
    }, className);

    const onclick = (e: unknown) => {
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <span {...rest} className={mainClass}>
        <span className={`${prefix}-link`} onClick={onclick}>
          {href ? <a href={href}>{children}</a> : children}
        </span>
        <span className={`${prefix}-separator`}>{separator}</span>
      </span>
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
