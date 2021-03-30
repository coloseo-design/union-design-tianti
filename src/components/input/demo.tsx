import React, { useRef } from 'react';
import Input from './index';

const { Search, TextArea } = Input;

const InputDemo = () => {
  const ref = useRef();
  console.log('ref', ref);
  return (
    <div>
      <Input
        allowClear
        placeholder="基本输入"
        onChange={({ target: { value } }) => { console.log('value', value); }}
        onSearch={(value) => { console.log('searchValue', value); }}
        ref={ref}
      />
      <br />
      <br />
      <Input disabled placeholder="不可编辑" />
      <br />
      <br />
      <Input allowClear addonBefore="前" addonAfter="后" />
      <br />
      <br />
      <Input allowClear addonBefore="https://" />
      <br />
      <br />
      <Input allowClear addonAfter=".com" />
      <br />
      <br />
      <Search onSearch={(value: any) => { console.log('searchValue', value); }} />
      <br />
      <br />
      <TextArea
        allowClear
        placehollder="多行输入"
        rows={3}
        onChange={({ target: { value } }) => { console.log('value', value); }}
      />
      <br />
    </div>
  );
};

export default InputDemo;
