---
category: Components
type: 通用
title: SideNav
subtitle: 侧部导航菜单
---

## API

| 参数                | 说明                           | 类型                                          | 默认值 |
| :------------------ | :----------------------------- | :-------------------------------------------- | :----- |
| data                | 数据                           | any[]                                         | 必填   |
| mode                | 模式 inline 内嵌 expand 展开   | "inline" \| "expand"                          | 必填   |
| iconExtractor       | 一级图标                       | (data: any) => ReactNode \| null \| undefined | 必填   |
| keyExtractor        | 每条数据的唯一 key             | (data: any) => string                         | 必填   |
| nameExtractor       | 每条数据用来做导航每项的 Name  | (data: any) => string                         | 必填   |
| childrenExtractor   | 每条数据用来做导航每项子菜单的 | (data: any) => any[] \| null \| undefined     | 必填   |
| style               | 样式                           | CSSProperties                                 | -      |
| className           | 样式                           | string                                        | -      |
| openKeys            | 打开子菜单的 keys              | string[]                                      | -      |
| defaultOpenKeys     | 初始打开子菜单的 keys          | string[]                                      | -      |
| selectedKey         | 当前选择的 key                 | string                                        | -      |
| defaultSelectedKey  | 初始选择的 key                 | string                                        | -      |
| onChangeVisible     | 导航是否可见回调               | (visible: boolean) => void                    | -      |
| onChangeSelectedKey | 导航当前选择发生变化回调       | (key: string, data: any) => void              | -      |
| onChangeOpenKeys    | 导航当前打开子菜单变化回调     | (key: string[]) => void                       | -      |
