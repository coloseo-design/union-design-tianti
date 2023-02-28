import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
import Icon from '../icon';

export type AlertType = 'error' | 'warning' | 'success' | 'info';

export interface AlertProps {
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
  blockNone: boolean;
}

export interface MappString {
  [x: string]: string;
}

class Alert extends React.Component<AlertProps, AlertState> {
  constructor(props: AlertProps) {
    super(props);
    this.state = {
      close: false,
      blockNone: false,
    };
  }

  Close = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { afterClose, onClose, closable } = this.props;
    if (closable) {
      this.setState({ close: true });
      onClose && onClose(event);
      afterClose && afterClose();
      this.setState({ blockNone: true, close: false });
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
      style = {},
      banner,
      className,
    } = this.props;
    const { close, blockNone } = this.state;
    const show = banner ? true : showIcon;
    const bType = banner && type === 'info' ? 'warning' : type;
    const prefix = getPrefixCls('alert', prefixCls);
    const alert = classNames(`${prefix}`, className, {
      [`${prefix}-fadeOut`]: close,
      [`${prefix}-${bType}`]: bType,
      [`${prefix}-banner`]: banner,
      [`${prefix}-hasDes`]: description && show,
      [`${prefix}-hasDes-has_no_icon`]: description && !show,
      [`${prefix}-has_no_icon`]: !show && !description,
    });

    const alertIconContent = classNames(description ? `${prefix}-icon-content-hasDes` : `${prefix}-icon-content`);
    const alertIcon = classNames(`${prefix}-icon-${bType}`);
    const alertMessage = classNames(`${prefix}-message`, {
      [`${prefix}-message-hasDes`]: description,
    });
    const alertDes = classNames(`${prefix}-description`);
    const alertClose = classNames(description ? `${prefix}-des-close` : `${prefix}-close`);
    const typeMapping: MappString = {
      error: 'delete',
      success: 'success',
      warning: 'exclamation-circle',
    };
    return (
      <>
        {!blockNone && (
        <div className={alert} style={style}>
          {bType === 'info' && show
          && (
          <span
            style={{ transform: icon ? 'rotate(0deg)' : 'rotate(-180deg)', top: description ? 18 : 9 }}
            className={alertIconContent}
          >
            {icon || <span className={alertIcon}><Icon type="exclamation-circle" style={{ fontSize: description ? 24 : 16 }} /></span>}
          </span>
          )}
          {bType !== 'info' && show
          && (
          <span className={alertIconContent}>
            {icon
              || (
                <span className={alertIcon}>
                  <Icon
                    type={typeMapping[bType]}
                    style={{ fontSize: description ? 24 : 16 }}
                  />
                </span>
              )}
          </span>
          )}
          <span className={alertMessage}>{message}</span>
          <span className={alertDes}>{description}</span>
          <span className={alertClose} onClick={this.Close}>
            {closeText || (closable ? <Icon type="close" style={{ fontSize: 12 }} /> : null)}
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
