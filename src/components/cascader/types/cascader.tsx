import { CascaderOptionType, FieldNamesType } from './common';

export type CascaderExpandTrigger = 'click' | 'hover';

export interface ShowSearchType {
  filter?: () => boolean;
  limit?: number | false;
  matchInputWidth?: boolean;
  render?: () => React.ReactNode;
  sort?: () => number;
}

export interface CascaderProps {
  /** 可选项数据源 */
  options: CascaderOptionType[];
  /** 默认的选中项 */
  defaultValue?: string[];
  /** 指定选中项 */
  value?: string[];
  /** 选择完成后的回调 */
  onChange?: (value: string[], selectedOptions: CascaderOptionType[]) => void;
  /** 选择后展示的渲染函数 */
  displayRender?: () => React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 自定义浮层类名 */
  popupClassName?: string;
  /** 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` */
  // popupPlacement?: string;
  /** 输入框占位文本 */
  placeholder?: string;
  /** 输入框大小，可选 `large` `default` `small` */
  size?: string;
  /** 禁用 */
  disabled?: boolean;
  /** 是否支持清除 */
  allowClear?: boolean;
  /** 是否支持搜索 */
  showSearch?: boolean | ShowSearchType;
  /** 当下拉列表为空时显示的内容 */
  notFoundContent?: React.ReactNode;
  // loadData?: () => void;
  /** 次级菜单的展开方式，可选 'click' 和 'hover' */
  expandTrigger?: CascaderExpandTrigger;
  /** 当此项为 true 时，点选每级菜单选项值都会发生变化 */
  changeOnSelect?: boolean;
  /** 浮层可见变化时回调 */
  onPopupVisibleChange?: (popupVisible: boolean) => void;
  prefixCls?: string;
  /** 控制浮层显隐 */
  popupVisible?: boolean;
  /** 自定义 options 中 label value children的字段 */
  fieldNames?: FieldNamesType;
  getPopupContainer?: () => HTMLElement | null;
}
