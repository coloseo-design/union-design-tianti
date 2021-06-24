import React, { useState } from 'react';
import { Checkbox } from '../index';

const { Group } = Checkbox;

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
      <Checkbox value="hello2" disabled checked>hello2</Checkbox>
      <Checkbox value="hello2" disabled>hello2</Checkbox>
      <Group style={{ padding: 20 }} onChange={onChange} value={['a']} options={options} />
      <Group style={{ padding: 20 }} onChange={onChange} value={['hello', 'hello2']}>
        <Checkbox value="hello">hello</Checkbox>
        <Checkbox value="hello2">hello2</Checkbox>
      </Group>
      <Checkbox onChange={onChecked} checked={checked}>abc</Checkbox>
      <Checkbox indeterminate checked />
    </>
  );
};
