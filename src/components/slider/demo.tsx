/* eslint-disable no-shadow */
import React, { useState } from 'react';
import Slider from './index';

const SliderDemo = () => {
  const [value, setValue] = useState(0);
  const onChange = (value: number) => {
    setValue(value);
  };
  const marks = [{
    label: '0°C',
    value: 0,
  }, {
    label: '3°C',
    value: 3,
  }, {
    label: '5°C',
    value: 5,
  }, {
    label: <strong>7°C</strong>,
    value: 7,
  }];
  return (
    <div style={{ padding: 20, position: 'relative' }}>
      <div style={{ padding: 10, width: 500, marginBottom: 20 }}>
        <Slider value={value} min={0} marks={marks} max={10} onChange={onChange} />
      </div>
      <div>
        value:
        {value}
      </div>
    </div>
  );
};

export default SliderDemo;
