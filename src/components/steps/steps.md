# 步骤条

## Steps API

| 参数      | 说明                                                                        | 类型                       | 默认值       |
| :-------- | :-------------------------------------------------------------------------- | :------------------------- | :----------- |
| className | 类名                                                                        | string                     | -            |
| style     | style                                                                       | CSSProperties              | -            |
| current   | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态 | number                     | -            |
| direction | 指定步骤条方向。目前支持水平（horizontal）和竖直（vertical）两种方向        | 'horizontal' \| 'vertical' | 'horizontal' |
| initial   | 起始序号                                                                    | number                     | 0            |
| size      | 大小                                                                        | 'default' \| 'big'         | 'default'    |
| onClick   | 点击步骤时触发                                                              | (current: number) => void  | -            |

## Step API


| 参数               | 说明                                                                                                | 类型                                       | 默认值 |
| :----------------- | :-------------------------------------------------------------------------------------------------- | :----------------------------------------- | :----- |
| description        | 步骤的详情描述，可选                                                                                | ReactNode                                  | -      |
| maxDescriptionLine | 最多显示几行 只用 description 为 string 有效                                                        | number                                     | 3      |
| icon               | 步骤图标的类型，可选                                                                                | ReactNode                                  | -      |
| status             | 指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态。可选：wait process finish error | 'wait' \| 'process' \| 'finish' \| 'error' | -      |
| title              | 标题                                                                                                | string                                     | -      |
