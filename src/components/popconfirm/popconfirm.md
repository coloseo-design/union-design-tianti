---
category: Components
type: 通用
title: Popconfirm
subtitle: 气泡确认框
---



## API



popConfirm的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |  |
| --- | --- | --- | --- | --- |
| cancelText | 取消按钮文字 | string | 取消 |  |
| okText | 确认按钮文字 | string | 确定 |  |
| okType | 确认按钮类型  | string | primary |  |
| title  | 确认框的标题 | string| ReactNode| 无 |
| description  | 确认框的描述内容 | string| ReactNode| 无 |
| onCancel | 点击取消的回调 | function(e) | 无 |  |
| onConfirm | 点击确认的回调 | function(e)| 无 |  |
| showIcon | 是否展示title前面的icon | boolean| false |  |
| showArrow | 是否展示三角肩头 | boolean| true |  |
| icon | 自定义弹出气泡 Icon 图标和图标类型 | 'help' \| 'success' \|'info' \|'error'ReactNode | 'info' |  |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到弹窗滚动定位问题，试试修改为滚动的区域，并相对其定位。 | Function(triggerNode)  | () => document.body  |
| mouseEnterDelay | 鼠标移入后延时多少才显示 Tooltip，单位：秒 | number | - |  |
| mouseLeaveDelay | 鼠标移出后延时多少才隐藏 Tooltip，单位：秒 | number | - |  |
| overlayStyle | 卡片样式 | 无 | - |  |
| placement | 气泡框位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom  | string | top |  |
|trigger | 触发行为 可选 hover/focus/click| string | popconfirm 默认'click' popOver默认 ‘hover'  | |
|visible | 用于手动控制浮层显隐 |  boolean | false| |
|onVisibleChange| 显示隐藏的回调| (visible) => void| 无 | |
|autoAdjustOverflow|气泡被遮挡时自动调整位置| boolean| true| |
|defaultVisible|默认是否显隐|boolean|false| |
|okButtonProps|确认按钮props|BaseButtonProps||
|cancelButtonProps|取消按钮props|BaseButtonProps｜|
