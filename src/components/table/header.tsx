import React from 'react';
import { ColumnsProps } from './type';
import { renderColumns } from './utils';
import RenderHead from './render-head';

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
  const ColumnRows = renderColumns(isFixed ? columns : propsColumns, 0) || [];
  return (
    <thead style={{ height: theadHeight }}>
      {ColumnRows.map((T: any, index: number) => (
        <tr key={index}>
          {
            T.map((item: ColumnsProps, idx: number) => (
              <RenderHead
                column={item}
                onChange={onChangeFromProps}
                filteredValueMap={filteredValueMap}
                isFixed={isFixed}
                prefixCls={prefixCls}
                key={idx}
              />
            ))
          }
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
