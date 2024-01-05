/* eslint-disable max-len */
import React, { ReactNode } from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import Portal from '../common/portal';
import { getOffset } from '../utils/getOffset';
import { BaseButtonProps } from '../button/type';
import { Button } from '../index';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import {
  PlacementType,
  changeTopDir,
  changeLeftDir,
  changeBottomDir,
  changeRightDir,
} from './utils';

export interface PopProps {
  cancelText?: string;
  prefixCls?: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
  okText?: string;
  okType?: 'link' | 'primary' | 'ghost' | 'default' | 'dashed' | 'danger' | undefined;
  placement?: PlacementType;
  onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onConfirm?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  getPopupContainer?: () => HTMLElement | null;
  icon?: React.ReactNode;
  autoAdjustOverflow?: boolean;
  componentType?: 'pop-over' | 'pop-confirm';
  trigger?: string;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  visible?: boolean | undefined;
  overlayStyle?: React.CSSProperties;
  onVisibleChange?: (visible: boolean) => void;
  defaultVisible?: boolean;
  className?: string;
  okButtonProps?: BaseButtonProps;
  cancelButtonProps?: BaseButtonProps;
  children?: any;
}

export interface PopconfirmState {
  visible: boolean | undefined;
  x: number;
  y: number;
  direction: PlacementType;
}

class PopComponent extends React.Component<PopProps, PopconfirmState> {
  node: HTMLSpanElement | undefined;

  childRef: HTMLElement | null | undefined;

  constructor(props: PopProps) {
    super(props);
    const { visible, defaultVisible, placement = 'top' } = props;
    this.state = {
      visible: visible || defaultVisible || false,
      x: 0,
      y: 0,
      direction: placement,
    };
  }

  visibleOnClick = (target: HTMLElement) => {
    if (this.childRef?.contains(target)) return;
    const { onVisibleChange, visible: propsVisisble, componentType } = this.props;
    if (typeof propsVisisble !== 'undefined') {
      if (!this.node?.contains(target)) {
        onVisibleChange?.(false);
      }
    } else if (componentType === 'pop-confirm') {
      if (!this.node?.contains(target)) this.setState({ visible: false });
    } else {
      this.setState({ visible: false });
    }
  }

  documentBodyOnClick = (event: Event) => {
    const { visible } = this.state;
    if (!visible) return;
    event.target && this.visibleOnClick(event.target as HTMLElement);
  }

  componentDidMount = () => {
    const { visible } = this.state;
    if (this.childRef && visible) {
      this.compute(this.childRef, true);
    }
    document.addEventListener('click', this.documentBodyOnClick, true);
  }

  componentWillUnmount = () => {
    this.setState({ visible: false });
    document.removeEventListener('click', this.documentBodyOnClick, true);
  }

  componentDidUpdate = (prevProps: PopProps) => {
    const { visible } = this.props;
    if (visible !== prevProps.visible) {
      this.setState({ visible });
    }
  }

