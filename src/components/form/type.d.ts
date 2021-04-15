import { BaseProps, ResponsiveColProps } from '../utils/type';
import { ConfigConsumerProps } from '../config-provider';

interface FailedResponseType {
  errors: FormErrors;
}

export interface FormValues {
  [key:string]: unknown;
}

interface FormErrors {
  [key: string]: string[] | React.ReactNode[];
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
  /** 是否需要冒号 */
  colon?: boolean;
  /** 表单名称 */
  name: string;
  /** label对齐方式 */
  labelAlign?: 'left' | 'right',
  /** 默认校验时机 */
  validateTrigger: 'onChange',
  /** 表单收集的数据集 */
  values: FormValues;
  /** 表单收集的数据集 */
  errors: FormValues;
  /** 表单数据收集 */
  onCollect: (name: string, action: any) => void;
  /** 表单错误收集 */
  onError: (name: string, action: any) => void;
  /** 表单提交事件 */
  onSubmit: () => void;
  /** 表单的校验状态 */
  isValidating: boolean;
}

export interface FormProps extends FormCommmonProps, BaseProps, ConfigConsumerProps {
  /** 表单名称 */
  name: string;
  /** 表单提交回调 */
  onFinish?: (values: FormValues) => void;
  /** 表单提交失败回调 */
  onFinishFailed?: (res: FailedResponseType) => void;
  /** 表单字段发生变化回调 */
  onValuesChange?: (changedValues: FormValues, allValues: FormValues) => void;
  /** 默认校验时机 */
  validateTrigger?: 'onChange',
}

export interface FormState {
  /** 表单收集的值 */
  values: { [key: string]: any };
  /** 表单收集的错误 */
  errors: { [key: string]: string[] | React.ReactNode[] };
  /** 表单的校验状态 */
  isValidating: boolean;
}

type ValueCollection = {
  value: any;
  event: string;
};

type ErrorCollection = {
  errors: string[] | React.ReactNode[];
  event: string;
};
