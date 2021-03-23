/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import TreeSelect from './index';

const { TreeNode } = TreeSelect;
const data = [
  {
    key: 'node-0',
    value: 'node-0',
    title: '第一级1',
    disabled: true,
    children: [
      {
        key: 'node-0-1',
        value: 'node-0-1',
        title: '第二级1',
      },
      {
        key: 'node-0-2',
        value: 'node-0-2',
        title: '第二级2',
      },
    ],
  },
  {
    key: 'node-1',
    value: 'node-1',
    title: '第一级二',
    children: [
      {
        key: 'node-1-1',
        value: 'node-1-1',
        title: '第一季',
        children: [
          {
            key: 'node-1-1-1',
            value: 'node-1-1-1',
            title: '第二季',
          },
          {
            key: 'node-1-1-2',
            value: 'node-1-1-2',
            title: '第三季',
          },
        ],
      },
      {
        key: 'node-1-2',
        value: 'node-1-2',
        title: 'node-1-2哈哈哈',
        children: [
          {
            key: 'node-1-2-1',
            value: 'node-1-2-1',
            title: 'node-1-2-1问我哈哈哈',
            children: [
              {
                key: 'node-1-1-3',
                value: 'node-1-1-3',
                title: 'node-1-2-1问22哈哈',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: '11',
    value: '11',
    title: '和哈哈哈哈',
    // disabled: true,
    children: [
      {
        key: '114',
        value: '114',
        title: '你觉得你问大家哈',
      },
      {
        key: '115',
        value: '115',
        title: '你觉得dwel 你大家哈',
      },
    ],
  },
  {
    key: '22',
    value: '22',
    title: '和哈哈哈哈',
  },
  {
    key: '23',
    value: '23',
    title: '广告广告',
  },
  {
    key: '24',
    value: '24',
    title: '孤寡孤寡',
  },
];
const TreeSelectDEmo = () => {
  const onChange = (value: string | string[], node: any) => {
    console.log('---value', value, node);
  };

  return (
    <div style={{ margin: '60px' }}>
      <h1>单选</h1>
      <div style={{ width: 320 }}>
        <TreeSelect
          value="1"
          onChange={onChange}
        >
          <TreeNode title="顶级" key="a" value="a">
            <TreeNode title="哈哈哈" key="1" value="1">
              <TreeNode title="快看看" key="2" value="2">
                <TreeNode title="what" key="5" value="5" />
              </TreeNode>
            </TreeNode>
            <TreeNode title="呵呵呵1" key="3" value="3">
              <TreeNode title="滚滚滚" key="4" value="4" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      </div>
      <div style={{ width: 320, marginTop: 32 }}>
        <h1>多选的</h1>
        <TreeSelect
          treeData={data}
          dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
          multiple={true}
          value={['11']}
          onChange={onChange}
        />
      </div>

      <div style={{ width: 320, marginTop: 32 }}>
        <h1>可勾选的</h1>
        <TreeSelect
          treeData={data}
          dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
          treeCheckable={true}
          defaultValue={['node-1-1-2', 'node-1-1-3']}
          // showCheckedStrategy="SHOW_ALL"
        />
      </div>
      <div style={{ width: 320, marginTop: 32 }}>
        <h1>可勾选的, SHOW_ALL</h1>
        <TreeSelect
          treeData={data}
          dropdownStyle={{ maxHeight: 150, overflow: 'auto' }}
          treeCheckable={true}
          defaultValue={['node-1-1-2', 'node-1-1-3', 'node-1-1-1']}
          showCheckedStrategy="SHOW_ALL"
          maxTagCount={3}
        />
      </div>
    </div>

  );
};

export default TreeSelectDEmo;
