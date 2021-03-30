import React from 'react';
import { createPortal } from 'react-dom';
import { BasePropsV2 } from '../common/base-component';
import { MenuBase } from './component';

export type MenuPopupData = {
    key: string;
    keyPath: string[];
};

export type MenuPopupProps = BasePropsV2<{
    top: number;
    left: number;
    right: number;
    bottom: number;
    data: MenuPopupData | MenuPopupData[]
}>;

export class MenuPopup extends MenuBase<MenuPopupProps> {
    private menuPopupNode: HTMLDivElement;

    public constructor(props: MenuPopupProps) {
      super(props);
      this.menuPopupNode = document.createElement('div');
      this.menuPopupNode.setAttribute('data-menu-tag', 'menu-popup');
    }

    public componentDidMount() {
      document.body.appendChild(this.menuPopupNode);
    }

    public componentWillUnmount() {
      if (document.body.contains(this.menuPopupNode)) {
        document.body.removeChild(this.menuPopupNode);
      }
    }

    protected getView = () => {
      const {
        top, left, right, bottom, data, children,
      } = this.props;
      const { theme } = this.menuCtx;

      if (Array.isArray(data)) {
        return createPortal(
          <div
            style={{
              position: 'fixed',
              ...top && { top },
              ...left && { left },
              ...right && { right },
              ...bottom && { bottom },
            }}
            className={this.classNames(
              this.getPrefixClass('container'),
              this.getPrefixClass('popup'),
            )}
          >
            <div className={this.classNames('children', 'vertical', `${theme}`)}>
              {children}
            </div>
          </div>,
          this.menuPopupNode,
        );
      }

      return <div />;
    };
}
