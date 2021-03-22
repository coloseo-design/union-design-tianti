import React from 'react';
import Table from './index';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌1',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖2',
    age: 42,
    address: '西湖区湖底公园2号',
  },
  {
    key: '3',
    name: '胡彦祖2',
    age: 42,
    address: '西湖区湖底公园2号',
  },
  {
    key: '4',
    name: '胡彦祖2',
    age: 42,
    address: '西湖区湖底公园2号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    // eslint-disable-next-line react/display-name
    render: (k: string, row: any) => (
      <div>
        {row.name}
        @
        {k}
      </div>
    ),
  },
];

const TableDemo: React.FC<unknown> = () => (
  <div style={{ padding: 32, background: '#fff' }}>
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey="key"
      bordered
      // loading
    />
  </div>
);

export default TableDemo;
