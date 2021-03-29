/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import DropMenuItem from './menu-item';
import DropSubMenu from './submenu';
import { flatChildren } from './utils';
import { translateDataToTree } from '../tree/utils';

export interface DropMenuProps {
  prefixCls?: string;
}

export interface DropMenuState {
  childrenList: any;
  expandkeys: string[];
}

class DropMenu extends React.Component<DropMenuProps, DropMenuState> {
  static Item: typeof DropMenuItem;

  static isMenu: boolean;

  static SubMenu: typeof DropSubMenu;

  constructor(props: DropMenuProps) {
    super(props);
    this.state = {
      childrenList: [],
      expandkeys: [],
    };
  }

  componentDidMount() {
    const { children } = this.props;
    const flatData = flatChildren(children);
    const treedata = translateDataToTree(flatData);
    this.setState({ childrenList: treedata });
  }

  handleExpand = (key: string) => {
    const { expandkeys } = this.state;
    let list = [...expandkeys];
    if (expandkeys.indexOf(key) >= 0) {
      list = expandkeys.filter((i: string) => i !== key);
    } else {
      list.push(key);
    }
    this.setState({ expandkeys: list });
  };

  renderSubMenu = (data: any) => {
    const { expandkeys } = this.state;
    return (
      (data || []).map((item: any) => (
        <div key={item.currentkey}>
          <DropSubMenu
            {...item}
            handleExpand={this.handleExpand}
            currentItem={item.children}
            expandkeys={expandkeys}
          >
            {
                expandkeys.indexOf(`${item.currentKey}`) >= 0
                && item.children && item.children.length > 0 && this.renderSubMenu(item.children)
              }
          </DropSubMenu>
        </div>
      ))
    );
  }

  renderDropMenu = ({ getPrefixCls } : ConfigConsumerProps) => {
    const {
      prefixCls,
    } = this.props;
    const { childrenList } = this.state;
    const dropMenuStyle = getPrefixCls('drop-down-menu', prefixCls);

    return (
      <div className={dropMenuStyle}>
        {this.renderSubMenu(childrenList)}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderDropMenu}
      </ConfigConsumer>
    );
  }
}

DropMenu.Item = DropMenuItem;
DropMenu.SubMenu = DropSubMenu;
DropMenu.SubMenu.menuType = 'subMenu';
DropMenu.Item.menuType = 'item';

export default DropMenu;
