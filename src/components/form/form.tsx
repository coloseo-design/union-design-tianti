/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/sort-comp */
import React from 'react';
import classnames from 'classnames';
import { BaseProps } from '../utils/type';
import { ConfigConsumerProps } from '../config-provider';
import { FormCommmonProps, FormProvider } from './form-context';
import { withGlobalConfig } from '../config-provider/context';
import { composeFieldName } from './util';

interface FailedResponseType {
  errors: FormErrors;
}

interface FormValues {
  [key:string]: any
}

interface FormErrors {
  [key: string]: string[] | React.ReactNode[];
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

interface FormState {
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

@withGlobalConfig
class Form extends React.Component<FormProps, FormState> {
  /** 收集数据 */
  constructor(props: FormProps) {
    super(props);
    this.state = {
      values: {},
      errors: {},
      isValidating: false,
    };
  }

  /**
   * 数据收集
   * @param name
   * @param param1
   */
  onCollect = (name: string | string[], { value }: ValueCollection) => {
    const { values } = this.state;
    const { onValuesChange } = this.props;
    let changeValue = {};
    if (Array.isArray(name)) {
      const [key, ...rest] = [...name].reverse();
      const current = rest.reduceRight((composed, key) => {
        if (!composed[key]) {
          composed[key] = {};
        }
        return composed[key];
      }, values);
      changeValue = {
        [key]: value,
      };
      Object.assign(current, changeValue);
    } else {
      changeValue = {
        [name]: value,
      };
      Object.assign(values, changeValue);
    }
    onValuesChange && onValuesChange(changeValue, values);
    this.setState({
      values: { ...values },
    });
  }

  onError = (name: string | string[], { errors: _errors }: ErrorCollection) => {
    const { errors } = this.state;
    const { name: formName } = this.props;
    const fieldName = composeFieldName(formName, name);
    Object.assign(errors, {
      [fieldName]: _errors,
    });
    this.setState({
      errors: { ...errors },
    });
  }

  /**
   * 重置表单字段
   */
  resetFields = () => {
    this.setState({ values: {} });
  }

  /**
   * 更新表单字段
   * @param newValues
   */
  setFieldsValue = (newValues: FormValues) => {
    const { values } = this.state;
    Object.assign(values, newValues);
    this.setState({ values: { ...values } });
  }

  onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt && evt.preventDefault();
    const { errors, values } = this.state;
    const { onFinishFailed, onFinish } = this.props;
    const hasError = Object.keys(errors).some((key) => errors[key].length > 0);
    this.setState({ isValidating: true });
    if (hasError) {
      onFinishFailed && onFinishFailed({ errors });
    } else {
      onFinish && onFinish(values);
    }
  }

  render() {
    const {
      prefixCls: customizePrefixCls,
      className,
      name,
      children,
      onFinish,
      onFinishFailed,
      onValuesChange,
      labelCol,
      wrapperCol,
      validateTrigger = 'onChange',
      getPrefixCls,
      labelAlign,
      ...rest
    } = this.props;
    const prefix = getPrefixCls('form', customizePrefixCls);
    const composedClassNames = classnames(prefix, className);
    if (name) {
      Object.assign(rest, {
        id: name,
      });
    }
    const { values, errors, isValidating } = this.state;
    const providerValue = {
      wrapperCol,
      labelCol,
      name,
      onCollect: this.onCollect,
      onError: this.onError,
      values,
      errors,
      onSubmit: this.onSubmit,
      validateTrigger,
      isValidating,
      labelAlign,
    };
    return (
      <form {...rest} className={composedClassNames}>
        <FormProvider value={providerValue}>
          {children}
        </FormProvider>
      </form>
    );
  }
}

export default Form;
