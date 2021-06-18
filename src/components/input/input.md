---
category: Components
type: 通用
title: Input
subtitle: 输入框
---

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

需要用户输入表单域内容时。

提供组合型输入框，带搜索的输入框。

## API

## Input

| 属性 | 说明 | 类型 | 默认值 |
| --- | ---  | --- | ---   |
| addonAfter | 带标签的 input，设置后置标签 | ReactNode | - |
| addonBefore | 带标签的 input，设置前置标签 | ReactNode | - |
| allowClear | 可以点击清除图标删除内容 | boolean | - |
| defaultValue | 输入框默认内容 | string | - |
| disabled | 是否禁用状态 | boolean | false |
| maxlength | 最大长度 | number | - |
| type | 声明 input 类型，同原生 input 标签的 type 属性 | string | text |
| value | 输入框内容 | string | - |
| onChange | 输入框内容变化时的回调 | function(e) | - |

## Input.Search

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| defaultValue | 输入框默认内容 | string | - |
| value | 输入框内容 | string | - |
| onSearch | 点击搜索图标，或按下回车键时的回调 | function(value, event) | - |
| onPressEnter | 按下回车的回调 | function(value, event) | - |

## Input.TextArea

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| allowClear | 可以点击清除图标删除内容 | boolean | - |
| defaultValue | 输入框默认内容 | string | - |
| value | 输入框内容 | string | - |
| onChange | 输入框内容变化时的回调 | function(e) | - |
| maxlength | 最大长度 | number | - |
| disabled | 是否禁用状态 | boolean | false |
