/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import Portal from '../pop-confirm/portal';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface DropMenuProps {
  prefixCls?: string;
  icon?: React.ReactNode;
  size?: 'default'| 'large'| 'small',
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'danger'| 'link',
  visible?: boolean;
  disabled?: boolean;
  overlay: any;
  overlayStyle?: React.CSSProperties;
  placement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' ;
  trigger?: ['hover' | 'click' | 'contextMenu'],
  onClick?: React.MouseEventHandler<HTMLElement>;
  onVisibleChange?: (visible: boolean) => void;
  getPopupContainer?: () => HTMLElement | null;
}

export interface DropMenuState {
  visible?: boolean;
  x: number;
  y: number;
}

class DropButton extends React.Component<DropMenuProps, DropMenuState> {
  nodeC: HTMLSpanElement | HTMLAnchorElement | undefined;

  nodeB: HTMLSpanElement | HTMLAnchorElement | undefined;

  constructor(props: DropMenuProps) {
    super(props);
    const { visible } = this.props;
    this.state = {
      visible: visible || false,
      x: 0,
      y: 0,
    };
  }

  componentDidMount() {
    const { visible } = this.props;
    if (visible) {
      this.compute(true);
    }
    document.addEventListener('click', this.dropHidden);
  }

  componentDidUpdate(prevProps: DropMenuProps) {
    const { visible } = this.props;
    if (visible !== prevProps.visible) {
      if (visible) {
        this.compute(true);
      }
      this.setState({ visible });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.dropHidden);
  }

  dropHidden = () => {
    const { visible: propsVisible } = this.props;
    if (propsVisible === undefined) { // 没有传值visible时候， visisble由自己改变
      this.setState({ visible: false });
      const { onVisibleChange } = this.props;
      onVisibleChange && onVisibleChange(false);
    }
  };

  getNodeC = (nodeC: HTMLDivElement) => {
    this.nodeC = nodeC;
  };

  getNodeB = (nodeB: HTMLButtonElement) => {
    this.nodeB = nodeB;
  }

  over = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { trigger = ['hover'], disabled } = this.props;
    if (trigger.indexOf('hover') >= 0 && !disabled) {
      this.compute(false, evt);
    }
  };

  out = () => {
    const { trigger = ['hover'], onVisibleChange } = this.props;
    if (trigger.indexOf('hover') >= 0) {
      this.setState({ visible: false });
      onVisibleChange && onVisibleChange(false);
    }
  };

  click = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { trigger = ['hover'], disabled, visible: propsVisible } = this.props;
    if (trigger.indexOf('click') >= 0 && !disabled && propsVisible === undefined) {
      this.compute(false, evt);
    }
  };

  handleContextMenu = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { trigger = ['hover'], disabled } = this.props;
    if (trigger.indexOf('contextMenu') >= 0 && !disabled) {
      evt.preventDefault();
      this.compute(false, evt);
    }
  };

  handleClick = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { onClick } = this.props;
    onClick && onClick(evt);
  };

  compute = (first: boolean, evt?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt && evt.stopPropagation();
    const { visible } = this.state;
    const { placement = 'bottomRight', onVisibleChange, visible: propsVisible } = this.props;
    if (!visible || first) {
      if (this.nodeB && this.nodeC) {
        const { height: contentHeight, width: contentWidth } = this.nodeC.getBoundingClientRect();
        const {
          width,
          height,
          left,
          top,
        } = this.nodeB.getBoundingClientRect();
        const offsetTop = Math.ceil(window.pageYOffset + top);
        const offsetLeft = Math.ceil(window.pageXOffset + left);
        const placementMap = {
          topCenter: {
            x: offsetLeft + (width - contentWidth) / 2,
            y: offsetTop - contentHeight - 4,
          },
          topLeft: {
            x: offsetLeft,
            y: offsetTop - contentHeight - 4,
          },
          topRight: {
            x: offsetLeft - (contentWidth - width),
            y: offsetTop - contentHeight - 4,
          },
          bottomCenter: {
            x: offsetLeft + (width - contentWidth) / 2,
            y: offsetTop + height + 4,
          },
          bottomRight: {
            x: offsetLeft - (contentWidth - width),
            y: offsetTop + height + 4,
          },
          bottomLeft: {
            x: offsetLeft,
            y: offsetTop + height + 4,
          },
        };
        this.setState({
          x: placementMap[placement].x,
          y: placementMap[placement].y,
          visible: true,
        });
        onVisibleChange && onVisibleChange(true);
      }
    } else {
      if (propsVisible === undefined) {
        this.setState({ visible: false });
      }
      onVisibleChange && onVisibleChange(false);
    }
  };

  renderDropButton = ({ getPrefixCls } : ConfigConsumerProps) => {
    const {
      prefixCls,
      children,
      icon,
      size = 'default',
      type = 'default',
      disabled = false,
      overlayStyle,
      trigger = ['hover'],
      overlay,
      getPopupContainer,
    } = this.props;
    const { visible, x, y } = this.state;
    const pre = getPrefixCls('drop-down', prefixCls);
    const dropGroupStyle = classNames(`${pre}-btngroup`);
    const buttonStyle = classNames(`${pre}-btn`, {
      [`${pre}-btn-size-${size}`]: size,
      [`${pre}-btn-type-${type}`]: type,
      [`${pre}-btn-disabled`]: disabled,
    });
    const buttonIcon = classNames(`${pre}-btnIcon`, {
      [`${pre}-btnIcon-size-${size}`]: size,
      [`${pre}-btnIcon-type-${type}`]: type,
      [`${pre}-btnIcon-disabled`]: disabled,
    });
    const dropwrapper = classNames(pre, {
      [`${pre}-show`]: visible,
    });
    const containter = classNames(`${pre}-containter`);

    return (
      <>
        <div className={dropGroupStyle}>
          <button className={buttonStyle} type="button" onClick={this.handleClick}>
            {children}
          </button>
          <button
            className={buttonIcon}
            type="button"
            onMouseOver={this.over}
            onMouseOut={this.out}
            onClick={this.click}
            onContextMenu={this.handleContextMenu}
            ref={this.getNodeB}
          >
            {icon || <Icon type="more" />}
          </button>
        </div>
        <Portal {...({ getPopupContainer })}>
          <div
            className={dropwrapper}
            style={{ left: x, top: y, ...overlayStyle }}
            ref={this.getNodeC}
            onMouseOver={() => trigger.indexOf('hover') >= 0 && this.setState({ visible: true })}
            onMouseOut={() => trigger.indexOf('hover') >= 0 && this.setState({ visible: false })}
          >
            <div className={containter}>
              {overlay && React.isValidElement(overlay) ? React.cloneElement(
                overlay,
                { popupClassName: `${pre}-menu` },
              ) : ''}
            </div>
          </div>
        </Portal>
      </>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderDropButton}
      </ConfigConsumer>
    );
  }
}

export default DropButton;
