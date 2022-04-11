/* eslint-disable no-nested-ternary */
import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import Portal from '../common/portal';
import { ButtonProps } from '../button/type';
import { Button } from '../index';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import {
  renderMethod, success, error, info, warning, confirm, ModalMethodProps,
} from './method';

export interface ModalProps {
  title?: React.ReactNode | string
  visible: boolean
  onOk?: (e: React.MouseEvent<HTMLElement>) => void
  onCancel?: (e: React.MouseEvent<HTMLElement> | KeyboardEvent) => void
  okText?: React.ReactNode | string
  cancelText?: React.ReactNode | string
  width?: string | number,
  prefixCls?: string,
  className?: string,
  footer?: string | React.ReactNode,
  style?: React.CSSProperties,
  bodyStyle?: React.CSSProperties,
  closable?: boolean,
  closeIcon?: React.ReactNode,
  confirmLoading?: boolean,
  mask?: boolean,
  maskClosable?: boolean,
  maskStyle?: React.CSSProperties,
  okType?: 'link' | 'primary' | 'ghost' | 'default' | 'dashed' | 'danger' | undefined,
  wrapClassName?: string,
  zIndex?: number,
  okButtonProps?: ButtonProps,
  cancelButtonProps?: ButtonProps,
  keyboard?: boolean,
  getPopupContainer?: () => HTMLElement | null;
  centered?: boolean;

  content?: string | React.ReactNode,
  methodType?: string, // 代表modal.method方法（method不需要header)
  icon?: string| React.ReactNode,
  okCancel?: boolean, // modal提示框不需要展示 OK按钮
  destroyOnClose?: boolean, // 关闭提示框是否销毁子元素
}
export interface ModalState {
  visible?: boolean;
  modalTransition?: boolean;
}

export interface MappString {
  [x: string]: string;
}

const IconMapping: MappString = {
  error: 'delete',
  success: 'success',
  warning: 'exclamation-circle',
  confirm: 'question-circle',
  info: 'exclamation-circle',
};

class Modal extends React.Component<ModalProps, ModalState, ModalMethodProps> {
  static info: (props: ModalMethodProps) => void;

  static success: (props: ModalMethodProps) => void;

  static error: (props: ModalMethodProps) => void;

  static warning: (props: ModalMethodProps) => void;

  static confirm: (props: ModalMethodProps) => void;

  constructor(props: ModalProps) {
    super(props);
    const { visible } = props;
    this.state = {
      visible: visible || false,
      modalTransition: false,
    };
  }

  componentDidMount() {
    document.onkeydown = (evt: KeyboardEvent) => {
      const { onCancel, keyboard = true, methodType } = this.props;
      if (evt.key === 'Escape' && keyboard && !methodType) {
        onCancel && onCancel(evt);
      }
    };
  }

  componentDidUpdate(prevProps: ModalProps) {
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

  componentWillUnmount() {
    this.setState({ visible: false });
    document.onkeydown = null;
  }

  handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    const { onCancel, methodType } = this.props;
    if (!methodType) {
      onCancel && onCancel(e);
    } else {
      this.setState({ modalTransition: true });
      onCancel && onCancel(e);
      setTimeout(() => {
        this.setState({ modalTransition: false, visible: false });
      }, 300);
    }
  }

  handleMask = (e: React.MouseEvent<HTMLElement>) => {
    const { maskClosable = true, onCancel, methodType } = this.props;
    if (maskClosable) {
      if (!methodType) {
        onCancel && onCancel(e);
      } else {
        this.setState({ modalTransition: true });
        onCancel && onCancel(e);
        setTimeout(() => {
          this.setState({ modalTransition: false, visible: false });
        }, 300);
      }
    }
  }

  handleOk = (e: React.MouseEvent<HTMLElement>) => {
    const { onOk, methodType } = this.props;
    if (!methodType) {
      onOk && onOk(e);
    } else {
      this.setState({ modalTransition: true });
      onOk && onOk(e);
      setTimeout(() => {
        this.setState({ modalTransition: false, visible: false });
      }, 300);
    }
  }

