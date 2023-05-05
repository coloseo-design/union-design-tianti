import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';

export interface MetaProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 列表元素的描述内容 */
  description?: React.ReactNode;
  /* 列表元素的标题 */
  title?: React.ReactNode;
  prefixCls?: string;
}

class Meta extends Component<MetaProps> {
  renderMeta = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, title, description, className, ...rest
    } = this.props;

    const prefix = getPrefixCls('list-item-meta', prefixCls);
    const mainClass = classNames(prefix, className, {
      // [`${prefix}-checked`]: checked,
    });

    return (
      <div {...rest} className={mainClass}>
        <div className={`${prefix}-title`}>{title}</div>
        <div className={`${prefix}-description`}>{description}</div>
      </div>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderMeta}
      </ConfigConsumer>
    );
  }
}

export default Meta;
