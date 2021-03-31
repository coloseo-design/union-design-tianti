import React from 'react';
import { ColumnsProps } from './type';
import {
  Icon,
  Dropdown,
} from '..';
import Filter from './filter';

interface TableHeaderProps {
  columns: ColumnsProps[];
  prefixCls: string;
  onChange: (name: string, values: string[]) => void;
  filteredValueMap: {
    [key: string]: string[];
  }
}

const TableHeader: React.FC<TableHeaderProps> = (props: TableHeaderProps) => {
  const { columns, prefixCls, filteredValueMap } = props;
  const onChange = (name: string) => (_values: string[]) => {
    props.onChange && props.onChange(name, _values);
  };
  return (
    <thead>
      <tr>
        {
          columns.map((column) => {
            const { colSpan = 1 } = column;
            if (colSpan === 0) {
              return null;
            }
            const filters = (column.filters || []).map((item) => ({
              ...item,
              label: item.text,
            }));
            const key = column.key || column.dataIndex || '';
            return (
              <th
                key={key}
                colSpan={column.colSpan}
              >
                <span>
                  {column.title}
                  { column.filters && column.filters?.length > 0 ? (
                    <Dropdown
                      placement="bottomCenter"
                      overlay={(
                        <Filter
                          prefix={prefixCls}
                          onChange={onChange(key)}
                          values={filteredValueMap[key]}
                          dataSource={filters}
                        />
                      )}
                      trigger={['click']}
                    >
                      <Icon type="sizer" style={{ marginLeft: 5, display: 'inline-block', width: 20 }} />
                    </Dropdown>
                  ) : null}
                </span>
              </th>
            );
          })
        }
      </tr>
    </thead>
  );
};

export default TableHeader;
