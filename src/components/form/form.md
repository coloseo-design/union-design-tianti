---
category: Components
subtitle: 表单
type: 数据录入
cols: 1
title: Form
---

具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

## 何时使用

- 用于创建一个实体或收集信息。
- 需要对输入的数据类型进行校验时。

## 表单域

表单一定会包含表单域，表单域可以是输入控件，标准表单域，标签，下拉菜单，文本域等。

这里我们封装了表单域 `<Form.Item />` 。

```jsx
<Form.Item {...props}>{children}</Form.Item>
```

## API

### Form

| 参数 | 说明 | 类型 | 默认值 |
| --- | ---  | ---  | ---   |
| labelAlign | label 标签的文本对齐方式 | 'left' \| 'right' | 'right' |
| onFinish | 数据验证成功后回调事件 | Function(values) |  |
| onFinishFailed | 数据验证失败后回调事件 | Function(errors) |  |
| onValuesChange | 字段发生变化的回调 | Function(values) |  |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object] |  |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object] |  |
| name | 表单名称 | string | null |
| colon | 配置 Form.Item 的 colon 的默认值 (只有在属性 layout 为 horizontal 时有效) | boolean | true |
| validateTrigger | 配置Form校验触发器 | string | onChange |


### FormItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | ---    |
| name | 字段名称 | string | null |
| label | 字段标签 | React.ReactNode \| string | null |
| valuePropName | 子节点的值的属性，如 Switch 的是 'checked'。该属性为 getValueProps 的封装，自定义 getValueProps 后会失效 | string | value |
| trigger | 设置收集字段值变更的时机。 | string | onChange |
| validateTrigger | 设置字段校验的时机 | string | onChange |
| validateFirst | 当某一规则校验不通过时，是否停止剩下的规则的校验。设置 parallel 时会并行校验 | boolean | false |
| initialValue | 设置子元素默认值 | string | null |
| required | 必填样式设置。如不设置，则会根据校验规则自动生成 | boolean | false |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object] |  |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object] |  |
| labelAlign | label 标签的文本对齐方式 | 'left' \| 'right' | 'right' |
| colon | 配置 Form.Item 的 colon 的默认值 (只有在属性 layout 为 horizontal 时有效) | boolean | true |
| validateTrigger | 配置Form校验触发器 | string | onChange |
