import React from 'react';
import { BackTop } from '../index';

const BackTopDemo = () => (
  <div>
    <div style={{ height: 2000, background: 'yellow' }}>滚动高度到达400时出现回到顶部的按钮</div>
    <BackTop />
  </div>
);

export default BackTopDemo;
