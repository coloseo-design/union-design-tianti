---
category: Components
type: 通用
title: Modal
subtitle: 对话框
---


## API

### Modal

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | ---  | ---   |
| title | 标题 | string \| ReactNode | - |
| visible | 对话框是否可见 | boolean | false|
| okText | 确认按钮文字 | string \| ReactNode| 确定 |
| cancelText | 取消按钮文字 | string \| ReactNode | 取消 |
| width | 宽度 | string \| number | 511 |
| wrapClassName | 对话框外层容器的类名 | string | - |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 footer={null} | string \| ReactNode | 确定取消按钮 |
| getContainer | 指定 Modal 挂载的 HTML 节点, false 为挂载在当前 dom | HTMLElement \| () => HTMLElement \|  Selectors \| false | document.body |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true |
| mask | 是否展示遮罩 | Boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |
| maskStyle | 遮罩样式 | object | - |
| okButtonProps | ok 按钮 props| ButtonProps | - |
| cancelButtonProps | cancel 按钮 props | ButtonProps | - |
| style | 可用于设置浮层的样式，调整浮层位置等 | object | - |
| zIndex | 设置 Modal 的 z-index | Number |
| confirmLoading | 确定按钮 loading | boolean | - |
| closeIcon | 自定义关闭图标 | ReactNode | - |
| closable | 是否显示右上角的关闭按钮 | boolean | true |
| bodyStyle | Modal body 样式 | object | - |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) | - |
| onOk | 点击确定回调 | function(e) | - |
| centered | 垂直居中展示 Modal | boolean | false |
|destroyOnClose | 关闭时销毁 Modal 里的子元素 | boolean | false|


### Modal.method()

Modal.info(object)

Modal.success(object)

Modal.error(object)

Modal.warning(object)

Modal.confirm(object)

以上均为一个函数，参数为 object，具体属性如下

| 属性 | 说明 | 类型 | 默认值 |
| --- | ---  | --- | ---   |
| icon | 自定义图标 | string \| ReactNode | <Icon type="question-circle" /> |
| content | 内容 | string \| ReactNode | - |
| visible | 对话框是否可见 | boolean | false |
| okText | 确认按钮文字 | string \| ReactNode | 确定 |
| cancelText | 取消按钮文字 | string \| ReactNode | 取消|
| width | 宽度 | string \|  number | 511 |
| mask | 是否展示遮罩 | Boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | boolean | false |
| okButtonProps | ok 按钮 props | ButtonProps | - |
| cancelButtonProps | cancel 按钮 props | ButtonProps | - |
| zIndex | 设置 Modal 的 z-index | Number |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) |
| onOk | 点击确定回调 | function(e) | - |
| className | 容器类名 | string | - |
| centered | 垂直居中展示 Modal | boolean | false |
