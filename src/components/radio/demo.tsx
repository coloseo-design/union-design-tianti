import React, { useState } from 'react';
import { Radio } from '../index';
import './styles/index';

export default () => {
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  const [value, setValue] = useState('a');
  return (
    <div style={{ padding: 20 }}>
      <h1>基本用法</h1>
      <div style={{ marginBottom: 24 }}>
        <Radio>未选中项</Radio>
        <Radio disabled>未选中失效项</Radio>
        <Radio checked disabled>选中失效项</Radio>
        <Radio checked>选中项</Radio>
      </div>
      <h1>横向排列</h1>
      <Radio.Group
        options={options}
        defaultValue="Apple"
        name="radio1"
        onChange={(e) => { console.log('value', e.target.value); }}
      />
      <h1>纵向排列</h1>
      <Radio.Group
        defaultValue="B"
        name="radio2"
        onChange={(e) => console.log('sss', e.target.value)}
        direction="vertical"
      >
        <Radio value="A">A</Radio>
        <Radio value="B">B</Radio>
        <Radio value="C" disabled>C</Radio>
        <Radio value="D">D</Radio>
      </Radio.Group>
    </div>
  );
};
