import React, { ReactNode } from 'react';
import classNames from 'classnames';
import DropButton from './button';
import Portal from '../pop-confirm/portal';
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
    document.addEventListener('click', this.dropHidden);
  }

  componentDidUpdate(prevProps: DropdownProps) {
    const { visible } = this.props;
    if (visible !== prevProps.visible) {
      this.setState({ visible });
    }
  }

  componentWillUnmount() {
    this.setState({ visible: false });
    document.removeEventListener('click', this.dropHidden);
  }

  dropHidden = () => {
    const { visible: propsVisible } = this.props;
    if (propsVisible === undefined) {
      this.setState({ visible: false });
      const { onVisibleChange } = this.props;
      onVisibleChange && onVisibleChange(false);
    }
  };

  getNode = (node: HTMLDivElement) => {
    this.node = node;
  };

  over = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { trigger = ['hover'], disabled } = this.props;
    if (trigger.indexOf('hover') >= 0 && !disabled) {
      this.compute(evt);
    }
  };

  out = () => {
    const { trigger = ['hover'], onVisibleChange, visible: propsVisible } = this.props;
    if (trigger.indexOf('hover') >= 0) {
      if (propsVisible === undefined) {
        this.setState({ visible: false });
      }
      onVisibleChange && onVisibleChange(false);
    }
  };

  click = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const {
      trigger = ['hover'], onVisibleChange, disabled, visible: propsVisible,
    } = this.props;
    const { visible } = this.state;
    if (trigger.indexOf('click') >= 0 && !disabled) {
      if (!visible) {
        this.compute(evt);
      } else { // 传了visible之后 visible完全由外面控制
        onVisibleChange && onVisibleChange(false);
        if (propsVisible === undefined) {
          this.setState({ visible: false });
        }
      }
    }
  };

  handleContextMenu = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { trigger = ['hover'], disabled } = this.props;
    if (trigger.indexOf('contextMenu') >= 0 && !disabled) {
      evt.preventDefault();
      this.compute(evt);
    }
  };

  compute = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
    const { visible } = this.state;
    const { visible: propsVisible } = this.props;
    const {
      placement = 'bottomCenter', arrow = false, onVisibleChange,
    } = this.props;
    const target = evt.nativeEvent.target as HTMLSpanElement;
    if (!visible || propsVisible) {
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
          visible: propsVisible !== undefined ? propsVisible : true,
        });
        onVisibleChange && onVisibleChange(propsVisible !== undefined ? propsVisible : true);
      }
    }
  };

  renderDropdown = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { visible } = this.state;
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
    const { x, y } = this.state;
    const prefix = getPrefixCls('drop-down', prefixCls);
    const dropwrapper = classNames(prefix, overlayClassName, {
      [`${prefix}-show`]: visible,
    });
    const containter = classNames(`${prefix}-containter`);
    const arrowStyle = classNames(`${prefix}-arrow`, {
      [`${prefix}-arrow-${placement}`]: placement,
    });
    return (
      <>
        <span
          onMouseOver={this.over}
          onMouseOut={this.out}
          onClick={this.click}
          onContextMenu={this.handleContextMenu}
        >
          {children}
        </span>
        <Portal {...({ getPopupContainer })}>
          <div
            className={dropwrapper}
            style={{ left: x, top: y, ...overlayStyle }}
            ref={this.getNode}
            onMouseOver={() => trigger.indexOf('hover') >= 0 && this.setState({ visible: true })}
            onMouseOut={() => trigger.indexOf('hover') >= 0 && this.setState({ visible: false })}
          >
            {arrow && <div className={arrowStyle} />}
            <div className={containter}>
              {overlay && React.isValidElement(overlay) ? (() => {
                if ((overlay.type as unknown as Record<string, unknown>).tag === MENU_TAG_MENU) {
                  return React.cloneElement(overlay, {
                    who: 'drop-down',
                    popupClassName: `${prefix}-menu`,
                    inlineCollapsedMaxWidth: overlayStyle?.width,
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
