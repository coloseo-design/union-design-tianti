---
category: Components
subtitle: 滑动输入条
type: 数据录入
title: Slider
---

滑动型输入器，展示当前值和可选范围。

## 何时使用

当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| allowClear | 支持清除, 单选模式有效 | boolean | false |
| defaultValue | 设置初始取值。`number` | number | 0 |
| disabled | 值为 `true` 时，滑块为禁用状态 | boolean | false |
| dots | 是否只能拖拽到刻度上 | boolean | false |
| marks | 刻度标记，key 的类型必须为 `number` 且取值在闭区间 \[min, max] 内，每个标签可以单独设置样式 | object[] | { value: string, label: string\|ReactNode } |
| max | 最大值 | number | 100 |
| min | 最小值 | number | 0 |
| value | 设置当前取值。`number` | number\|number\[] |  |
| onChange | 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入。 | Function(value) | NOOP |
