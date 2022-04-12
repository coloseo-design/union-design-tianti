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
  ErrorCollection, FormErrors, FormInstance, FormProps, FormValues, ValueCollection,
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
    setValues({ ...initialValues });
    setIsValidating(false);
  };

  useImperativeHandle(ref, () => ({
    reset,
    setFieldsValue,
    submit: onSubmit,
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
    isValidating,
    labelAlign,
    labelStyle,
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
