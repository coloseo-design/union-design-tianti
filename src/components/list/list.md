---
category: Components
type: 通用
title: List
subtitle: 列表
---

通用列表。

## 何时使用

最基础的列表展示，可承载文字、列表、段落，常用于后台数据展示页面。

## API

### List

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| dataSource | 列表数据源 | any[] | [] |
| renderItem | 当使用 dataSource 时，可以用 renderItem 自定义渲染列表项 | (item: any, index?: number) => React.ReactNode | - |

### List.Item

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| actions | 列表操作组, 位置在最右侧 | ReactNode[] | [] |

### List.Item.Meta

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| description | 列表元素的描述内容 | ReactNode | - |
| title | 列表元素的标题 | ReactNode | - |
