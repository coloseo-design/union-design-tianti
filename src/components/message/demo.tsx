import React from 'react';
import { Message, Button } from '../index';
import './styles/index';
import '../button/styles/index';

const MessageDemo = () => (
  <div style={{
    display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start', padding: '20px 40px',
  }}
  >
    <h1>基本</h1>
    <Button type="primary" onClick={() => Message.info('这是一条询问消息，会主动消失。')}>info</Button>
    <div style={{ height: 20 }} />
    <Button type="primary" onClick={() => Message.error('这是一条异常消息，会主动消失。')}>error</Button>
    <div style={{ height: 20 }} />
    <Button type="primary" onClick={() => Message.success('这是一条成功消息，会主动消失。')}>success</Button>
    <div style={{ height: 20 }} />
    <Button type="primary" onClick={() => Message.warning('这是一条警告消息，会主动消失。')}>warning</Button>
    <h1>常驻</h1>
    <Button
      type="primary"
      onClick={() => Message.info({
        content: '这是一条常驻消息，会主动消失。',
        key: 'abc',
        duration: 0,
      })}
    >
      open
    </Button>
    <div style={{ height: 20 }} />
    <Button type="primary" onClick={() => Message.destroy('abc')}>close</Button>
    <div style={{ height: 20 }} />
    <Button type="primary" onClick={() => Message.loading('这 个 loading demo', 'loading key')}>loading</Button>
    <Button type="primary" onClick={() => Message.destroy('loading key')}>loading close</Button>
  </div>
);

export default MessageDemo;
