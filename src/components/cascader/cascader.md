---
category: Components
type: 通用
title: Cascader
subtitle: 级联选择
---
## 字段和功能简单说明

### Cascader

placeholder: string - 输入框站位文本

value: string[] - 指定选中项

options: Option[] - 可选数据源

allowClear: boolean - 是否支持清除

showSearch: boolean - 是否支持搜索

disabled: boolean - 禁用

onChange: (value: string[], Option[]) => void - 选择完成后的回调

### Option

```typescript
interface Option {
  value: string;
  label?: string;
  disabled?: boolean;
  children?: Option[];
}
```
