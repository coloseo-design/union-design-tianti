---
category: Components
subtitle: 栅格
type: 布局
cols: 1
title: Grid
---

24 栅格系统。

## API
### Row

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| align | flex 布局下的垂直对齐方式：`top` `middle` `bottom` | string | `top` |  |
| gutter | 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 `{ xs: 8, sm: 16, md: 24}`。或者使用数组形式同时设置 `[水平间距, 垂直间距]`。 | number/object/array | 0 |  |
| justify | flex 布局下的水平排列方式：`start` `end` `center` `space-around` `space-between` | string | `start` |  |
| type | 布局模式，可选 `flex`，[现代浏览器](http://caniuse.com/#search=flex) 下有效 | string |  |  |

### Col

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| offset | 栅格左侧的间隔格数，间隔内不可以有栅格 | number | 0 |  |
| span | 栅格占位格数，为 0 时相当于 `display: none` | number | - |  |
| xs | `<576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |  |
| sm | `≥576px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |  |
| md | `≥768px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |  |
| lg | `≥992px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |  |
| xl | `≥1200px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |  |
| xxl | `≥1600px` 响应式栅格，可为栅格数或一个包含其他属性的对象 | number\|object | - |  |
