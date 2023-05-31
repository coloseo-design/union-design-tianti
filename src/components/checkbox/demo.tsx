import React, { useState } from 'react';
import { Checkbox } from '../index';
import './styles/index';

const { Group } = Checkbox;

export default () => {
  const [checked1, setChecked] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [allChecked, setAll] = useState(false);
  const onChange = (val: string[]) => {
    console.log('values123', val);
    setValues(val);
    if (val.length === 5) {
      setAll(true);
    } else {
      setAll(false);
    }
  };
  const onChecked = (isChecked: boolean) => {
    console.log('isChecked', isChecked);
    setChecked(isChecked);
  };
  const options = [
    {
      label: '未选中项', value: 'a1',
    },
    {
      label: '未选悬停项', value: 'a2',
    },
    {
      label: '选中项', value: 'a3',
    },
    {
      label: '未选失效项', value: 'a4', disabled: true,
    },
    {
      label: '选中失效项', value: 'a5', disabled: true,
    },
  ];
  const AllChange = (v: boolean) => {
    setAll(v);
    if (v) {
      setValues(['1', '2', '3', '4', '5']);
    } else {
      setValues([]);
    }
  };
  return (
    <div style={{ padding: 20 }}>
      <div>
        <h1>多选基本用法</h1>
        <Checkbox value="1">未选中项</Checkbox>
        <Checkbox value="2" style={{ paddingLeft: 64 }}>未选悬停项</Checkbox>
        <Checkbox value="3" style={{ paddingLeft: 64 }} checked={checked1} onChange={onChecked}>选中项</Checkbox>
        <Checkbox value="3" style={{ paddingLeft: 64 }} disabled>未选失效项</Checkbox>
        <Checkbox value="3" style={{ paddingLeft: 64 }} disabled checked>选中失效项</Checkbox>
      </div>
      <h1 style={{ marginTop: 32 }}>横向排列排列</h1>
      <Checkbox
        checked={allChecked}
        onChange={AllChange}
        indeterminate={values.length > 0 && values.length < 5}
      >
        全选
      </Checkbox>
      <Group onChange={onChange} value={values}>
        <Checkbox value="1">未选中项</Checkbox>
        <Checkbox value="2">未选悬停项</Checkbox>
        <Checkbox value="3">选中项</Checkbox>
        <Checkbox value="4">未选失效项4</Checkbox>
        <Checkbox value="5">选中失效项5</Checkbox>
      </Group>

      <h1 style={{ marginTop: 32 }}>纵向排列</h1>
      <Group direction="vertical" defaultValue={['a3', 'a5']} options={options} />
      <h1 style={{ marginTop: 32 }}>未全选状态</h1>
      <Checkbox indeterminate>我的选择</Checkbox>
    </div>
  );
};
