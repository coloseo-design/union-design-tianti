import React from 'react';
import { InputNumber } from '../index';
import './styles/index';

const layout = {
  padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
};
const handleChange = (value: string | number) => {
  console.log('--value', value);
};

const InputNumberDemo = (): React.ReactNode => (
  <div style={layout}>
    <span>
      <span>large</span>
      <InputNumber
        size="large"
        max={20}
        min={1}
        onChange={handleChange}
        disabled
        value={12}
        style={{ width: 180 }}
      />
    </span>
    <span>
      <span>default</span>
      <InputNumber
        precision={2}
        formatter={(value) => `${value}%`}
        parser={(value) => value.replace('%', '')}
      />
    </span>
    <span>
      <span>precision</span>
      <InputNumber
        precision={2}
        step={0.1}
      />
    </span>
    <span>
      <span>small:</span>
      <InputNumber
        size="large"
        value={10000}
        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => `${value}`.replace(/\$\s?|(,*)/g, '')}
      />
    </span>
  </div>
);

export default InputNumberDemo;
