---
category: Components
type: 通用
title: Radio
subtitle: 单选框
---

## 何时使用

用于在多个备选项中选中单个状态。

和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## API

## Radio

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| checked | 指定当前是否选中 | boolean | false |
| defaultChecked | 初始是否选中 | boolean | false |
| disabled | 禁用 Radio | boolean | false |
| value | 根据 value 进行比较，判断是否选中 | any | - |

## Radio.Group

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| onChange | 选项变化时的回调函数 | function(e:Event) | - |
| value | 用于设置当前选中的值 | any | - |
| defaultValue | 默认选中的值 | any | - |
| disabled | 禁选所有子单选器 | boolean | false |
| options | 以配置形式设置子元素 | string[]、Array<{ label: string value: string disabled?: boolean }> | - |
|direction|group排列结构|'vertical' \| 'horizontal'|'horizontal|
