import React, { useState } from 'react';
import classNames from 'classnames';
import { ColumnsProps } from './type';
import {
  Icon,
  Dropdown,
} from '..';
import Filter from './filter';
import { renderColumns } from './utils';

interface TableHeaderProps {
  columns: ColumnsProps[];
  // 原始props 传过来的columns
  propsColumns: ColumnsProps[];
  prefixCls: string;
  onChange: (name: string, values: string | string[]) => void;
  filteredValueMap: {
    [key: string]: string | string[];
  },
  /* 如果是固定列过来就不需要使用原始columns进行处理rowSpan，colSpan */
  isFixed?: boolean;
  theadHeight?: number;
}

const TableHeader: React.FC<TableHeaderProps> = (props: TableHeaderProps) => {
  const {
    prefixCls,
    filteredValueMap,
    onChange: onChangeFromProps,
    columns,
    propsColumns,
    isFixed,
    theadHeight,
  } = props;
  const onChange = (name: string) => (_values: string | string[]) => {
    setVisible(false);
    onChangeFromProps && onChangeFromProps(name, _values);
  };
  const [visible, setVisible] = useState(false);

  const renderHead = (column: any) => {
    const {
      colSpan, className = '', align = '', rowSpan,
    } = column;
    if (colSpan === 0) {
      return null;
    }
    if (rowSpan === 0) {
      return null;
    }
    const filters = (column.filters || []).map((item: any) => ({
      ...item,
      label: item.text,
    }));
    const key = column.key || column.dataIndex || '';
    const textAlign = align || (column.colSpan > 1 ? 'center' : 'left');
    const clsName = classNames({
      [`${prefixCls}-header-${textAlign}`]: textAlign,
    }, className);
    let filterIcon = (
      <Icon
        type="sizer"
        style={{
          marginLeft: 5, display: 'inline-block', width: 20, color: visible ? '#207EEA' : '#ACAFB9',
        }}
      />
    );
    if (column.filterIcon) {
      let icon = column.filterIcon;
      if (typeof icon === 'function') {
        icon = icon();
      }
      if (React.isValidElement(icon)) {
        filterIcon = icon;
      }
    }

    return (
      <th
        key={key}
        colSpan={colSpan}
        className={clsName}
        rowSpan={rowSpan}
      >
        <span>
          {column.title}
          { column.filters && column.filters?.length > 0 ? (
            <Dropdown
              placement="bottomCenter"
              visible={visible}
              onVisibleChange={(isVisible) => {
                setVisible(isVisible);
              }}
              trigger={['click']}
              overlay={(
                <Filter
                  prefix={prefixCls}
                  onChange={onChange(key)}
                  values={filteredValueMap[key]}
                  dataSource={filters}
                  filterMultiple={column.filterMultiple}
                />
              )}
            >
              <span>
                {filterIcon}
              </span>
            </Dropdown>
          ) : null}
        </span>
      </th>
    );
  };

  const ColumnRows = renderColumns(isFixed ? columns : propsColumns, 0) || [];
  return (
    <thead style={{ height: theadHeight }}>
      {ColumnRows.map((T: any, index: number) => (
        <tr key={index}>
          {
            T.map((item: ColumnsProps) => renderHead(item))
          }
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
