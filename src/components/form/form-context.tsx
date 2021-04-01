/* eslint-disable react/display-name */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { ResponsiveColProps } from '../utils/type';

export interface FormValues {
  [key:string]: unknown
}

export interface FormCommmonProps {
  /** 是否需要冒号 */
  colon?: boolean;
  /** 表单名称 */
  name: string;
  /** label布局 */
  labelCol?: ResponsiveColProps;
  /** 输入框布局 */
  wrapperCol?: ResponsiveColProps;
  /** label对齐方式 */
  labelAlign: 'left' | 'right',
}

export interface FormContextProps extends FormCommmonProps{
  /** 默认校验时机 */
  validateTrigger: 'onChange',
  /** 表单收集的数据集 */
  values: FormValues;
  /** 表单收集的数据集 */
  errors: FormValues;
  /** 表单数据收集 */
  onCollect: (name: string | string[], action: any) => void;
  /** 表单错误收集 */
  onError: (name: string | string[], action: any) => void;
  /** 表单提交事件 */
  onSubmit: () => void;
  /** 表单的校验状态 */
  isValidating: boolean;
}

const FormContext = React.createContext<FormContextProps>({
  name: '',
  colon: true,
  validateTrigger: 'onChange',
  onCollect: () => {},
  onError: () => {},
  onSubmit: () => {},
  errors: {},
  values: {},
  isValidating: false,
  labelAlign: 'right',
});

export const { Consumer: FormConsumer, Provider: FormProvider } = FormContext;

export const withFormContext = <T extends FormContextProps>(Component: React.FC<T> | React.Component<T>) => (props: T) => (
  <FormConsumer>
    {
      (context: FormContextProps) => (<Component {...props} context={context} />)
    }
  </FormConsumer>
);
