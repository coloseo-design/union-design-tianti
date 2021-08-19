/* eslint-disable @typescript-eslint/ban-types */
export type TreeDataType = {
  key: string;
  title: string;
  parent?: TreeDataType | null;
  children?: TreeDataType[];
  disabled?: boolean;
  checkable?: boolean;
  isLeaf?: boolean;
  level?: number;
  parentId?: string;
  currentKey?: string;
  disableCheckbox?: boolean;
}

export interface TreeProps {
  // 是否可勾选
  checkable?: boolean;
  //  默认展开所有的节点
  defaultExpandAll?: boolean;
  // 是否自动展开父节点
  autoExpandParent?: boolean;
  // 默认展开父节点
  defaultExpandParent?: boolean;
  // 默认指定展开的节点
  defaultExpandedKeys?: string[];
  // 展开的节点
  expandedKeys?: string[];
  // 多选
  multiple?: boolean;
  // 点击复选框调用
  onCheck?: (value: string[], other: {[key: string] : unknown}) => void;
  // 选中节点调用
  onSelect?: (value: string[], other: {[key: string] : unknown}) => void;
  // 展开/收起节点调用
  onExpand?: (expandedKeys: string[], other: {[key: string] : unknown}) => void;
  // 整个树形disabled
  disabled?: boolean;
  prefixCls?: string;
  // 渲染数据
  treeData?: TreeDataType[];

  // 树的样式
  style?: React.CSSProperties;
  // 默认选择的节点key
  defaultSelectedKeys?: string[];
  // 选择的树节点key
  selectedKeys?: string[];
  // checkable 状态下节点选择完全受控（父子节点选中状态不再关联）
  checkStrictly?: boolean;

  // 复选框勾选的节点
  checkedKeys?: string[];

  // 默认勾选的节点
  defaultCheckedKeys?: string[];

  children?: any;

  className?: string;

}

export interface TreeState {
  expandKeys: string[];
  selectedKeys: string[];
  multiple: boolean;
  childrenList: any[];
  smooth: TreeDataType[];
  checkedKeys: string[];
}
