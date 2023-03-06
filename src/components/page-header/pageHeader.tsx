import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider/context';

export interface PageHeaderProps {
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    className?: string;
    prefixCls?: string;
    style?: React.CSSProperties;
}

class PageHeader extends React.Component<PageHeaderProps> {
  renderPageHeader = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, className, title, subTitle, style,
    } = this.props;
    const prefix = getPrefixCls('page-header', prefixCls);
    const clazzName = classNames(prefix, className);
    return (
      <div className={clazzName} style={{ ...style }}>
        {title}
        {
           subTitle && (
           <span className={`${prefix}-subTitle`}>
             ——
             {subTitle}
           </span>
           )
        }
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderPageHeader}
      </ConfigConsumer>
    );
  }
}

export default PageHeader;
