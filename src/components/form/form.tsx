/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, {
  ForwardedRef,
  ForwardRefRenderFunction,
  useContext,
  useImperativeHandle,
  useState,
} from 'react';
import classnames from 'classnames';
import { FormProvider } from './form-context';
import { ConfigConsumerProps, ConfigContext } from '../config-provider/context';
import { decomposeFiledName } from './util';
import {
  ErrorCollection, FormErrors, FormInstance, FormProps, FormValues, ValueCollection, FormStatus,
} from './type';

const Form: ForwardRefRenderFunction<FormInstance, FormProps> = (
  props: FormProps,
  ref: ForwardedRef<FormInstance>,
) => {
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
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
    labelAlign,
    labelStyle,
    initialValues,
    ...rest
  } = props;
  const composedClassNames = classnames(getPrefixCls('form', customizePrefixCls), className);
  // 给form增加一个id属性
  if (name) {
    Object.assign(rest, {
      id: name,
    });
  }
  const [values, setValues] = useState<FormValues>({ ...initialValues });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>({});

  const onCollect = (fieldName: string, { value }: ValueCollection) => {
    let changeValue = {};
    const itemName = decomposeFiledName(fieldName);
    const [key, ...prefixs] = [...itemName].reverse();
    const current = prefixs.reduceRight((composed, prefix) => {
      if (!composed[prefix]) {
        Object.assign(composed, {
          [prefix]: {},
        });
      }
      return composed[prefix] as FormValues;
    }, values);
    changeValue = {
      [key]: value,
    };
    Object.assign(current, changeValue);
    onValuesChange && onValuesChange(changeValue, values);
    setValues({ ...values });
  };

  const onError = (itemName: string, { errors: _errors }: ErrorCollection) => {
    Object.assign(errors, {
      [itemName]: _errors,
    });
    setErrors({ ...errors });
  };

  const onStatus = (itemName: string, s: boolean) => {
    Object.assign(status, {
      [itemName]: s || false,
    });
    setStatus({ ...status });
  };

  const onSubmit = (evt?: React.FormEvent<HTMLFormElement>) => {
    evt && evt.preventDefault();
    const hasError = Object.keys(errors).some((key) => errors[key].length > 0);
    for (const key in status) {
      Object.assign(status, {
        [key]: true,
      });
    }
    setStatus({ ...status });
    if (hasError) {
      onFinishFailed && onFinishFailed({ errors });
    } else {
      onFinish && onFinish(values);
    }
  };

  const setFieldsValue = (value: FormValues) => {
    Object.assign(values, value);
    setValues({ ...values });
  };

  const getFieldValue = (value: string) => values[value];

  const getFieldsValue = (list: string[]) => {
    const obj = {};
    (list || []).forEach((item) => {
      Object.assign(obj, {
        [item]: values[item],
      });
    });
    return obj;
  };

  const reset = () => {
    setValues({ ...initialValues });
    for (const key in status) {
      Object.assign(status, {
        [key]: false,
      });
    }
    setStatus({ ...status });
  };

  useImperativeHandle(ref, () => ({
    ...props,
    reset,
    setFieldsValue,
    getFieldValue,
    submit: onSubmit,
    getFieldsValue,
  }));
  const providerValue = {
    wrapperCol,
    labelCol,
    name,
    onCollect,
    onError,
    values,
    errors,
    onSubmit,
    validateTrigger,
    labelAlign,
    labelStyle,
    status,
    onStatus,
  };

  return (
    <form
      {...rest}
      className={composedClassNames}
    >
      <FormProvider value={providerValue}>
        {children}
      </FormProvider>
    </form>
  );
};

const FormFC = React.forwardRef<FormInstance, FormProps>(Form);

export default FormFC;
