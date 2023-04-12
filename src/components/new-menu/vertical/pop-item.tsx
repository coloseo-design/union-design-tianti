/* eslint-disable max-len */
import React, { Component, isValidElement } from 'react';
import classNames from 'classnames';
import { ConfigConsumerProps, ConfigConsumer } from '../../config-provider/context';

export interface PopItemProps {
  menuRef: any;
  allMenu: any;
  openKeys: string[];
}

type PopItemState = {
  contents: any[];
  // parentInfo?: any;
}

class PopItem extends Component<PopItemProps, PopItemState> {
  constructor(props: PopItemProps) {
    super(props);
    this.state = {
      contents: [],
      // parentInfo: {},
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
    // this.setState({ parentInfo: currentData || {} });
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

  getWidth = () => {
    const { menuRef } = this.props;
    console.log('=111', menuRef);
  }

  renderContent = (data: any[], prefix: string) => data.map((item) => (
    <div
      key={item.itemKey}
      className={classNames(`${prefix}-level-${item.level}`)}
    >
      <div className={classNames(`${prefix}-level-${item.level}-title`)}>{item.title}</div>
      {item.children && item.children.length > 0 && (
        <div>
          {this.renderContent(item.children, prefix)}
        </div>
      )}
    </div>
  ))

  renderPop = ({ getPrefixCls }: ConfigConsumerProps) => {
    const prefix = getPrefixCls('new-menu-pop');
    const { contents } = this.state;
    console.log('=???', contents);
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
