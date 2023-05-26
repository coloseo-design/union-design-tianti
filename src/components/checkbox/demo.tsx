import React, { useState } from 'react';
import { Checkbox } from '../index';
import './styles/index';

const { Group } = Checkbox;

export default () => {
  const options = [
    { label: 'a', value: 'a' },
    { label: 'b', value: 'b' },
    { label: 'c', value: 'c' },
    { label: 'd', value: 'd' },
  ];

  const [checked, setChecked] = useState(false);
  const [allC, setAll] = useState(false);
  const [groupC, setGroup] = useState<string[]>([]);
  const onChange = (values: string[]) => {
    console.log('values', values);
  };
  const onChecked = (isChecked: boolean) => {
    console.log('isChecked', isChecked);
    setChecked(isChecked);
  };
  const GroupChange = (values: string[]) => {
    if (values.length === options.length) {
      setAll(true);
    } else {
      setAll(false);
    }
    setGroup(values);
  };

  return (
    <>
      <Checkbox value="hello2" onChange={() => { console.log('==11111'); }} checked>hello2</Checkbox>
      <Checkbox value="hello2" disabled>hello2</Checkbox>
      <div style={{ margin: 24 }}>
        <Checkbox
          checked={allC}
          onChange={(v) => {
            if (v) {
              setAll(true);
              setGroup(options.map((i) => i.value));
            } else {
              setAll(false);
              setGroup([]);
            }
          }}
          indeterminate={!allC && (groupC || []).length > 0}
        >
          全选
        </Checkbox>
        <Group
          style={{ padding: 20 }}
          onChange={GroupChange}
          value={groupC}
          options={options}
        />
      </div>
      {/* <p>设置group value值</p> */}
      <Group
        style={{ padding: 20 }}
        onChange={onChange}
      >
        <Checkbox value="hello11">hello</Checkbox>
        <Checkbox value="hello21">hello2</Checkbox>
      </Group>
      <Checkbox onChange={onChecked} checked={checked}>abc</Checkbox>
      <Checkbox indeterminate>我的选择</Checkbox>
    </>
  );
};
