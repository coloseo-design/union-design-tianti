import classnames from 'classnames';
import React, { useContext, useEffect } from 'react';
import { Col, Row } from '../grid';
import { FormContextProps, FormItemProps, ValidatorRule } from './type';
import FormItemError from './form-item-error';
import {
  composeFieldName,
  defaultGetValueFromEvent,
  getValueFromKeypaths,
  toArray,
  validateRules,
} from './util';
import { FormContext } from './form-context';
import { ConfigContext } from '../config-provider/context';

const Item: React.FC<FormItemProps> = (props: FormItemProps) => {
  const {
    label,
    name = '',
    children,
    valuePropName = 'value',
    trigger = 'onChange',
    initialValue,
    prefixCls: customizePrefixCls,
    labelAlign: lableAlignOfProps,
    labelCol: labelColfromProps,
    wrapperCol: wrapperColFromProps,
    getValueFromEvent, // 自定义从event中获取value
    validateTrigger: validateTriggerFromProps,
    rules = [],
    validateFirst = false, // 遇到错误是否停止
    messageVariables = {},
    required = false,
    colon = true,
    labelStyle: labelStyleOfProps,
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);

  const context = useContext<FormContextProps>(FormContext);
  const {
    name: formName,
    values,
    errors,
    onSubmit,
    isValidating = false,
    onError,
    onCollect,
  } = context;
  const composedName = composeFieldName(formName, name);
  const value = getValueFromKeypaths(name, values);
  const error = errors[composedName] || [];
  //  检查当前组件是否为必填
  let isRequired = required;
  if (rules) {
    // 检查rules之后是否有required为true
    const requiredRules = rules.filter((item) => item.required);
    if (requiredRules.length > 0) {
      isRequired = true;
    }
  }
  const hasError = isValidating && error.length > 0;
  // 检查是否为必填
  // 布局相关
  const prefix = getPrefixCls('form-item', customizePrefixCls);
  // label布局
  const labelCol = { ...context.labelCol, ...labelColfromProps };
  const labelAlign = lableAlignOfProps || context.labelAlign;
  const labelClassName = classnames({
    [`${prefix}-label`]: true,
    [`${prefix}-label-left`]: labelAlign === 'left',
    [`${prefix}-label-colon`]: colon,
  });
  // 输入组件布局
  const wrapperCol = { ...context.wrapperCol, ...wrapperColFromProps };
  const rowCls = classnames(prefix);
  const controlWraperClassName = classnames({
    [`${prefix}-control-wrapper`]: true,
  });
  const controlInputClassName = classnames(`${prefix}-control`, {
    'has-error': hasError,
  });
  const labelCls = classnames({
    [`${prefix}-label-required`]: isRequired,
  });

  const validate = (newValue: unknown) => {
    const filterRules = rules?.filter((rule) => {
      const { validateTrigger } = rule;
      const aValidateTrigger = validateTrigger || validateTriggerFromProps;
      if (!aValidateTrigger) {
        return true;
      }
      const validateTriggers = toArray(aValidateTrigger);
      return validateTriggers.includes(trigger);
    });
    if (required) {
      filterRules.unshift({ required, message: `${name}不能为空` } as ValidatorRule);
    }
    // 开始过滤数据
    return validateRules(composedName, newValue, filterRules, validateFirst, messageVariables);
  };

  const collectValue = (...evts: unknown[]) => {
    if (name) {
      let newValue;
      if (getValueFromEvent) {
        newValue = getValueFromEvent(evts);
      } else {
        newValue = defaultGetValueFromEvent(valuePropName, ...evts);
      }
      validate(newValue)
        .then((newErrors) => {
          onError(composedName, { event: trigger, errors: newErrors });
        })
        .catch((newErrors) => {
          // 更新错误信息
          onError(composedName, { event: trigger, errors: newErrors });
        });
      // 收集用户输入
      onCollect(composedName, { event: trigger, value: newValue });
    }
  };
  // 当重置之后，再次校验
  useEffect(() => {
    if (name) {
      validate(value || initialValue).catch((newErrors) => {
        onError(composedName, { event: trigger, errors: newErrors });
      });
      onCollect(composedName, { event: trigger, value: value || initialValue });
    }
  }, [isValidating]);

  /** 处理提交按钮 */
  const cloneElement = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.props.htmlType === 'submit') {
        return React.cloneElement(child, {
          onClick: onSubmit,
        });
      }
      const extProps: { [key: string]: unknown } = {
        ...child.props,
        id: name,
        [valuePropName]: value,
        [trigger]: (...args: unknown[]) => {
          if (child.props && child.props[trigger]) {
            child.props[trigger](...args);
          }
          collectValue(...args);
        },
        defaultValue: value || initialValue,
        name,
      };
      return React.cloneElement(child, extProps);
    }
    return child;
  });
  return (
    <Row className={rowCls}>
      {
        label && (
          <Col
            {...labelCol}
            className={labelClassName}
            style={labelStyleOfProps || context.labelStyle}
          >
            <label className={labelCls} title={composedName} htmlFor={composedName}>{label}</label>
          </Col>
        )
      }
      <Col {...wrapperCol} className={controlWraperClassName}>
        <div className={controlInputClassName}>
          {cloneElement}
          <FormItemError error={hasError ? error : undefined} />
        </div>
      </Col>
    </Row>
  );
};

export default Item;
