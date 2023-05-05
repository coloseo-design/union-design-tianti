/* eslint-disable max-len */
import React, {
  Component, ReactChild, ReactFragment, ReactPortal, ReactNode,
} from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';
import Item from './item';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  /* 用户自定义类前缀，默认uni-breadcrumb */
  prefixCls?: string;
  /* 分隔符自定义 */
  separator?: 'bias' | 'right' | ReactNode;
}

class Breadcrumb extends Component<BreadcrumbProps> {
  static defaultProps: BreadcrumbProps = {
    separator: 'right',
  };

  static Item: typeof Item;

  renderBreadcrumb = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, children, separator, className, ...rest
    } = this.props;
    const prefix = getPrefixCls('breadcrumb', prefixCls);
    const mainClass = classNames(prefix, className, {
      // [`${prefix}-has-sider`]: siders.length > 0,
    });

    let toArrayChildren = React.Children.toArray(children) as ((ReactChild | ReactFragment | ReactPortal)[] | undefined | null);
    if (toArrayChildren && toArrayChildren.length) {
      toArrayChildren = React.Children.map(children,
        (child) => React.cloneElement(child as any, { separator })) as any;
    }

    return (
      <div {...rest} className={mainClass}>
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
