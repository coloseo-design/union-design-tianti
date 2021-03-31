/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/sort-comp */
/* eslint-disable max-len */
import React from 'react';
import classnames from 'classnames';
import { BaseProps, ResponsiveColProps } from '../utils/type';
import {
  composeFieldName, defaultGetValueFromEvent, getValueFromKeypaths, toArray, validateRules,
} from './util';
import { Col, Row } from '../grid';
import { FormContextProps, withFormContext } from './form-context';
import { ConfigConsumerProps } from '../config-provider';
import { withGlobalConfig } from '../config-provider/context';
import FormItemError from './form-item-error';

export type ItemProps = ResponsiveColProps & BaseProps;

export interface ValidatorRule {
  message?: string;
  validator: (rule: ValidatorRule, value: unknown, cb: (error?: string) => void) => Promise<void | unknown> | void;
  validateTrigger: string | string[];
}

interface InternalFormItemProps extends BaseProps, ConfigConsumerProps {
  /** label栅格布局 */
  labelCol?: ResponsiveColProps;
  /** 输入框栅格布局 */
  wrapperCol?: ResponsiveColProps;
  /** 字段名称 */
  name?: string | string[];
  /** 标签 */
  label?: React.ReactNode;
  prefixCls: string;
  valuePropName: string;
  trigger: string;
  /** 用户自定义获取值的方法 */
  getValueFromEvent: (evt: any) => any;
  /** 校验器 */
  rules?: ValidatorRule[];
  /** 校验时机， 默认为onChange */
  validateTrigger: string | string[];
  messageVariables?: Record<string, string>;
  /** 当检测到第一个错误的时候，停止 */
  validateFirst: boolean;
  /** 默认值: 请与当前输入组件相结合 */
  initialValue: any;
  /** 校验状态 */
  isValidating: boolean;
  /** 是否必填 */
  required: boolean;
  context: FormContextProps;
  /** label对齐方式 */
  labelAlign?: 'left' | 'right',
}

interface FormItemState {
  isValidating: boolean;
}

class InternalFormItem extends React.Component<InternalFormItemProps, FormItemState> {
  constructor(props: InternalFormItemProps) {
    super(props);
    this.state = {
      isValidating: false,
    };
  }

  validate = (newValue: unknown) => {
    const {
      trigger = 'onChange',
      name = '',
      rules = [],
      validateTrigger: validateTriggerFromProps,
      messageVariables,
    } = this.props;
    const filterRules = rules?.filter((rule) => {
      const { validateTrigger } = rule;
      const _validateTrigger = validateTrigger || validateTriggerFromProps;
      if (!_validateTrigger) {
        return true;
      }
      const validateTriggers = toArray(_validateTrigger);
      return validateTriggers.includes(trigger);
    });
    // 开始过滤数据
    const { validateFirst = false } = this.props;
    return validateRules(name, newValue, filterRules, validateFirst, messageVariables);
  }

  /**
   * 收集数据，并且出发校验
   * @param evts
   */
  onCollect = (...evts: unknown[]) => {
    this.setState({ isValidating: true });
    const {
      getValueFromEvent, valuePropName = 'value', context, name = '', trigger = 'onChange',
    } = this.props;
    let newValue;
    if (getValueFromEvent) {
      newValue = getValueFromEvent(evts);
    } else {
      newValue = defaultGetValueFromEvent(valuePropName, ...evts);
    }
    const { onError, onCollect } = context;
    this.validate(newValue).then((errors) => {
      onError(name, { event: trigger, errors });
    })
      .catch((errors) => {
      // 更新错误信息
        onError(name, { event: trigger, errors });
      });
    onCollect(name, { event: trigger, value: newValue });
  }

  /**
   * 初始化收集错误信息
   * 初始化收集数据
   */
  componentDidMount() {
    const {
      initialValue, name, trigger, context,
    } = this.props;
    const { onCollect, onError } = context;
    if (name) {
      this.validate(initialValue).catch((errors) => {
        onError(name, { event: trigger, errors });
      });
      onCollect(name, { event: trigger, value: initialValue });
    }
  }

  /**
   * 接管formItem的isValidating属性
   * @param prevProps
   */
  componentDidUpdate(prevProps: InternalFormItemProps) {
    const { context: { isValidating } } = this.props;
    if (isValidating !== prevProps.context.isValidating && typeof isValidating === 'boolean') {
      this.setState({
        isValidating,
      });
    }
  }

  isRequiredControl = () => {
    const { required = false, rules } = this.props;
    let isRequired = required;
    if (rules) {
      // 检查rules之后是否有required为true
      const requiredRules = rules.filter((item) => item.required);
      if (requiredRules.length > 0) {
        isRequired = true;
      }
    }
    return isRequired;
  }

  render() {
    const {
      label,
      name: fieldName = '',
      children,
      valuePropName = 'value',
      trigger = 'onChange',
      initialValue,
      prefixCls: customizePrefixCls,
      getPrefixCls,
      context,
      labelAlign: lableAlignOfProps = 'right',
    } = this.props;
    const {
      name: formName, values, errors, onSubmit,
    } = context;
    const name = composeFieldName(formName, fieldName);
    const value = getValueFromKeypaths(fieldName, values);
    const error = errors[name] || [];

    // 检查是否为必填
    const isRequired = this.isRequiredControl();
    // label布局
    const labelCol = { ...context.labelCol, ...this.props.labelCol };
    const labelAlignt = lableAlignOfProps || context.labelAlign;
    // 输入组件布局
    const wrapperCol = { ...context.wrapperCol, ...this.props.wrapperCol };

    const { isValidating } = this.state;
    const prefix = getPrefixCls('form-item', customizePrefixCls);
    const rowCls = classnames(prefix);

    const labelClassName = classnames({
      [`${prefix}-label`]: true,
      [`${prefix}-label-left`]: labelAlignt === 'left',
    });
    const controlWraperClassName = classnames({
      [`${prefix}-control-wrapper`]: true,
    });

    const hasError = isValidating && error.length > 0;

    const controlInputClassName = classnames(`${prefix}-control`, {
      'has-error': hasError,
    });

    const labelCls = classnames({
      [`${prefix}-label-required`]: isRequired,
    });

    /** 处理提交按钮 */
    const cloneElement = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.props.htmlType === 'submit') {
          return React.cloneElement(child, {
            onClick: onSubmit,
          });
        }
        const extProps: { [key: string]: any } = {
          id: name,
          [valuePropName]: value,
          [trigger]: (...args) => {
            if (child.props && child.props[trigger]) {
              child.props[trigger](...args);
            }
            this.onCollect(...args);
          },
          error: true,
          defaultValue: initialValue,
          name,
        };
        console.log('extProps===>', extProps);
        return React.cloneElement(child, extProps);
      }
      return child;
    });
    // 是否单错误提示
    const simpleMode = this.props.validateFirst && typeof error[0] === 'string';
    return (
      <Row className={rowCls}>
        {
          label && (
            <Col {...labelCol} className={labelClassName}>
              <label className={labelCls} title={name} htmlFor={name}>{label}</label>
            </Col>
          )
        }
        <Col {...wrapperCol} className={controlWraperClassName}>
          <div className={controlInputClassName}>
            {cloneElement}
            <FormItemError error={hasError ? error : ''} simpleMode={simpleMode} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default withGlobalConfig(withFormContext(InternalFormItem));
