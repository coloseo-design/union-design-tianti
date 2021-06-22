/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { CSSProperties, ReactNode } from 'react';

import ReactDOM from 'react-dom';
import { Icon } from '..';
import { BaseComponent, BaseProps } from '../common/base-component';
import { uuid } from '../utils/uuid';

const NOTIFICATION_NAME = 'NOTIFICATION_MESSAGE';

type NotificationConfig = {
  className?: string;
  description?: ReactNode;
  duration?: number;
  icon?: string;
  key?: string | number;
  style?: CSSProperties;
  message?: string;
  btn?: ReactNode;
  onClose?: () => void;
  onClick?: () => void;
};

type NotificationType = 'success' | 'error' | 'info' | 'warning';

type NotificationProps = {
  uuid: string;
  type: NotificationType;
} & NotificationConfig & BaseProps;

export default class Notification extends BaseComponent<NotificationProps> {
  public static tag = NOTIFICATION_NAME;

  public static config: NotificationConfig = {};

  public static success = (config: NotificationConfig) => Notification.open({
    ...config,
    icon: 'success',
  }, 'success');

  public static error = (config: NotificationConfig) => Notification.open({
    ...config,
    icon: 'delete',
  }, 'error');

  public static info = (config: NotificationConfig) => Notification.open({
    ...config,
    icon: 'exclamation-circle',
  }, 'info');

  public static warning = (config: NotificationConfig) => Notification.open({
    ...config,
    icon: 'exclamation-circle',
  }, 'warning');

  public static open = (config: NotificationConfig, type?: NotificationType) => {
    const props = { ...Notification.config };

    Object.assign(props, config);

    props.duration ??= 4.5;
    props.onClose ??= () => { };
    props.className ??= '';
    props.onClick ??= () => { };
    props.key ??= uuid();
    props.style ??= {};
    props.message ??= '';

    Notification.msgs[`${props.key}`] = <Notification {...props} key={`${props.key}`} uuid={`${props.key}`} type={type ?? 'info'} />;

    Notification.renderToBody();
  }

  public static destroy = (key: string | number) => {
    delete Notification.msgs[`${key}`];
    Notification.renderToBody();
  };

  private static msgs: { [key: string]: ReactNode } = {};

  private static bodyMessageNode: HTMLDivElement = document.createElement('div');

  private static renderToBody = () => {
    const msgs = Object.values(Notification.msgs);
    if (msgs.length > 0) {
      Object.assign(Notification.bodyMessageNode.style, {
        position: 'fixed',
        top: 0,
        right: 0,
        pointerEvents: 'none',
      } as CSSProperties);
    }
    ReactDOM.render(
      <>
        {msgs}
      </>,
      Notification.bodyMessageNode,
    );
  };

  protected classPrefix = 'notification';

  public constructor(props: NotificationProps) {
    super(props);

    if (!document.body.contains(Notification.bodyMessageNode)) {
      document.body.appendChild(Notification.bodyMessageNode);
    }

    if (props.duration) {
      setTimeout(() => {
        props.onClose?.();
        Notification.destroy(props.uuid);
      }, props.duration * 1000);
    }
  }

  protected view = () => {
    const {
      btn, icon, uuid, description, message, onClick, className, style, type,
    } = this.props;

    return (
      <div
        onClick={onClick}
        className={this.getPrefixClass('wrap')}
      >
        <div
          className={this.classNames(
            className,
            this.gpc('container'),
          )}
          style={style}
        >
          <div className={this.gpc('head')}>
            {icon && (
              <div
                className={this.classNames(
                  this.gpc('icon'),
                  {
                    [this.gpc('icon-rotate')]: type === 'info' && icon === 'exclamation-circle',
                  },
                )}
                style={{ color: this.handleColor() }}
              >
                <Icon type={icon} />
              </div>
            )}
            <div className={this.gpc('title')} style={{ width: icon ? 268 : 302 }}>{message}</div>
            <div className={this.gpc('close')} onClick={() => Notification.destroy(uuid)}>
              <Icon type="delete" />
            </div>
          </div>

          <div className={this.gpc('content')}>
            {description}
          </div>
          <div className={this.gpc('btn')}>
            {btn}
          </div>
        </div>
      </div>
    );
  };

  private handleColor = () => {
    const { type } = this.props;

    if (type === 'info') return '#407CE2';
    if (type === 'error') return '#FF4D4F';
    if (type === 'warning') return '#FAAD14';
    if (type === 'success') return '#44BF30';

    return '#407CE2';
  };
}
