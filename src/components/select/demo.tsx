import React from 'react';
import { Select } from '../index';
import './styles/index';

const { Option } = Select;

const SelectDemo = () => {
  const data = [
    {
      value: '1',
      label: 'uuu11uu',
    },
    {
      value: 2,
      label: '和哈哈哈哈和哈哈哈哈和哈哈哈',
    },
  ];
  const [dataT, setData] = React.useState([]);
  const [data1, setData1] = React.useState([]);
  const [lastFetchId, setlastFetchId] = React.useState(0);
  React.useEffect(() => {
    setTimeout(() => {
      setData(data);
    }, 2000);
  }, []);

  const fetchUser = (value: any) => {
    setlastFetchId(lastFetchId + 1);
    data1.push({
      value: lastFetchId,
      label: value,
    });
  };

  const [value1, setvalue] = React.useState(['1']);
  return (
    <div style={{ margin: 16 }}>
      <hr style={{ marginTop: 16 }} />
      <h1>基础选择框</h1>
      <Select
        onSelect={
          (value, label) => {
            console.log('--- value ', value, label);
          }
        }
        // disabled
        placeholder="请选择选项"
        style={{ width: 220, height: 42 }}
        value="2"
      >
        {dataT.map((item: any) => (
          <Option value={item.value} key={item.value}>{item.label}</Option>
        ))}
      </Select>
      <h1>多选框</h1>
      <Select
        onChange={
          (value, label) => {
            console.log('--- value ', value);
            console.log('--- label ', label);
          }
        }
        placeholder="请选择选项"
        style={{ width: 220 }}
        type="multiple"
        value={value1}
        maxTagCount={2}
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
        style={{ width: 220, marginBottom: 36 }}
        type="search"
        onSearch={(val) => { console.log('--- val ', val); }}
      >
        <Option key="1" value="1">选项111</Option>
        <Option key="2" value="2">选项1222</Option>
        <Option disabled key="3" value="3">选项33333</Option>
      </Select>
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
        onSearch={fetchUser}
      >
        <Option key="1" value="1">选项111</Option>
        <Option key="2" value="2">选项1222</Option>
        <Option disabled key="3" value="3">选项33333</Option>
      </Select>
    </div>
  );
};

export default SelectDemo;