  compute = (target: any, defaultV?: boolean) => {
    const { direction, visible } = this.state;
    const {
      autoAdjustOverflow = true, onVisibleChange, visible: propsVisible, getPopupContainer,
    } = this.props;
    const bodyW = document.body.scrollWidth;
    const bodyH = document.body.scrollHeight;
    let dT: PlacementType = direction;
    if (target && this.node) {
      const { height: contentHeight, width: contentWidth } = this.node.getBoundingClientRect();
      const {
        width,
        height,
      } = target.getBoundingClientRect();
      const containter = getPopupContainer && getPopupContainer();
      const { top: offsetTop, left: offsetLeft } = getOffset(target, containter);
      if (autoAdjustOverflow && !getPopupContainer) { // 超出屏幕自动切换到对应的placement
        if (direction.indexOf('top') >= 0 || direction.indexOf('bottom') >= 0) {
          dT = direction;
          if (autoAdjustOverflow && direction.indexOf('top') >= 0 && offsetTop < contentHeight + 10) {
            dT = changeTopDir[direction]; // 上面超出，自动展示下面
          }
          if (autoAdjustOverflow && direction.indexOf('bottom') >= 0 && (bodyH - offsetTop) < contentHeight + 10) {
            dT = changeBottomDir[direction]; // 下面超出自动展示上面
          }
        }
        if (direction.indexOf('left') >= 0 || direction.indexOf('right') >= 0) {
          dT = direction;
          if (autoAdjustOverflow && direction.indexOf('left') >= 0 && offsetLeft < contentWidth + 10) {
            dT = changeLeftDir[direction];
          }
          if (autoAdjustOverflow && direction.indexOf('right') >= 0 && (bodyW - offsetLeft) < contentWidth + 10) {
            dT = changeRightDir[direction];
          }
        }
      }
      const space = 10;
      const placementMap = {
        top: {
          x: offsetLeft + (width - contentWidth) / 2,
          y: offsetTop - contentHeight - space,
        },
        topLeft: {
          x: offsetLeft,
          y: offsetTop - contentHeight - space,
        },
        topRight: {
          x: offsetLeft - (contentWidth - width),
          y: offsetTop - contentHeight - space,
        },
        bottom: {
          x: offsetLeft + (width - contentWidth) / 2,
          y: offsetTop + height + space,
        },
        bottomRight: {
          x: offsetLeft - (contentWidth - width),
          y: offsetTop + height + space,
        },
        bottomLeft: {
          x: offsetLeft,
          y: offsetTop + height + space,
        },
        left: {
          x: offsetLeft - contentWidth - space,
          y: offsetTop + (height - contentHeight) / 2,
        },
        leftTop: {
          x: offsetLeft - contentWidth - space,
          y: offsetTop,
        },
        leftBottom: {
          x: offsetLeft - contentWidth - space,
          y: offsetTop - contentHeight + height,
        },
        right: {
          x: offsetLeft + width + space,
          y: offsetTop + (height - contentHeight) / 2,
        },
        rightTop: {
          x: offsetLeft + width + space,
          y: offsetTop,
        },
        rightBottom: {
          x: offsetLeft + width + space,
          y: offsetTop - contentHeight + height,
        },
      };
      this.setState({
        x: placementMap[dT].x,
        y: placementMap[dT].y,
        direction: dT,
      });
      onVisibleChange && onVisibleChange(defaultV || !visible);
      if (typeof propsVisible === 'undefined') { // 用户控制visible 必须使用onVisibleChange 或者 传入更新的visible props
        this.setState({ visible: defaultV || !visible });
      }
    }
  }

