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
  const [itemInitValues, setItemValues] = useState<FormValues>({});

  const loopObj = (obj: FormValues, parent: FormValues) => {
    for (const key in obj) {
      if (obj[key]) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          Object.assign(parent, {
            [key]: {
              ...obj[key] as any,
            },
          });
        } else {
          parent && Object.assign(parent, {
            [key]: obj[key],
          });
        }
      }
    }
  };

  const onCollect = (fieldName: string, { value }: ValueCollection, mounted?: boolean) => {
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
    if (mounted) { // 第一次加载完收集 item上initialValue的值
      const obj = {};
      loopObj(values, obj);
      setItemValues({ ...obj });
    }
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

  const getFieldsValue = (list: string[] | boolean) => {
    if (typeof list === 'boolean' && list) {
      return values;
    }
    if (Array.isArray(list)) {
      const obj = {};
      (list || []).forEach((item) => {
        Object.assign(obj, {
          [item]: values[item],
        });
      });
      return obj;
    }
    return null;
  };

  const reset = () => {
    // itemInitValues formItem 上的初始值，initialValues Form上的初始值
    setValues({ ...initialValues, ...itemInitValues });
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
