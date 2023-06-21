/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import { getOffset } from '../utils/getOffset';
import Portal from '../common/portal';
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
  children?: any;
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
      this.compute();
    }
    document.addEventListener('click', this.dropHidden, true);
  }

  componentDidUpdate(prevProps: DropMenuProps) {
    const { visible } = this.props;
    if (visible !== prevProps.visible) {
      if (visible) {
        this.compute();
      }
      this.setState({ visible });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.dropHidden, true);
  }

  dropHidden = (evt: MouseEvent) => {
    const { onVisibleChange, visible: propsVisible } = this.props;
    if (evt.target && this.nodeB?.contains(evt.target as HTMLElement)) return;
    if (typeof propsVisible !== 'undefined') {
      if (!this.nodeC?.contains(evt.target as HTMLElement)) {
        onVisibleChange?.(false);
      }
    } else {
      this.setState({ visible: false });
    }
  };

  getNodeC = (nodeC: HTMLDivElement) => {
    this.nodeC = nodeC;
  };

  getNodeB = (nodeB: HTMLButtonElement) => {
    this.nodeB = nodeB;
  }

  over = () => {
    const { trigger = ['hover'], disabled } = this.props;
    if (trigger.indexOf('hover') >= 0 && !disabled) {
      this.compute();
    }
  };

  out = () => {
    const { trigger = ['hover'], onVisibleChange, visible: propsVisible } = this.props;
    if (trigger.indexOf('hover') >= 0) {
      onVisibleChange && onVisibleChange(false);
      if (propsVisible === undefined) {
        this.setState({ visible: false });
      }
    }
  };

  click = () => {
    const { trigger = ['hover'], disabled } = this.props;
    if (trigger.indexOf('click') >= 0 && !disabled) {
      this.compute();
    }
  };

  handleContextMenu = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { trigger = ['hover'], disabled } = this.props;
    if (trigger.indexOf('contextMenu') >= 0 && !disabled) {
      evt.preventDefault();
      this.compute();
    }
  };

  handleClick = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { onClick } = this.props;
    onClick && onClick(evt);
  };

  compute = () => {
    const { visible } = this.state;
    const {
      placement = 'bottomRight', onVisibleChange, visible: propsVisible, getPopupContainer,
    } = this.props;
    if (this.nodeB && this.nodeC) {
      const { height: contentHeight, width: contentWidth } = this.nodeC.getBoundingClientRect();
      const {
        width,
        height,
      } = this.nodeB.getBoundingClientRect();
      const containter = getPopupContainer && getPopupContainer();
      const { top: offsetTop, left: offsetLeft } = getOffset(this.nodeB, containter);
      const gap = 4;
      const placementMap = {
        topCenter: {
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
        bottomCenter: {
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
      };
      this.setState({
        x: placementMap[placement].x,
        y: placementMap[placement].y,
      });
      onVisibleChange && onVisibleChange(!visible);
      if (propsVisible === undefined) { // 用户控制visible 必须使用onVisibleChange 或者 传入更新的visible props
        this.setState({ visible: !visible });
      }
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
          <button
            className={buttonStyle}
            type="button"
            onClick={this.handleClick}
          >
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
            onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}
          >
            <div className={containter}>
              {overlay && React.isValidElement(overlay) ? React.cloneElement<any>(
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
