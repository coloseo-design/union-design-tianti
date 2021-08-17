import classNames from 'classnames';
import React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface TabPaneBase extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  tab: React.ReactNode;
  key: string;
  closable?: boolean;
}

export default class Pane extends React.Component<TabPaneBase> {
  renderPane = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { children, className, ...rest } = this.props;
    let { prefixCls } = this.props;
    prefixCls = getPrefixCls('tabpane', prefixCls);
    const paneClassName = classNames(prefixCls, className);
    return (
      <div {...rest} className={paneClassName}>
        {children}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {
          (contextProps: ConfigConsumerProps) => this.renderPane(contextProps)
        }
      </ConfigConsumer>
    );
  }
}
