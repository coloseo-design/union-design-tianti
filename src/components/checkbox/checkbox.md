---
category: Components
type: 通用
title: Checkbox
subtitle: 多选框
---

## 何时使用

在一组可选项中进行多项选择时；

单独使用可以表示两种状态之间的切换，和 switch 类似。区别在于切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。

## API

### Checkbox

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| checked | 是否选中 | boolean | - |
| defaultChecked | 默认选中状态 | boolean | - |
| disabled | 禁止状态 | boolean | - |
| onChange | 变化时回调函数 | (checkedValue: boolean) => void | - |
| value | checkbox选中的值 | string | - |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | - |

### Checkbox.Group

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| defaultValue | 默认选中的选项 | string[] | [] |
| name | CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性 | string | - |
| options | 指定可选项 | string[] \| CheckboxOption[] | - |
| value | 指定选中的选项 | string[] | - |
| onChange | 变化时回调函数 | (checkedValues: string[]) => void | - |
| disabled | 整组失效 | boolean | - |

### CheckboxOption

```typescript
interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (checkedValue: boolean) => void;
}
```