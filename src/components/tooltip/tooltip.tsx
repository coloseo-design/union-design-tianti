import React, { ReactNode } from 'react';
import classnames from 'classnames';
import Popup from '../common/portal';
import { getOffset } from '../utils/getOffset';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { tuple } from '../utils/type';

const PlacementTypes = tuple('top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight');
const TriggerTypes = tuple('hover', 'focus', 'click');
const TooltipTypes = tuple('default', 'danger', 'warning', 'success', 'info');
type PlacementType = (typeof PlacementTypes)[number];
type TriggerType = (typeof TriggerTypes)[number];
type TooltipType = (typeof TooltipTypes)[number];

export interface TooltipProps {
  getPopupContainer?: () => HTMLElement | null;
  className?: string;
  prefixCls?: string;
  /** 内容 */
  message: string | ReactNode;
  /** 展示位置 */
  placement?: PlacementType;
  /** 触发事件 */
  trigger?: TriggerType;
  /* tooltip 类型 */
  type?: TooltipType;

  /* 是否展示箭头 */
  showArrow?: boolean;
  position?: { left: number, top: number }
  children?: any;
  zIndex?: number;
}

interface TooltipState {
  visible?: boolean;
  x: number | string;
  y: number | string;
}

class Tooltip extends React.Component<TooltipProps, TooltipState> {
  node: HTMLSpanElement | undefined;

  constructor(props: TooltipProps) {
    super(props);
    this.state = {
      visible: false,
      x: 0,
      y: 0,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.hideTooltip, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideTooltip, false);
  }

  getNode = (node: HTMLDivElement) => {
    this.node = node;
  }

  hideTooltip = () => {
    this.setState({
      visible: false,
    });
  }

  showTooltip = () => {
    this.setState({
      visible: true,
    });
  }

  onMouseOver = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
    evt.nativeEvent.stopImmediatePropagation();
    evt.stopPropagation();
    const target = (evt.currentTarget || evt.nativeEvent.target) as HTMLElement;
    const { getPopupContainer } = this.props;
    const { visible } = this.state;
    if (target && this.node) {
      const { height: contentHeight, width: contentWidth } = this.node.getBoundingClientRect();
      const { width, height } = target.getBoundingClientRect();
      const container = getPopupContainer && getPopupContainer();
      const { top: offsetTop, left: offsetLeft } = getOffset(target, container);
      const { placement = 'top' } = this.props;
      const gap = 10;
      const position: {
        [key: string]: TooltipState,
      } = {
        top: {
          x: offsetLeft + (width - contentWidth) / 2,
          y: offsetTop - contentHeight - gap,
        },
        topLeft: {
          x: offsetLeft,
          y: offsetTop - contentHeight - gap,
        },
        topRight: {
          x: offsetLeft - (contentWidth - width),
          y: offsetTop - contentHeight - gap,
        },
        bottom: {
          x: offsetLeft + (width - contentWidth) / 2,
          y: offsetTop + height + gap,
        },
        bottomRight: {
          x: offsetLeft - (contentWidth - width),
          y: offsetTop + height + gap,
        },
        bottomLeft: {
          x: offsetLeft,
          y: offsetTop + height + gap,
        },
        right: {
          x: offsetLeft + (width) + gap,
          y: offsetTop + (height - contentHeight) / 2,
        },
        left: {
          x: offsetLeft - contentWidth - gap,
          y: offsetTop + (height - contentHeight) / 2,
        },
      };
      const state = {
        visible: !visible,
        ...(position[placement]),
      };
      this.setState(state);
    }
  }

  onMouseOut = () => {
    this.setState({
      visible: false,
    });
  }

  renderTooltip = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      children, message, prefixCls, className,
      getPopupContainer, placement = 'top', trigger = 'hover',
      showArrow = true, type = 'default', zIndex,
    } = this.props;
    const { visible, x, y } = this.state;
    const prefix = getPrefixCls?.('tooltip', prefixCls);
    const wrapperCls = classnames(prefix, {
      [`${prefix}-visible`]: visible,
    }, className);
    const arrowCls = classnames(`${prefix}-content-arrow`, {
      [`${prefix}-content-arrow-${placement}`]: !!placement,
      [`${prefix}-content-arrow-${type}`]: type,
    });

    const normalEventMap = {
      hover: {
        onMouseOver: this.onMouseOver,
        onMouseOut: this.onMouseOut,
      },
      click: {
        onClick: this.onMouseOver,
      },
      focus: {
        onFocus: this.onMouseOver as any,
      },
    };
    let component = (<span {...normalEventMap[trigger] as any}>{children}</span>);
    if (React.isValidElement(children)) {
      const delegateEventMap = {
        click: {
          onClick: (evt: React.MouseEvent<any>) => {
            this.onMouseOver(evt);
            (children.props as any)?.onClick && (children.props as any).onClick(evt);
          },
        },
        focus: {
          onFocus: (evt: React.MouseEvent<any>) => {
            this.onMouseOver(evt);
            (children.props as any)?.onFocus && (children.props as any).onFocus(evt);
          },
        },
        hover: {
          onMouseOver: (evt: React.MouseEvent<any>) => {
            this.onMouseOver(evt);
            (children.props as any)?.onMouseOver && (children.props as any).onMouseOver(evt);
          },
          onMouseOut: (evt: React.MouseEvent<any>) => {
            this.onMouseOut();
            (children.props as any)?.onMouseOut && (children.props as any)?.onMouseOut(evt);
          },
        },
      };
      component = React.cloneElement(children, delegateEventMap[trigger]);
    }
    return (
      <>
        {component}
        <Popup {...({ getPopupContainer })}>
          <div
            className={wrapperCls}
            style={{ left: x, top: y, zIndex }}
            ref={this.getNode}
            onClick={(e: React.MouseEvent<any>) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
            }}
            onMouseOver={() => {
              trigger === 'hover' && this.showTooltip();
            }}
            onMouseOut={() => {
              trigger === 'hover' && this.hideTooltip();
            }}
          >
            <div className={`${prefix}-content`}>
              {showArrow && <div className={arrowCls} />}
              <div
                className={classnames(`${prefix}-content-inner`, {
                  [`${prefix}-content-inner-${type}`]: type,
                })}
              >
                {message}
              </div>
            </div>
          </div>
        </Popup>
      </>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderTooltip}
      </ConfigConsumer>
    );
  }
}

export default Tooltip;
