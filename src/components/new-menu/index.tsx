import React, { Component } from 'react';
import HorizontalMenu from './horizontal';
import VerticalMenu from './vertical';
import Item from './vertical/item';
import SubMenu from './vertical/sub-menu';
import { ConfigConsumerProps, ConfigConsumer } from '../config-provider/context';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'vertical' | 'horizontal' | 'inline';
  className?: string;
  mode?: 'inline' | 'tile';
  openKeys?: string[];
}

class NewMenu extends Component<MenuProps> {
  public static Item = Item;

  public static SubMenu = SubMenu;

  renderMenu = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { type = 'vertical', className, children } = this.props;
    const prefix = getPrefixCls('new-menu', className);
    return (
      <>
        {type === 'horizontal' ? <HorizontalMenu {...this.props} prefix={prefix}>{children}</HorizontalMenu> : <VerticalMenu {...this.props} prefix={prefix}>{children}</VerticalMenu>}
      </>
    );
  }

  render() {
    return (
      <ConfigConsumer>{this.renderMenu}</ConfigConsumer>
    );
  }
}

export default NewMenu;
