import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';

export type BaseProps = {
  prefixCls?: string;
};

export type BaseState = {
  timestamp?: number;
};

export type BasePropsV2<T> = BaseProps & Partial<T>;

export type BaseStateV2<T> = BaseState & Partial<T>;

export abstract class BaseComponent<
  P extends BaseProps = BaseProps,
  S extends BaseState = BaseState,
  > extends PureComponent<P, S> {
  protected config!: ConfigConsumerProps;

  protected view = (): JSX.Element => <div />;

  public render = () => (
    <ConfigConsumer>
      {this.init}
    </ConfigConsumer>
  )

  protected updateView = (after?: () => void) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ timestamp: new Date().getTime() }, after);
  };

  protected getClass = (prefix: string, classes: { [key: string]: boolean } = {}) => {
    const { prefixCls } = this.props;
    const { getPrefixCls } = this.config;

    const newPrefix = getPrefixCls?.(`${this.classPrefix}-${prefix}`, prefixCls);
    const newClasses = Object.keys(classes).reduce((a, b) => {
      const temp = { ...a };
      temp[`${newPrefix}-${b}`] = classes[b];
      return temp;
    }, {} as { [key: string]: boolean });

    return classNames(newPrefix, newClasses);
  };

  protected getPrefixClass = (prefix: string) => {
    const { prefixCls } = this.props;
    const { getPrefixCls } = this.config;

    return getPrefixCls?.(`${this.classPrefix}-${prefix}`, prefixCls);
  };

  protected gpc = (prefix?: string) => {
    const { prefixCls } = this.props;
    const { getPrefixCls } = this.config;

    if (prefix) return getPrefixCls?.(`${this.classPrefix}-${prefix}`, prefixCls);

    return getPrefixCls?.(`${this.classPrefix}`, prefixCls);
  };

  protected classNames = (...args: Parameters<typeof classNames>) => classNames(...args);

  private init = (config: ConfigConsumerProps) => {
    this.config = config;

    return this.view();
  };

  protected abstract classPrefix: string;
}
