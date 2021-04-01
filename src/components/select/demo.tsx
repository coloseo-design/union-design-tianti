/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import Select from './index';

const { Option } = Select;

const SelectDemo = () => (
  <div style={{ margin: 16 }}>
    <hr style={{ marginTop: 16 }} />
    <h1>基础选择框</h1>
    <Select
      onSelect={
          (value, label) => {
            console.log('--- value ', value);
            console.log('--- label ', label);
          }
        }
      placeholder="请选择选项"
      style={{ width: 220 }}
    >
      <Option key="1" value="1">选项111swdewdw是我的我的午饭人反而更</Option>
      <Option key="2" value="2">选项1222</Option>
      <Option disabled key="3" value="3">选项33333</Option>
    </Select>
    <h1>多选框</h1>
    <Select
        // onChange={
        //   (value, label) => {
        //     console.log('--- value ', value);
        //     console.log('--- label ', label);
        //   }
        // }
      placeholder="请选择选项"
      style={{ width: 220 }}
      type="multiple"
      // maxTagCount={1}
      // maxTagTextLength={5}
    >
      <Option key="1" value="1">这是一个很长的很长的选项111</Option>
      <Option key="2" value="2">选项1222</Option>
      <Option disabled key="3" value="3">选项33333</Option>
      <Option key="4" value="4">选项1rt2</Option>
      <Option key="5" value="5">选项12try22</Option>
      <Option key="6" value="6">选项12yhr22</Option>
    </Select>
    <h1>可搜索选择框</h1>
    <Select
      onSelect={
          (value, label) => {
            console.log('--- value ', value);
            console.log('--- label ', label);
          }
        }
      placeholder="请选择选项"
      style={{ width: 220 }}
      type="search"
      onSearch={(val) => { console.log('--- val ', val); }}
    >
      <Option key="1" value="1">选项111</Option>
      <Option key="2" value="2">选项1222</Option>
      <Option disabled key="3" value="3">选项33333</Option>
    </Select>
    <h1>
      远程搜索选择框 - (备注：使用方法参见
      <a target="_blank" href="https://ant.design/components/select-cn/#components-select-demo-search-box">antd select 搜索框</a>
      )
    </h1>
    <Select
      onSelect={
          (value, label) => {
            console.log('--- value ', value);
            console.log('--- label ', label);
          }
        }
      placeholder="请选择选项"
      style={{ width: 220 }}
      type="search"
      remoteSearch
      onSearch={(val) => { console.log('--- val ', val); }}
    >
      <Option key="1" value="1">选项111</Option>
      <Option key="2" value="2">选项1222</Option>
      <Option disabled key="3" value="3">选项33333</Option>
    </Select>
  </div>
);

export default SelectDemo;
