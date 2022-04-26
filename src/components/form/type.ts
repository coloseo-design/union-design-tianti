/* eslint-disable max-len */
import React, { HtmlHTMLAttributes } from 'react';
import { BaseProps, ResponsiveColProps } from '../utils/type';
import { ConfigConsumerProps } from '../config-provider';

interface FailedResponseType {
  errors: FormErrors;
}

export interface FormValues {
  [key:string]: unknown;
}

export interface FormErrors {
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
  labelAlign?: 'left' | 'right',
  /** label样式 */
  labelStyle?: React.CSSProperties;
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
  errors: FormErrors;
  /** 表单数据收集 */
  onCollect: (name: string, action: any) => void;
  /** 表单错误收集 */
  onError: (name: string, action: any) => void;
  /** 表单提交事件 */
  onSubmit: () => void;
  /** 表单的校验状态 */
  isValidating: boolean;
}

// eslint-disable-next-line max-len
export interface FormProps extends FormCommmonProps, BaseProps, React.HTMLAttributes<HTMLFormElement> {
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
  /** 默认值 */
  initialValues?: FormValues;
}

export type ValueCollection = {
  value: unknown;
  event: string;
};

export type ErrorCollection = {
  errors: string[] | React.ReactNode[];
  event: string;
};

export type ItemProps = ResponsiveColProps & BaseProps;

export interface ValidatorRule {
  message?: string;
  validator?: (rule: ValidatorRule, value: any, cb?: (error?: string) => void) => Promise<void | unknown> | null;
  validateTrigger?: string | string[];
  required?: boolean;
}

export type FormInstance = {
  reset: () => void;
  setFieldsValue: (value: FormValues) => void;
  submit: () => void;
};

export interface FormItemProps extends BaseProps, React.HTMLAttributes<HTMLDivElement> {
  /** label栅格布局 */
  labelCol?: ResponsiveColProps;
  /** 输入框栅格布局 */
  wrapperCol?: ResponsiveColProps;
  /** 字段名称 */
  name?: string;
  /** 标签 */
  label?: React.ReactNode;
  labelStyle?: React.CSSProperties;
  prefixCls?: string;
  valuePropName?: string;
  trigger?: string;
  /** 用户自定义获取值的方法 */
  getValueFromEvent?: (evt: any) => any;
  /** 校验器 */
  rules?: ValidatorRule[];
  /** 校验时机， 默认为onChange */
  validateTrigger?: string | string[];
  messageVariables?: Record<string, string>;
  /** 当检测到第一个错误的时候，停止 */
  validateFirst?: boolean;
  /** 默认值: 请与当前输入组件相结合 */
  initialValue?: any;
  /** 是否必填 */
  required?: boolean;
  /** label对齐方式 */
  labelAlign?: 'left' | 'right',
  /** 是否显式冒号 */
  colon?: boolean;
}
