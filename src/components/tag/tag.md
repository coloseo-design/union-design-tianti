---
category: FunctionComponent
type: 通用
title: Tag
subtitle: 标签
---
# 字段和功能简单说明

## Tag

  
  className?: string; -- 自定义样式类名

  color?: LiteralUnion<PresetColorType, string>;-- 自定义样式颜色   预设('pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime',)
  
  closable?: boolean; -- 标签是否可关闭

  visible?: boolean; -- 标签是否可见

  onClose?: (e: React.MouseEvent<HTMLElement>) => void; -- 点击关闭图标响应函数

  style?: React.CSSProperties; -- 用户自定义样式

  icon?: React.ReactNode; -- 标签前插入icon

  ref?: React.MutableRefObject<HTMLSpanElement>; -- React.forwardRef传递函数组件ref到<span>dom


