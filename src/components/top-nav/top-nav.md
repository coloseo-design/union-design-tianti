---
category: Components
type: 通用
title: TopNav
subtitle: 顶部导航菜单
---

## API

| 参数                | 说明                           | 类型                                                         | 默认值     |
| :------------------ | :----------------------------- | :----------------------------------------------------------- | :--------- |
| data                | 数据                           | any[]                                                        | 必填       |
| keyExtractor        | 每条数据的唯一 key             | keyExtractor: (data: any) => string                          | 必填       |
| nameExtractor       | 每条数据用来做导航每项的 Name  | keyExtractor: (data: any) => string\|ReactNode                          | 必填       |
| childrenExtractor   | 每条数据用来做导航每项子菜单的 | childrenExtractor: (data: any) => any[] \| null | 必填       |
| style               | 样式                           | CSSProperties                                                | -          |
| className           | 样式                           | string                                                       | -          |
| size                | 大小                           | "md" \| "xl"                                                 | "md"       |
| mode                | 点击每项模式                   | "dropdown" \| "expand" \| "expand-img"                       | "dropdown" |
| selectedKey         | 当前选择的 key                 | string                                                       | -          |
| onChangeSelectedKey | 导航当前选择发生变化回调       | (key: string, data: any) => void                             | -          |
| bgExtractor         | mode 为 expand-img 背景设置    | (data: any) => ReactNode \| null                 | -          |
| descExtractor       | mode 为 expand-img 描述设置    | (data: any) => string \| null                    | -          |
| popupZIndex         | 弹窗层级                       | number                                                       | -          |
