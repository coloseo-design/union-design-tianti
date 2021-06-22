---
category: Components
type: 通用
title: Tree
subtitle: 树形控件
---

## API
### Tree

| 属性 | 说明 | 类型 | 默认值 |  |
| --- | --- | --- | --- | --- |
| checkable | 节点前添加 Checkbox 复选框 | boolean | false |  |
| defaultExpandAll |默认展开所有树节点 | boolean | false |  |
| autoExpandParent | 是否自动展开父节点 | boolean | false |  |
| defaultExpandParent | 默认展开父节点 | boolean| false |
| defaultExpandedKeys | 默认展开的节点| string[] | [] |  |
| expandedKeys | （受控）展开指定的树节点 | string[]| [] |  |
|checkedKeys|（受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置checkable和checkStrictly父子节点的选中与否不再关联|string[] |[]|
|defaultCheckedKeys|默认选中复选框的树节点|string[]| []|
| multiple | 支持点选多个节点 | boolean | false |  |
| disabled | 是否禁用 | boolean  | false  |
| treeData | reeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一） | TreeDataType[] | [] |  |
| style | 树的样式| object | - |  |
| defaultSelectedKeys | 默认选中的树节点 | string[] | [] |  |
| selectedKeys | （受控）设置选中的树节点  | string[] | [] |  |
|checkStrictly | checkable 状态下节点选择完全受控（父子节点选中状态不再关联） | false | |
|onCheck| 点击复选框触发 | function(checkedKeys, e:{checked: bool, checkedNodes, node, event}) | 
|onSelect| 点击树节点触发| function(selectedKeys, e:{selected: bool, selectedNodes, node, event}) | |
|onExpand| 展开/收起节点时触发 | function(expandedKeys, {expanded: bool, node})| |


### TreeDataType格式
```typescript
interface TreeDataType {
  key: string;
  title: string;
  children?: any[];
}
```

### treeNode

| 属性 | 说明 | 类型 | 默认值 |  |
| --- | --- | --- | --- | --- |
| checkable | 当树为 checkable 时，设置独立节点是否展示 Checkbox | boolean | - |  |
| disableCheckbox | 禁掉 checkbox | boolean | false |  |
| disabled | 是否禁用  | boolean | - |  |
| isLeaf | 是否是叶子节点 | boolean| - |
| key | 被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复！ | string | - |  |
| title | 树节点显示的内容 | string|ReactNode| '--' |  |