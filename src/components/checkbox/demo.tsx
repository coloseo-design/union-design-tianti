import React, { useState } from 'react';
import { Checkbox } from '../index';
import './styles/index';

const { Group } = Checkbox;

export default () => {
  const [checked, setChecked] = useState(false);
  const onChange = (values: string[]) => {
    console.log('values', values);
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
  return (
    <div style={{ padding: 20 }}>
      <div>
        <h1>多选基本用法</h1>
        <Checkbox value="1">未选中项</Checkbox>
        <Checkbox value="2" style={{ paddingLeft: 64 }}>未选悬停项</Checkbox>
        <Checkbox value="3" style={{ paddingLeft: 64 }} checked={checked} onChange={onChecked}>选中项</Checkbox>
        <Checkbox value="3" style={{ paddingLeft: 64 }} disabled>未选失效项</Checkbox>
        <Checkbox value="3" style={{ paddingLeft: 64 }} disabled checked>选中失效项</Checkbox>
      </div>
      <h1 style={{ marginTop: 32 }}>横向排列排列</h1>
      <Group onChange={onChange} value={['2', '5']}>
        <Checkbox value="1">未选中项</Checkbox>
        <Checkbox value="2">未选悬停项</Checkbox>
        <Checkbox value="3" checked>选中项</Checkbox>
        <Checkbox value="4" disabled>未选失效项</Checkbox>
        <Checkbox value="5" disabled checked>选中失效项</Checkbox>
      </Group>

      <h1 style={{ marginTop: 32 }}>纵向排列</h1>
      <Group direction="vertical" value={['a3', 'a5']} options={options} />
      <h1 style={{ marginTop: 32 }}>未全选状态</h1>
      <Checkbox indeterminate>我的选择</Checkbox>
    </div>
  );
};
