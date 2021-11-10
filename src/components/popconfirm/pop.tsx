/* eslint-disable max-len */
import React from 'react';
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
  uuid,
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
}

export interface PopconfirmState {
  visible: boolean | undefined;
  x: number;
  y: number;
  direction: PlacementType;
}

class PopComponent extends React.Component<PopProps, PopconfirmState> {
  node: HTMLSpanElement | undefined;

  private tag = uuid();

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
    if (target.nodeName !== '#document' && target.getAttribute('data-tag') === this.tag) return;
    const { onVisibleChange, visible: propsVisisble } = this.props;
    if (propsVisisble !== undefined) {
      onVisibleChange && onVisibleChange(false);
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
    const target: HTMLElement | null = document.getElementById(this.tag);
    if (target && visible) {
      this.compute(target, true);
    }
    document.addEventListener('click', this.documentBodyOnClick);
  }

  componentWillUnmount = () => {
    this.setState({ visible: false });
    document.removeEventListener('click', this.documentBodyOnClick);
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
      const placementMap = {
        top: {
          x: offsetLeft + (width - contentWidth) / 2,
          y: offsetTop - contentHeight - 10,
        },
        topLeft: {
          x: offsetLeft,
          y: offsetTop - contentHeight - 10,
        },
        topRight: {
          x: offsetLeft - (contentWidth - width),
          y: offsetTop - contentHeight - 10,
        },
        bottom: {
          x: offsetLeft + (width - contentWidth) / 2,
          y: offsetTop + height + 10,
        },
        bottomRight: {
          x: offsetLeft - (contentWidth - width),
          y: offsetTop + height + 10,
        },
        bottomLeft: {
          x: offsetLeft,
          y: offsetTop + height + 10,
        },
        left: {
          x: offsetLeft - contentWidth - 10,
          y: offsetTop + (height - contentHeight) / 2,
        },
        leftTop: {
          x: offsetLeft - contentWidth - 10,
          y: offsetTop,
        },
        leftBottom: {
          x: offsetLeft - contentWidth - 10,
          y: offsetTop - contentHeight + height,
        },
        right: {
          x: offsetLeft + width + 10,
          y: offsetTop + (height - contentHeight) / 2,
        },
        rightTop: {
          x: offsetLeft + width + 10,
          y: offsetTop,
        },
        rightBottom: {
          x: offsetLeft + width + 10,
          y: offsetTop - contentHeight + height,
        },
      };
      this.setState({
        x: placementMap[dT].x,
        y: placementMap[dT].y,
        direction: dT,
      });
      onVisibleChange && onVisibleChange(defaultV || !visible);
      if (propsVisible === undefined) { // 用户控制visible 必须使用onVisibleChange 或者 传入更新的visible props
        this.setState({ visible: defaultV || !visible });
      }
    }
  }

  handleClick = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.nativeEvent.stopImmediatePropagation();
    evt.stopPropagation();
    const { trigger } = this.props;
    const target = evt.nativeEvent.target as HTMLSpanElement;
    if (trigger === 'click' && target) {
      this.compute(target);
    }
  };

  handleOver = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.nativeEvent.stopImmediatePropagation();
    evt.stopPropagation();
    const {
      trigger, mouseEnterDelay = 0,
    } = this.props;
    const target = evt.nativeEvent.target as HTMLSpanElement;
    if (trigger === 'hover' && target) {
      setTimeout(() => {
        this.compute(target);
      }, mouseEnterDelay);
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
          if (propsVisible === undefined) {
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
    const target = evt.nativeEvent.target as HTMLSpanElement;
    if (trigger === 'focus' && target) {
      this.compute(target);
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
    if (visible === undefined) {
      this.setState({ visible: false });
    }
    onVisibleChange && onVisibleChange(false);
    onConfirm && onConfirm(e);
  }

  getNode = (node: HTMLDivElement) => {
    this.node = node;
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
    } = this.props;
    const {
      visible, x, y, direction,
    } = this.state;
    const prefix = getPrefixCls(`${componentType}`, prefixCls);
    const popContainter = classnames(prefix, className, {
      [`${prefix}-show`]: visible,
    });

    const contentStyle = classnames(`${prefix}-content`);
    const arrow = classnames(`${prefix}-content-arrow`, {
      [`${prefix}-content-arrow-${direction}`]: direction,
    });

    let Tchildren;
    if (React.isValidElement(children)) {
      Tchildren = React.cloneElement(children, {
        id: this.tag,
      });
    } else {
      throw new Error(' props children must bu ReactNode');
    }

    const btnStyle = classnames(`${contentStyle}-inner-btn`, {
      [`${contentStyle}-inner-btn-show`]: visible,
    });

    const confirmContent = (
      <div className={`${contentStyle}-inner`}>
        <div>
          <div>{icon || <Icon type="exclamation-circle" className={`${contentStyle}-inner-icon`} />}</div>
          <div className={`${contentStyle}-inner-title`}>{title}</div>
        </div>
        <div className={btnStyle}>
          <Button size="small" style={{ marginRight: 8 }} {...cancelButtonProps} onClick={this.handleCancel}>{cancelText}</Button>
          <Button type={okType} {...okButtonProps} size="small" onClick={this.handleOk}>{okText}</Button>
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
        <span
          onClick={this.handleClick}
          onMouseOver={this.handleOver}
          onMouseOut={this.handleOut}
          onFocus={this.handleFocus}
          data-tag={this.tag}
          id={Tchildren && Tchildren.props && Tchildren.props.id ? undefined : this.tag}
        >
          {Tchildren}
        </span>
        <Portal {...({ getPopupContainer })}>
          <div
            className={popContainter}
            style={{ ...overlayStyle, left: x, top: y }}
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
