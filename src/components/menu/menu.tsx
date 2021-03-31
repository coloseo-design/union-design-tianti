/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { CSSProperties, ReactElement, ReactNode } from 'react';

import { Icon } from '..';
import { BasePropsV2, BaseStateV2 } from '../common/base-component';
import { MenuBase } from './component';
import { Item, MENU_TAG_ITEM } from './menu-item';
import { ItemGroup } from './menu-item-group';
import { MenuPopup } from './menu-popup';
import { MENU_TAG_SUB_MENU, SubMenu } from './menu-sub-menu';

export const MENU_TAG_MENU = 'MENU_TAG_MENU';

export type MenuMode = 'vertical' | 'horizontal' | 'inline';

export type MenuTheme = 'light' | 'dark';

export type MenuTriggerSubMenuAction = 'hover' | 'click';

export type MenuProps = BasePropsV2<{
  /** 菜单类型，现在支持垂直、水平、和内嵌模式三种 */
  mode: MenuMode;
  /** 主题颜色 */
  theme: MenuTheme;
  /** 根节点样式 */
  style: CSSProperties;
  /** 根节点样式class */
  className: string;
  /** 当前选中的菜单项 key 数组 */
  selectedKeys: string[];
  /** 初始选中的菜单项 key 数组 */
  defaultSelectedKeys: string[];
  /** 初始展开的 SubMenu 菜单项 key 数组 */
  defaultOpenKeys: string[];
  /** 当前展开的 SubMenu 菜单项 key 数组 */
  openKeys: string[];
  /** SubMenu 展开/关闭的触发行为 */
  triggerSubMenuAction: MenuTriggerSubMenuAction;
  /** 是否允许多选 */
  multiple: boolean;
  /** inline 模式的菜单缩进宽度 */
  inlineIndent: number;
  /** inline 时菜单是否收起状态 */
  inlineCollapsed: boolean;
  /** inline 时是否展示收起菜单图标 */
  inlineCollapsedIcon: boolean;
  /** 点击 Menu.Item 调用此函数 */
  onClick: (key: string, keyPath: string[]) => void;
  /** 被选中时调用 */
  onSelect: (key: string, keyPath: string[]) => void;
  /** 取消选中时调用，仅在 multiple 生效 */
  onDeselect: (key: string, keyPath: string[]) => void;

  popupClassName: string;
  inlineCollapsedMinWidth: number;
  inlineCollapsedMaxWidth: number;

  onCollapsed: (collapsed: boolean) => void;
}>;

export type MenuState = BaseStateV2<{
  inlineCollapsed: boolean;
  openKeys: string[];
  selectedKeys: string[];
  selectedKeyPaths: { [key: string]: string[] };
  menuPopups: [key: string, view: ReactNode][];
  inlineCollapsedMaxHeight: number;
  handleLevelLeft: (level: number) => number;
  handleSubMenuOnClick: (key: string) => void;
  handleItemOnClick: (key: string, keyPath: string[]) => void;
  openMenuPopup: (level: number, key: string, dom?: HTMLDivElement, children?: ReactNode) => void;
  closeMenuPopup: () => void;
}>;

export default class Menu extends MenuBase<MenuProps, MenuState> {
  public static tag = MENU_TAG_MENU;

  public static Item = Item;

  public static SubMenu = SubMenu;

  public static ItemGroup = ItemGroup;

  public static defaultProps: MenuProps = {
    mode: 'vertical',
    theme: 'light',
    style: {},
    className: '',
    inlineIndent: 30,
    inlineCollapsed: false,
    inlineCollapsedIcon: false,
    multiple: false,
    triggerSubMenuAction: 'hover',
    onClick: () => null,
    onSelect: () => null,
    onDeselect: () => null,
  };

  public constructor(props: MenuProps) {
    super(props);
    this.initState();
  }

  public componentDidUpdate = (preProps: MenuProps) => {
    if (preProps.selectedKeys !== this.props.selectedKeys) {
      this.setState({ selectedKeys: this.props.selectedKeys ?? [] });
    }

    if (preProps.openKeys !== this.props.openKeys) {
      this.setState({ openKeys: this.props.openKeys ?? [] });
    }

    if (preProps.inlineCollapsed !== this.props.inlineCollapsed) {
      this.setState({ inlineCollapsed: this.props.inlineCollapsed ?? false });
    }
  };

