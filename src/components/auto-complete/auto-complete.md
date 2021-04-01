---
category: Components
type: 通用
title: autoComplete
subtitle: 自动完成
---

## 字段和功说明

### autoComplete

autoComplete的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |  |
| --- | --- | --- | --- | --- |
| dropdownMenuStyle | dropdown 菜单自定义样式 | boolean |  |  |
| showSearch | 是否展示搜索按钮 | boolean | false |  |
| disabled | 是否禁用  | boolean | false |  |
| autoFocus  | 是否自动聚焦 | boolean| false| 无 |
| children | 自动完成的数据源 | React.ReactElement<OptionProps> Array<React.ReactElement<OptionProps>> |  |  |
| defaultValue | 指定默认选中的条目 | string | 无 |  |
| value | 指定当前选中的条目 | string|string[]|{ key: string, label: string|ReactNode }|Array<{ key: string, label: string|ReactNode }> | -- |  |
| open | 是否展开下拉菜单 | boolean  | false  |
| defaultOpen | 是否默认展开下拉菜单 | boolean | false |  |
| placeholder | 输入框提示 | string | - |  |
| onSearch | 搜索补全项的时候调用 | function(value) | - |  |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数  | function(value) | 无 |  |
|dataSource | 自动完成的数据源| DataSourceItemType[] |   | |
|onSelect | 被选中时调用，参数为选中项的 value 值 |  function(value, option) | 无| |
|multiInput| 多行输入框的展示| boolean | false | |
|className|自定义类| string| | |
|onBlur|失去焦点时的回调|function()|-| |
|onFocus|获得焦点时的回调|function()|-||
|rows | 多上输入框的行数, multiInput为true时有效| number| 2|

```typescript
export type DataSourceItemType = DataSourceItemObject | React.ReactNode;
interface DataSourceItemObject {
  value: string;
  label: string | React.ReactNode;
}
```