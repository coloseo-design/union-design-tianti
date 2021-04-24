---
category: Components
type: 通用
title: Select
subtitle: 选择框
---
# 字段和功能简单说明

## select
placeholder: string - 未选择时的提示语

noContent: string - 没有数据时展示

dropdownMatchSelectWidth: boolean - 下拉框是否与展示框同宽

defaultValue: string | string[] - 默认数据

type: SelectType; // default - 基本选择器;search - 可搜索;multiple - 多选;tags - 标签选择器

allowClear: boolean - 是否允许清除

value: string | string[] - select的值

disabled: boolean - 是否禁用

dropdownClassName: string - 下拉框类名

dropdownStyle: CSSProperties - 下拉框

className: string - 类名

style?: CSSProperties,

remoteSearch?: boolean, - 是否拉取服务器数据，如果要，type必须为search

maxTagCount?: number,  - 多选模式下，最多显示的tag数量

maxTagTextLength?: number, - 多选模式下，每个tag最多显示的字符数

onChange?: (value: string | string[], label: string) => void,

onSelect?: (value: string | string[], label: string) => void,

onSearch?: (value: string) => void,

## option

disabled - 是否禁用子项
