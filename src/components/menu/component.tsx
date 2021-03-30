import React, { createContext, ReactNode } from 'react';
import { BaseComponent } from '../common/base-component';
import { MenuProps, MenuState } from './menu';

export type MenuCtx = MenuProps & MenuState;

export const MenuContext = createContext<MenuCtx>({});

export abstract class MenuBase<
  P = Record<string, unknown>,
  S = Record<string, unknown>
  > extends BaseComponent<P, S> {
  protected classPrefix = 'menu';

  protected getContextValue?: () => MenuCtx;

  protected abstract getView: () => ReactNode;

  protected menuCtx!: MenuCtx;

  protected view = () => {
    const contextValue = this.getContextValue?.();
    if (contextValue) {
      return (
        <MenuContext.Provider value={contextValue}>
          {this.getView()}
        </MenuContext.Provider>
      );
    }

    return (
      <MenuContext.Consumer>
        {this.viewCtx}
      </MenuContext.Consumer>
    );
  };

  private viewCtx = (ctx: MenuCtx) => {
    this.menuCtx = ctx;
    return this.getView();
  };
}
