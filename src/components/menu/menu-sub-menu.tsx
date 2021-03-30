/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { createRef, ReactElement, ReactNode } from 'react';

import { Icon } from '..';
import { BasePropsV2 } from '../common/base-component';
import { MenuBase } from './component';
import { MENU_TAG_ITEM } from './menu-item';
import { MENU_TAG_ITEM_GROUP } from './menu-item-group';

export const MENU_TAG_SUB_MENU = 'MENU_TAG_SUB_MENU';

export type SubMenuProps = BasePropsV2<{
    icon: ReactNode;
    key: string;
    title: string;
    onTitleClick: (key: string) => void;

    _key: string;
    _level: number;
    _keyPath: string[];
    _inItemGroup: boolean;
}>;

export class SubMenu extends MenuBase<SubMenuProps> {
    public static tag = MENU_TAG_SUB_MENU;

    public static defaultProps: SubMenuProps = {
      onTitleClick: () => null,
    };

    private subMenuRef = createRef<HTMLDivElement>();

    private children!: ReactNode;

    protected getView = () => {
      const {
        title, icon, _level, _keyPath, _inItemGroup,
      } = this.props;
      const {
        inlineCollapsed, theme, mode, selectedKeyPaths, handleLevelLeft, menuPopups = [],
      } = this.menuCtx;
      const selected = Object.values(selectedKeyPaths!).some((item) => item.join('-').startsWith(_keyPath!.join('-')));
      const inlineCollapsedIcon = this.inlineCollapsedIcon();

      return (
        <>
          <div
            ref={this.subMenuRef}
            style={{
              paddingLeft: handleLevelLeft!(_level!)
                + ((_inItemGroup && menuPopups.length > 0 && _level! > 0) ? 16 : 0),
            }}
            onClick={this.subMenuTitleOnClick}
            onMouseEnter={this.subMenuTitleOnMouseEnter}
            className={this.classNames('sub-menu', `${theme}`, {
              'sub-menu-selected': selected && !inlineCollapsed,
              'item-selected': selected && inlineCollapsed,
            })}
          >
            {inlineCollapsedIcon || (
              <>
                {icon && (
                <div className="left-icon">
                  {React.isValidElement(icon) ? icon : (
                    <Icon type={icon as string} />
                  )}
                </div>
                )}
                {(mode !== 'horizontal' || (mode === 'horizontal' && _level !== 0)) && (
                <div className="right-icon">
                  <Icon type={this.handleRightIcon()} />
                </div>
                )}
                <div
                  className="title"
                  style={{
                    paddingLeft: icon ? 16 : 0,
                    paddingRight: (mode === 'horizontal' && _level === 0) ? 0 : 16,
                  }}
                >
                  {title}
                </div>
              </>
            )}
          </div>
          <div
            className="children-container"
            style={this.childrenContainerStyle()}
          >
            {this.handleChildren()}
          </div>
        </>
      );
    };

    private handleRightIcon = () => {
      const { _key } = this.props;
      const { mode, menuPopups = [], openKeys } = this.menuCtx;
      if (menuPopups.length > 0) return 'right';
      if (mode === 'vertical') return 'right';
      if (mode === 'inline') return openKeys?.includes(_key!) ? 'down' : 'right';
      return 'right';
    };

    private handleChildren = () => {
      const {
        children, _level, _keyPath, _key,
      } = this.props;
      const tags = [MENU_TAG_SUB_MENU, MENU_TAG_ITEM, MENU_TAG_ITEM_GROUP];

      let index = 0;
      this.children = React.Children.map(children, (child) => {
        const type = ((child as ReactElement)?.type as unknown as { [key: string]: unknown }) ?? {};
        const tag = type.tag as string;

        if (React.isValidElement(child) && tags.includes(tag)) {
          const key = child?.key ?? `${_key}-${index}`;

          const re = React.cloneElement(child, {
            _level: _level! + 1,
            _key: tag === MENU_TAG_ITEM_GROUP ? _key : key,
            _keyPath: tag === MENU_TAG_ITEM_GROUP ? _keyPath : [..._keyPath!, key],
          });

          index += 1;
          return re;
        }

        return null;
      });

      return this.children;
    };

    private childrenContainerStyle = () => {
      const { _level, _key } = this.props;
      const {
        mode, inlineCollapsed, inlineCollapsedMaxHeight, openKeys,
      } = this.menuCtx;

      if (_level === 0 && mode === 'horizontal') {
        return { width: 0, height: 0, overflow: 'hidden' };
      }

      let maxHeight;
      let overflow = 'hidden';
      if (mode === 'vertical' || mode === 'horizontal') maxHeight = 0;
      else if (inlineCollapsed) maxHeight = 0;
      else if (openKeys?.includes(_key!)) {
        maxHeight = inlineCollapsedMaxHeight;
        overflow = 'auto';
      } else maxHeight = 0;

      return { maxHeight, overflow };
    };

    private inlineCollapsedIcon = () => {
      const { icon, title = '' } = this.props;
      const { mode, inlineCollapsed } = this.menuCtx;
      const { _level } = this.props;

      if (mode === 'horizontal') return null;
      if (!inlineCollapsed) return null;
      if (_level !== 0) return null;

      const children = () => {
        if (icon) {
          if (React.isValidElement(icon)) return icon;
          return <Icon type={icon as string} />;
        }

        return title.slice(0, 1);
      };

      return (
        <div className={this.classNames('inline-collapsed-menu-icon')}>
          {children()}
        </div>
      );
    };

    private subMenuTitleOnClick = () => {
      const { _level, onTitleClick, _key } = this.props;
      const {
        handleSubMenuOnClick, mode, triggerSubMenuAction, openMenuPopup, inlineCollapsed,
      } = this.menuCtx;

      if (mode === 'inline') handleSubMenuOnClick!(_key!);

        onTitleClick!(_key!);

        if (triggerSubMenuAction === 'click') {
          if (!this.subMenuRef.current) return;
          if (mode === 'horizontal' || mode === 'vertical' || inlineCollapsed) {
                openMenuPopup!(_level!, _key!, this.subMenuRef.current, this.children);
          }
        }
    };

    private subMenuTitleOnMouseEnter = () => {
      const { _level, _key } = this.props;
      const {
        mode, triggerSubMenuAction, inlineCollapsed, openMenuPopup,
      } = this.menuCtx;
      if (triggerSubMenuAction === 'click') return;
      if (mode === 'inline' && !inlineCollapsed) return;
      if (!this.subMenuRef.current) return;
        openMenuPopup!(_level!, _key!, this.subMenuRef.current, this.children);
    };
}
