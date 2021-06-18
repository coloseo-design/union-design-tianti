---
category: Components
type: 通用
title: Select
subtitle: 选择框
---
# 字段和功能简单说明

## select

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
|placeholder|未选择时的提示语|string|--|
|noContent|没有数据时展示|string|--|
|dropdownMatchSelectWidth|下拉框是否与展示框同宽|boolean|true|
|defaultValue|默认数据|string \| string[]|--|
|allowClear|是否允许清除|boolean|false|
|type|default - 基本选择器;search - 可搜索;multiple - 多选;tags - 标签选择器|string|default|
|value|select的值|string \| string[]|--|
|disabled|是否禁用|boolean|false|
|dropdownClassName|下拉框类名|string|--|
|dropdownStyle|下拉框样式|object|--|
|className|额外的类名|string|--|
|style|选择框样式|object|--|
|remoteSearch|是否拉取服务器数据，如果要，type必须为search|boolean|false|
|maxTagCount|多选模式下，最多显示的tag数量|number|--|
|maxTagTextLength|多选模式下，每个tag最多显示的字符数|number|--|
|onChange|value改变时触发|(value: string \| string[], label: string) => void|--|
|onSelect|点击选项时触发|(value: string \| string[], label: string) => void|--|
|onSearch|搜索时触发|(value: string) => void|--|


## option

disabled - 是否禁用子项
