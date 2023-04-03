import React from 'react';
import { InputNumber } from '../index';
import './styles/index';

const layout = {
  // padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
};
const handleChange = (value: string | number) => {
  console.log('--value', value);
//   #F9F9F9FF
// #E5E5E5FF
};

const InputNumberDemo = (): React.ReactNode => (
  <div style={layout}>
    <h2>基本用法 两种格式</h2>
    <div>
      <InputNumber />
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
        precision={2}
        formatter={(value) => `${value}%`}
        parser={(value) => (value as string).replace('%', '')}
      />
      <br />
      <br />
      <InputNumber
        precision={2}
        type="both"
        min={10}
        max={30}
        formatter={(value) => `${value}%`}
        defaultValue={25}
        parser={(value) => (value as string).replace('%', '')}
      />
    </div>
    <div>
      <h2>设置精确度 是否四舍五入</h2>
      <InputNumber
        precision={2}
        defaultValue={25.678}
      />
      <br />
      <br />
      <InputNumber
        precision={2}
        type="both"
        defaultValue={25.678}
        isRound={false}
      />
    </div>
    {/* <span>
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
    </span> */}
  </div>
);

export default InputNumberDemo;