  public componentDidMount = () => {
    document.body.addEventListener('mouseover', this.bodyOnMouseOver);
    document.body.addEventListener('click', this.bodyOnClick);
  };

  public componentWillUnmount = () => {
    document.body.removeEventListener('mouseover', this.bodyOnMouseOver);
    document.body.addEventListener('click', this.bodyOnClick);
  };

  private bodyOnClick = (e: MouseEvent) => {
    const { triggerSubMenuAction } = this.props;
    const { menuPopups = [] } = this.state;

    if (triggerSubMenuAction !== 'click') return;
    if (menuPopups.length === 0) return;

    this.mouseEventCloseMenuPopup(e);
  };

  private bodyOnMouseOver = (e: MouseEvent) => {
    const { triggerSubMenuAction } = this.props;
    const { menuPopups = [] } = this.state;

    if (triggerSubMenuAction !== 'hover') return;
    if (menuPopups.length === 0) return;

    this.mouseEventCloseMenuPopup(e);
  };

  private mouseEventCloseMenuPopup = (e: MouseEvent) => {
    if ((e.target as HTMLElement).getAttribute('data-menu-tag') === 'menu') {
      this.closeMenuPopup();
      return;
    }

    const checkTag = (el: HTMLElement): boolean => {
      let result = false;
      const tag = el.getAttribute('data-menu-tag');
      if (tag === 'menu-popup' || tag === 'menu') {
        return true;
      }
      if (el.parentElement) result = checkTag(el.parentElement);
      return result;
    };

    if (!checkTag(e.target as HTMLElement)) {
      this.closeMenuPopup();
    }
  };

  private initState = () => {
    const { defaultSelectedKeys, defaultOpenKeys, inlineCollapsed } = this.props;
    this.state = {
      inlineCollapsedMaxHeight: 360,
      inlineCollapsed: inlineCollapsed ?? false,
      selectedKeys: defaultSelectedKeys ?? [],
      selectedKeyPaths: {},
      openKeys: defaultOpenKeys ?? [],
      menuPopups: [],
      handleLevelLeft: this.handleLevelLeft,
      handleSubMenuOnClick: this.handleSubMenuOnClick,
      handleItemOnClick: this.handleItemOnClick,
      openMenuPopup: this.openMenuPopup,
      closeMenuPopup: this.closeMenuPopup,
    };
  };

  protected getContextValue = () => ({ ...this.props, ...this.state });

  protected getView = () => {
    const {
      mode, className, style, theme,
      inlineCollapsedMinWidth = 62,
      inlineCollapsedMaxWidth = 206,
    } = this.props;

    let { inlineCollapsedIcon } = this.props;
    const { inlineCollapsed, menuPopups } = this.state;

    inlineCollapsedIcon = mode !== 'horizontal' && inlineCollapsedIcon;

    const newStyle = {
      ...style,
      width: (() => {
        if (mode === 'horizontal') return 'auto';
        return inlineCollapsed ? inlineCollapsedMinWidth : inlineCollapsedMaxWidth;
      })(),
    };

    return (
      <div style={newStyle} className={this.classNames(className, this.getPrefixClass('container'))}>
        {inlineCollapsedIcon && (
          <div
            onClick={this.inlineCollapsedIconOnClick}
            className={this.classNames(
              'inline-collapsed-icon',
              `${theme}`,
            )}
          >
            <Icon type={inlineCollapsed ? 'right' : 'left'} />
          </div>
        )}
        <div data-menu-tag="menu" className={this.classNames('children', `${mode}`, `${theme}`)}>
          {this.handleChildren()}
        </div>
        {menuPopups!.map((item) => item[1])}
      </div>
    );
  };

  private inlineCollapsedIconOnClick = () => {
    const { inlineCollapsed } = this.state;
    this.setState({ inlineCollapsed: !inlineCollapsed });
    this.props.onCollapsed?.(!inlineCollapsed!);
  }

