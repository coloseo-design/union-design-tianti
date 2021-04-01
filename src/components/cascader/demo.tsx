/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import Cascader from './index';

const marginBottomStyle = {
  marginBottom: 16,
};
const sectionStyle = {
  display: 'inline-block',
  marginRight: 16,
};

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
          {
            value: 'xiasha',
            label: 'Xia Sha',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua men',
          },
        ],
      },
    ],
  },
];

const handleCascaderChange = (value: string[], selectedOptions: {[key: string] : unknown}[]) => {
  console.log(value, selectedOptions);
};

const CascaderDemo = () => (
  <div>
    <div style={{ margin: 16 }}>
      <hr style={marginBottomStyle} />
      <div style={sectionStyle}>
        <h3>基本</h3>
        <Cascader
          options={options}
          onChange={handleCascaderChange}
        />
      </div>
      <div style={sectionStyle}>
        <h3>默认值</h3>
        <Cascader
          options={options}
          value={['zhejiang', 'hangzhou', 'xihu']}
          onChange={handleCascaderChange}
        />
      </div>
      <div style={sectionStyle}>
        <h3>禁用组件</h3>
        <Cascader
          options={options}
          value={['zhejiang', 'hangzhou', 'xihu']}
          onChange={handleCascaderChange}
          disabled
        />
      </div>
      <div style={sectionStyle}>
        <h3>搜索</h3>
        <Cascader
          options={options}
          onChange={handleCascaderChange}
          showSearch
        />
      </div>
    </div>
  </div>
);

export default CascaderDemo;
