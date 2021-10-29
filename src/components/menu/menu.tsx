/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  CSSProperties,
  ReactElement,
  ReactNode,
  createRef,
} from 'react';

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
  /** inline 时菜单收起宽度 */
  inlineCollapsedWidth: number;
  /** inline 时是否展示收起菜单图标 */
  inlineCollapsedIcon: boolean;
  /** subMenu 最大高度 */
  subMenuMaxHeight: number;
  /** popupMenu 最大高度 */
  popupMenuMaxHeight: number;
  /** 点击 Menu.Item 调用此函数 */
  onClick: (key: string, keyPath: string[], item: unknown) => void;
  /** 被选中时调用 */
  onSelect: (key: string, keyPath: string[]) => void;
  /** 取消选中时调用，仅在 multiple 生效 */
  onDeselect: (key: string, keyPath: string[]) => void;

  popupClassName: string;
  onCollapsed: (collapsed: boolean) => void;
}>;

export type MenuState = BaseStateV2<{
  inlineCollapsed: boolean;
  openKeys: string[];
  selectedKeys: string[];
  selectedKeyPaths: { [key: string]: string[] };
  menuPopups: [key: string, view: ReactNode][];
  handleLevelLeft: (level: number) => number;
  handleSubMenuOnClick: (key: string) => void;
  handleItemOnClick: (key: string, keyPath: string[], ext: unknown) => void;
  openMenuPopup: (level: number, key: string, keyPath?: string[], dom?: HTMLDivElement, children?: ReactNode) => void;
  closeMenuPopup: () => void;
  updateHoverKeyPaths: (hoverKeyPaths?: string[]) => void;
  hoverKeyPaths: string[];
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
    inlineCollapsedWidth: 62,
    onClick: () => null,
    onSelect: () => null,
    onDeselect: () => null,
  };

  private containerRef = createRef<HTMLDivElement>();

  public constructor(props: MenuProps) {
    super(props);
    this.initState();
    const newSelectedKeys = props.selectedKeys || props.defaultSelectedKeys || [];
    const newSelectedKeyPaths = { [newSelectedKeys[newSelectedKeys?.length - 1]]: newSelectedKeys };
    const newOpenKeys = props.openKeys || props.defaultOpenKeys || [];
    setTimeout(() => {
      this.setState({ selectedKeys: [...newSelectedKeys], selectedKeyPaths: newSelectedKeyPaths, openKeys: [...newOpenKeys] });
    });
  }

  public componentDidUpdate = (preProps: MenuProps) => {
    if (preProps.selectedKeys !== this.props.selectedKeys) {
      const newSelectedKeyPaths = { [this.props.selectedKeys[this.props.selectedKeys?.length - 1]]: this.props.selectedKeys };
      this.setState({ selectedKeys: this.props.selectedKeys ?? [], selectedKeyPaths: newSelectedKeyPaths });
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

      if (/body/ig.test(el.nodeName)) {
        return false;
      }

      const parentEl = el.parentElement ?? el.parentNode as unknown as HTMLElement;
      if (parentEl) result = checkTag(parentEl);

      return result;
    };

    if (!checkTag(e.target as HTMLElement)) {
      this.closeMenuPopup();
    }
  };

  private initState = () => {
    const {
      defaultSelectedKeys,
      defaultOpenKeys,
      inlineCollapsed,
    } = this.props;

    this.state = {
      hoverKeyPaths: [],
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
      updateHoverKeyPaths: this.updateHoverKeyPaths,
    };
  };

  private updateHoverKeyPaths = (hoverKeyPaths: string[] = []) => {
    this.setState({ hoverKeyPaths });
  };

  protected getContextValue = () => ({ ...this.props, ...this.state });

  protected getView = () => {
    const {
      mode, className, style, theme,
      inlineCollapsedWidth,
    } = this.props;

    let { inlineCollapsedIcon } = this.props;
    const { inlineCollapsed, menuPopups } = this.state;

    inlineCollapsedIcon = mode !== 'horizontal' && inlineCollapsedIcon;

    const { width = '100%', ...otherProps } = style ?? {};

    return (
      <>
        <div
          style={{
            width: inlineCollapsed ? inlineCollapsedWidth : width,
            ...otherProps,
          }}
          ref={this.containerRef}
          data-menu-tag="menu"
          className={this.classNames(
            className,
            this.gpc(),
            this.gpc(`${theme}`),
          )}
        >
          <div className={this.gpc(`${mode}`)}>
            {this.handleChildren()}
          </div>

          {inlineCollapsedIcon && (
            <div
              onClick={this.inlineCollapsedIconOnClick}
              className={this.classNames(
                this.gpc(`${theme}`),
              )}
            >
              <Icon type={inlineCollapsed ? 'right' : 'left'} />
            </div>
          )}
        </div>

        {menuPopups!.map((item) => item[1])}
      </>
    );
  };

  private inlineCollapsedIconOnClick = () => {
    const { inlineCollapsed } = this.state;
    this.setState({ inlineCollapsed: !inlineCollapsed, hoverKeyPaths: [] });
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
    keyPath?: string[],
    dom?: HTMLDivElement,
    children?: ReactNode,
  ) => {
    const { menuPopups } = this.state;
    const { popupClassName } = this.props;
    const newKey = `${level}-${key}`;

    this.setState({ hoverKeyPaths: keyPath });

    if (!dom) {
      const newMenuPopups = [...menuPopups!].slice(0, level);
      this.setState({ menuPopups: newMenuPopups });
      return;
    }

    const newMenuPopups = [...menuPopups!].slice(0, level + 1);

    const cRect = this.containerRef.current?.getBoundingClientRect() as DOMRect;
    const dRect = dom.getBoundingClientRect();

    newMenuPopups[level] = [newKey,
      <MenuPopup
        level={level}
        cRect={{
          top: cRect.top,
          left: cRect.left,
          right: cRect.right,
          width: this.containerRef.current?.offsetWidth as number,
          height: this.containerRef.current?.offsetHeight as number,
        } as DOMRect}
        dRect={dRect}
        className={popupClassName}
        data={[]}
        key={newKey}
      >
        {children}
      </MenuPopup>];

    this.setState({ menuPopups: newMenuPopups });
  };

  private closeMenuPopup = () => {
    this.setState({ menuPopups: [], hoverKeyPaths: [] });
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

  private handleItemOnClick = (key: string, keyPath: string[], ext: any) => {
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

    onClick!(key, keyPath, ext);
  };
}
