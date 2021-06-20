/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ReactElement } from 'react';
import { BasePropsV2 } from '../common/base-component';
import { MenuBase } from './component';
import { MENU_TAG_ITEM } from './menu-item';
import { MENU_TAG_SUB_MENU } from './menu-sub-menu';

export const MENU_TAG_ITEM_GROUP = 'MENU_TAG_ITEM_GROUP';

export type ItemProps = BasePropsV2<{
  /** 分组标题 */
  title: string;

  _key: string;
  _level: number;
  _keyPath: string[];
}>;

export class ItemGroup extends MenuBase<ItemProps> {
  public static tag = MENU_TAG_ITEM_GROUP;

  protected getView = () => {
    const { title, _level } = this.props;
    const { handleLevelLeft, theme } = this.menuCtx;

    return (
      <>
        <div
          style={{ paddingLeft: handleLevelLeft!(_level!) }}
          className={this.classNames(
            this.gpc('item-group'),
            this.gpc(`${theme}`),
          )}
        >
          {title}
        </div>
        <div
          style={this.handleChildrenContainerStyle()}
          className={this.gpc('children-container')}
        >
          {this.handleChildren()}
        </div>
      </>
    );
  };

  private handleChildren = () => {
    const {
      children, _level, _keyPath, _key,
    } = this.props;
    const tags = [MENU_TAG_SUB_MENU, MENU_TAG_ITEM, MENU_TAG_ITEM_GROUP];

    let index = 0;
    return React.Children.map(children, (child) => {
      const type = ((child as ReactElement)?.type as unknown as { [key: string]: unknown }) ?? {};
      const tag = type.tag as string;

      if (React.isValidElement(child) && tags.includes(tag)) {
        const key = child?.key ?? `item-group-${_key}-${index}`;

        const re = React.cloneElement(child, {
          _level: _level! + 1,
          _inItemGroup: true,
          _key: tag === MENU_TAG_ITEM_GROUP ? _key : key,
          _keyPath: tag === MENU_TAG_ITEM_GROUP ? _keyPath : [..._keyPath!, key],
        });

        index += 1;
        return re;
      }

      return null;
    });
  };

  private handleChildrenContainerStyle = () => {
    const { inlineCollapsed, menuPopups = [] } = this.menuCtx;
    if (menuPopups.length > 0) return {};
    if (inlineCollapsed) return { height: 0 };
    return {};
  };
}
