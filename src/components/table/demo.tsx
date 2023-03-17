/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Table,
} from '../index';
import './styles/index';
import '../popconfirm/styles/index';
import '../tabs/styles/index';
import '../tooltip/styles/index';
import { ColumnsProps, TableRowSelectionType, ColumnsAlign } from './type';

const render1 = (k: React.ReactNode, row: any) => (
  <div>
    {row.name}
    @
    {k}
  </div>
);

const columns: ColumnsProps[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    fixed: true,
    // defaultFilteredValue: [],
    // filterMultiple: true,
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
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 150,
    fixed: 'right',
  },
  {
    title: '手机',
    dataIndex: 'tel',
    key: 'tel',
    width: 200,
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
    props: {} as { colSpan?: number },
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
    align: 'center' as ColumnsAlign,
    render: (text: React.ReactNode, row: any, index: number) => {
      if (index < 4) {
        return <span style={{ color: '#b30000' }}>{text}</span>;
      }
      return {
        children: <span style={{ color: '#b30000' }}>{text}</span>,
        props: {
          colSpan: 6,
        },
      };
    },
  },
  {
    title: 'Age',
    align: 'right' as ColumnsAlign,
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
        props: {} as { rowSpan?: number; colSpan?: number },
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

const rowSelection: TableRowSelectionType = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`onChange: ${selectedRowKeys}`, selectedRowKeys, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: { name: string; }) => ({
    disabled: record.name === 'Jim Red', // Column configuration not to be checked
    name: record.name,
  }),
  // defaultSelectedRowKeys: ['1', '2'],
  onSelect: (record, checked) => {
    console.log('onSelect', record, checked);
  },
  onSelectAll: (records, checked) => {
    console.log('onSelectAll', records, checked);
  },
};

