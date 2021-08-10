import React from 'react';
import { PaginationProps } from '../pagination/pagination';

type ColumnsAlign = 'left' | 'right' | 'center';
type FixedType = 'left' | 'right';

export type RenderReturnObjectType = {
  props: {
    /** 列合并 */
    colSpan: number;
    /** 行合并 */
    rowSpan: number;
  };
  children: React.ReactNode;
};

export interface ColumnsProps {
  /** 设置列的对齐方式 */
  align?: ColumnsAlign;
  /** 类名称 */
  className?: string;
  /** 列合并 */
  colSpan?: number;
  /** key */
  dataIndex?: string;
  /** 固定列 */
  fixed?: boolean | FixedType;
  /** key React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性 */
  key?: string;
  /** 列渲染函数 */
  // eslint-disable-next-line max-len
  render?: (text: React.ReactNode | string, record: unknown, index: number) => React.ReactNode | RenderReturnObjectType;
  /** 标题 */
  title: React.ReactNode;
  /** 宽度 */
  width: string | number;
  /** filter数据列表 */
  filters?: {text: React.ReactNode; value: string }[];
  /** 过滤器 */
  onFilter?: (value: unknown, record: unknown) => boolean;
  /** 筛选控制 */
  filteredValue: string[];
  /** 筛选控制 */
  defaultFilteredValue: string[];
}

export type RowKeyType = string | ((record: unknown) => string);

export type TableRowSelectionType = {
  /** 用户手动选择/取消选择某行的回调 */
  onSelect: () => void;
  /** 用户手动选择/取消选择所有行的回调 */
  onSelectAll: () => void;
  /** 选中项发生变化时的回调 */
  onChange: (selectedRowKeys: unknown[], selectedRows: unknown[]) => void;
  /** 列宽 */
  columnWidth?: number;
  /** 列标题 */
  columnTitle?: React.ReactNode;
  /** checkbox默认设置 */
  getCheckboxProps: (record: unknown) => {
    disabled?: boolean;
    name?: React.ReactNode;
  };
  /** 默认选中 */
  selectedRowKeys: unknown[];
}

export interface TableProps extends ConfigConsumerProps, React.HTMLAttributes<HTMLTableElement> {
  /** 是否包含边框 */
  bordered: boolean;
  columns: ColumnsProps[];
  rowKey: RowKeyType;
  dataSource: unknown[];
  /** 自定义类前缀 */
  prefixCls?: string;
  /** 是否加载中 */
  loading?: boolean;
  /** 表格行是否可选择 */
  rowSelection: TableRowSelectionType;
  scroll: {
    /** 设置横向滚动，也可用于指定滚动区域的宽 */
    x?: number | boolean;
    /** 设置横向滚动，也可用于指定滚动区域的宽 */
    y?: number | boolean;
    /** 当分页、排序、筛选变化后是否滚动到表格顶部 */
    scrollToFirstRowOnChange?: boolean;
  };
  pagination: boolean | PaginationProps;
}

export interface TableState {
  /** 数据源 */
  // dataSource: unknown[];
  /** 列 */
  // columns: ColumnsProps[];
  /** 选中的列 */
  selectedRowKeys: unknown[];
  selectedRowKey: string;
  filters: {
    [key: string]: string[]
  }
  pagination: boolean | PaginationProps;
}

export interface ColProps {
  children: React.ReactNode,
  align: ColumnsAlign,
  key: string,
  props: {
    /** 列合并 */
    colSpan: number;
    /** 行合并 */
    rowSpan: number;
  };
}

export interface RowProps {
  key: string;
  children: ColProps[];
}
