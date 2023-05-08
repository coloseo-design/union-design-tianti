import React from 'react';
import Button from './index';
import './styles/index';

const ButtonDemo: React.FC<unknown> = () => (
  <div style={{ margin: 5 }}>
    <h1>大按钮</h1>
    <div style={{ marginBottom: 32 }}>
      <Button size="large" type="default" icon="left" style={{ marginRight: 22 }}>默认按钮</Button>
      <Button size="large" type="primary" suffixIcon="down" style={{ marginRight: 22 }}>主按钮</Button>
      <Button size="large" type="danger" style={{ marginRight: 22 }}>danger</Button>
      <Button size="large" type="dashed" style={{ marginRight: 22 }}>dashed</Button>
      <Button size="large" type="link" style={{ marginRight: 22 }}>link</Button>
      <Button size="large" type="ghost" style={{ marginRight: 22 }}>ghost</Button>
    </div>
    <h1>中按钮</h1>
    <div style={{ marginBottom: 32 }}>
      <Button type="default" icon="left" style={{ marginRight: 22 }}>default</Button>
      <Button type="primary" style={{ marginRight: 22 }} suffixIcon="down">主按钮</Button>
      <Button type="danger" style={{ marginRight: 22 }}>danger</Button>
      <Button type="dashed" style={{ marginRight: 22 }}>dashed</Button>
      <Button type="link" style={{ marginRight: 22 }}>link</Button>
      <Button type="ghost" style={{ marginRight: 22 }}>ghost</Button>
    </div>
    <h1>小按钮</h1>
    <div style={{ marginBottom: 32 }}>
      <Button size="small" type="default" icon="left" style={{ marginRight: 22 }}>default</Button>
      <Button size="small" type="primary" style={{ marginRight: 22 }}>primary</Button>
      <Button size="small" type="danger" style={{ marginRight: 22 }}>danger</Button>
      <Button size="small" type="dashed" style={{ marginRight: 22 }}>dashed</Button>
      <Button size="small" type="link" style={{ marginRight: 22 }}>link</Button>
      <Button size="small" type="ghost" style={{ marginRight: 22 }}>ghost</Button>
    </div>
    <div style={{ padding: 10, background: '#acafb9' }}>
      <Button type="ghost" style={{ marginRight: 10 }}>幽灵按钮默认状态</Button>
      <Button type="ghost" style={{ marginRight: 10 }} disabled>幽灵按钮禁止状态</Button>
    </div>

    <div style={{ marginBottom: 10 }}>
      <Button type="default" style={{ marginRight: 10 }} disabled>default</Button>
      <Button type="primary" style={{ marginRight: 10 }} disabled>primary</Button>
      <Button type="danger" style={{ marginRight: 10 }} disabled>danger</Button>
      <Button type="dashed" style={{ marginRight: 10 }} disabled>dashed</Button>
      <Button type="link" style={{ marginRight: 10 }} disabled>link</Button>
      <Button type="ghost" style={{ marginRight: 10 }} disabled>ghost</Button>
    </div>

    <div style={{ marginBottom: 10 }}>
      <Button type="default" style={{ marginRight: 10 }} size="small">default</Button>
      <Button type="primary" style={{ marginRight: 10 }} size="small">primary</Button>
      <Button type="danger" style={{ marginRight: 10 }} size="small">danger</Button>
      <Button type="dashed" style={{ marginRight: 10 }} size="small">dashed</Button>
      <Button type="link" style={{ marginRight: 10 }} size="small">link</Button>
      <Button type="ghost" style={{ marginRight: 10 }} size="small">ghost</Button>
      <Button type="primary" style={{ marginRight: 10 }} size="small" loading>loading</Button>
      <Button type="primary" style={{ marginRight: 10 }} size="small" disabled>disabled</Button>
    </div>
  </div>
);

export default ButtonDemo;
