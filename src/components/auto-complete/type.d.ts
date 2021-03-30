/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactText } from 'react';

export interface DataSourceItemObject { value: string; title: string; [x: string]: string }
export type DataSourceItemType = string | DataSourceItemObject;

export interface AutoCompleteProps {
  // 行内样式
  style?: {[x: string]: any};
  // 下拉框样式
  dropdownMenuStyle?: {[key: string] : unknown};
  // 搜索框
  showSearch?: boolean;
  // 是否禁用 默认false
  disabled?: boolean;
  // 是否自动聚焦
  autoFocus?: boolean;
  children?: any;
  // 默认值
  defaultValue?: string;
  // 输入值
  value?: any;
  // 是否展开下拉菜单
  open?: boolean;
  // 是否默认展开下拉菜单
  defaultOpen?: boolean;
  // class前缀
  prefixCls?: string;
  placeholder?: string;
  // ref
  forwardedRef?: React.MutableRefObject<HTMLInputElement>;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  // TODO:  应该给dataSource指定格式
  dataSource?: any;
  onSelect?: (value: string, option: any) => void;
  // 多行输入
  multiInput?: boolean;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  rows?: number
}
