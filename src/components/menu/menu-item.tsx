/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ReactNode } from 'react';
import { Icon } from '..';
import { BasePropsV2 } from '../common/base-component';
import { MenuBase } from './component';

export type ItemProps = BasePropsV2<{
  /** 菜单图标 */
  icon: ReactNode;
  /** item 的唯一标志 */
  key: string;

  _key: string;
  _level: number;
  _keyPath: string[];
  _inItemGroup: boolean;
} & React.HTMLAttributes<HTMLDivElement>>;

export const MENU_TAG_ITEM = 'MENU_TAG_ITEM';

export class Item extends MenuBase<ItemProps> {
  public static tag = MENU_TAG_ITEM;

  protected getView = () => {
    const {
      children, icon, _level, _key, _keyPath, _inItemGroup, style, className, ...others
    } = this.props;
    const {
      theme, handleLevelLeft, selectedKeys, menuPopups = [],
    } = this.menuCtx;
    const inlineCollapsedIcon = this.inlineCollapsedIcon();

    return (
      <div
        {...others}
        style={{
          ...style,
          paddingLeft: handleLevelLeft!(_level!)
            + ((_inItemGroup && menuPopups.length > 0 && _level! > 0) ? 16 : 0),
        }}
        onClick={this.handleItemOnClick}
        onMouseEnter={this.itemOnMouseEnter}
        className={this.classNames(
          className,
          this.gpc('item'),
          this.gpc(`${theme}`),
          {
            [this.gpc('item-selected')]: selectedKeys?.includes(_key!),
          },
        )}
      >
        {inlineCollapsedIcon || (
          <>
            {icon && (
              <div className={this.gpc('left-icon')}>
                {React.isValidElement(icon) ? icon : (
                  <Icon type={icon as string} />
                )}
              </div>
            )}
            <div
              className={this.gpc('title')}
              style={{
                paddingLeft: icon ? 16 : 0,
              }}
            >
              {children}
            </div>
          </>
        )}
      </div>
    );
  }

  private inlineCollapsedIcon = () => {
    const { icon, children = '' } = this.props;
    const { mode, inlineCollapsed } = this.menuCtx;
    const { _level } = this.props;

    if (mode === 'horizontal') return null;
    if (!inlineCollapsed) return null;
    if (_level !== 0) return null;
    if (typeof children !== 'string') return null;

    const view = () => {
      if (icon) {
        if (React.isValidElement(icon)) return icon;
        return <Icon type={icon as string} />;
      }

      return children.slice(0, 1);
    };

    return (
      <div className={this.gpc('fold-icon')}>
        {view()}
      </div>
    );
  };

  private handleItemOnClick = () => {
    const { _key, _keyPath } = this.props;
    const { handleItemOnClick, menuPopups = [], closeMenuPopup } = this.menuCtx;
    handleItemOnClick!(_key!, _keyPath!, this.props);
    if (menuPopups.length > 0) closeMenuPopup!();
  };

  private itemOnMouseEnter = () => {
    const { _level, _key } = this.props;
    const {
      mode, triggerSubMenuAction, inlineCollapsed, openMenuPopup,
    } = this.menuCtx;
    if (triggerSubMenuAction === 'click') return;
    if (mode === 'inline' && !inlineCollapsed) return;
    openMenuPopup!(_level!, _key!);
  };
}
