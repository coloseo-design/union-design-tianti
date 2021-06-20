---
category: Components
type: 通用
title: BackTop
subtitle: 回到顶部
---

回到顶部

## 何时使用

当页面内容区域比较长时；

当用户需要频繁返回顶部查看相关内容时。

## API

## BackTop

| 属性 | 说明 | 类型 | 默认值 |
| --- | ---  | --- | ---   |
| duration | 回到顶部所需时间（ms） | number | 450 |
| target | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | () => HTMLElement | () => window |
| visibilityHeight | 滚动高度达到此参数值才出现 BackTop | number | 400 |
| onClick | 点击按钮的回调函数 | function | - |
