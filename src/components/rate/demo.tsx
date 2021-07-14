import React from 'react';
import { Rate } from '../index';
import './styles/index';

const RateDemo = () => (
  <div>
    <Rate defaultValue={1} onChange={(value) => { console.log('value', value); }} />
    <br />
    <Rate defaultValue={1.5} allowHalf onChange={(value) => { console.log('value', value); }} />
  </div>
);

export default RateDemo;
