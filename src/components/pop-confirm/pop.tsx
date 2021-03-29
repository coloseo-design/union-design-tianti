import React from 'react';
import classnames from 'classnames';
import Icon from '../icon';
import Portal from './portal';
import Button, { BaseButtonProps } from '../button/button';
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
    const { onVisibleChange } = this.props;
    if (target.nodeName !== '#document' && target.getAttribute('data-tag') === this.tag) return;
    if (target.nodeName === 'BODY') {
      const { visible } = this.state;
      if (visible) {
        onVisibleChange && onVisibleChange(false);
        this.setState({ visible: false });
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
    const { autoAdjustOverflow = true, onVisibleChange } = this.props;
    // const target = evt.nativeEvent.target as HTMLSpanElement;
    const bodyW = document.body.scrollWidth;
    const bodyH = document.body.scrollHeight;
    let dT: PlacementType;
    if (!visible || firstRender) {
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
          // dT = autoAdjustOverflow
          // ? (direction.indexOf('top') >=0 && offsetTop < contentHeight + 10?
          // changeTopDir[direction] :
          // direction.indexOf('bottom') >= 0 && (bodyH - offsetTop) < contentHeight + 10 ?
          // changeBottomDir[direction] :
          // direction) :
          // direction;
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
          // 你的
          // dT = autoAdjustOverflow
          //   ? (direction.indexOf('left') >= 0 && offsetLeft < contentWidth + 10 ?
          //     changeLeftDir[direction] :
          //     direction.indexOf('right') >= 0 && (bodyW - offsetLeft) < contentWidth + 10 ?
          //     changeRightDir[direction] :
          //     direction)
          //   : direction;
          const xT: number = dT.indexOf('left') >= 0 ? offsetLeft - contentWidth - 10 : offsetLeft + width + 10;
          /* eslint no-nested-ternary: 0 */
          const yT: number = dT.indexOf('Top') >= 0 ? offsetTop : dT.indexOf('Bottom') >= 0 ? (offsetTop - contentHeight + height) : offsetTop + (height - contentHeight) / 2;
          this.setState({
            visible: true,
            x: xT,
            y: yT,
            direction: dT,
          });
        }
        onVisibleChange && onVisibleChange(true);
      }
    } else {
      onVisibleChange && onVisibleChange(false);
      this.setState({ visible: false });
    }
  }

  handleClick = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { trigger } = this.props;
    const target = evt.nativeEvent.target as HTMLSpanElement;
    if (trigger === 'click' && target) {
      this.compute(target, false);
    }
  };

  handleOver = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { trigger, mouseEnterDelay = 0 } = this.props;
    const target = evt.nativeEvent.target as HTMLSpanElement;
    if (trigger === 'hover' && target) {
      setTimeout(() => {
        this.compute(target, false);
      }, mouseEnterDelay);
    }
  };

  handleOut = () => {
    const { mouseLeaveDelay = 0, trigger } = this.props;
    if (trigger === 'hover') {
      setTimeout(() => {
        this.setState({ visible: false });
      }, mouseLeaveDelay);
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

  renderPopConfirm = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      children,
      getPopupContainer,
      icon,
      title,
      okText = 'Yes',
      cancelText = 'No',
      okType = 'primary',
      componentType,
      content,
      className,
      overlayStyle = {},
      okButtonProps,
      cancelButtonProps,
      trigger = 'hover',
    } = this.props;
    const {
      visible, x, y, direction,
    } = this.state;
    const prefix = getPrefixCls!(`${componentType}`, prefixCls);
    const popContainter = classnames(prefix, className, {
      [`${prefix}-show`]: visible,
    });

    const contentStyle = classnames(`${prefix}-content`);
    const arrow = classnames(`${prefix}-content-arrow`, {
      [`${prefix}-content-arrow-${direction}`]: direction,
    });
    /* eslint no-mixed-operators: 0 */
    const Tchildren = React.isValidElement(children) && React.Children.toArray(children) || [];
    const lastChild = React.Children.map(
      Tchildren,
      (child) => React.cloneElement(child, { id: this.tag }),
    );
    const confirmContent = (
      <div className={`${contentStyle}-inner`}>
        <div>
          <div style={{ display: 'inline-block' }}>{icon || <Icon type="exclamation-circle" className={`${contentStyle}-inner-icon`} />}</div>
          <div style={{ display: 'inline-block' }}>{title}</div>
        </div>
        <div className={`${contentStyle}-inner-btn`}>
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
          id={React.isValidElement(children) ? this.tag : undefined}
        >
          {React.isValidElement(children) ? lastChild : children}
        </span>
        <Portal {...({ getPopupContainer })}>
          <div
            className={popContainter}
            style={{ left: x, top: y, ...overlayStyle }}
            ref={this.getNode}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
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
