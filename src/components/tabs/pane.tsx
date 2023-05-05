import classNames from 'classnames';
import React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';

export interface TabPaneBase extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  tab: React.ReactNode;
  key: string;
  closable?: boolean;
  forceRender?: boolean;
  active?: boolean;
}

export default class Pane extends React.Component<TabPaneBase> {
  renderPane = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      children, className, active = false, forceRender = false,
    } = this.props;
    let { prefixCls } = this.props;
    prefixCls = getPrefixCls('tabpane', prefixCls);

    const paneClassName = classNames(prefixCls, className);
    return (
      <div className={paneClassName}>
        {(active || forceRender) ? children : null}
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
