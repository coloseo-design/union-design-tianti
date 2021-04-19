import React, { createRef, CSSProperties } from 'react';
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
  data: MenuPopupData | MenuPopupData[];
  className: string;
}>;

export type MenuPopupState = BasePropsV2<{
  style?: CSSProperties;
}>;

export class MenuPopup extends MenuBase<MenuPopupProps, MenuPopupState> {
  private menuPopupNode: HTMLDivElement;

  private popupRef = createRef<HTMLDivElement>();

  public constructor(props: MenuPopupProps) {
    super(props);
    this.state = {};
    this.menuPopupNode = document.createElement('div');
    this.menuPopupNode.setAttribute('data-menu-tag', 'menu-popup');
  }

  public componentDidMount() {
    document.body.appendChild(this.menuPopupNode);
    const { offsetWidth, offsetHeight } = document.body;
    if (this.popupRef.current) {
      const { offsetWidth: popupWidth, offsetHeight: popupHeight } = this.popupRef.current;
      const { top, left } = this.popupRef.current.getBoundingClientRect();

      const newStyle = {} as CSSProperties;

      if (left + popupWidth > offsetWidth) {
        newStyle.left = offsetWidth - popupWidth;
      }

      if (top + popupHeight > offsetHeight) {
        newStyle.top = offsetHeight - popupHeight;
      }

      if (Object.values(newStyle).length > 0) {
        this.setState({ style: newStyle });
      }
    }
  }

  public componentWillUnmount() {
    if (document.body.contains(this.menuPopupNode)) {
      document.body.removeChild(this.menuPopupNode);
    }
  }

  protected getView = () => {
    const {
      top, left, right, bottom, data, children, className,
    } = this.props;
    const { style = {} } = this.state;
    const { theme, popupMenuMaxHeight } = this.menuCtx;

    const position = {
      position: 'fixed',
      ...top && { top },
      ...left && { left },
      ...right && { right },
      ...bottom && { bottom },
      ...style,
    } as CSSProperties;

    if (Array.isArray(data)) {
      return createPortal(
        <div
          ref={this.popupRef}
          style={{ ...position }}
          className={this.classNames(
            className,
            this.getPrefixClass('container'),
            this.getPrefixClass('popup'),
          )}
        >
          <div style={{ maxHeight: popupMenuMaxHeight ?? 360 }} className={this.classNames('children', 'vertical', `${theme}`)}>
            {children}
          </div>
        </div>,
        this.menuPopupNode,
      );
    }

    return <div />;
  };
}
