---
category: Components
type: 通用
title: Header
subtitle: 头部组件
---
## API
  
| 属性 | 说明 | 类型 | 默认值 |
| --- | ---  | --- | ---   |
| size | 组件大小 | 'md'\| 'lg' | 'md' |
| title | 描述 | string|--|
| search | 搜索属性 | searchPops\|false | false |
| menus | 组件右侧列表 | (ReactNode \|MenuProps)[]| | - |
| topMenus | 组件顶部列表 | (ReactNode \|MenuProps)[]| | - |
|bordered|组件下划线(如果传了navProps默认为false)|boolean|true|
|showBg|是否展示背景图，可传图片的src|boolean\|string|false|
|navProps|top-nav组件的api|查看top-nav的api|-|
|onLogoClick|点击logo事件|(evt: React.MouseEvent) => void;｜-｜

### searchPops

| 属性 | 说明 | 类型 | 默认值 |
| --- | ---  | --- | ---   |
| placeholder | input placeholder | string | - |
| onChange | 输入框变化的回调 | (evt: React.ChangeEvent) => void | - |
| onSearch | 点击搜索图标的回调 | (value: string) => void | - |
| select | 下来选项属性 | selectProps | - |
| style | 搜索框style | CSSProperties | - |
| type | 搜索框样式 | 'default'\|'primary' | 'default' |

### selectProps 
| 属性 | 说明 | 类型 | 默认值 |
| --- | ---  | --- | ---   |
| options |下来选项列表 | {key: string; label: string; value: string}[] | - |
|onChange|选择回调|(value: string) => void;|-|
|getPopupContainer|菜单渲染父节点。默认渲染到 body 上，如果你遇到弹窗滚动定位问题，试试修改为滚动的区域，并相对其定位。|(triggerNode: HTMLElement) => HTMLElement|() => document.body|


### MenuProps 
| 属性 | 说明 | 类型 | 默认值 |
| --- | ---  | --- | ---   |
| onClick |列表点击回调 | (evt: React.MouseEvent, key: string) => void | - |
|title|每列文案|string\|ReactNode|-|
|key| 唯一值|string|-|
|icon| 图标|ReactNode|-|



