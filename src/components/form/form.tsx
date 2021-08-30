import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { FormProvider } from './form-context';
import { ConfigConsumerProps, ConfigContext } from '../config-provider/context';
import { decomposeFiledName } from './util';
import {
  ErrorCollection, FormErrors, FormInstance, FormProps, FormValues, ValueCollection,
} from './type';

const Form: React.FC<FormProps> = (props: FormProps) => {
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
    forwardRef,
    ...rest
  } = props;
  const composedClassNames = classnames(getPrefixCls('form', customizePrefixCls), className);
  // 给form增加一个id属性
  if (name) {
    Object.assign(rest, {
      id: name,
    });
  }
  const [values, setValues] = useState<FormValues>(initialValues || {});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValidating, setIsValidating] = useState<boolean>(false);

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
      return composed[prefix];
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

  const onSubmit = (evt?: React.FormEvent<HTMLFormElement>) => {
    evt && evt.preventDefault();
    const hasError = Object.keys(errors).some((key) => errors[key].length > 0);
    setIsValidating(true);
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

  const reset = () => {
    setValues({});
    setIsValidating(false);
  };

  const current: FormInstance = {
    reset,
    setFieldsValue,
    submit: onSubmit,
  };

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
    isValidating,
    labelAlign,
    labelStyle,
  };
  return (
    <form
      {...rest}
      ref={() => {
        if (forwardRef) {
          Object.assign(forwardRef, {
            current,
          });
        }
      }}
      className={composedClassNames}
    >
      <FormProvider value={providerValue}>
        {children}
      </FormProvider>
    </form>
  );
};

const FormFC = React.forwardRef<FormInstance, Omit<FormProps, 'forwardRef'>>((props, ref) => <Form forwardRef={ref} {...props} />);

export default FormFC;