  handleClick = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.nativeEvent.stopImmediatePropagation();
    evt.stopPropagation();
    const { trigger } = this.props;
    if (trigger === 'click') {
      this.compute(evt.currentTarget);
    }
  };

  handleOver = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.nativeEvent.stopImmediatePropagation();
    evt.stopPropagation();
    const target = evt.currentTarget;
    const {
      trigger, mouseEnterDelay = 0,
    } = this.props;
    const { visible } = this.state;
    if (trigger === 'hover') {
      if (!visible) {
        setTimeout(() => {
          this.compute(target);
        }, mouseEnterDelay);
      }
    }
  };

  handleOut = () => {
    const {
      mouseLeaveDelay = 0, trigger, onVisibleChange, visible: propsVisible,
    } = this.props;
    const { visible } = this.state;
    if (trigger === 'hover') {
      if (visible) {
        setTimeout(() => {
          if (typeof propsVisible === 'undefined') {
            this.setState({ visible: false });
          }
          onVisibleChange && onVisibleChange(false);
        }, mouseLeaveDelay);
      }
    }
  };

  handleFocus = (evt: React.FocusEvent<HTMLSpanElement>) => {
    evt.nativeEvent.stopImmediatePropagation();
    evt.stopPropagation();
    const { trigger = 'hover' } = this.props;
    if (trigger === 'focus') {
      this.compute(evt.currentTarget);
    }
  };

  handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ visible: false });
    const { onCancel, onVisibleChange } = this.props;
    onCancel && onCancel(e);
    onVisibleChange && onVisibleChange(false);
  }

  handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const { visible, onConfirm, onVisibleChange } = this.props;
    if (typeof visible === 'undefined') {
      this.setState({ visible: false });
    }
    onVisibleChange && onVisibleChange(false);
    onConfirm && onConfirm(e);
  }

  getNode = (node: HTMLDivElement) => {
    this.node = node;
  }

  getChildRef = (child: HTMLElement) => {
    const temp = (child as any)?.ref?.current || child;
    this.childRef = temp;
  }

  showPop = () => {
    const { trigger = 'hover' } = this.props;
    trigger === 'hover' && this.setState({ visible: true });
  };

  hidePop = () => {
    const { trigger = 'hover' } = this.props;
    trigger === 'hover' && this.setState({ visible: false });
  }

  renderPopConfirm = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      children,
      getPopupContainer,
      icon,
      title,
      okText = '确定',
      cancelText = '取消',
      okType = 'primary',
      componentType,
      content,
      className,
      overlayStyle = {},
      okButtonProps,
      cancelButtonProps,
      trigger,
    } = this.props;
    const {
      visible, x, y, direction,
    } = this.state;
    const prefix = getPrefixCls(`${componentType}`, prefixCls);
    const popContainter = classnames(prefix, className, {
      [`${prefix}-show`]: visible,
      [`${prefix}-show-${direction}`]: visible,
    });

    const contentStyle = classnames(`${prefix}-content`);
    const arrow = classnames(`${prefix}-content-arrow`, {
      [`${prefix}-content-arrow-${direction}`]: direction,
    });

    let TChildren = (
      <span
        onClick={this.handleClick}
        onMouseOver={this.handleOver}
        onMouseLeave={this.handleOut}
        onFocus={this.handleFocus}
        ref={this.getChildRef}
      >
        {children}
      </span>
    );
    if (React.isValidElement(children)) {
      TChildren = React.cloneElement<any>(children, {
        ref: this.getChildRef,
        onClick: (evt: React.MouseEvent<any>) => {
          this.handleClick(evt);
          (children as any)?.props?.onClick(evt);
        },
        onFocus: (evt: React.FocusEvent<any>) => {
          this.handleFocus(evt);
          (children as any)?.props?.onFocus?.(evt);
        },
        onMouseOver: (evt: React.MouseEvent<any>) => {
          this.handleOver(evt);
          (children as any)?.props?.onMouseOver?.(evt);
        },
        onMouseLeave: (evt: React.MouseEvent<any>) => {
          this.handleOut();
          (children as any)?.props?.onMouseLeave?.(evt);
        },
      });
    }

    const btnStyle = classnames(`${contentStyle}-inner-btn`, {
      [`${contentStyle}-inner-btn-show`]: visible,
    });

    const confirmContent = (
      <div className={`${contentStyle}-inner`}>
        <div>
          <div className={`${contentStyle}-inner-icon`}>{icon || <Icon type="exclamation-circle" />}</div>
          <div className={`${contentStyle}-inner-title`}>{title}</div>
        </div>
        <div className={btnStyle}>
          <Button size="small" style={{ marginRight: 8, transition: 'none' }} {...cancelButtonProps} onClick={this.handleCancel}>{cancelText}</Button>
          <Button type={okType} {...okButtonProps} size="small" style={{ transition: 'none' }} onClick={this.handleOk}>{okText}</Button>
        </div>
      </div>
    );
    const overContent = (
      <div className={`${contentStyle}-inner`}>
        {title && <div className={`${contentStyle}-inner-title`}>{title}</div>}
        {content && <div className={`${contentStyle}-inner-content`}>{content}</div>}
      </div>
    );

    return (
      <>
        {TChildren}
        <Portal {...({ getPopupContainer })}>
          <div
            className={popContainter}
            style={{
              ...overlayStyle,
              left: x,
              top: y,
              transition: trigger === 'hover' ? 'visibility .2s ease-in-out' : undefined,
            }}
            ref={this.getNode}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
            }}
            onMouseOver={this.showPop}
            onMouseOut={this.hidePop}
          >
            <div className={contentStyle}>
              <div className={arrow} />
              {componentType === 'pop-confirm' && confirmContent}
              {componentType === 'pop-over' && overContent}
            </div>
          </div>
        </Portal>
      </>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderPopConfirm}
      </ConfigConsumer>
    );
  }
}

export default PopComponent;
