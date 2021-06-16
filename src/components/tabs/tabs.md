---
category: FunctionComponent
type: 通用
title: Tabs
subtitle: 标签页
---
# 字段和功能简单说明

## Tabs

  
| 属性 | 说明 | 类型 | 默认值 |
| --- | ---  | --- | ---   |
| titles | tab标题 |  {key: string; text: React.ReactNode;}[] | - |
| defaultKey | 默认选中tab | string | - |
| type | 标签页样式 | 'line' \| 'card' \|  'page' | 'line' |
| onClose | 点击关闭标志响应函数 | (key:string) => void | - |
| onChoose | 选中标签响应函数 | (key:string) => void | - |

