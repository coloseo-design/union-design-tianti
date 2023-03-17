import { HTMLAttributes } from 'react';

export interface RadioProps extends HTMLAttributes<HTMLInputElement> {
  // 指定当前是否选中
  checked?: boolean;
  // 初始是否选中
  defaultChecked?: boolean;
  // 禁用 Radio
  disabled?: boolean;
  // 根据 value 进行比较，判断是否选中
  value?: string;
  /* 用户自定义类前缀，默认uni-input */
  prefixCls?: string;
  // 变化时的回调
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  // RadioGroup 下所有 input[type="radio"] 的 name 属性
  name?: string;
  forwardedRef?: React.MutableRefObject<HTMLInputElement>;
}

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type RadioOptions = string[] | RadioOption[];

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /* 用户自定义类前缀，默认uni-input */
  prefixCls?: string;
  // 选项变化时的回调函数
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  // 以配置形式设置子元素
  options?: RadioOptions;
  // 用于设置当前选中的值
  value?: string;
  // 默认选中的值
  defaultValue?: string;
  // RadioGroup 下所有 input[type="radio"] 的 name 属性
  name?: string;
  // 禁选所有子单选器
  disabled?: boolean;
  direction?: 'vertical' | 'horizontal';
}

export interface GroupRadioContextProps {
  value?: string;
  onGroupChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
