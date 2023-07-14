import React, { ReactNode } from 'react';
import classnames from 'classnames';
import Popup from '../common/portal';
import { getOffset } from '../utils/getOffset';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { tuple } from '../utils/type';

const PlacementTypes = tuple('top', 'left', 'right', 'bottom');
const TriggerTypes = tuple('hover', 'focus', 'click');
type PlacementType = (typeof PlacementTypes)[number];
type TriggerType = (typeof TriggerTypes)[number];

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

  onMouseOver = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.nativeEvent.stopImmediatePropagation();
    evt.stopPropagation();
    const target = evt.nativeEvent.target as HTMLSpanElement;
    const { getPopupContainer } = this.props;
    const { visible } = this.state;
    if (target && this.node) {
      const { height: contentHeight, width: contentWidth } = this.node.getBoundingClientRect();
      const { width, height } = target.getBoundingClientRect();
      // const { pageXOffset, pageYOffset } = window;
      // const { left, top } = target.getBoundingClientRect();
      const container = getPopupContainer && getPopupContainer();
      const { top: offsetTop, left: offsetLeft } = getOffset(target, container);
      // const offsetLeft = Math.ceil(pageXOffset + left);
      // const offsetTop = Math.ceil(pageYOffset + top);
      const { placement = 'top' } = this.props;
      const gap = 10;
      const position: {
        [key: string]: TooltipState,
      } = {
        top: {
          x: offsetLeft + (width - contentWidth) / 2,
          y: offsetTop - contentHeight - gap,
        },
        bottom: {
          x: offsetLeft + (width - contentWidth) / 2,
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
      children, message, prefixCls, className, getPopupContainer, placement = 'top', trigger = 'hover', zIndex,
    } = this.props;
    const { visible, x, y } = this.state;
    const prefix = getPrefixCls?.('tooltip', prefixCls);
    const wrapperCls = classnames(prefix, {
      [`${prefix}-visible`]: visible,
    }, className);
    const arrowCls = classnames(`${prefix}-content-arrow`, {
      [`${prefix}-content-arrow-${placement}`]: !!placement,
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
        onFocus: this.onMouseOver,
      },
    };
    let component = (<span {...normalEventMap[trigger]}>{children}</span>);
    if (React.isValidElement(children)) {
      const delegateEventMap = {
        click: {
          onClick: (evt: React.MouseEvent<any>) => {
            this.onMouseOver(evt);
            children.props.onClick && children.props.onClick(evt);
          },
        },
        focus: {
          onFocus: (evt: React.MouseEvent<any>) => {
            this.onMouseOver(evt);
            children.props.onFocus && children.props.onFocus(evt);
          },
        },
        hover: {
          onMouseOver: (evt: React.MouseEvent<any>) => {
            this.onMouseOver(evt);
            children.props.onMouseOver && children.props.onMouseOver(evt);
          },
          onMouseOut: (evt: React.MouseEvent<any>) => {
            this.onMouseOut(evt);
            children.props.onMouseOut && children.props.onMouseOut(evt);
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
            style={{ left: x, top: y, zIndex, }}
            ref={this.getNode}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopPropagation();
            }}
            onMouseOver={() => {
              trigger === 'hover' && this.showTooltip();
            }}
            onMouseOut={() => {
              trigger === 'hover' && this.hideTooltip();
            }}
          >
            <div className={`${prefix}-content`}>
              <div className={arrowCls} />
              <div className={`${prefix}-content-inner`}>{message}</div>
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
