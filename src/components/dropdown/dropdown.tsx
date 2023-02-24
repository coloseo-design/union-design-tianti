import React, { ReactNode } from 'react';
import classNames from 'classnames';
import DropButton from './button';
import { getOffset } from '../utils/getOffset';
import Portal from '../common/portal';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { MENU_TAG_MENU } from '../menu/menu';

export interface DropdownProps {
  getPopupContainer?: () => HTMLElement | null;
  visible?: boolean;
  placement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | undefined;
  trigger?: ['hover' | 'click' | 'contextMenu'],
  onVisibleChange?: (visible: boolean) => void;
  overlayStyle?: React.CSSProperties;
  overlay: ReactNode;
  disabled?: boolean;
  prefixCls?: string;
  overlayClassName?: string;
  arrow?: boolean;
}

export interface DropdownState {
  visible?: boolean;
  x: number;
  y: number;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  static Button: typeof DropButton;

  node: HTMLSpanElement | undefined;

  childRef: HTMLElement | undefined;

  constructor(props: DropdownProps) {
    super(props);
    const { visible } = props;
    this.state = {
      visible: visible || false,
      x: 0,
      y: 0,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.dropHidden, true);
  }

  componentDidUpdate(prevProps: DropdownProps) {
    const { visible } = this.props;
    if (visible !== prevProps.visible) {
      this.setState({ visible });
    }
  }

  componentWillUnmount() {
    this.setState({ visible: false });
    document.removeEventListener('click', this.dropHidden, true);
  }

  dropHidden = (evt: MouseEvent) => {
    const { onVisibleChange, visible: propsVisible } = this.props;
    if (evt.target && this.childRef?.contains(evt.target as HTMLElement)) return;
    if (typeof propsVisible !== 'undefined') {
      if (!this.node?.contains(evt.target as HTMLElement)) {
        onVisibleChange?.(false);
      }
    } else {
      this.setState({ visible: false });
    }
  };

  getNode = (node: HTMLDivElement) => {
    this.node = node;
  };

  getChildRef = (child: HTMLElement) => {
    this.childRef = child;
  };

