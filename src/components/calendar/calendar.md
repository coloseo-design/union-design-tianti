# 日历选择组件

## API

| 参数                | 说明                                           | 类型                                      | 默认值      |
| :------------------ | :--------------------------------------------- | :---------------------------------------- | :---------- |
| yearRange           | 可选择年的范围                                 | [number, number]                          | 1970,now+50 |
| mode                | 初始模式                                       | 'year','month'                            | 'year       |
| value               | 展示日期                                       | Dayjs                                     | -           |
| defaultValue        | 默认展示的日期                                 | Dayjs                                     | -           |
| onChange            | 日期变化回调                                   | (date: Dayjs) => void                     | -           |
| onPanelChange       | 日期面板变化回调                               | (date: Dayjs, mode: CalendarMode) => void | -           |
| onSelect            | 点击选择日期回调                               | (date: Dayjs) => void                     | -           |
| monthCellRender     | 自定义渲染月单元格，返回内容会被追加到单元格   | (date: Dayjs) => ReactNode                | -           |
| monthFullCellRender | 自定义渲染月单元格，返回内容覆盖单元格         | (date: Dayjs) => ReactNode                | -           |
| dateCellRender      | 自定义渲染日期单元格，返回内容会被追加到单元格 | (date: Dayjs) => ReactNode                | -           |
| dateFullCellRender  | 自定义渲染日期单元格，返回内容覆盖单元格       | (date: Dayjs) => ReactNode                | -           |

