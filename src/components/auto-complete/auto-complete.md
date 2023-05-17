---
category: Components
type: 通用
title: AutoComplete
subtitle: 自动完成
---

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| dropdownMenuStyle | dropdown 菜单自定义样式 | boolean |  |
| showSearch | 是否展示搜索按钮 | boolean | false |
| disabled | 是否禁用  | boolean | false |
| autoFocus  | 是否自动聚焦 | boolean| false|
| defaultValue | 指定默认选中的条目 | string | - |
| value | 指定当前选中的条目 | string | -|
| open | 是否展开下拉菜单 | boolean  | false  |
| defaultOpen | 是否默认展开下拉菜单(只有在dataSource有值的时候生效) | boolean | false |
| placeholder | 输入框提示 | string | - |
| onSearch | 搜索补全项的时候调用 | function(value) | - |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数  | function(value) | - |
|dataSource | 自动完成的数据源| DataSourceItemType[] | - |
|onSelect | 被选中时调用，参数为选中项的 value 值 |  function(value, option) | - |
|multiInput| 多行输入框的展示| boolean | false |
|className|自定义类| string| |
|onBlur|失去焦点时的回调|function()|-|
|onFocus|获得焦点时的回调|function()|-|
|rows | 多上输入框的行数, multiInput为true时有效| number| 2 |
| getPopupContainer       | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。   | fucntion () => HTMLElement                                                             | document.body |

### DataSourceItemObject说明
```typescript
export type DataSourceItemType = DataSourceItemObject | React.ReactNode;
interface DataSourceItemObject {
  value: string;
  label: string | React.ReactNode;
}
```