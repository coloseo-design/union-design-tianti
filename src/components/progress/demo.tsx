import React from 'react';
import { Progress } from '../index';
import './styles/index';

const ProgressDemo = () => (
  <div>
    <div style={{ width: '50%' }}>
      <Progress percent={30} />
      <Progress percent={50} status="exception" />
      <Progress percent={100} />
    </div>
    <div style={{ width: '50%' }}>
      <Progress percent={30} size="small" />
      <Progress percent={50} size="small" status="exception" />
      <Progress percent={100} size="small" />
    </div>
  </div>
);

export default ProgressDemo;
