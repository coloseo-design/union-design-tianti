import React from 'react';
import { BackTop } from '../index';
// import './styles/index';

const BackTopDemo = () => (
  <div style={{ position: 'relative' }}>
    <div
      id="BackTopDemo"
      style={{
        width: '50%', height: 200, background: 'yellow', overflow: 'auto',
      }}
    >
      <div style={{ height: 2000 }}>滚动高度到达400时出现回到顶部的按钮</div>
    </div>
    <BackTop target={() => document.getElementById('BackTopDemo')} style={{ position: 'absolute', right: '52%', bottom: 20 }} />
  </div>
);

export default BackTopDemo;
