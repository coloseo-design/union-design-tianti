---
category: Components
type: 通用
title: Anchor
subtitle: 锚点
---

锚点

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## API

## Anchor

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| style | 自定义样式 | CSSProperties | - |  |
| onChange | 监听锚点链接改变 | (currentActiveLink: string) => void | - |  |
| onClick | click 事件的 handler | function(e: Event, link: Object) | - |  |

## Anchor.Link

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| href | 锚点链接 | string | - |  |
| title | 文字内容 | ReactNode | - |  |
