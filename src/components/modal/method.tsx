import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './index';
import { BaseButtonProps } from '../button/button';

export type focusButton = 'ok' | 'cancel';

export interface ModalMethodProps {
  autoFocusButton?: null| focusButton,
  title?: React.ReactNode | string,
  onOk?: (e: React.MouseEvent<HTMLElement>) => void,
  onCancel?: (e: React.MouseEvent<HTMLElement> | KeyboardEvent) => void,
  okText?: string
  cancelText?: string
  width?: string | number,
  prefixCls?: string,
  className?: string,
  footer?: string | React.ReactNode,
  mask?: boolean,
  maskClosable?: boolean,
  okType?: 'link' | 'primary' | 'ghost' | 'default' | 'dashed' | 'danger' | undefined,
  zIndex?: number,
  okButtonProps?: BaseButtonProps,
  cancelButtonProps?: BaseButtonProps,
  centered?: boolean,
  content?: string | React.ReactNode,
  methodType?: string, // 代表modal.method方法（method不需要header)
  icon?: string| React.ReactNode,
  okCancel?: boolean, // modal提示框（除confirm外）不需要展示 OK按钮
}

export function success(props: ModalMethodProps) {
  const { maskClosable } = props;
  return {
    ...props,
    okCancel: false,
    methodType: 'success',
    visible: true,
    footer: null,
    maskClosable: maskClosable || false,
  };
}
export function error(props: ModalMethodProps) {
  const { maskClosable } = props;
  return {
    ...props,
    okCancel: false,
    methodType: 'error',
    visible: true,
    footer: null,
    maskClosable: maskClosable || false,
  };
}

export function info(props: ModalMethodProps) {
  const { maskClosable } = props;
  return {
    ...props,
    okCancel: false,
    methodType: 'info',
    visible: true,
    footer: null,
    maskClosable: maskClosable || false,
  };
}

export function warning(props: ModalMethodProps) {
  const { maskClosable } = props;
  return {
    ...props,
    okCancel: false,
    methodType: 'warning',
    visible: true,
    footer: null,
    maskClosable: maskClosable || false,
  };
}
export function confirm(props: ModalMethodProps) {
  const { maskClosable } = props;
  return {
    ...props,
    okCancel: false,
    methodType: 'confirm',
    visible: true,
    footer: null,
    maskClosable: maskClosable || false,
  };
}
export function renderMethod(props: ModalMethodProps) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(
    <Modal
      {...props}
    />,
    div,
  );
}
