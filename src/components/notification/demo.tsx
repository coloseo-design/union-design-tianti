import React from 'react';
import { Notification, Button } from '../index';
import './styles/index';

const NotificationDemo = () => (
  <div style={{
    display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start', padding: '20px 40px',
  }}
  >
    <h1>基本</h1>
    <Button
      type="primary"
      onClick={() => Notification.info({
        message: 'info',
        description: '这是一条询问消息，会主动消失。',
      })}
    >
      info
    </Button>
    <div style={{ height: 20 }} />
    <Button
      type="primary"
      onClick={() => Notification.error({
        message: 'error',
        description: '这是一条异常消息，会主动消失。',
      })}
    >
      error
    </Button>
    <div style={{ height: 20 }} />
    <Button
      type="primary"
      onClick={() => Notification.success({
        message: 'success',
        description: '这是一条成功消息，会主动消失。',
      })}
    >
      success
    </Button>
    <div style={{ height: 20 }} />
    <Button
      type="primary"
      onClick={() => Notification.warning({
        message: 'warning',
        description: '这是一条警告消息，会主动消失。',
      })}
    >
      warning
    </Button>
    <div style={{ height: 20 }} />
    <Button
      type="primary"
      onClick={() => Notification.open({
        message: 'open',
        description: 'no icon',
      })}
    >
      warning
    </Button>
    <h1>常驻</h1>
    <Button
      type="primary"
      onClick={() => Notification.info({
        message: 'info',
        description: '这是一条常驻消息，会主动消失。',
        key: 'abc',
        duration: 0,
      })}
    >
      open
    </Button>
    <div style={{ height: 20 }} />
    <Button type="primary" onClick={() => Notification.destroy('abc')}>close</Button>
    <h1>Btn</h1>
    <Button
      type="primary"
      onClick={() => Notification.warning({
        message: 'warning',
        description: '这是一条警告消息，会主动消失。',
        btn: (
          <div style={{
            marginTop: 10, display: 'flex', flexFlow: 'row nowrap', justifyContent: 'flex-end',
          }}
          >
            <Button size="small">
              取消
            </Button>
            <div style={{ width: 20 }} />
            <Button size="small" type="primary">
              确定
            </Button>
          </div>
        ),
      })}
    >
      warning
    </Button>
  </div>
);

export default NotificationDemo;
