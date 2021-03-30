import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Item from './item';

function arraysAreEqual(arr1: unknown[] = [], arr2: unknown[] = []) {
  return arr1.length === arr2.length && arr1.every((item, index) => item === arr2[index]);
}

export interface ListProps {
  /** 列表数据源 */
  dataSource?: unknown[];
  /** 当使用 dataSource 时，可以用 renderItem 自定义渲染列表项 */
  renderItem?: (item: unknown, index?: number) => React.ReactNode;
  /* 用户自定义类前缀，默认uni-list */
  prefixCls?: string;
}

export interface ListState {
  /** 列表数据源 */
  dataSource?: unknown[];
}

class List extends Component<ListProps, ListState> {
  static defaultProps: ListProps = {
    dataSource: [],
  };

  static Item: typeof Item;

  static getDerivedStateFromProps(props: ListProps, state: ListState) {
    if (arraysAreEqual(props.dataSource, state.dataSource)) {
      return {
        dataSource: props.dataSource,
      };
    }
    return null;
  }

  constructor(props: ListProps) {
    super(props);
    this.state = {
      dataSource: props.dataSource,
    };
  }

  renderList = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, children, renderItem, dataSource,
    } = this.props;

    let refactorChildren = children;
    if (renderItem) {
      refactorChildren = dataSource?.map((item, index) => renderItem(item, index));
    }

    const prefix = getPrefixCls('list', prefixCls);
    const mainClass = classNames(prefix, {
      // [`${prefix}-checked`]: checked,
    });

    return (
      <div className={mainClass}>
        <ul className={`${mainClass}-items`}>
          {refactorChildren}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderList}
      </ConfigConsumer>
    );
  }
}

List.Item = Item;

export default List;
