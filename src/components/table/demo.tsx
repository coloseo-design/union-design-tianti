/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Table, Tabs, Popconfirm, Tooltip,
} from '../index';
import './styles/index';
import '../popconfirm/styles/index';
import '../tabs/styles/index';
import '../tooltip/styles/index';

const { Pane } = Tabs;

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

const render1 = (k: string, row: any) => (
  <div>
    {row.name}
    @
    {k}
  </div>
);

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
    render: render1,
  },
  {
    title: '操作',
    dataIndex: 'op',
    key: 'op',
    align: 'right',
    render: (_, record, index) => (
      <Popconfirm
        defaultVisible={index === 1}
        title="呵呵哒卑微的我的风风光光让他给人听胃"
      >
        <a className={`delete-${index}`}>删除</a>
      </Popconfirm>
    ),
  },
];
const columnsFixed = [
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
    render: render1,
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    fixed: true,
    filteredValue: ['Jim', 'Joe'],
    filters: [
      {
        text: 'Jim family',
        value: 'Jim',
      },
      {
        text: 'Joe family',
        value: 'Joe',
      },
    ],
    onFilter: (value: any, record: { name: string | any[]; }) => record.name.includes(value),
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
    filteredValue: ['No. 1'],
    filters: [
      {
        text: 'Jim family',
        value: 'No. 1',
      },
      {
        text: 'Joe family',
        value: 'No. 2',
      },
    ],
    onFilter: (value: any, record: any) => record.address.includes(value),
    render: render1,
  },
];

const renderContent = (value: any, row: any, index: number) => {
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
    render: (text: unknown | null | undefined, row: any, index: number) => {
      if (index < 4) {
        // return <a>{text}</a >;
        return <span style={{ color: '#b30000' }}>{text}</span>;
      }
      return {
        // children: <a>{text}</a >,
        children: <span style={{ color: '#b30000' }}>{text}</span>,
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
    render: (value: any, row: any, index: number) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === 2) {
        obj.props.rowSpan = 2;
      }
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
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, selectedRowKeys, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: { name: string; }) => ({
    disabled: record.name === 'Jim Red', // Column configuration not to be checked
    name: record.name,
  }),
  selectedRowKeys: ['4'],
};

const tableT2 = (
  <div>
    <h4>固定头表格</h4>
    <div>
      <Table
        dataSource={dataSource}
        columns={columnsFixed}
        rowKey="key"
        bordered
        scroll={{ y: 200, x: 1500 }}
      />
    </div>
  </div>
);

const tableT3 = (
  <div>
    <h4>合并行列</h4>
    <div>
      <Table columns={spanColumns} dataSource={data} rowKey="key" bordered />
    </div>
  </div>
);
const tableT1 = (
  <>
    <div>
      <h4>基础表格</h4>
      <div>
        <Table
          dataSource={dataSource}
          columns={columnsBase}
          rowKey="key"
          bordered
          scroll={{ y: 200 }}
        />
      </div>
    </div>
    {/* <div>
      <h4>固定头表格</h4>
      <div>
        <Table
          dataSource={dataSource}
          columns={columnsFixed}
          rowKey="key"
          bordered
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
        <Table
          rowSelection={rowSelection}
          columns={columnsFixed}
          dataSource={data}
          rowKey="key"
          scroll={{ y: 200, x: 1500 }}
        />
      </div>
    </div>
    <div>
      <h4>可筛选过滤</h4>
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          pagination={{ pageSize: 2 }}
          dataSource={data}
          rowKey="key"
          scroll={{ y: 200, x: 1500 }}
        />
      </div>
    </div> */}
  </>
);

const TableDemo: React.FC<unknown> = () => (
  <div style={{ padding: 32, background: '#fff' }}>
    <Tabs type="page" activeKey="2">
      <Pane key="1" tab="页签1">
        {tableT1}
      </Pane>
      <Pane key="2" tab="页签2">
        {tableT2}
      </Pane>
      <Pane key="3" tab="页签3">
        {tableT3}
      </Pane>
    </Tabs>
  </div>
);

export default TableDemo;
