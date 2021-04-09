/* eslint-disable @typescript-eslint/no-explicit-any */
export type TreeSelectData = {
  key?: string;
  value: string;
  title: string;
  parent?: TreeSelectData | null;
  children?: TreeSelectData[];
  disabled?: boolean;
  checkable?: boolean;
  isLeaf?: boolean;
  level?: number;
  disableCheckbox?: boolean;
}

export interface TreeSelectStates {
  smooth: TreeSelectData[];
  border?: boolean;
  left?: number;
  top?: number;
  width?: number | string;
  expandKeys: string[];
  childrenList?: any[];
  multiple?: boolean;
  height?: number;
  // 展示框展示的值
  values: string[];
  // 勾选的值
  selectValues: string[];
}

export interface TreeSelectProps {

  // 输入框提示信息
  placholder?: string;
  // 下拉菜单样式
  dropdownClassName?: string;
  // 最多展示个数
  maxTagCount?: number;
  // 节点挂在在何处默认document.body
  getPopupContainer?: () => HTMLElement;
  // 下拉列表样式
  dropdownStyle?: React.CSSProperties;
  // 是否可勾选
  treeCheckable?: boolean;
  // 展开所有父节点
  treeDefaultExpandAll?: boolean;
  // 默认展开的数节点
  treeDefaultExpandedKeys?: string[];
  // 默认展开的节点
  treeExpandedKeys?: string[];
  // 单选多选
  multiple?: boolean;
  // 选中的值
  value?: string[] | string;
  // 默认选中的值
  defaultValue?: string | string[];
  // 元素改变时调用
  onChange?: (value: string | string[], node: any) => void;
  // 选中节点调用
  onSelect?: (value: string | string[], node: any) => void;
  // onSelected?: (key: string, value: string) => void;
  // 展开节点调用
  onTreeExpand?: (expandedKeys: string[]) => void;
  // treeCheckable为true时选项框的回填方式

  prefixCls?: string;
  // 渲染数据
  treeData?: TreeSelectData[];
  // 搜索框默认值
  placeholder?: string;

  // 输入框样式
  style?: React.CSSProperties;
  // 选项框回填的值
  showCheckedStrategy?: 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';

  children?: any;

}

export interface TreePopupProps {
  getPopupContainer?: () => HTMLElement;
}

export interface TreeNodeProps {
  prefixIcon?: boolean | undefined;
  isExpand?: boolean;
  isSelected?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  disableCheckbox?: boolean;
  disabled?: boolean;
  isLeaf?: boolean;
  title: string | React.ReactNode;
  value?: string;
  current?: string;
  prefixCls?: string;
  treeCheckable?: boolean;
  handleTreeExpand?: (keys: string) => void;
  multiple?: boolean;
  selectValues?: string | string[],
  expandKeys?: string[],
  currentNode?: any;
  isChecked?: boolean;
}
