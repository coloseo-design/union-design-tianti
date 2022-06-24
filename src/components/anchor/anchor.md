---
category: Components
type: 通用
title: Anchor
subtitle: 锚点
---

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## API


| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 锚点选项 | { id: string, name: string }[] | - |
| onChange | 监听锚点链接改变 | (currentActiveLink: string) => void | - |
| onClick | click 事件的 handler | (link: { id: string, name: string }, e: Event) => void | - |
| getContainer | 指定滚动的容器 | () => HTMLElement | () => window |
