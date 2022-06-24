---
category: Components
type: 通用
title: Breadcrumb
subtitle: 面包屑
---

## 何时使用

当系统拥有超过两级以上的层级结构时；

当需要告知用户『你在哪里』时；

当需要向上导航的功能时。

## API

### Breadcrumb

| 属性 | 说明 | 类型 | 默认值 |
| --- | ---  | --- | ---   |
| separator | 分隔符自定义 | ReactNode | > |

### Breadcrumb.Item

| 属性 | 说明 | 类型 | 默认值 |
| ---  | --- | --- | ---   |
| className | 自定义类名 | string |
| href | 链接的目的地 | string | - |
| onClick | 单击事件 | (e:MouseEvent) => void | - |
