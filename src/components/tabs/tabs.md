---
category: Components
type: 通用
title: Tabs
subtitle: 标签页
---
## API

### Tabs

| 属性 | 说明 | 类型 | 默认值 |
| --- | ---  | --- | ---   |
| titles | tab标题 |  {key: string; text: React.ReactNode;}[] | - |
| defaultActiveKey | 默认选中tab | string | - |
| activeKey | 选中tab | string | - |
| type | 标签页样式 | 'line' \| 'plain' \| 'card' \|  'page' | 'line' |
| onClose | 点击关闭标志响应函数 | (key:string) => void | - |
| onChange | 切换面板的回调	 | (activeKey:string) => void | - |
| onTabClick | tab 被点击的回调		 | (activeKey:string, e: MouseEvent) => void | - |
| tabBarExtraContent | tab bar 上额外的元素 | ReactNode \| {left?: ReactNode, right?: ReactNode} | - |

### Tabs.Pane

| 属性 | 说明 | 类型 | 默认值 |
| --- | ---  | --- | ---   |
| tab | 选项卡头显示文字 | React.ReactNode \|string | - |
| key | 默认选中tab | string | - |
| closable | 是否可以关闭，type为page的时候有效 | boolean | - |
| forceRender | 被隐藏时是否渲染 DOM 结构 | boolean | false |

