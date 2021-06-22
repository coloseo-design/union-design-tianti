/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
import React, { CSSProperties, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { BaseComponent, BaseProps } from '../common/base-component';
import { uuid } from '../cascader/utils';
import Icon from '../icon';

const MESSAGE_NAME = 'UNION_MESSAGE';

type MessageConfig = {
  className?: string;
  content?: ReactNode;
  duration?: number;
  icon?: string;
  key?: string | number;
  style?: CSSProperties;
  onClose?: () => void;
  onClick?: () => void;
};

type MessageAPI = (
  content: ReactNode | MessageConfig, duration?: number, onClose?: () => void) => void;

type MessageType = 'success' | 'loading' | 'error' | 'info' | 'warning';

type MessageProps = {
  uuid: string;
  type: MessageType;
} & MessageConfig & BaseProps;

export default class Message extends BaseComponent<MessageProps> {
  public static tag = MESSAGE_NAME;

  public static config: MessageConfig = {};

  public static success: MessageAPI = (content, duration, onClose) => Message.open({
    icon: 'success',
    content,
    duration,
    onClose,
  }, 'success');

  public static error: MessageAPI = (content, duration, onClose) => Message.open({
    icon: 'delete',
    content,
    duration,
    onClose,
  }, 'error');

  public static info: MessageAPI = (content, duration, onClose) => Message.open({
    icon: 'exclamation-circle',
    content,
    duration,
    onClose,
  }, 'info');

  public static warning: MessageAPI = (content, duration, onClose) => Message.open({
    icon: 'exclamation-circle',
    content,
    duration,
    onClose,
  }, 'warning');

  public static loading = (content: ReactNode, key?: string, onClose?: () => void) => Message.open({
    key,
    icon: 'loading-circle',
    content,
    duration: 0,
    onClose,
  }, 'loading');

  public static open = (config: MessageConfig, type?: MessageType) => {
    // console.log('config', config);
    if (config.duration === undefined) delete config.duration;
    if (config.onClose === undefined) delete config.onClose;

    const props = { ...Message.config };

    if (typeof config.content === 'string' || typeof config.content === 'number' || React.isValidElement(config.content)) {
      Object.assign(props, config);
    }

    if (typeof config.content === 'object' && !React.isValidElement(config.content)) {
      Object.assign(props, config.content);
      props.icon ??= config.icon;
    }

    props.duration ??= 3;
    props.onClose ??= () => { };
    props.className ??= '';
    props.onClick ??= () => { };
    props.key ??= uuid();
    props.style ??= {};

    Message.msgs[`${props.key}`] = <Message {...props} key={`${props.key}`} uuid={`${props.key}`} type={type ?? 'info'} />;

    Message.renderToBody();
  }

  public static destroy = (key: string | number) => {
    delete Message.msgs[`${key}`];
    Message.renderToBody();
  };

  private static msgs: { [key: string]: ReactNode } = {};

  private static bodyMessageNode: HTMLDivElement = document.createElement('div');

  private static renderToBody = () => {
    const msgs = Object.values(Message.msgs);
    if (msgs.length > 0) {
      Object.assign(Message.bodyMessageNode.style, {
        position: 'fixed',
        top: 0,
        width: '100%',
        pointerEvents: 'none',
      } as CSSProperties);
    } else {
      Message.bodyMessageNode.style.width = '0px';
    }
    ReactDOM.render(
      <>
        {msgs}
      </>,
      Message.bodyMessageNode,
    );
  };

  protected classPrefix = 'message';

  public constructor(props: MessageProps) {
    super(props);

    if (!document.body.contains(Message.bodyMessageNode)) {
      document.body.appendChild(Message.bodyMessageNode);
    }

    if (props.duration) {
      setTimeout(() => {
        props.onClose?.();
        Message.destroy(props.uuid);
      }, props.duration * 1000);
    }
  }

  protected view = () => {
    const {
      icon, content, onClick, className, style, type,
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
          <div
            className={this.classNames(
              this.gpc('icon'),
              {
                [this.gpc('icon-rotate')]: type === 'info' && icon === 'exclamation-circle',
              },
            )}
            style={{ color: this.handleColor() }}
          >
            <Icon type={icon} {...(icon === 'loading-circle') ? { spin: true } : {}} />
          </div>
          <div className={this.gpc('content')}>
            {content}
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
    if (type === 'loading') return 'rgba(0, 0, 0, 0.65)';

    return '#407CE2';
  };
}
