import React, { Component, ReactNode } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Item from './item';

export interface BreadcrumbProps {
  /* 用户自定义类前缀，默认uni-breadcrumb */
  prefixCls?: string;
  /* 分隔符自定义 */
  separator?: ReactNode;
}

class Breadcrumb extends Component<BreadcrumbProps> {
  static defaultProps: BreadcrumbProps = {
    separator: '>',
  };

  static Item: typeof Item;

  renderBreadcrumb = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls, children, separator } = this.props;
    const prefix = getPrefixCls('breadcrumb', prefixCls);
    const mainClass = classNames(prefix, {
      // [`${prefix}-has-sider`]: siders.length > 0,
    });

    let toArrayChildren = React.Children.toArray(children);
    if (toArrayChildren.length) {
      toArrayChildren = React.Children.map(children,
        (child) => React.cloneElement(child, { separator }));
    }

    return (
      <div className={mainClass}>
        {toArrayChildren}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderBreadcrumb}
      </ConfigConsumer>
    );
  }
}

Breadcrumb.Item = Item;

export default Breadcrumb;
