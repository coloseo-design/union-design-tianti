import React, { useState } from 'react';
import { Radio } from '../index';

export default () => {
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  const [value, setValue] = useState('a');
  return (
    <div>
      <Radio checked disabled>A</Radio>
      <Radio disabled>B</Radio>
      <Radio onChange={(e) => console.log('c', e, e.target.checked)}>C</Radio>

      <Radio.Group options={options} defaultValue="Apple" name="radio1" onChange={(e) => { console.log('value', e.target.value); }} />

      <Radio.Group options={['a', 'b', 'c']} defaultValue="a" value={value} name="radio2" onChange={(e) => { setValue(e.target.value); }} />
      <Radio.Group defaultValue="B" name="radio2" onChange={(e) => console.log('sss', e.target.value)}>
        <Radio value="A" style={{ display: 'block' }}>A</Radio>
        <Radio value="B" style={{ display: 'block' }}>B</Radio>
        <Radio value="C" style={{ display: 'block' }}>C</Radio>
        <Radio value="D" style={{ display: 'block' }}>D</Radio>
      </Radio.Group>
    </div>
  );
};
