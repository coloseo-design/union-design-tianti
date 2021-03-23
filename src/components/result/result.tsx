import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import applicationSuccess from './applicationSuccess';
import applicationError from './applicationError';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';

export interface ResultProps {
    extra?:React.ReactNode;
    subTitle?:React.ReactNode;
    title?:React.ReactNode;
    icon?:React.ReactNode;
    status?: 'success' | 'error' | 'applicationSuccess' | 'applicationError';
    className?: string;
    prefixCls?: string;
    style?: React.CSSProperties;
}

const statusType = {
  success: <Icon type="success" />,
  error: <Icon type="exclamation-circle" />,
  applicationSuccess: applicationSuccess(),
  applicationError: applicationError(),
};

class Result extends React.Component<ResultProps> {
    renderIcon = (prefix:string, { status }:ResultProps) => {
      const node = status ? statusType[status] : null;
      const clazzName = classNames(`${prefix}-icon`, {
        [`${prefix}-${status}`]: true,
        [`${prefix}-image`]: status === 'applicationSuccess' || status === 'applicationError',
      });
      return <div className={clazzName}>{node}</div>;
    };

    renderResult= ({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        prefixCls, className, style, title, subTitle, extra, status, icon,
      } = this.props;
      const prefix = getPrefixCls('result', prefixCls);
      const clazzName = classNames(prefix, className);
      return (
        <div className={clazzName} style={{ ...style }}>
          { icon ? <div className={`${prefix}-icon`}>{icon}</div> : this.renderIcon(prefix, { status })}
          {title && <div className={`${prefix}-title`}>{title}</div>}
          {subTitle && <div className={`${prefix}-subTitle`}>{subTitle}</div>}
          {
            extra && <div className={`${prefix}-extra`}>{extra}</div>
          }
        </div>
      );
    };

    render() {
      return (
        <ConfigConsumer>
          {this.renderResult}
        </ConfigConsumer>
      );
    }
}

export default Result;
