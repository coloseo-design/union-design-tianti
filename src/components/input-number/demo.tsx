/* eslint-disable react/button-has-type */
import React from 'react';
import { InputNumber } from '../index';
// import './styles/index';

const handleChange = (value: string | number) => {
  console.log('--value', value);
};

const InputNumberDemo = (): React.ReactNode => (
  <div>
    <h2>基本用法 两种格式</h2>
    <div>
      <InputNumber size="small" />
      <br />
      <br />
      <br />
      <InputNumber type="both" />

    </div>
    <div>
      <h2>设置默认值</h2>
      <InputNumber
        onChange={handleChange}
        defaultValue={20}
      />
      <br />
      <br />
      <InputNumber
        onChange={handleChange}
        defaultValue={20}
        type="both"
      />
    </div>
    <div>
      <h2>设置格式</h2>
      <InputNumber
        formatter={(value) => `${value}%`}
        parser={(value) => (value as string).replace('%', '')}
        style={{ width: 200 }}
      />
      <br />
      <br />
      <InputNumber
        type="both"
        min={100}
        max={3000}
        defaultValue={250}
        step={200}
        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => `${value}`.replace(/\$\s?|(,*)/g, '')}
        style={{ width: 200 }}
        onChange={handleChange}
      />
    </div>
    <div>
      <h2>设置精确度 是否四舍五入</h2>
      <InputNumber
        step={0.01}
        defaultValue={25.678}
      />
      <br />
      <br />
      <InputNumber
        precision={2}
        type="both"
        step={0.01}
        defaultValue={25.678}
        isRound={false}
      />
    </div>
    <h2>禁止样式</h2>
    <div>
      <InputNumber disabled defaultValue={2} />
      <br />
      <br />
      <br />
      <InputNumber disabled defaultValue={2} type="both" />

    </div>
  </div>
);

export default InputNumberDemo;