  private handleChildren = () => {
    const { children } = this.props;
    const tags = [MENU_TAG_SUB_MENU, MENU_TAG_ITEM];

    let index = 0;
    return React.Children.map(children, (child) => {
      const type = ((child as ReactElement)?.type as unknown as { [key: string]: unknown }) ?? {};
      const tag = type.tag as string;

      if (React.isValidElement(child) && tags.includes(tag)) {
        const key = (child as ReactElement)?.key ?? `${index}`;

        const re = React.cloneElement(child, {
          _key: key,
          _level: 0,
          _keyPath: [key],
        });

        index += 1;
        return re;
      }

      return null;
    });
  };

  private openMenuPopup = (
    level: number,
    key: string,
    dom?: HTMLDivElement,
    children?: ReactNode,
  ) => {
    const { menuPopups } = this.state;
    const { mode, popupClassName } = this.props;
    const newKey = `${level}-${key}`;

    if (!dom) {
      const newMenuPopups = [...menuPopups!].slice(0, level);
      this.setState({ menuPopups: newMenuPopups });
      return;
    }

    const newMenuPopups = [...menuPopups!].slice(0, level + 1);

    const {
      top, right, bottom, left,
    } = dom.getBoundingClientRect();

    if (mode === 'horizontal' && level === 0) {
      newMenuPopups[level] = [newKey,
        <MenuPopup
          className={popupClassName}
          data={[]}
          key={newKey}
          top={bottom}
          left={left}
        >
          {children}
        </MenuPopup>];
    } else {
      newMenuPopups[level] = [newKey,
        <MenuPopup
          className={popupClassName}
          data={[]}
          key={newKey}
          top={top}
          left={right}
        >
          {children}
        </MenuPopup>];
    }

    this.setState({ menuPopups: newMenuPopups });
  };

  private closeMenuPopup = () => {
    this.setState({ menuPopups: [] });
  };

  private handleLevelLeft = (level: number) => {
    const { inlineIndent, mode } = this.props;
    const { menuPopups = [] } = this.state;

    if (mode === 'horizontal' && level === 0) {
      return 40;
    }

    if (menuPopups.length > 0) {
      return 12;
    }

    let result = level * inlineIndent! + 12;

    if (level > 1) result -= 16;

    return result;
  };

  private handleSubMenuOnClick = (key: string) => {
    const { openKeys } = this.state;

    if (openKeys!.includes(key)) {
      const newOpenKeys = [...openKeys!];
      const index = newOpenKeys.indexOf(key);
      newOpenKeys.splice(index, 1);
      this.setState({ openKeys: newOpenKeys });
    } else {
      this.setState({ openKeys: [...openKeys!, key] });
    }
  }

  private handleItemOnClick = (key: string, keyPath: string[]) => {
    const {
      onClick, onSelect, onDeselect, multiple,
    } = this.props;
    const { selectedKeys = [], selectedKeyPaths = {} } = this.state;

    if (multiple) {
      const newSelectedKeys = [...selectedKeys];
      const newSelectedKeyPaths: { [key: string]: string[] } = { ...selectedKeyPaths };
      if (newSelectedKeys.includes(key)) {
        const index = newSelectedKeys.indexOf(key);
        newSelectedKeys.splice(index, 1);
        delete newSelectedKeyPaths[key];
        onDeselect!(key, keyPath);
      } else {
        newSelectedKeys.push(key);
        newSelectedKeyPaths[key] = keyPath;
        onSelect!(key, keyPath);
      }
      this.setState({ selectedKeys: newSelectedKeys, selectedKeyPaths: newSelectedKeyPaths });
    } else {
      const newSelectedKeys = [];
      const newSelectedKeyPaths: { [key: string]: string[] } = {};
      newSelectedKeys.push(key);
      newSelectedKeyPaths[key] = keyPath;
      this.setState({ selectedKeys: newSelectedKeys, selectedKeyPaths: newSelectedKeyPaths });
      onSelect!(key, keyPath);
    }

    onClick!(key, keyPath);
  };
}
