import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
import Icon from '../icon';

export type AlertType = 'error' | 'warning' | 'success' | 'info';

export interface AlertProps extends HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  type?: AlertType;
  message?: string | React.ReactNode;
  description?: string | React.ReactNode;
  closeText?: string | React.ReactNode;
  closable?: boolean;
  showIcon?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  afterClose?: () => void;
  banner?: boolean;
  onClose?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  className?: string;
}

export interface AlertState {
  close: boolean;
  // blockNone: boolean;
}

export interface MapString {
  [x: string]: string;
}

class Alert extends React.Component<AlertProps, AlertState> {
  constructor(props: AlertProps) {
    super(props);
    this.state = {
      close: false,
    };
  }

  Close = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { afterClose, onClose, closable } = this.props;
    if (closable) {
      onClose && onClose(event);
      afterClose && afterClose();
      this.setState({ close: true });
    } else {
      onClose && onClose(event);
    }
  }

  renderAlert = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      type = 'success',
      message = '',
      description,
      closeText,
      closable,
      showIcon,
      icon,
      banner,
      className,
      ...rest
    } = this.props;
    const { close } = this.state;
    const show = banner ? true : showIcon;
    const bType = banner && type === 'info' ? 'warning' : type;
    const prefix = getPrefixCls('alert', prefixCls);
    const alert = classNames(`${prefix}`, className, {
      [`${prefix}-fadeOut`]: close,
      [`${prefix}-${bType}`]: bType,
      [`${prefix}-banner`]: banner,
      [`${prefix}-has_icon`]: show,
      [`${prefix}-hasDes`]: description,
      [`${prefix}-hasDes_icon`]: description && show,
    });

    const alertIcon = classNames(`${prefix}-icon`, {
      [`${prefix}-icon-hasDes`]: description,
    });

    const alertContent = classNames(`${prefix}-content`, {
      [`${prefix}-content-hasClose`]: closable || closeText,
    });
    const alertMessage = classNames(`${prefix}-message`, {
      [`${prefix}-message-hasDes`]: description,
    });
    const alertDes = classNames(`${prefix}-description`);
    const alertClose = classNames(`${prefix}-close`, {
      [`${prefix}-close-hasDes`]: description,
    });
    const typeMapping: MapString = {
      error: 'delete',
      success: 'success',
      warning: 'exclamation-circle',
      info: 'exclamation-circle',
    };
    return (
      <>
        {!close && (
        <div className={alert} {...rest}>
          {show && (
          <span
            className={alertIcon}
            style={{ transform: bType === 'info' ? 'rotate(-180deg)' : 'rotate(0deg)' }}
          >
            {icon || <Icon type={typeMapping[bType]} />}
          </span>
          )}
          <div className={alertContent}>
            <span className={alertMessage}>{message}</span>
            <span className={alertDes}>{description}</span>
          </div>
          <span className={alertClose} onClick={this.Close}>
            {closeText || (closable ? <Icon type="close" /> : null)}
          </span>
        </div>
        )}
      </>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderAlert}
      </ConfigConsumer>
    );
  }
}

export default Alert;
