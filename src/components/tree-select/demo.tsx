import React from 'react';
import { TreeSelect } from '../index';
// import './styles/index';

const { TreeNode } = TreeSelect;
const data = [
  {
    value: 'node-0',
    title: '第一级1',
    children: [
      {
        value: 'node-0-1',
        title: '第二级1',
      },
      {
        value: 'node-0-2',
        title: '第二级2',
      },
    ],
  },
  {
    value: 'node-1',
    title: '第一级二',
    children: [
      {
        value: 'first',
        title: '第一季',
        children: [
          {
            value: 'second',
            title: '第二季',
          },
          {
            value: 'third',
            title: '第三季',
          },
        ],
      },
      {
        value: 'node-1-2',
        title: 'node-1-2哈哈哈',
        disabled: true,
        children: [
          {
            value: 'node-1-2-1',
            title: 'node-1-2-1问我哈哈哈',
            children: [
              {
                value: 'node-1-2-2',
                title: 'node-1-2-1问22哈哈',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: '11',
    title: '和哈哈哈哈',
    children: [
      {
        value: '114',
        title: '你觉得你问大家哈',
      },
      {
        value: '115',
        title: '你觉得dwel 你大家哈',
      },
    ],
  },
  {
    value: '22',
    title: '和哈哈哈哈',
  },
  {
    value: '23',
    title: '广告广告',
  },
  {
    value: '24',
    title: '孤寡孤寡',
  },
];
const TreeSelectDEmo = () => {
  const [value1, setValue1] = React.useState<string | string[]>('1');
  const [value2, setValue2] = React.useState<string | string[]>(['node-0-1']);
  const onChange = (value: string | string[], node: any) => {
    console.log('---change', value, node);
    setValue1(value);
  };
  const onSelect = (value: string | string[], node: any) => {
    console.log('---select', value, node);
  };

  const onChange1 = (value: string | string[], node: any) => {
    setValue2(value);
    console.log('---change', value, node);
  };

  const [dataT, setData] = React.useState<any[]>([]);
  React.useEffect(() => {
    setTimeout(() => {
      setData(data);
    }, 2000);
  }, []);

  return (
    <div id="tree-demo" style={{ margin: '60px', position: 'relative' }}>
      <h1>单选</h1>
      <div style={{ width: 320 }}>
        <TreeSelect
          value={value1}
          onChange={onChange}
          onSelect={onSelect}
          disabled
          style={{ width: 256, height: 52 }}
        >
          <TreeNode title="顶级" key="a" value="a">
            <TreeNode title="哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈" key="1" value="1">
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
          multiple
          value={value2}
          onChange={onChange1}
          onSelect={onSelect}
          maxTagCount={2}
          getPopupContainer={() => document.querySelector('#tree-demo')}
        />
      </div>

      <div style={{ width: 320, marginTop: 32 }}>
        <h1>可勾选的</h1>
        <TreeSelect
          treeData={dataT}
          dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
          treeCheckable
          defaultValue={['node-0-1']}
          onSelect={onSelect}
        />
      </div>

      <div style={{ width: 320, marginTop: 32 }}>
        <h1>可勾选的, SHOW_ALL</h1>
        <TreeSelect
          treeData={data}
          dropdownStyle={{ maxHeight: 150, overflow: 'auto' }}
          treeCheckable
          showCheckedStrategy="SHOW_ALL"
          maxTagCount={3}
        />
      </div>
    </div>
  );
};

export default TreeSelectDEmo;
