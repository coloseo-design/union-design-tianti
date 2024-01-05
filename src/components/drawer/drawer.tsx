/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { createRef, CSSProperties, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { BaseComponent, BaseProps, BaseState } from '../common/base-component';
import { animation } from '../utils/animation';
import Icon from '../icon';

const DRAWER_NAME = 'UNION_DRAWER';

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';

export type DrawerProps = {
  /** 标题  */
  title?: string;
  /** 抽屉的头部  */
  head?: () => ReactNode;
  /** 是否显示右上角的关闭按钮 */
  closable?: boolean;
  /** 抽屉的页脚 */
  footer?: () => ReactNode;
  /** 指定Drawer挂载的HTML节点 */
  containerNode?: HTMLElement;
  /** Drawer是否可见 */
  visible?: boolean;
  /** 宽度或者高度 */
  wh?: number;
  /** 是否展示遮罩 */
  mask?: boolean;
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean;
  /** 抽屉的方向 */
  placement?: DrawerPlacement;
  /** 点击遮罩层或右上角叉或取消按钮的回调 */
  onClose?: () => void;
  /** 用于设置多层Drawer的推动距离 */
  distance?: number;

  children?: any;
} & BaseProps;

export type DrawerState = {
  visible: boolean;
} & BaseState;

export default class extends BaseComponent<DrawerProps, DrawerState> {
  public static tag = DRAWER_NAME;

  public static defaultProps: DrawerProps = {
    wh: 448,
    distance: 224,
    placement: 'right',
    mask: true,
    maskClosable: true,
    closable: true,
    onClose: () => ({}),
  };

  protected classPrefix = 'drawer';

  private bodyDrawerNode: HTMLDivElement;

  private headRef = createRef<HTMLDivElement>();

  private bodyRef = createRef<HTMLDivElement>();

  private footerRef = createRef<HTMLDivElement>();

  private contentRef = createRef<HTMLDivElement>();

  private maskRef = createRef<HTMLDivElement>();

  public constructor(props: DrawerProps) {
    super(props);
    this.bodyDrawerNode = document.createElement('div');
    this.state = {
      visible: props.visible ?? false,
    };
  }

  public componentDidMount() {
    document.body.appendChild(this.bodyDrawerNode);
    const {
      whenChildrenOpen, placement, wh,
    } = this.props as unknown;
    if (this.props.visible) {
      if (typeof whenChildrenOpen === 'function') {
        whenChildrenOpen();
      }
      this.setState({ visible: true }, () => {
        const content = this.contentRef.current;
        const mask = this.maskRef.current;
        const head = this.headRef.current;
        const body = this.bodyRef.current;
        const footer = this.footerRef.current;
        mask && (mask.style.backgroundColor = 'rgba(0, 0, 0, 0)');
        content && (content.style[placement] = `-${wh}px`);
        head && body && (body.style.top = `${head.offsetHeight}px`);
        footer && body && (body.style.bottom = `${footer.offsetHeight}px`);
        setTimeout(() => {
          this.animationVisibleTrue();
        });
      });
    }
  }

  public componentWillUnmount() {
    if (document.body.contains(this.bodyDrawerNode)) {
      document.body.removeChild(this.bodyDrawerNode);
    }
  }

  public componentDidUpdate(preProps: DrawerProps) {
    if (preProps.visible !== this.props.visible) {
      const {
        whenChildrenOpen, whenChildrenClose, placement, wh,
      } = this.props as unknown;
      if (this.props.visible) {
        if (typeof whenChildrenOpen === 'function') {
          whenChildrenOpen();
        }
        this.setState({ visible: true }, () => {
          const content = this.contentRef.current;
          const mask = this.maskRef.current;
          const head = this.headRef.current;
          const body = this.bodyRef.current;
          const footer = this.footerRef.current;
          mask && (mask.style.backgroundColor = 'rgba(0, 0, 0, 0)');
          content && (content.style[placement] = `-${wh}px`);
          head && body && (body.style.top = `${head.offsetHeight}px`);
          footer && body && (body.style.bottom = `${footer.offsetHeight}px`);
          setTimeout(() => {
            this.animationVisibleTrue();
          });
        });
      } else {
        if (typeof whenChildrenClose === 'function') {
          whenChildrenClose();
        }
        setTimeout(() => {
          this.animationVisibleFalse(() => {
            this.setState({ visible: false });
          });
        });
      }
    }
  }

  protected view = () => {
    const { visible } = this.state;

    if (!visible) return <div />;

    return createPortal(this.drawer(), this.bodyDrawerNode);
  };

  private drawer = () => {
    const { children, mask } = this.props;

    if (mask) return this.mask(this.content(children));

    return this.content(children);
  };

  private mask = (children: ReactNode) => {
    const { maskClosable, onClose } = this.props;

    return (
      <div
        ref={this.maskRef}
        onClick={maskClosable ? onClose : () => ({})}
        className={this.getPrefixClass('mask')}
      >
        {children}
      </div>
    );
  };

  private content = (children: ReactNode) => {
    const {
      title, head, footer, closable, onClose,
    } = this.props;
    const style = this.handleContentStyle();

    return (
      <div
        style={style}
        ref={this.contentRef}
        onClick={(e) => e.stopPropagation()}
        className={this.getPrefixClass('content')}
      >
        <div>
          <div className="head" ref={this.headRef}>
            {head ? head() : (
              <div className="default">
                {title}
                {closable && (
                  <div className="close" onClick={onClose}>
                    <Icon type="close" />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="body" ref={this.bodyRef}>
            {React.Children.map(children, (child: unknown) => {
              if (child?.type?.tag === DRAWER_NAME) {
                return React.cloneElement(child, {
                  whenChildrenOpen: this.whenChildrenOpen,
                  whenChildrenClose: this.whenChildrenClose,
                });
              }
              return child;
            })}
          </div>
          <div className="footer" ref={this.footerRef}>
            {footer && footer()}
          </div>
        </div>
      </div>
    );
  };

  private handleContentStyle = () => {
    const { wh, placement, containerNode = document.body } = this.props;

    const style = {} as CSSProperties;

    if (placement === 'top') {
      style.height = wh;
      style.width = containerNode.offsetWidth;
    }

    if (placement === 'right') {
      style.width = wh;
      style.height = containerNode.offsetHeight;
    }

    if (placement === 'bottom') {
      style.height = wh;
      style.width = containerNode.offsetWidth;
    }

    if (placement === 'left') {
      style.width = wh;
      style.height = containerNode.offsetHeight;
    }

    return style;
  };

  private animationVisibleTrue = () => {
    const { placement, wh } = this.props;
    const mask = this.maskRef.current;
    const content = this.contentRef.current;
    animation((percentage) => {
      content && (content.style[placement!] = `-${wh! * (1 - percentage)}px`);
      mask && (mask.style.backgroundColor = `rgba(0, 0, 0, ${0.45 * percentage})`);
    }, 200);
  };

  private animationVisibleFalse = (cbEnd: () => void) => {
    const { placement, wh } = this.props;
    const mask = this.maskRef.current;
    const content = this.contentRef.current;
    animation((percentage) => {
      content && (content.style[placement!] = `-${wh! * percentage}px`);
      mask && (mask.style.backgroundColor = `rgba(0, 0, 0, ${0.45 * (1 - percentage)})`);
      if (percentage === 1) {
        cbEnd();
      }
    }, 200);
  };

  private whenChildrenOpen = () => {
    const { whenChildrenOpen, placement, distance } = this.props as unknown;
    if (typeof whenChildrenOpen === 'function') {
      whenChildrenOpen();
    }
    const content = this.contentRef.current;
    if (content) {
      const initNum = parseInt(content.style[placement].replace('px', ''), 10);
      animation((percentage) => {
        content.style[placement] = `${initNum + distance * percentage}px`;
      }, 200);
    }
  };

  private whenChildrenClose = () => {
    const { whenChildrenClose, placement, distance } = this.props as unknown;
    if (typeof whenChildrenClose === 'function') {
      whenChildrenClose();
    }
    const content = this.contentRef.current;
    if (content) {
      const initNum = parseInt(content.style[placement].replace('px', ''), 10);
      animation((percentage) => {
        content.style[placement] = `${initNum - distance * percentage}px`;
      }, 200);
    }
  };
}
