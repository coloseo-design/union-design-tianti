import React from 'react';
import Select, { ValueType } from './index';
import './styles/index';

const { Option, OptGroup } = Select;

const SelectDemo = () => {
  const data = [
    {
      value: '1',
      label: 'uuu11uu',
    },
    {
      value: '2',
      label: '和哈哈哈哈和哈哈哈哈和哈哈哈',
    },
  ];
  const searchData = [
    {
      label: '标签1',
      value: '1',
    },
    {
      label: '标签4',
      value: '4',
    },
    {
      label: '标签3',
      value: '3',
    },
    {
      label: '标签2',
      value: '2',
    },
  ];
  const [data2, setData2] = React.useState<any[]>([]);
  const [dataT, setData] = React.useState<any[]>([]);
  const [data1, setData1] = React.useState<any[]>([]);
  React.useEffect(() => {
    setTimeout(() => {
      setData(data);
    }, 2000);
  }, []);

  const [value1, setvalue] = React.useState(['1']);
  return (
    <div style={{ margin: 16, position: 'relative' }} id="select-demo">
      <hr style={{ marginTop: 16 }} />
      <h1>基础选择框</h1>
      <Select
        onSelect={(val: ValueType) => {
          console.log('==val', val);
        }}
        allowClear
        getPopupContainer={() => document.querySelector('#select-demo')}
        placeholder="请选择选项"
        style={{ width: 220 }}
        icon="time-line"
      >
        {dataT.map((item: any) => (
          <Option value={item.value} key={item.value}>{item.label}</Option>
        ))}
      </Select>
      <h1>基本用法，使用LabelInValue为true 可以传值一个对象 </h1>
      <Select
        LabelInValue
        defaultValue={{ label: 'uuu11uu', value: '1' }}
        style={{ width: 220 }}
      >
        {data.map((item: any) => (
          <Option value={item.value} key={item.value}>{item.label}</Option>
        ))}
      </Select>
      <h1>多选框</h1>
      <Select
        onChange={(value) => {
          // console.log('==values', value);
        }}
        allowClear
        placeholder="请选择选项"
        style={{ width: 220 }}
        type="multiple"
        value={value1}
        maxTagCount={2}
      >
        <Option key="1" value="1">标签</Option>
        <Option key="2" value="2">选项1222</Option>
        <Option disabled key="3" value="3">选项33333</Option>
        <Option key="4" value="4">选项1rt2</Option>
        <Option key="5" value="5">选项12try22</Option>
        <Option key="6" value="6">选项12yhr22</Option>
      </Select>
      <h1>可搜索选择框</h1>
      <Select
        placeholder="请选择选项"
        style={{ width: 220, marginBottom: 36 }}
        type="search"
        LabelInValue
        value={{ value: '1', label: '呵呵呵呵' }}
        onSearch={(val) => {
          const t = searchData.filter((i) => i.label.indexOf(val) > -1);
          setData2(t);
        }}
        allowClear
      >
        {(data2 || []).map((item) => (
          <Option key={item.value} value={item.value}>{item.label}</Option>
        ))}
      </Select>
      <h1>禁止的</h1>
      <Select disabled style={{ width: 220 }} defaultValue="1">
        <Option value="1">hhh </Option>
      </Select>
      <h1>分组选择器</h1>
      <Select style={{ width: 220 }} defaultValue="1">
        <OptGroup label="小标题">
          <Option value="1">下拉选项</Option>
          <Option value="2">下拉选项</Option>
        </OptGroup>
        <OptGroup label="小标题2">
          <Option value="11">下拉选项</Option>
          <Option value="22">下拉选项</Option>
        </OptGroup>
      </Select>
      <h1>注释选择器</h1>
      <Select style={{ width: 220 }}>
        <Option value="1" note="注释内容" description="内容内容内容内容内容内容">下拉选项1</Option>
        <Option value="2" note="注释内容" description="内容内容内容内容内容内容">下拉选项2</Option>
        <Option value="3" note="注释内容" description="内容内容内容内容内容内容">下拉选项3</Option>
        <Option value="4" note="注释内容" description="内容内容内容内容内容内容">下拉选项4</Option>
      </Select>
    </div>
  );
};

export default SelectDemo;
