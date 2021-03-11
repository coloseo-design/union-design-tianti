import React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from './../config-provider';
import classNames from 'classnames';
import Icon from '../icon';
import Button, { BaseButtonProps } from '../button/button';
import Portal from '../pop-confirm/portal';



export interface ModalProps {
  title?: React.ReactNode | string
  visible?: boolean
  onOk?: (e: React.MouseEvent<HTMLElement>) => void
  onCancel?: (e: React.MouseEvent<HTMLElement> | KeyboardEvent) => void
  okText?: React.ReactNode | string
  cancelText?: React.ReactNode | string
  width?: string | number,
  prefixCls?: string,
  className?: string,
  footer?: string | React.ReactNode,
  style?: object,
  bodyStyle?: object,
  closable?: boolean,
  closeIcon?: React.ReactNode,
  confirmLoading?: boolean,
  mask?: boolean,
  maskClosable?: boolean,
  maskStyle?: object,
  okType?: "link" | "primary" | "ghost" | "default" | "dashed" | "danger" | undefined,
  wrapClassName?: string,
  zIndex?: number,
  okButtonProps?: BaseButtonProps,
  cancelButtonProps?: BaseButtonProps,
  keyboard?: boolean,
  getPopupContainer?: () => HTMLElement | null;
  centered?: boolean;

  content?: string | React.ReactNode,
  methodType?: string, // 代表modal.method方法（method不需要header)
  icon?: string| React.ReactNode,
  okCancel?: boolean, // modal提示框不需要展示 OK按钮
}
export interface ModalState {
  visible?: boolean;
  modalTransition?: boolean;
}

export interface MappString {
  [x: string]: string;
};

const IconMapping: MappString = {
  'error': 'delete',
  'success': 'success',
  'warning': 'exclamation-circle',
  'confirm': 'question-circle',
  'info': 'exclamation-circle',
};

class Modal extends React.Component<ModalProps, ModalState>{
  state: ModalState = {
    visible: this.props.visible || false,
    modalTransition: false,
  }
  handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    const { onCancel, methodType } = this.props;
    if (onCancel && !methodType) {
      onCancel && onCancel(e);
    } else {
      this.setState({ modalTransition: true });
      setTimeout(()=> {
        this.setState({ modalTransition: false, visible: false });
      }, 300);
    }
  }

  handleOk = (e: React.MouseEvent<HTMLElement>) => {
    const { onOk, methodType } = this.props;
    if (onOk && !methodType) {
      onOk && onOk(e);
    } else {
      this.setState({ modalTransition: true });
      setTimeout(() => {
        this.setState({ modalTransition: false, visible: false });
      }, 300)
    }
  }

  componentDidUpdate (prevProps: ModalProps) {
    const { visible } = this.props;
    if (visible !== undefined && visible !== prevProps.visible) {
      if (visible === false) {
        this.setState({ modalTransition: true });
        setTimeout(() => {
          this.setState({ modalTransition: false, visible });
        }, 300);
      } else {
        this.setState({ visible });
      }
    }
  }
  handleMask = (e: React.MouseEvent<HTMLElement>) => {
    const { maskClosable=true, onCancel, methodType } = this.props;
    if (maskClosable) {
      if (onCancel && !methodType) {
        onCancel(e);
      } else {
        this.setState({ modalTransition: true });
        setTimeout(() => {
          this.setState({ modalTransition: false, visible: false });
        }, 300)
      }
    }
  }
  componentDidMount() {
    document.onkeydown = (ev: KeyboardEvent) => {
      const { onCancel, keyboard=true, methodType } = this.props;
      if (ev.keyCode === 27 && keyboard && !methodType) {
        onCancel && onCancel(ev);
      }
    };
  }
  componentWillUnmount() {
    document.onkeydown = null;
  }
  renderModal = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      className,
      children,
      title,
      footer,
      style={},
      bodyStyle,
      cancelText,
      closable=true,
      closeIcon,
      confirmLoading,
      mask=true,
      maskStyle={},
      okText,
      okType="primary",
      width=511,
      zIndex=1000,
      wrapClassName,
      okButtonProps,
      cancelButtonProps,
      methodType,
      content,
      icon,
      centered,
      getPopupContainer,
    } =this.props;
    const { visible, modalTransition } = this.state;
    const prefix = getPrefixCls('modal', prefixCls);
    const container = classNames(prefix, className, {
      [`${prefix}-show`]: visible,
    })
    const maskCalss = classNames(`${prefix}-mask`, {
      [`${prefix}-mask-hidden`]: !mask,
    });
    const wrapper = classNames(`${prefix}-wrapper`, wrapClassName, {
      [`${prefix}-centered`]: centered,
    });
    const wrapperContent = classNames(`${prefix}-wrapper-content`, {
      [`${prefix}-wrapper-content-hidden`]: modalTransition,
    });
    const iconStyle = classNames(`${wrapper}-content-methodBody-${methodType}`);

    const operationBtn = (
      <div>
        <Button {...cancelButtonProps} style={{ marginRight: 8 }} onClick={this.handleCancel}>{cancelText ? cancelText : '退出'}</Button>
        <Button {...okButtonProps} type={okType} onClick={this.handleOk}>{confirmLoading && <Icon type="loading" />}{okText ? okText : '确定'}</Button>
      </div>
    )

    return (
      <Portal {...({ getPopupContainer })}>
        <div className={container}>
          <div className={maskCalss} style={{ ...maskStyle, zIndex: zIndex }}></div>
          <div className={wrapper} onClick={this.handleMask} style={{ zIndex: zIndex }}>
            <div
              className={wrapperContent}
              style={{ ...style, width: width }}
              onClick={(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => evt.stopPropagation()}
            >
              {!methodType &&
                <div className={`${wrapperContent}-header`}>
                  <div className={`${wrapperContent}-header-title`}>{title}</div>
                  {closable &&
                    <div className={`${wrapperContent}-header-close`} onClick={this.handleCancel}>
                      {closeIcon ? closeIcon : <Icon type="close" style={{ fontSize: 16 }} />}
                    </div>
                  }
                </div>
              }

              {methodType ? (
                <div className={`${wrapperContent}-methodBody`}>
                  <span className={`${wrapperContent}-methodBody-icon`} style={{ transform: methodType === 'info' ? 'rotate(180deg)' : 'rotate(0deg)'}}>
                    {icon && React.isValidElement(icon) ? icon : <Icon type={icon && typeof icon === 'string' ? icon : IconMapping[methodType]} className={iconStyle} style={{ fontSize: 24 }} />}
                  </span>
                  <span className={`${wrapperContent}-methodBody-title`}>{title}</span>
                  <span className={`${wrapperContent}-methodBody-content`}>{content}</span>
                </div>
              ) : (
                <div className={`${wrapperContent}-body`} style={bodyStyle}>{children}</div>
              )}

              {footer !== null &&
                <div className={`${wrapperContent}-footer`}>
                  {footer ? footer : operationBtn}
                </div>
              }
              {
                methodType && <div className={`${wrapperContent}-footer`}>
                  {methodType !== 'confirm' && <Button type="primary" onClick={this.handleCancel}>知道了</Button>}
                  {methodType === 'confirm' && operationBtn}
                </div>
              }
            </div>
          </div>
        </div>
      </Portal>
    )
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderModal}
      </ConfigConsumer>
    );
  }
}


export default Modal
