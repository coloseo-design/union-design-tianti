export interface GroupCheckboxConsumerProps {
  value?: string[];
  onGroupChange?: (value: CheckboxOption) => void;
}

export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (checkedValue: boolean) => void;
}

export interface CheckboxGroupProps extends Omit<React.HtmlHTMLAttributes<HTMLInputElement>, 'onChange'> {
  defaultValue?: string[];
  name?: string;
  options?: string[] | CheckboxOption[];
  value?: string[];
  onChange?: (checkedValues: string[]) => void;
  disabled?: boolean;
  prefixCls?: string;
  direction?: 'vertical' | 'horizontal';
}

export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  prefixCls?: string;
  /** 是否选中  */
  checked?: boolean;
  /** 默认选中状态（仅在初始化有效） */
  defaultChecked?: boolean;
  /** 当前空间是否禁止状态 */
  disabled?: boolean;
  /** onChange切换选择状态的回调(为了将来兼容form， 所以输入组件必须对value和onChange进行处理) */
  onChange?: (checkedValue: boolean) => void;
  /** checkbox选中的值(为了将来兼容form， 所以输入组件必须对value和onChange进行处理) */
  value?: string;
  /** 设置 indeterminate 状态，只负责样式控制 */
  indeterminate?: boolean;
}
