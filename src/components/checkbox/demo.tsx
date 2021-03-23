import React, { useState } from 'react';
import Checkbox, { Group } from './index';

export default () => {
  const options = [
    { label: 'a', value: 'a' },
    { label: 'b', value: 'b' },
    { label: 'c', value: 'c' },
    { label: 'd', value: 'd' },
  ];

  const [checked, setChecked] = useState(false);
  const onChange = (values: string[]) => {
    console.log('values', values);
  };
  const onChecked = (isChecked: boolean) => {
    console.log('isChecked', isChecked);
    setChecked(isChecked);
  };
  return (
    <>
      <Group style={{ padding: 20 }} onChange={onChange} value={['a']} options={options} />
      <Group style={{ padding: 20 }} onChange={onChange} value={['hello']}>
        <Checkbox>hello</Checkbox>
        <Checkbox>hello2</Checkbox>
      </Group>
      <Checkbox onChange={onChecked} checked={checked}>abc</Checkbox>
    </>
  );
};
