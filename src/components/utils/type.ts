export const tuple = <T extends string[]>(...args: T) => args;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface BaseProps {
  /* class名称 */
  className?: string;
  /* 自定义类前缀 */
  prefixCls?: string;
  /* 屏幕 < 576px 响应式栅格 */
}

export interface ColProps {
  /* 内容所占的栅格数 */
  span: number;
  /** 栅格左右的占格数 */
  offset?: number;
  /** 栅格顺序 */
  order?: number;
}

export interface ResponsiveColProps extends ColProps {
  xs?: number | ColProps;
  /* 屏幕 ≥ 576px 响应式栅格 */
  sm?: number | ColProps;
  /* 屏幕 ≥ 768px 响应式栅格 */
  md?: number | ColProps;
  /* 屏幕 ≥ 992px 响应式栅格 */
  lg?: number | ColProps;
  /* 屏幕 ≥ 1200px 响应式栅格 */
  xl?: number | ColProps;
  /* 屏幕 ≥ 1600px 响应式栅格 */
  xxl?: number | ColProps;
}
