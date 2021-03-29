/* eslint-disable */
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
  {
    key: '5',
    name: '胡彦祖2',
    age: 42,
    address: '西湖区湖底公园2号',
  },
  {
    key: '6',
    name: '胡彦祖2',
    age: 42,
    address: '西湖区湖底公园2号',
  },
];

const columnsBase = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 150,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 150,
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

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    fixed: true,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 150,
    fixed: 'right',
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

const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === 4) {
    obj.props.colSpan = 0;
  }
  return obj;
};

const spanColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text, row, index) => {
      if (index < 4) {
        return <a>{text}</a>;
      }
      return {
        children: <a>{text}</a>,
        props: {
          colSpan: 6,
        },
      };
    },
  },
  {
    title: 'Age',
    align: 'right',
    dataIndex: 'age',
    render: renderContent,
  },
  {
    title: 'Home phone',
    colSpan: 2,
    dataIndex: 'tel',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === 2) {
        obj.props.rowSpan = 2;
      }
      // These two are merged into above cell
      if (index === 3) {
        obj.props.rowSpan = 0;
      }
      if (index === 4) {
        obj.props.colSpan = 0;
      }
      return obj;
    },
  },
  {
    title: 'Phone',
    colSpan: 0,
    dataIndex: 'phone',
    render: renderContent,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    colSpan: 2,
    render: renderContent,
  },
  {
    title: 'province',
    dataIndex: 'province',
    render: renderContent,
    colSpan: 0,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
    province: 'a',
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
    province: 'b',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
    province: 'c',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
    province: 'd',
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
    province: 'e',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, selectedRowKeys, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Jim Red', // Column configuration not to be checked
    name: record.name,
  }),
  selectedRowKeys: ['4'],
};

const TableDemo: React.FC<unknown> = () => (
  <div style={{ padding: 32, background: '#fff' }}>
    <div>
      <h4>基础表格</h4>
      <div>
        <Table
          dataSource={dataSource}
          columns={columnsBase}
          rowKey="key"
          bordered
          scroll={{ y: 300 }}
        />
      </div>
    </div>
    <div>
      <h4>固定头表格</h4>
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="key"
          bordered
          // loading
          scroll={{ y: 200, x: 1500 }}
        />
      </div>
    </div>
    <div>
      <h4>合并行列</h4>
      <div>
        <Table columns={spanColumns} dataSource={data} rowKey="key" bordered />
      </div>
    </div>
    <div>
      <h4>可选择行</h4>
      <div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey="key" scroll={{ y: 200, x: 1500 }} />,
      </div>
    </div>
    <div>
      <h4>可编辑行</h4>
      <div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} rowKey="key" scroll={{ y: 200, x: 1500 }} />,
      </div>
    </div>
  </div>
);

export default TableDemo;