  over = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { trigger = ['hover'], disabled } = this.props;
    const { visible } = this.state;
    const target = evt.currentTarget;
    if (trigger.indexOf('hover') >= 0 && !disabled && !visible) {
      this.compute(target);
    }
  };

  out = () => {
    const { trigger = ['hover'], onVisibleChange, visible: propsVisible } = this.props;
    if (trigger.indexOf('hover') >= 0) {
      onVisibleChange && onVisibleChange(false);
      if (typeof propsVisible === 'undefined') {
        this.setState({ visible: false });
      }
    }
  };

  click = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const {
      trigger = ['hover'], disabled,
    } = this.props;
    const target = evt.currentTarget;
    if (trigger.indexOf('click') >= 0 && !disabled) {
      this.compute(target);
    }
  };

  handleContextMenu = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { trigger = ['hover'], disabled } = this.props;
    const target = evt.currentTarget;
    if (trigger.indexOf('contextMenu') >= 0 && !disabled) {
      evt.preventDefault();
      this.compute(target);
    }
  };

  compute = (target: HTMLElement) => {
    // evt.stopPropagation();
    // evt.nativeEvent.stopImmediatePropagation();
    const { visible } = this.state;
    const { visible: propsVisible } = this.props;
    const {
      placement = 'bottomCenter', arrow = false, onVisibleChange, getPopupContainer,
    } = this.props;
    // const target = evt.nativeEvent.target as HTMLSpanElement;
    if (target && this.node) {
      const { height: contentHeight, width: contentWidth } = this.node.getBoundingClientRect();
      const {
        width,
        height,
      } = target.getBoundingClientRect();
      const containter = getPopupContainer && getPopupContainer();
      const { top: offsetTop, left: offsetLeft } = getOffset(target, containter);
      const placementMap = {
        topCenter: {
          x: offsetLeft + (width - contentWidth) / 2,
          y: offsetTop - contentHeight - 4 - (arrow ? 5 : 0),
        },
        topLeft: {
          x: offsetLeft,
          y: offsetTop - contentHeight - 4 - (arrow ? 5 : 0),
        },
        topRight: {
          x: offsetLeft - (contentWidth - width),
          y: offsetTop - contentHeight - 4 - (arrow ? 5 : 0),
        },
        bottomCenter: {
          x: offsetLeft + (width - contentWidth) / 2,
          y: offsetTop + height + 4 + (arrow ? 5 : 0),
        },
        bottomRight: {
          x: offsetLeft - (contentWidth - width),
          y: offsetTop + height + 4 + (arrow ? 5 : 0),
        },
        bottomLeft: {
          x: offsetLeft,
          y: offsetTop + height + 4 + (arrow ? 5 : 0),
        },
      };
      this.setState({
        x: placementMap[placement].x,
        y: placementMap[placement].y,
      });
      onVisibleChange && onVisibleChange(!visible);
      if (typeof propsVisible === 'undefined') { // 用户控制visible 必须使用onVisibleChange 或者 传入更新的visible props
        this.setState({ visible: !visible });
      }
    }
  };

  renderDropdown = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { visible, x, y } = this.state;
    const {
      children,
      prefixCls,
      overlayClassName,
      arrow,
      placement = 'bottomCenter',
      overlay,
      getPopupContainer,
      overlayStyle,
      trigger = ['hover'],
    } = this.props;
    const prefix = getPrefixCls('drop-down', prefixCls);
    const dropwrapper = classNames(prefix, overlayClassName, {
      [`${prefix}-show`]: visible,
    });
    const containter = classNames(`${prefix}-containter`);
    const arrowStyle = classNames(`${prefix}-arrow`, {
      [`${prefix}-arrow-${placement}`]: placement,
    });

    let TChildren = (
      <span>
        {children}
      </span>
    );
    if (React.isValidElement(children)) {
      TChildren = React.cloneElement(children, {
        ref: this.getChildRef,
        onClick: (evt: React.MouseEvent<any>) => {
          this.click(evt);
          children.props.onClick && children.props.onClick(evt);
        },
        onMouseOver: (evt: React.MouseEvent<any>) => {
          this.over(evt);
          children.props.onMouseOver && children.props.onMouseOver(evt);
        },
        onMouseLeave: (evt: React.MouseEvent<any>) => {
          this.out();
          children.props.onMouseLeave && children.props.onMouseLeave(evt);
        },
        onContextMenu: (evt: React.MouseEvent<any>) => {
          this.handleContextMenu(evt);
          children.props.onContextMenu && children.props.onContextMenu(evt);
        },
      });
    } else {
      throw new Error(' props children must be ReactNode');
    }

    return (
      <>
        {TChildren}
        <Portal {...({ getPopupContainer })}>
          <div
            className={dropwrapper}
            style={{ left: x, top: y, ...overlayStyle }}
            ref={this.getNode}
            onMouseOver={() => trigger.indexOf('hover') >= 0 && this.setState({ visible: true })}
            onMouseOut={() => trigger.indexOf('hover') >= 0 && this.setState({ visible: false })}
            onClick={(e) => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); }}
          >
            {arrow && <div className={arrowStyle} />}
            <div className={containter}>
              {overlay && React.isValidElement(overlay) ? (() => {
                if ((overlay.type as unknown as Record<string, unknown>).tag === MENU_TAG_MENU) {
                  return React.cloneElement(overlay, {
                    popupClassName: `${prefix}-menu`,
                  });
                }
                return overlay;
              })() : ''}
            </div>
          </div>
        </Portal>
      </>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderDropdown}
      </ConfigConsumer>
    );
  }
}

Dropdown.Button = DropButton;

export default Dropdown;
