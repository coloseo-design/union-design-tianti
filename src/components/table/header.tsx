import React, { useState } from 'react';
import classNames from 'classnames';
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
  const [visible, setVisible] = useState(false);
  return (
    <thead>
      <tr>
        {
          columns.map((column) => {
            const { colSpan = 1, className = '', align = '' } = column;
            if (colSpan === 0) {
              return null;
            }
            const filters = (column.filters || []).map((item) => ({
              ...item,
              label: item.text,
            }));
            const key = column.key || column.dataIndex || '';
            const clsName = classNames({
              [`${prefixCls}-header-${align}`]: align,
            }, className);
            return (
              <th
                key={key}
                colSpan={column.colSpan}
                className={clsName}
              >
                <span>
                  {column.title}
                  { column.filters && column.filters?.length > 0 ? (
                    <Dropdown
                      placement="bottomCenter"
                      onVisibleChange={(isVisible) => {
                        setVisible(isVisible);
                      }}
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
                      <Icon
                        type="sizer"
                        style={{
                          marginLeft: 5, display: 'inline-block', width: 20, color: visible ? '#207EEA' : '#ACAFB9',
                        }}
                      />
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
