---
category: Components
type: 通用
title: DatePicker
subtitle: 日期选择框
---


## API

| 参数         | 说明           | 类型                                                                        | 默认值          |
| :----------- | :------------- | :-------------------------------------------------------------------------- | :-------------- |
| type         | 选择范围类型   | 'single'，'range'                                                           | 'single'        |
| mode         | 选择日期类型   | 'time-full','time-ymd','time-hms','year','month','date','date-time'         | 'date'          |
| size         | 选择框大小     | 'small','middle','large'                                                    | 'middle'        |
| suffixIcon   | 选择框后面图标 | string                                                                      | -               |
| width        | 选择框宽度     | number                                                                      | 280             |
| style        | 选择框样式     | CSSProperties                                                               | {}              |
| format       | 格式化日期输出 | string                                                                      | -               |
| allowClear   | 显示清除按钮   | boolean                                                                     | true            |
| className    | 样式类         | string                                                                      | -               |
| yearRange    | 选择年范围     | [number, number]                                                            | \[1970,now+50\] |
| placeholder  | 选择框提示     | string or \[string,string\]                                                 | true            |
| disabled     | 禁用           | boolean or \[boolean,boolean\]                                              | true            |
| value        | 选择的时间     | Dayjs or \[Dayjs,Dayjs\]                                                    | -               |
| defaultValue | 默认选择的时间 | Dayjs or \[Dayjs,Dayjs\]                                                    | -               |
| onChange     | 选择变化       | (date?:Dayjs or \[Dayjs,Dayjs\],format?: string or \[string,string\])=>void | -               |
| allowClear   | 显示清除按钮   | boolean                                                                     | true            |
| allowClear   | 显示清除按钮   | boolean                                                                     | true            |
