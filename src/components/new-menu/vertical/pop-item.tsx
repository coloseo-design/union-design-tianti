/* eslint-disable max-len */
import React, { Component, isValidElement } from 'react';
import { ConfigConsumerProps, ConfigConsumer } from '../../config-provider/context';

export interface PopItemProps {
  menuRef: any;
  allMenu: any;
  openKeys: string[];
}

type PopItemState = {
  contents: any[];
  parentInfo?: any;
}

class PopItem extends Component<PopItemProps, PopItemState> {
  constructor(props: PopItemProps) {
    super(props);
    this.state = {
      contents: [],
      parentInfo: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps: PopItemProps) {
    const { openKeys, allMenu } = this.props;
    if (prevProps.openKeys !== openKeys) {
      this.getData();
      // const propsData: any[] = (allMenu || []).map((item: any) => item.props);
      // const currentData = propsData.find((i: any) => openKeys.includes(i.itemKey));
      // this.setState({ parentInfo: currentData || {} });
      // if (currentData) {
      //   const list: any[] = [];
      //   this.findChildren(currentData.children, list);
      //   this.setState({ contents: list });
      // }
    }
    if (prevProps.allMenu !== allMenu) {
      this.getData();
    }
  }

  getData = () => {
    const { allMenu, openKeys } = this.props;
    const propsData: any[] = (allMenu || []).map((item: any) => item.props);
    const currentData = propsData.find((i: any) => openKeys.includes(i.itemKey));
    this.setState({ parentInfo: currentData || {} });
    if (currentData) {
      const list: any[] = [];
      this.findChildren(Array.isArray(currentData.children) ? currentData.children : [currentData.children], list);
      this.setState({ contents: list });
    }
  }

  findChildren = (data: any[] = [], list: any[] = [], level = 1) => {
    data.forEach((item: any) => {
      list.push({
        itemKey: item.key,
        title: item.props.children || item.props.title,
        level: level + 1,
      });
      if (item.children && (isValidElement(item.children) || Array.isArray(item.children))) {
        this.findChildren(item.children, list, level + 1);
      }
    });
  }

  getHeight = () => {
    console.log('=111');
  }

  renderPop = ({ getPrefixCls }: ConfigConsumerProps) => {
    const prefix = getPrefixCls('new-menu-pop');
    const { contents, parentInfo } = this.state;
    console.log('=???', contents);
    return (
      <div className={prefix}>pop</div>
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
