/* eslint-disable max-len */
import React, { Component, isValidElement, Fragment } from 'react';
import classNames from 'classnames';
import { ConfigConsumerProps, ConfigConsumer } from '../../config-provider/context';

export interface PopItemProps {
  allMenu: any;
  openKeys: string[];
  menuWidth?: number;
}

type PopItemState = {
  contents: any[];
}

class PopItem extends Component<PopItemProps, PopItemState> {
  constructor(props: PopItemProps) {
    super(props);
    this.state = {
      contents: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps: PopItemProps) {
    const { openKeys, allMenu } = this.props;
    if (prevProps.openKeys !== openKeys) {
      this.getData();
    }
    if (prevProps.allMenu !== allMenu) {
      this.getData();
    }
  }

  getArray = (current: any) => {
    if (Array.isArray(current)) {
      return current;
    }
    return [current];
  }

  getData = () => {
    const { allMenu, openKeys } = this.props;
    const propsData: any[] = (allMenu || []).map((item: any) => item.props);
    const currentData: any = propsData.find((i: any) => openKeys.includes(i.itemKey));
    if (currentData) {
      const list: any[] = [];
      const tempData = this.getArray(currentData.children);
      const tem = tempData.map((i: any) => ({
        props: i.props,
        itemKey: i.key,
      }));
      this.findChildren(tem, list, 1, currentData.itemKey);
      this.setState({ contents: this.formatToTree(list, currentData.itemKey) });
    }
  }

  formatToTree = (arr: any[], pid: number) => arr
    .filter((item) => item.parentKey === pid)
    .map((item) => {
      // eslint-disable-next-line no-param-reassign
      item.children = this.formatToTree(arr, item.itemKey);
      return item;
    });

  findChildren = (data: any[] = [], list: any[] = [], level = 1, parentKey: string) => {
    data.forEach((item: any) => {
      list.push({
        itemKey: item?.itemKey || item?.key,
        title: item?.props.title || item?.props.children,
        level: level + 1,
        parentKey,
      });
      if (item?.props.children && (isValidElement(item?.props.children) || Array.isArray(item?.props.children))) {
        const t = this.getArray(item?.props.children);
        this.findChildren(t, list, level + 1, item?.itemKey || item?.key);
      }
    });
  }

  renderContent = (data: any[], prefix: string): any => data.map((item) => (
    <Fragment key={item.itemKey}>
      <div
        key={item.itemKey}
        className={classNames(
          `${prefix}-level`,
          `${prefix}-level-${item.level}`,
        )}
        style={{ paddingLeft: item.level >= 5 ? (item.level - 4) * 14 : 0 }}
      >
        <div
          className={classNames(`${prefix}-level-title`)}
        >
          {item.title}
        </div>
      </div>
      {item.children && item.children.length > 0 && (
        this.renderContent(item.children, prefix)
      )}
    </Fragment>
  ))

  renderPop = ({ getPrefixCls }: ConfigConsumerProps) => {
    const prefix = getPrefixCls('new-menu-pop');
    const { contents } = this.state;
    return (
      <div className={prefix}>
        {this.renderContent(contents, prefix)}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderPop}
      </ConfigConsumer>
    );
  }
}

export default PopItem;
