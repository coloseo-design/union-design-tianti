/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Item from './item';

function calc(arr: unknown[], spans: number) {
  return arr.reduce((acc, value) => {
    const lastItem = acc[acc.length - 1];
    const isInsert = lastItem && (lastItem.reduce((
      sum: unknown,
      item: {
        props: { span: unknown; };
      },
    ) => sum + (item?.props?.span || 1), value?.props?.span || 1) <= spans);
    // 待续
    if (isInsert) {
      lastItem.push(value);
    } else {
      acc.push([value]);
    }
    return acc;
  }, []);
}

export interface DescriptionsProps {
  /** 是否展示边框 */
  bordered?: boolean;
  /* 用户自定义类前缀，默认uni-input */
  prefixCls?: string;
  children?: unknown;
}

export interface DescriptionsState {
  /** 是否展示边框 */
  bordered?: boolean;
}

class Descriptions extends Component<DescriptionsProps, DescriptionsState> {
  static defaultProps: DescriptionsProps = {
    bordered: false,
  }

  static Item: typeof Item;

  static getDerivedStateFromProps(
    props: DescriptionsProps,
    state: { bordered: boolean | undefined;},
  ) {
    if (props.bordered !== state.bordered) {
      return {
        bordered: props.bordered,
      };
    }
    return null;
  }

  constructor(props: DescriptionsProps) {
    super(props);
    // 劫持bordered
    this.state = {
      bordered: props.bordered,
    };
  }

  renderDescriptions = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls, children } = this.props;
    const { bordered } = this.state;

    let toArrayChildren = React.Children.toArray(children);
    if (toArrayChildren.length) {
      toArrayChildren = React.Children.map(
        children, (child) => React.cloneElement(child, { bordered }),
      );
    }

    const prefix = getPrefixCls('descriptions', prefixCls);
    const mainClass = classNames(prefix, {
      [`${prefix}-bordered`]: bordered,
    });

    const spans = bordered ? 2 : 3;
    const refactorChildren = calc(toArrayChildren, spans);
    let lastItemChildren = refactorChildren[refactorChildren.length - 1];

    if (lastItemChildren.length) {
      const spanNum = lastItemChildren.reduce((
        sum: unknown, item: { props: { span: unknown; }; },
      ) => sum + (item?.props?.span || 1), 0);
      const colspan = bordered ? spans * 2 - spanNum : 3 - spanNum + 1;
      lastItemChildren = React.Children.map(
        lastItemChildren,
        (child, index) => (
          lastItemChildren.length - 1 === index
            ? React.cloneElement(child, { span: colspan, ...child })
            : child
        ),
      );
      refactorChildren.splice(refactorChildren.length - 1, 1, lastItemChildren);
    }

    return (
      <div className={mainClass}>
        <table>
          <tbody>
            {(refactorChildren || []).map((item: unknown, index: number) => (
              <tr key={`${index}`}>
                {(item || []).map((element: unknown) => (
                  element
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderDescriptions}
      </ConfigConsumer>
    );
  }
}

Descriptions.Item = Item;

export default Descriptions;
