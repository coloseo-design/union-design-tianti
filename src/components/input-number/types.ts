export interface InputNumberProps {
  // 行内样式
  style?: React.CSSProperties;
  // 是否禁用 默认false
  disabled?: boolean;
  // 输入框大小
  size?: 'large' | 'small' | 'default';
  // 是否自动获得焦点
  autofocus?: string;
  // 最大值
  max?: number;
  // 最小值
  min?: number;
  // 递增间隔
  step?: number;
  // 默认值
  defaultValue?: number;
  // 自定义类名更改样式
  className?: string;
  // 输入框值
  value?: number;
  // 保留小数位数
  precision?: number;
  ref?: React.ForwardedRef<HTMLInputElement>;
  // 输入框内容改变
  onChange?: (value: number | string) => void;
  // 上下箭头回调
  onStep?: (value: number, info?: { offset: number, type: string }) => void;
  // 回车键
  onPressEnter?: (value: any, info?: { offset: number, key: string }) => void;
  // 规定展示格式
  formatter?: (value: string | number) => string;
  // 解析配合formatter
  parser?: (value: string | number) => string;
}
