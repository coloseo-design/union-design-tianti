import React, { useRef } from 'react';
import { Input, Icon } from '../index';
import './styles/index';
import '../icon/styles/index';

const { Search, TextArea } = Input;

const InputDemo = () => {
  const ref = useRef({ test: '123' });
  console.log('ref', ref);
  return (
    <div style={{ padding: 50 }}>
      <Input
        allowClear
        placeholder="基本输入"
        onChange={({ target: { value } }) => { console.log('---value', value); }}
        onSearch={(value) => { console.log('searchValue', value); }}
        ref={ref}
        style={{ width: 100 }}
        defaultValue="100"
      />
      <br />
      <br />
      <Input disabled placeholder="不可编辑" />
      <br />
      <br />
      <Input allowClear addonBefore={<Icon type="add" />} addonAfter="后" />
      <br />
      <br />
      <Input allowClear addonBefore="https://" />
      <br />
      <br />
      <Input addonAfter={<Icon type="user" />} />
      <br />
      <br />
      <Search ref={ref} placeholder="请输入" onPressEnter={(value, e) => { console.log('onPressEnter', value, e); }} onSearch={(value: any) => { console.log('searchValue', value); }} onChange={({ target: { value } }) => { console.log('---value', value); }} />
      <br />
      <br />
      <TextArea
        allowClear
        placeholder="多行输入"
        // rows={10}
        onChange={({ target: { value } }) => { console.log('value', value); }}
        style={{ width: 500 }}
      />
      <br />
    </div>
  );
};

export default InputDemo;
