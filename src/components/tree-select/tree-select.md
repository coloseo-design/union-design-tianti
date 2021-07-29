---
category: Components
type: 通用
title: TreeSelect
subtitle: 树选择
---

## API
### TreeSelect

| 属性                    | 说明               | 类型                                                                                   | 默认值        |
| ---------------------- | ------------------ | ------------------------------------------------------------------------------------  | ------------ |
| type                    | 按钮类型           | string                                                                                 | default       |
| treeData                    | 渲染数据           | TreeSelectData                                                                         | -             |
| placholder              | 提示信息           | string                                                                                 | -             |
| dropdownClassName       | 下拉框类名         | string                                                                                 | -             |
| dropdownStyle               | 下拉框内联样式     | string                                                                                 | -             |
| treeCheckable           | 是否可勾选         | boolean                                                                                | false         |
| treeDefaultExpandAll    | 默认展开所有节点 |    bollean                                                               | -             |
| treeDefaultExpandedKeys | 默认展开节点的 key | string[] 内容必须唯一                                                                  | -             |
| treeExpandedKeys        | 展开节点           | string[] 内容必须唯一                                                                  | -             |
| multiple                | 是否多选           | boolean                                                                                | false         |
| value                   | 指定当前选中的条目         | string[] 内容必须唯一                                                                  | -             |
| defaultValue            | 指定默认选中的条目    | string[] 内容必须唯一                                                                  | -             |
| onChange                | 输入框内容改变     | function (valuenode)                   | -             |
|                         |
| onTreeExpand            | 展开树节点         | function (key: string, value: string) => void key:选中节点唯一标识， value：选中节点值 | -             |
| getPopupContainer       | 下拉列表展示位置   | fucntion () => HTMLElement                                                             | document.body |
|onSelect | 被选中时调用| function(value, node) | - |
|showCheckedStrategy|定义选中项回填的方式。SHOW_ALL: 显示所有选中节点(包括父节点). SHOW_PARENT: 只显示父节点(当父节点下所有子节点都选中时). 默认只显示子节点. ｜ SHOW_ALL, SHOW_PARENT,SHOW_CHILD | SHOW_CHILD|
|disabled|是否禁用  | boolean | - |

### TreeSelectData格式
```typescript
interface TreeDataType {
  value: string;
  title: string;
  children?: any[];
}
```

### treeNode

| 属性 | 说明 | 类型 | 默认值 |
| --- | ---  | --- | ---   |
| checkable | 当树为 checkable 时，设置独立节点是否展示 Checkbox | boolean | - |
| disabled | 是否禁用  | boolean | - |
| isLeaf | 是否是叶子节点 | boolean| - |
| key | 此项必须设置（其值在整个树范围内唯一） 与value一样 | string | - |
| title | 树节点显示的内容 | string \| ReactNode| '--' |
| value | 默认根据此属性值进行筛选（其值在整个树范围内唯一） | string | - |