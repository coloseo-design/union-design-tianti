---
category: Components
type: 通用
title: InputNumber
subtitle: 数字输入框
---

按钮用于开始一个即时操作。

## API

| 属性         | 说明                 | 类型                                                                       | 默认值    |
| ------------ | -------------------- | -------------------------------------------------------------------------- | -------|
| size         | 输入框大小             | 'default'\'large'                                                                     | `default` |
| disabled     | 是否禁用             | boolean                                                                    | `false`   |
| max          | 最大值               | number                                                                     | -         |
| min          | 最小值               | number                                                                     | -         |
| step         | 加减按钮差值                | number                                                                     | 0.1       |
| defaultValue | 默认值               | number                                                                     | 0.1       |
| value        | 输入框值             | number                                                                     | 0.1       |
| precision    | 保留小数位数         | number                                                                     |           |
| className    | 类名                 | string                                                                     |           |
| onChange     | 输入框内容变化       | function (value:number)=>void                                              |           |
| onStep       | 上下箭头回调         | function (value: number, info?: { offset: number, type: string }) => void; |           |
| onPressEnter | 回车键               | function(value) => void;           |           |
| formatter    | 规定展示格式         | function(value: ReactText) => string                                       |           |
| parser       | 解析配合 `formatter` | function(value: ReactText) => string                                       |           |
| isRound (v2.x版本)      | 小数点精确度是否需要四舍五入 | boolean                                      |      true     |
| type (v2.x版本)      | 数字输入框不同形式 | 'default'\|'both'                                      |      true     |

