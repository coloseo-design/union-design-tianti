import React from 'react';
import { Spin } from '../index';
import './styles/index';

const SpinDemo = () => (
  <div>
    <Spin
      className="my-spin"
      style={{
        padding: 20,
      }}
    />
  </div>
);
export default SpinDemo;
