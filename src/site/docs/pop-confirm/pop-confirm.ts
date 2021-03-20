/* eslint-disable */
export default { "content": { "tag": "div", "children": [{ "tag": "article", "children": [{ "tag": "h2", "children": "字段和功说明" }, { "tag": "h3", "children": "popConfirm" }, { "tag": "p", "children": "popConfirm的属性说明如下：" }, { "tag": "table", "children": [{ "tag": "thead", "children": [{ "tag": "tr", "children": [{ "tag": "th", "children": "属性" }, { "tag": "th", "children": "说明" }, { "tag": "th", "children": "类型" }, { "tag": "th", "children": "默认值" }, { "tag": "th", "children": [] }] }] }, { "tag": "tbody", "children": [{ "tag": "tr", "children": [{ "tag": "td", "children": "cancelText" }, { "tag": "td", "children": "取消按钮文字" }, { "tag": "td", "children": "string" }, { "tag": "td", "children": "取消" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "okText" }, { "tag": "td", "children": "确认按钮文字" }, { "tag": "td", "children": "string" }, { "tag": "td", "children": "确定" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "okType" }, { "tag": "td", "children": "确认按钮类型" }, { "tag": "td", "children": "string" }, { "tag": "td", "children": "primary" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "title" }, { "tag": "td", "children": "确认框的描述" }, { "tag": "td", "children": "string" }, { "tag": "td", "children": "ReactNode" }, { "tag": "td", "children": "无" }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "onCancel" }, { "tag": "td", "children": "点击取消的回调" }, { "tag": "td", "children": "function(e)" }, { "tag": "td", "children": "无" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "onConfirm" }, { "tag": "td", "children": "点击确认的回调" }, { "tag": "td", "children": "function(e)" }, { "tag": "td", "children": "无" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "icon" }, { "tag": "td", "children": "自定义弹出气泡 Icon 图标" }, { "tag": "td", "children": "ReactNode" }, { "tag": "td", "children": [{ "tag": "icon", "attrs": { "type": "exclamation-circle" }, "children": [] }] }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "getPopupContainer" }, { "tag": "td", "children": "浮层渲染父节点，默认渲染到 body 上" }, { "tag": "td", "children": "Function(triggerNode)" }, { "tag": "td", "children": "() => document.body" }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "mouseEnterDelay" }, { "tag": "td", "children": "鼠标移入后延时多少才显示 Tooltip，单位：秒" }, { "tag": "td", "children": "number" }, { "tag": "td", "children": "-" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "mouseLeaveDelay" }, { "tag": "td", "children": "鼠标移出后延时多少才隐藏 Tooltip，单位：秒" }, { "tag": "td", "children": "number" }, { "tag": "td", "children": "-" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "overlayStyle" }, { "tag": "td", "children": "卡片样式" }, { "tag": "td", "children": "无" }, { "tag": "td", "children": "-" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "placement" }, { "tag": "td", "children": "气泡框位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom" }, { "tag": "td", "children": "string" }, { "tag": "td", "children": "top" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "trigger" }, { "tag": "td", "children": "触发行为 可选 hover/focus/click" }, { "tag": "td", "children": "string" }, { "tag": "td", "children": "popconfirm 默认'click' popOver默认 ‘hover'" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "visible" }, { "tag": "td", "children": "用于手动控制浮层显隐" }, { "tag": "td", "children": "boolean" }, { "tag": "td", "children": "false" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "onVisibleChange" }, { "tag": "td", "children": "显示隐藏的回调" }, { "tag": "td", "children": "(visible) => void" }, { "tag": "td", "children": "无" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "autoAdjustOverflow" }, { "tag": "td", "children": "气泡被遮挡时自动调整位置" }, { "tag": "td", "children": "boolean" }, { "tag": "td", "children": "true" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "defaultVisible" }, { "tag": "td", "children": "默认是否显隐" }, { "tag": "td", "children": "boolean" }, { "tag": "td", "children": "false" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "okButtonProps" }, { "tag": "td", "children": "确认按钮props" }, { "tag": "td", "children": "BaseButtonProps" }, { "tag": "td", "children": [] }] }, { "tag": "tr", "children": [{ "tag": "td", "children": "cancelButtonProps" }, { "tag": "td", "children": "取消按钮props" }, { "tag": "td", "children": "BaseButtonProps｜" }] }] }] }] }] }, "meta": { "category": "Components", "type": "通用", "title": "PopConfirm", "subtitle": "气泡确认框" } }
