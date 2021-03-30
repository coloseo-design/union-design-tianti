---
category: Components
type: 通用
title: Image
subtitle: 图片
---

可预览的图片。

## 何时使用

需要展示图片时使用。

加载大图时显示 loading 或加载失败时容错处理。

## API

## Image

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| alt | 图像描述 | string | - |  |
| fallback | 加载失败容错地址 | string | - |  |
| height | 图像高度 | number | - |  |
| placeholder | 加载占位 | ReactNode | - |  |
| src | 图片地址 | string | - |  |
| width | 图像宽度 | number | - |  |
| onError | 加载错误回调 | (event: Event) => void | - |  |
