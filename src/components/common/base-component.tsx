/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
/* eslint-disable react/sort-comp */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';

export type BaseProps = {
    prefixCls?: string;
};

export type BaseState = {
    timestamp?: number;
};

export abstract class BaseComponent<
    P extends BaseProps = BaseProps,
    S extends BaseState = BaseState,
    > extends PureComponent<P, S> {
    protected abstract classPrefix: string;

    protected config!: ConfigConsumerProps;

    protected view = (): JSX.Element => <div />;

    public render = () => (
      <ConfigConsumer>
        {this.init}
      </ConfigConsumer>
    )

    protected updateView = (after?: () => void) => this.setState({ timestamp: new Date().getTime() }, after);

    protected getClass = (prefix: string, classes: { [key: string]: boolean } = {}) => {
      const { prefixCls } = this.props;
      const { getPrefixCls } = this.config;

      const newPrefix = getPrefixCls(`${this.classPrefix}-${prefix}`, prefixCls);
      const newClasses = Object.keys(classes).reduce((a, b) => {
        a[`${newPrefix}-${b}`] = classes[b];
        return a;
      }, {} as any);

      return classNames(newPrefix, newClasses);
    };

    protected getPrefixClass = (prefix: string) => {
      const { prefixCls } = this.props;
      const { getPrefixCls } = this.config;

      return getPrefixCls(`${this.classPrefix}-${prefix}`, prefixCls);
    };

    protected classNames = (...args: any[]) => classNames(...args);

    private init = (config: ConfigConsumerProps) => {
      this.config = config;

      return this.view();
    };
}
