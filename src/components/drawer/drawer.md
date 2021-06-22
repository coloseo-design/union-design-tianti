---
category: Components
type: 通用
title: Drawer
subtitle: 抽屉
---


## API

| 参数          | 说明                                 | 类型                          | 默认值 |
| :------------ | :----------------------------------- | :---------------------------- | :----- |
| title         | 标题                                 | boolean                       | -      |
| head          | 抽屉的头部                           | () => ReactNode               | -      |
| closable      | 是否显示右上角的关闭按钮             | boolean                       | true   |
| footer        | 抽屉的页脚                           | () => ReactNode               | -      |
| visible       | Drawer是否可见                       | boolean                       | false  |
| wh            | 宽度或者高度                         | number                        | 448    |
| mask          | 是否展示遮罩                         | boolean                       | true   |
| maskClosable  | 点击蒙层是否允许关闭                 | boolean                       | true   |
| placement     | 抽屉的方向                           | 'top','right','bottom','left' | 'right |
| onClose       | 点击遮罩层或右上角叉或取消按钮的回调 | () => void                    | -      |
| distance      | 用于设置多层Drawer的推动距离         | number                        | 224    |
