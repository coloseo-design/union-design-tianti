/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';
import Item from './item';

function calc(arr: unknown[], spans: number) {
  return arr.reduce((acc: any, value: any) => {
    const lastItem = acc[acc.length - 1];
    const isInsert = lastItem && (lastItem.reduce((
      sum: any,
      item: {
        props: { span: any; };
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

export interface DescriptionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否展示边框 */
  bordered?: boolean;
  /* 用户自定义类前缀，默认uni-input */
  prefixCls?: string;
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
    const {
      prefixCls, children, className, ...rest
    } = this.props;
    const { bordered } = this.state;

    let toArrayChildren: any = React.Children.toArray(children);
    if (toArrayChildren.length) {
      toArrayChildren = React.Children.map(
        children, (child) => React.cloneElement(child as any, { bordered }),
      );
    }

    const prefix = getPrefixCls('descriptions', prefixCls);
    const mainClass = classNames(prefix, className, {
      [`${prefix}-bordered`]: bordered,
    });

    const spans = bordered ? 2 : 3;
    const refactorChildren: any = calc(toArrayChildren, spans);
    let lastItemChildren: any = refactorChildren[refactorChildren.length - 1];

    if (lastItemChildren.length) {
      const spanNum = lastItemChildren.reduce((
        sum: any, item: { props: { span: unknown; }; },
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

    const omitRest = omit(rest, ['bordered']);
    return (
      <div {...omitRest} className={mainClass}>
        <table>
          <tbody>
            {(refactorChildren || []).map((item: any, index: number) => (
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
