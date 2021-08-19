import { ReactNode } from 'react';

interface mark {
  label: ReactNode;
  value: number;
}
export interface SliderProps {
  /* 默认值 */
  defaultValue?: number;
  /* 滑块取值，默认为0 */
  value?: number;
  /* 滑块拖拽事件 */
  onChange?: (value: number) => void;
  /** 自定义类名称 */
  className?: string;
  /** 自定义类前缀 */
  prefixCls?: string;
  /* 滑块的最大区间，默认为0 */
  min?: number;
  /* 滑块的最大区间，默认为10 */
  max?: number;
  /** 是否水平方向 默认false */
  vertical?: boolean;
  marks?: mark[];
  /* 是否被禁用 */
  disabled?: boolean;
}
