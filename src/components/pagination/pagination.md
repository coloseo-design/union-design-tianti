---
category: Components
type: 通用
title: Pagination
subtitle: 分页
---


## API

| 参数             | 说明                                         | 类型                                          | 默认值              |
| :--------------- | :------------------------------------------- | :-------------------------------------------- | :------------------ |
| current          | 当前页数                                     | number                                        | -                   |
| defaultCurrent   | 默认的当前页数                               | number                                        | 1                   |
| defaultPageSize  | 默认的每页条数                               | number                                        | 10                  |
| hideOnSinglePage | 只有一页时是否隐藏分页器                     | boolean                                       | false               |
| pageSize         | 每页条数                                     | number                                        | -                   |
| pageSizeOptions  | 指定每页可以显示多少条                       | number\[\]                                    | \[10, 20, 50, 100\] |
| showQuickJumper  | 是否可以快速跳转至某页                       | boolean                                       | false               |
| showSizeChanger  | 是否展示 pageSize 切换器                     | boolean                                       | false               |
| showTotal        | 用于显示数据总量和当前数据顺序               | (page: number, pageSize: number) => ReactNode | -                   |
| total            | 数据总数                                     | number                                        | -                   |
| onChange         | 页码改变的回调，参数是改变后的页码及每页条数 | (page: number, pageSize: number) => void      | -                   |
