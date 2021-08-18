---
category: Components
type: 通用
title: Alert
subtitle: 警告提示
---

## API


alert的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |  |
| --- | --- | --- | --- | --- |
| type | 指定警告提示的样式 有四种选择 success、info、warning、error| string | info，banner 模式下默认值为 warning |
| message | 警告提示内容 | string | ReactNode |  |
| description | 警告提示的辅助性文字介绍  | string|ReactNode |  |
| icon | 自定义图标，showIcon 为 true 时有效 | ReactNode | 无|
| banner | 是否用作顶部公告 | boolean | false |
| closeText | 自定义关闭按钮 | string ｜ reactNode | 无 |
| closable | 是否显示关闭图标 | boolean | false |
| showIcon | 是否显示辅助图标 | boolean  |
| style | alert样式 | object | - |
|className| 自定义类 | string| -|
|onClose|点击关闭图标事件|(evt) => void| -|
