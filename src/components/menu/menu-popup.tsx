/* eslint-disable no-shadow */
import React, { createRef, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { BasePropsV2 } from '../common/base-component';
import { MenuBase } from './component';

export type MenuPopupData = {
  key: string;
  keyPath: string[];
};

export type MenuPopupProps = BasePropsV2<{
  data: MenuPopupData | MenuPopupData[];
  className: string;
  cRect: DOMRect;
  dRect: DOMRect;
  level: number;
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

    if (this.popupRef.current) {
      const { cRect, dRect, level } = this.props;
      const { popupMenuMaxHeight, mode } = this.menuCtx;

      const newStyle = {} as CSSProperties;

      if (mode === 'horizontal' && level === 0) {
        newStyle.top = dRect?.bottom;
        newStyle.left = (dRect?.left ?? 0) - 8;
      } else {
        newStyle.top = dRect?.top;
        newStyle.left = dRect?.right;
      }

      this.setState({ style: { ...newStyle } }, () => {
        const { offsetHeight: popupHeight } = this.popupRef.current as HTMLDivElement;

        if (mode === 'horizontal') {
          newStyle.height = popupHeight + 6;
        } else if ((cRect?.height ?? 0) > popupHeight - 6) {
          newStyle.height = popupHeight + 6;
        } else {
          newStyle.height = cRect?.height;
        }

        if (popupMenuMaxHeight) {
          newStyle.maxHeight = popupMenuMaxHeight;
        } else if ((cRect?.height ?? 0) > (document.body.offsetHeight / 2)) {
          newStyle.maxHeight = '100%';
        } else {
          newStyle.maxHeight = '50vh';
        }

        this.setState({ style: { ...newStyle } }, () => {
          const {
            offsetWidth: popupWidth,
            offsetHeight: popupHeight,
          } = this.popupRef.current as HTMLDivElement;
          const {
            offsetWidth: bodyWidth,
            offsetHeight: bodyHeight,
          } = document.body;
          const { top, left } = this.popupRef.current?.getBoundingClientRect() as DOMRect;

          if (mode !== 'horizontal') {
            if ((cRect?.height ?? 0) <= popupHeight + 6) {
              newStyle.top = cRect?.top;
            } else {
              newStyle.top = (newStyle.top as number) - 12;
            }
          }

          if (left + popupWidth > bodyWidth) {
            newStyle.left = bodyWidth - popupWidth;
          }

          if (top + popupHeight > bodyHeight) {
            newStyle.top = bodyHeight - popupHeight;
          }

          this.setState({ style: { ...newStyle } });
        });
      });
    }
  }

  public componentWillUnmount() {
    if (document.body.contains(this.menuPopupNode)) {
      document.body.removeChild(this.menuPopupNode);
    }
  }

  protected getView = () => {
    const {
      data, children, className,
    } = this.props;
    const { style = {} } = this.state;
    const { theme } = this.menuCtx;

    if (Array.isArray(data)) {
      return createPortal(
        <div
          ref={this.popupRef}
          style={style}
          className={this.classNames(
            className,
            this.gpc(),
            this.gpc('popup'),
          )}
        >
          <div
            className={this.classNames(
              this.gpc('children'),
              this.gpc('vertical'),
              this.gpc(`${theme}`),
            )}
          >
            {children}
          </div>
        </div>,
        this.menuPopupNode,
      );
    }

    return <div />;
  };
}
