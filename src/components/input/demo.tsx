import React, { useRef, useState } from 'react';
import Input from './index';
import Icon from '../icon/index';
// import './styles/index';
// import '../icon/styles/index';

const { Search, TextArea } = Input;

const InputDemo = () => {
  const ref = useRef({ test: '123' });
  const [value, $value] = useState('【同意】');

  return (
    <div style={{ padding: 50 }}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <div style={{
          position: 'absolute', color: '#969696', fontSize: 14, top: 9, left: 12, background: '#fff',
        }}
        >
          【同意】
        </div>
        <TextArea
          allowClear
          onChange={(e) => {
            const v = e.target.value;
            if (value.indexOf('【同意】') === 0) {
              $value(v);
            } else {
              $value(`【同意】${v}`);
            }
          }}
          value={value}
          style={{ width: 500 }}
        />
      </div>
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
