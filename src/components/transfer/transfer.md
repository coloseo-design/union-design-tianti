---
category: Components
type: 通用
title: Transfer
subtitle: 穿梭框
---

## API

### transfer


transfer的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| titles | 标题集合，顺序从左至右 | ReactNode[] | ['', ''] |
| dataSource |数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外。 | TransferItem[] | [] |
| targetKeys | 显示在右侧框数据的 key 集合  | string[] | [] |
| selectedKeys | 设置哪些项应该被选中 （左边的数据） 类型为string[] ｜string[]｜ [] |
| listStyle | 两个穿梭框的自定义样式 | object | - |
| showSearch | 是否显示搜索框 | boolean| false |
| operations | 操作文案集合，顺序从上至下 | string[] | ['>', '<'] |
| disabled | 是否禁用 | boolean  | false  |
| showSelectAll | 是否展示全选勾选框 | boolean | true |
| render | 每行数据渲染函数，该函数的入参为 dataSource 中的项，返回值为 ReactElement。或者返回一个普通对象，其中 label 字段为 ReactElement，value 字段为 title | (record) => ReactNode | - |
| onSelectChange | 选中项发生改变时的回调函数 | (sourceSelectedKeys, targetSelectedKeys): void | - |
| onChange | 选项在两栏之间转移时的回调函数  | (targetKeys, direction, moveKeys): void |  |
|onScroll | 选项列表滚动时的回调函数 | (direction, event): void |
|onSearch| 搜索框内容时改变时的回调函数| (direction: 'left' \| 'right', value: string): void | 
|filterOption| 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。| (inputValue, option): boolean | 
|className| 自定义类 | string| 


```typescript
interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}
```