const TableDemo: React.FC<unknown> = () => {
  const [selectKeys, $keys] = React.useState(['1']);
  const [current, $current] = React.useState(1);
  const [pageSize, $pageSize] = React.useState(5);
  const rowSelection1: TableRowSelectionType = {
    type: 'radio',
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      $keys(selectedRowKeys);
      console.log(`radio onChange: ${selectedRowKeys}`, selectedRowKeys, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: { name: string; }) => ({
      disabled: record.name === 'Jim Red', // Column configuration not to be checked
      name: record.name,
    }),
    selectedRowKeys: selectKeys,
    // defaultSelectedRowKeys: ['1'],
    onSelect: (record, checked) => {
      console.log('radio onSelect', record, checked);
    },
  };

  const columnsGroup = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: true,
      width: 120,
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'John',
          value: 'John',
        },
      ],
      onFilter: (value: unknown, record: any) => record.name.indexOf(value) === 0,
    },
    {
      title: 'Other',
      children: [
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: 150,
        },
        {
          title: 'Address',
          key: 'Address',
          children: [
            {
              title: 'Street',
              dataIndex: 'street',
              key: 'street',
              width: 150,
            },
            {
              title: 'Block',
              children: [
                {
                  title: 'Building',
                  dataIndex: 'building',
                  key: 'building',
                  width: 100,
                },
                {
                  title: 'Door No.',
                  dataIndex: 'number',
                  key: 'number',
                  width: 100,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Company',
      children: [
        {
          title: 'Company Address',
          dataIndex: 'companyAddress',
          key: 'companyAddress',
          width: 200,
        },
        {
          title: 'Company Name',
          dataIndex: 'companyName',
          key: 'companyName',
        },
      ],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      fixed: 'right',
    },
  ];

  const dataH = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 40; i++) {
    dataH.push({
      key: i,
      name: 'John Brown',
      age: i + 1,
      street: 'Lake Park',
      building: 'C',
      number: 2035,
      companyAddress: 'Lake Street 42',
      companyName: 'SoftLake Co',
      gender: 'M',
    });
  }

  const data2 = [
    {
      key: '1',
      name: '胡彦斌1',
      sex: '男',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖2',
      sex: '男',
      age: 42,
      address: '西湖区湖底公园2号',
    },
    {
      key: '3',
      name: '胡彦祖2',
      sex: '男',
      age: 42,
      address: '西湖区湖底公园2号',
    },
    {
      key: '4',
      name: '胡彦祖2',
      sex: '男',
      age: 42,
      address: '西湖区湖底公园2号',
    },
    {
      key: '5',
      name: '胡彦祖2',
      sex: '男',
      age: 42,
      address: '西湖区湖底公园2号',
    },
    {
      key: '6',
      name: '胡彦祖2',
      sex: '男',
      age: 42,
      address: '西湖区湖底公园2号',
    },
  ];
  return (
    <div style={{ padding: 32, background: '#fff' }}>
      <>
        <h4>表头分组</h4>
        <Table
          columns={columnsGroup}
          rowSelection={rowSelection}
          dataSource={dataH}
          bordered
          scroll={{ x: 1500, y: 300 }}
        />
        <div>
          <h4>基础表格</h4>
          <div>
            <Table
              dataSource={data2}
              columns={[
                {
                  title: '姓名',
                  dataIndex: 'name',
                  key: 'name',
                  width: 150,
                  className: 'ttt',
                  align: 'right',
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
                  render: (k: React.ReactNode, row: any) => (
                    <div>
                      {row.name}
                      @
                      {k}
                    </div>
                  ),
                },
                {
                  title: '操作',
                  dataIndex: 'op',
                  key: 'op',
                  // align: 'right',
                  width: 150,
                  render: (_, record, index) => (
                    <a className={`delete-${index}`}>删除</a>
                  ),
                },
              ]}
              bordered
              pagination={false}
            />
          </div>
        </div>
        <div>
          <h4>固定列表格</h4>
          <div>
            <Table
              dataSource={data2}
              columns={[
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
                  render: (k: React.ReactNode, row: any) => (
                    <div>
                      {row.name}
                      @
                      {k}
                    </div>
                  ),
                },
                {
                  title: '性别',
                  dataIndex: 'sex',
                  key: 'sex',
                  width: 200,
                },
              ]}
              bordered
              scroll={{ x: 1200 }}
            />
          </div>
        </div>
        <div>
          <h4>合并行列</h4>
          <div>
            <Table
              columns={spanColumns}
              dataSource={[
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
              ]}
              bordered
            />
          </div>
        </div>
        <div>
          <h4>可选择行</h4>
          <div>
            <Table
              rowSelection={rowSelection}
              columns={[
                {
                  title: '姓名',
                  dataIndex: 'name',
                  key: 'name',
                  fixed: 'left',
                  width: 200,
                },
                {
                  title: '年龄',
                  dataIndex: 'age',
                  key: 'age',
                },
                {
                  title: '电话',
                  dataIndex: 'tel',
                  key: 'tel',
                },
                {
                  title: '住址',
                  dataIndex: 'address',
                  key: 'address',
                },
              ]}
              scroll={{ y: 200 }}
              dataSource={[
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
              ]}
            />
          </div>
        </div>
        <div>
          <h4>可选择行 radio</h4>
          <div>
            <Table
              rowSelection={rowSelection1}
              columns={[
                {
                  title: '姓名',
                  dataIndex: 'name',
                  key: 'name',
                  fixed: 'left',
                  width: 200,
                },
                {
                  title: '年龄',
                  dataIndex: 'age',
                  key: 'age',
                },
                {
                  title: '电话',
                  dataIndex: 'tel',
                  key: 'tel',
                },
                {
                  title: '住址',
                  dataIndex: 'address',
                  key: 'address',
                },
              ]}
              dataSource={[
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
                {
                  key: '11',
                  name: 'John Brown12',
                  age: 32,
                  tel: '0571-22098909',
                  phone: 18889898989,
                  address: 'New York No. 1 Lake Park',
                  province: 'a',
                },
                {
                  key: '21',
                  name: 'Jim Green12',
                  tel: '0571-22098333',
                  phone: 18889898888,
                  age: 42,
                  address: 'London No. 1 Lake Park',
                  province: 'b',
                },
                {
                  key: '31',
                  name: 'Joe Black12',
                  age: 32,
                  tel: '0575-22098909',
                  phone: 18900010002,
                  address: 'Sidney No. 1 Lake Park',
                  province: 'c',
                },
                {
                  key: '41',
                  name: 'Jim Red12',
                  age: 18,
                  tel: '0575-22098909',
                  phone: 18900010002,
                  address: 'London No. 2 Lake Park',
                  province: 'd',
                },
                {
                  key: '51',
                  name: 'Jake White12',
                  age: 18,
                  tel: '0575-22098909',
                  phone: 18900010002,
                  address: 'Dublin No. 2 Lake Park',
                  province: 'e',
                },
                {
                  key: '52',
                  name: 'Jake White1234',
                  age: 18,
                  tel: '0575-22098909',
                  phone: 18900010002,
                  address: 'Dublin No. 2 Lake Park',
                  province: 'e',
                },
              ]}
              bordered
              pagination={{
                current,
                pageSize,
                onChange: (page: number, size: number) => {
                  if (page === 1) {
                    $keys(['1']);
                  }
                  $current(page);
                  $pageSize(size);
                },
              }}
            />
          </div>
        </div>
        <div>
          <h4>可筛选过滤</h4>
          <div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              pagination={{
                // pageSize: 2,
                style: { marginTop: 8 },
              }}
              dataSource={[
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
              ]}
              scroll={{ x: 1500 }}
              bordered
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default TableDemo;
