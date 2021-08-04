import React from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import Portal from './portal';
import Button, { BaseButtonProps } from '../button';
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
  getPopupContainer?: () => HTMLElement;
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
    const { onVisibleChange, visible: propsVisible } = this.props;
    if (target.nodeName !== '#document' && target.getAttribute('data-tag') === this.tag) return;
    if (target.nodeName === 'BODY') {
      const { visible } = this.state;
      if (visible) {
        if (propsVisible === undefined) {
          this.setState({ visible: false });
        }
        onVisibleChange && onVisibleChange(false);
      }
    }
    target.parentNode && this.visibleOnClick(target.parentNode as HTMLElement);
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
    document.body.addEventListener('click', this.documentBodyOnClick);
  }

  componentWillUnmount = () => {
    this.setState({ visible: false });
    document.body.removeEventListener('click', this.documentBodyOnClick);
  }

  componentDidUpdate = (prevProps: PopProps) => {
    const { visible } = this.props;
    if (visible !== prevProps.visible) {
      this.setState({ visible });
    }
  }

  compute = (target: HTMLSpanElement | HTMLElement, firstRender: boolean) => {
    const { direction, visible } = this.state;
    const { autoAdjustOverflow = true, onVisibleChange, visible: propsVisible } = this.props;
    const bodyW = document.body.scrollWidth;
    const bodyH = document.body.scrollHeight;
    let dT: PlacementType;
    if (!visible || firstRender || propsVisible) {
      if (target && this.node) {
        const { height: contentHeight, width: contentWidth } = this.node.getBoundingClientRect();
        const {
          width,
          height,
          left,
          top,
        } = target.getBoundingClientRect();
        const offsetTop = Math.ceil(window.pageYOffset + top);
        const offsetLeft = Math.ceil(window.pageXOffset + left);
        if (direction.indexOf('top') >= 0 || direction.indexOf('bottom') >= 0) { // 上下的pop
          dT = direction;
          if (autoAdjustOverflow && direction.indexOf('top') >= 0 && offsetTop < contentHeight + 10) {
            dT = changeTopDir[direction];
          }
          if (autoAdjustOverflow && direction.indexOf('bottom') >= 0 && (bodyH - offsetTop) < contentHeight + 10) {
            dT = changeBottomDir[direction];
          }
          const xT: number = dT.indexOf('Left') >= 0 ? offsetLeft : dT.indexOf('Right') >= 0 ? (offsetLeft - contentWidth + width) : (offsetLeft + (width - contentWidth) / 2);
          const yT: number = dT.indexOf('top') >= 0 ? (offsetTop - contentHeight - 10) : offsetTop + height + 10;
          this.setState({
            visible: true,
            x: xT,
            y: yT,
            direction: dT,
          });
        }
        if (direction.indexOf('left') >= 0 || direction.indexOf('right') >= 0) { // 左右的pop
          dT = direction;
          if (autoAdjustOverflow && direction.indexOf('left') >= 0 && offsetLeft < contentWidth + 10) {
            dT = changeLeftDir[direction];
          }
          if (autoAdjustOverflow && direction.indexOf('right') >= 0 && (bodyW - offsetLeft) < contentWidth + 10) {
            dT = changeRightDir[direction];
          }
          const xT: number = dT.indexOf('left') >= 0 ? offsetLeft - contentWidth - 10 : offsetLeft + width + 10;
          /* eslint no-nested-ternary: 0 */
          const yT: number = dT.indexOf('Top') >= 0 ? offsetTop : dT.indexOf('Bottom') >= 0 ? (offsetTop - contentHeight + height) : offsetTop + (height - contentHeight) / 2;
          this.setState({
            visible: propsVisible !== undefined ? propsVisible : true,
            x: xT,
            y: yT,
            direction: dT,
          });
        }
        onVisibleChange && onVisibleChange(propsVisible !== undefined ? propsVisible : true);
      }
    }
  }

  handleClick = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { trigger, visible: popupVisible, onVisibleChange } = this.props;
    const { visible } = this.state;
    const target = evt.nativeEvent.target as HTMLSpanElement;
    if (trigger === 'click' && target) {
      if (!visible) {
        this.compute(target, false);
      } else {
        onVisibleChange && onVisibleChange(false);
        if (popupVisible === undefined) {
          this.setState({ visible: false });
        }
      }
    }
  };

  handleOver = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const {
      trigger, mouseEnterDelay = 0, onVisibleChange, visible: popupVisible,
    } = this.props;
    const { visible } = this.state;
    const target = evt.nativeEvent.target as HTMLSpanElement;
    if (trigger === 'hover' && target) {
      if (!visible) {
        setTimeout(() => {
          this.compute(target, false);
        }, mouseEnterDelay);
      } else {
        onVisibleChange && onVisibleChange(false);
        if (popupVisible === undefined) {
          this.setState({ visible: false });
        }
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
          if (propsVisible === undefined) {
            this.setState({ visible: false });
          }
          onVisibleChange && onVisibleChange(false);
        }, mouseLeaveDelay);
      }
    }
  };

  handleFocus = (evt: React.FocusEvent<HTMLSpanElement>) => {
    const { trigger = 'hover' } = this.props;
    const target = evt.nativeEvent.target as HTMLSpanElement;
    if (trigger === 'focus' && target) {
      this.compute(target, false);
    }
  };

  handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setState({ visible: false });
    const { onCancel, onVisibleChange } = this.props;
    onCancel && onCancel(e);
    onVisibleChange && onVisibleChange(false);
  }

  handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { visible } = this.props;
    if (visible === undefined) {
      this.setState({ visible: false });
    }
    const { onConfirm, onVisibleChange } = this.props;
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
      Tchildren = React.cloneElement(children, { id: this.tag });
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
          <div style={{ paddingLeft: 24 }}>{title}</div>
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
          // style={{ margin: 0, padding: 0, display: 'inline-block' }}
          data-tag={this.tag}
          id={this.tag}
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
