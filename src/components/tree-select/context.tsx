/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';

export interface TreeNodeContect {
  handleSelect?: (value: string, node: any, other: object) => void;
  handleTreeExpand?: (keys: string, currentNode: object) => void;
  handleChecked?: (value: string, checked: boolean, other: object) => void;
  isExpand?: boolean,
  prefixCls?: string,
  treeCheckable?: boolean,
  multiple?: boolean,
  selectValues?: string[],
  expandKeys: string[],
  treeType?: 'tree' | 'tree-select',
  selectedKeys?: string[],
  treeDisabled?: boolean,
}

export const TreeNodeContext = React.createContext<TreeNodeContect>({
  isExpand: false,
  prefixCls: undefined,
  treeCheckable: false,
  multiple: false,
  expandKeys: [],
  handleTreeExpand: () => {},
  handleSelect: () => {},
  handleChecked: () => {},
  selectedKeys: [],
  treeDisabled: false,
});
