---
category: Components
type: 通用
title: Dropdown
subtitle: 下拉菜单
---

## API

### Dropdown

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
<!-- |arrow|下拉框箭头是否显示|boolean|false| -->
|disabled|菜单是否禁用|boolean|-|
|getPopupContainer|菜单渲染父节点。默认渲染到 body 上，如果你遇到弹窗滚动定位问题，试试修改为滚动的区域，并相对其定位。|(triggerNode: HTMLElement) => HTMLElement|() => document.body|
|overlay|菜单|	Menu | -|
|overlayClassName|下拉根元素的类名称|string|-|
|overlayStyle|下拉根元素的样式|CSSProperties|-|
|placement|菜单弹出位置：bottomLeft bottomCenter bottomRight topLeft topCenter topRight|string|bottomLeft|
|trigger|触发下拉的行为|Array<click｜hover｜contextMenu>|\['hover'\]|
|visible|菜单是否显示|boolean|--|
|onVisibleChange|菜单显示状态改变时调用，参数为 visible|(visible: boolean) => void|-|


### Dropdown.Button

| 属性 | 说明 | 类型 | 默认值 |
| --- | ---  | ---  | ---  |
|disabled|菜单是否禁用|boolean|-|
|icon|右侧的 icon|ReactNode|-|
|overlay|菜单|Menu| -|
|placement|菜单弹出位置：bottomLeft bottomCenter bottomRight topLeft topCenter topRight|string|bottomRight|
|size|按钮大小，和 Button 一致|string|default|
|trigger|触发下拉的行为|Array<click｜hover｜contextMenu>|\['hover'\]|
|type|按钮类型，和 Button 一致|string|default|
|visible|菜单是否显示|boolean|--|
|onVisibleChange|菜单显示状态改变时调用，参数为 visible|(visible: boolean) => void|--|
|onClick|点击左侧按钮的回调，和 Button 一致|(enevt) => void|--|