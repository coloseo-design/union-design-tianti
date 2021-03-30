import { ReactNode } from 'react';

export interface TransferItem {
  name: string | number | boolean | {[key: string]: unknown} | ReactElement<unknown, string |
  JSXElementConstructor<unknown>> | ReactNodeArray | ReactPortal | null | undefined;
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
  // [x: string]: any;
}
export interface RenderResultObject {
  label: React.ReactElement;
  value: string;
}
export type TransferDirection = 'left' | 'right';

export type RenderResult = React.ReactElement | RenderResultObject | string | null;

export interface TransferProps {
  prefixCls?: string;
  titles?: ReactNode[];
  dataSource?: TransferItem[];
  targetKeys?: string[];
  selectedKeys?: string[];
  listStyle?: {[key: string] : unknown};
  showSearch?: boolean;
  operations?: string[];
  disabled?: boolean;
  showSelectAll?: boolean;
  render?: (record: TransferItem) => RenderResult;
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  onChange?:(targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void;
  onScroll?: (direction: TransferDirection, event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  onSearch?: (direction: TransferDirection, value: string) => void;
  filterOption?: (inputValue: string, option: {[key: string] : unknown}) => boolean;
  className?: string;
}
