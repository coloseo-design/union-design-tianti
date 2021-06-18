---
category: Components
type: 通用
title: Layout
subtitle: 布局
---

布局

## 何时使用

最基础的列表展示，可承载文字、列表、段落，常用于后台数据展示页面。

## 组件概述

Layout：布局容器，其下可嵌套 Header Sider Content Footer 或 Layout 本身，可以放在任何父容器中。

Header：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

Sider：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 Layout 中。

Content：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

Footer：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 Layout 中。

## API

## Layout

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| className | 容器 className | string | - |
| style | 指定样式 | CSSProperties | - |

## Layout.Sider

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| className | 容器 className | string | - |
| style | 指定样式 | CSSProperties | - |
| collapsed | 当前收起状态 | boolean | - |
| collapsedWidth | 收缩宽度 | number | 80 |
| collapsible | 是否可收起 | boolean | false |
| defaultCollapsed | 是否默认收起 | boolean | false |
| theme | 主题颜色 | light、dark | dark |
| onCollapse | 展开-收起时的回调函数 | (collapsed) => {} | - |
| width | 宽度 | number | 200 |
