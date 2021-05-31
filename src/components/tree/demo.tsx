import React from 'react';
import { Tree } from '../index';

const { TreeNode } = Tree;
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
        title: 'node-1-1',
        children: [
          {
            key: 'node-1-1-1',
            value: 'node-1-1-1',
            title: 'node-1-1-1',
          },
          {
            key: 'node-1-1-2',
            value: 'node-1-1-2',
            title: 'node-1-1-2',
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
              {
                key: 'node-1-1-4',
                value: 'node-1-1-4',
                title: 'no肉肉肉',
                children: [
                  {
                    key: '888',
                    value: '888',
                    title: 'nodelevel深度测试',
                    children: [
                      {
                        key: '90',
                        value: '90',
                        title: 'nodelevel深度测试122xdew大么都渴望对方么',
                      },
                    ],
                  },
                ],
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
    key: '42',
    value: '42',
    title: '和哈哈ces哈',
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
const TreeDemo = () => {
  const [dataT, setData] = React.useState([]);
  React.useEffect(() => {
    setTimeout(() => {
      setData(data);
    }, 2000);
  }, []);
  const onExpand = (keys: string[], obj: {[key: string] : unknown}) => {
    console.log('---keys', keys, obj);
  };
  const onSelect = (selectedKeys: string[], other: any) => {
    console.log('---selectedKeys', selectedKeys, other);
  };
  const onCheck = (keys: string[], other: {[key: string] : unknown}) => {
    console.log('keys', keys, other);
  };
  return (
    <div style={{ margin: '60px' }}>
      <h1>单选</h1>
      <div style={{ width: 320 }}>
        <Tree
          onExpand={onExpand}
          onSelect={onSelect}
        >
          <TreeNode title="parent 1" key="0-0">
            <TreeNode title="parent 1-0" key="0-0-0">
              <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
              <TreeNode title="leaf" key="0-0-0-1" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode title={<span>sss</span>} key="0-0-1-0" />
            </TreeNode>
          </TreeNode>
          <TreeNode title="parent 2" key="1" />
          <TreeNode title="parent 3" key="131">
            <TreeNode title="parent 31" key="234" />
          </TreeNode>
        </Tree>
      </div>
      <div style={{ width: 320, marginTop: 32 }}>
        <h1>多选的</h1>
        <Tree
          treeData={data}
          multiple
          onExpand={onExpand}
          onSelect={onSelect}
        />
      </div>

      <div style={{ width: 340, marginTop: 32 }}>
        <h1>可勾选的 (父子节点有关联)</h1>
        <Tree
          treeData={dataT}
          onSelect={onSelect}
          checkable
          style={{ width: 320 }}
          defaultSelectedKeys={['24']}
          defaultCheckedKeys={['24', '23']}
          onCheck={onCheck}
        />
      </div>
      <div style={{ width: 340, marginTop: 32 }}>
        <h1>可勾选的 (父子节点没有关联)</h1>
        <Tree
          treeData={data}
          onSelect={onSelect}
          checkable
          checkStrictly
          onCheck={onCheck}
          style={{ width: 320, maxHeight: 200, overflow: 'auto' }}
          selectedKeys={['24']}
        />
      </div>
    </div>

  );
};

export default TreeDemo;
