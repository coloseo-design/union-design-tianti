---
category: Components
type: 通用
title: 通知提醒
subtitle: Notification
---


## API

* Notification.success(config);
* Notification.error(config);
* Notification.info(config);
* Notification.warning(config);
* Notification.open(config);


| 参数        | 说明                                      | 类型             | 默认值 |
| :---------- | :---------------------------------------- | :--------------- | :----- |
| className   | 自定义 CSS class                          | string           | -      |
| message     | 通知提醒标题                              | ReactNode        | -      |
| description | 通知提醒内容                              | ReactNode        | -      |
| duration    | 自动关闭的延时，单位秒。设为0时不自动关闭 | number           | 4.5    |
| icon        | 自定义图标                                | string           | -      |
| key         | 当前提示的唯一标志                        | string \| number | -      |
| style       | 自定义内联样式                            | CSSProperties    | -      |
| onClose     | 关闭时触发的回调函数                      | ()=>void         | -      |
| onClick     | 点击 message 时触发的回调函数             | ()=>void         | -      |

* Notification.config={...} 全局配置
* Notification.destroy(key); 可以关闭 提示
