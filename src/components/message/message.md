---
category: Components
type: 通用
title: Message
subtitle: 消息提示
---

# 消息提示组件

## API

* Message.success(content, duration, onClose);
* Message.error(content, duration, onClose);
* Message.info(content, duration, onClose);
* Message.warning(content, duration, onClose);
* Message.loading(content, key:string, onClose);一直存在的提示 可以通过指定 key 来 关闭

| 参数     | 说明                                        | 类型                | 默认值 |
| :------- | :------------------------------------------ | :------------------ | :----- |
| content  | 提示内容                                    | ReactNode \| config | -      |
| duration | 自动关闭的延时，单位秒。设为 0 时不自动关闭 | number              | 3      |
| onClose  | 关闭时触发的回调函数                        | ()=>void            | -      |

## config

| 参数      | 说明                                      | 类型             | 默认值 |
| :-------- | :---------------------------------------- | :--------------- | :----- |
| className | 自定义 CSS class                          | string           | -      |
| content   | 提示内容                                  | ReactNode        | -      |
| duration  | 自动关闭的延时，单位秒。设为0时不自动关闭 | number           | 3      |
| icon      | 自定义图标                                | string           | -      |
| key       | 当前提示的唯一标志                        | string \| number | -      |
| style     | 自定义内联样式                            | CSSProperties    | -      |
| onClose   | 关闭时触发的回调函数                      | ()=>void         | -      |
| onClick   | 点击 message 时触发的回调函数             | ()=>void         | -      |

* Message.config={...} 全局配置
* Message.destroy(key); 可以关闭 提示
