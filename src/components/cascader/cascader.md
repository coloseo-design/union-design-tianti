---
category: Components
type: 通用
title: Cascader
subtitle: 级联选择
---

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
|placeholder|输入框站位文本| string | -- | --|
|value|指定选中项|string[]| -- | -- |
|options|可选数据源|Option[]|--|--|
|allowClear|是否支持清除|boolean| true|--|
|showSearch|是否支持搜索|boolean|--| --|
|disabled|是否禁用|boolean| --| --|
|onChange|选择完成后的回调|(value: string[], Option[]) => void| --| --|


### Option

```typescript
interface Option {
  value: string;
  label?: string;
  disabled?: boolean;
  children?: Option[];
}
```
