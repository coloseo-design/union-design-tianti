import React from 'react';
import Button from './index';

const ButtonDemo: React.FC<unknown> = () => (
  <div style={{ margin: 5 }}>
    <div style={{ marginBottom: 10 }}>
      <Button type="default" style={{ marginRight: 10 }}>default</Button>
      <Button type="primary" style={{ marginRight: 10 }}>primary</Button>
      <Button type="danger" style={{ marginRight: 10 }}>danger</Button>
      <Button type="dashed" style={{ marginRight: 10 }}>dashed</Button>
      <Button type="link" style={{ marginRight: 10 }}>link</Button>
      <Button type="ghost" style={{ marginRight: 10 }}>ghost</Button>
      <Button type="primary" style={{ marginRight: 10 }} loading>loading</Button>
      <Button type="primary" style={{ marginRight: 10 }} disabled>disabled</Button>
    </div>

    <div style={{ marginBottom: 10 }}>
      <Button type="default" style={{ marginRight: 10 }} size="large">default</Button>
      <Button type="primary" style={{ marginRight: 10 }} size="large">primary</Button>
      <Button type="danger" style={{ marginRight: 10 }} size="large">danger</Button>
      <Button type="dashed" style={{ marginRight: 10 }} size="large">dashed</Button>
      <Button type="link" style={{ marginRight: 10 }} size="large">link</Button>
      <Button type="ghost" style={{ marginRight: 10 }} size="large">ghost</Button>
      <Button type="primary" style={{ marginRight: 10 }} size="large" loading>loading</Button>
      <Button type="primary" style={{ marginRight: 10 }} size="large" disabled>disabled</Button>
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