  handleParent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      this.handleMask(e);
    }
  }

  renderModal = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      className,
      children,
      title,
      footer,
      style,
      bodyStyle,
      cancelText,
      closable = true,
      closeIcon,
      confirmLoading,
      mask = true,
      maskStyle,
      okText,
      okType = 'primary',
      width = 511,
      zIndex = 1000,
      wrapClassName,
      okButtonProps,
      cancelButtonProps,
      methodType,
      content,
      icon,
      centered,
      getPopupContainer,
      destroyOnClose = false,
    } = this.props;
    const { visible, modalTransition } = this.state;
    const prefix = getPrefixCls('modal', prefixCls);
    const container = classNames(prefix, className, {
      [`${prefix}-show`]: visible,
    });
    const maskCalss = classNames(`${prefix}-mask`, {
      [`${prefix}-mask-hidden`]: !mask,
      [`${prefix}-mask-transition`]: modalTransition,
    });
    const wrapper = classNames(`${prefix}-wrapper`, wrapClassName, {
      [`${prefix}-centered`]: centered,
    });
    const wrapperContent1 = classNames(`${prefix}-wrapper-content`, {
      [`${prefix}-wrapper-content-hidden`]: modalTransition,
    });
    const wrapperContent = classNames(`${prefix}-wrapper-content`);
    const iconStyle = classNames(`${prefix}-wrapper-content-methodBody-${methodType}`);

    const operationBtn = (
      <div>
        <Button {...cancelButtonProps} style={{ marginRight: 8 }} onClick={this.handleCancel}>{cancelText || '退出'}</Button>
        <Button {...okButtonProps} type={okType} loading={confirmLoading} onClick={this.handleOk}>{okText || '确定'}</Button>
      </div>
    );

    const normalRender = (
      <>
        <div className={`${wrapperContent}-header`}>
          <div className={`${wrapperContent}-header-title`}>{title}</div>
          {closable && (
            <div className={`${wrapperContent}-header-close`} onClick={this.handleCancel}>
              {closeIcon || <Icon type="close" style={{ fontSize: 16 }} />}
            </div>
          )}
        </div>
        <div className={`${wrapperContent}-body`} style={bodyStyle}>{children}</div>
        {footer !== null && (
          <div className={`${wrapperContent}-footer`}>
            {footer || operationBtn}
          </div>
        )}
      </>
    );
    const methodRender = (
      <>
        <div className={`${wrapperContent}-methodBody`}>
          <span className={classNames(`${wrapperContent}-methodBody-icon`, iconStyle)} style={{ transform: methodType === 'info' ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            {icon && React.isValidElement(icon) ? icon : <Icon type={icon && typeof icon === 'string' ? icon : methodType && IconMapping[methodType]} style={{ fontSize: 24 }} />}
          </span>
          <span className={`${wrapperContent}-methodBody-title`}>{title}</span>
          <span className={`${wrapperContent}-methodBody-content`}>{content}</span>
        </div>
        <div className={`${wrapperContent}-footer`}>
          {methodType !== 'confirm' && <Button type="primary" onClick={this.handleCancel}>知道了</Button>}
          {methodType === 'confirm' && operationBtn}
        </div>
      </>
    );

    const hasRoot = document.querySelector('#uni-modal-root1');
    const v = destroyOnClose ? visible : hasRoot ? true : visible;

    return v
    && (
    <Portal {...({ getPopupContainer })}>
      <div id={destroyOnClose ? undefined : 'uni-modal-root1'}>
        <div className={container}>
          <div className={maskCalss} style={{ ...maskStyle, zIndex }} />
          <div className={wrapper} style={{ zIndex }} onClick={this.handleParent}>
            <div
              className={wrapperContent1}
              style={{ ...style, width }}
            >
              {methodType ? methodRender : normalRender}
            </div>
          </div>
        </div>
      </div>
    </Portal>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderModal}
      </ConfigConsumer>
    );
  }
}
Modal.success = (props: ModalMethodProps) => renderMethod(success(props));
Modal.info = (props: ModalMethodProps) => renderMethod(info(props));
Modal.error = (props: ModalMethodProps) => renderMethod(error(props));
Modal.warning = (props: ModalMethodProps) => renderMethod(warning(props));
Modal.confirm = (props: ModalMethodProps) => renderMethod(confirm(props));

export default Modal;
