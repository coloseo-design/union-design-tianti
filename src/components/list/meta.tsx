import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface MetaProps {
  /** 列表元素的描述内容 */
  description?: React.ReactNode;
  /* 列表元素的标题 */
  title?: React.ReactNode;
  prefixCls?: string;
}

class Meta extends Component<MetaProps> {
  renderMeta = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls, title, description } = this.props;

    const prefix = getPrefixCls('list-item-meta', prefixCls);
    const mainClass = classNames(prefix, {
      // [`${prefix}-checked`]: checked,
    });

    return (
      <div className={mainClass}>
        <div className={`${mainClass}-title`}>{title}</div>
        <div className={`${mainClass}-description`}>{description}</div>
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
