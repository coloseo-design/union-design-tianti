# 菜单组件

## Menu

| 参数                 | 说明                                         | 类型                                     | 默认值     |
| :------------------- | :------------------------------------------- | :--------------------------------------- | :--------- |
| mode                 | 菜单类型，现在支持垂直、水平、和内嵌模式三种 | 'vertical' \| 'horizontal' \| 'inline'   | 'vertical' |
| theme                | 主题颜色                                     | 'light' \| 'dark'                        | 'light'    |
| style                | 根节点样式                                   | CSSProperties                            | -          |
| className            | 根节点样式class                              | string                                   | -          |
| selectedKeys         | 当前选中的菜单项 key 数组                    | string[]                                 | -          |
| defaultSelectedKeys  | 初始选中的菜单项 key 数组                    | string[]                                 | -          |
| defaultOpenKeys      | 初始展开的 SubMenu 菜单项 key 数组           | string[]                                 | -          |
| openKeys             | 当前展开的 SubMenu 菜单项 key 数组           | string[]                                 | -          |
| triggerSubMenuAction | SubMenu 展开/关闭的触发行为                  | 'hover' \| 'click'                       | 'hover'    |
| multiple             | 是否允许多选                                 | boolean                                  | false      |
| inlineIndent         | inline 模式的菜单缩进宽度                    | number                                   | 30         |
| inlineCollapsed      | inline 时菜单是否收起状态                    | boolean                                  | false      |
| inlineCollapsedIcon  | inline 时是否展示收起菜单图标                | boolean                                  | false      |
| onClick              | 点击 Menu.Item 调用此函数                    | (key: string, keyPath: string[]) => void | -          |
| onSelect             | 被选中时调用                                 | (key: string, keyPath: string[]) => void | -          |
| onDeselect           | 取消选中时调用，仅在 multiple 生效           | (key: string, keyPath: string[]) => void | -          |

## Menu.Item

| 参数 | 说明     | 类型      | 默认值 |
| :--- | :------- | :-------- | :----- |
| icon | 菜单图标 | ReactNode | -      |
| key  | 唯一标志 | string    | -      |

## Menu.ItemGroup

| 参数  | 说明     | 类型   | 默认值 |
| :---- | :------- | :----- | :----- |
| title | 分组标题 | string | -      |


## Menu.SubMenu

| 参数         | 说明           | 类型                  | 默认值 |
| :----------- | :------------- | :-------------------- | :----- |
| icon         | 子菜单图标     | ReactNode             | -      |
| key          | 唯一标志       | string                | -      |
| title        | 子菜单标题     | string                | -      |
| onTitleClick | 点击子菜单标题 | (key: string) => void | -      |
