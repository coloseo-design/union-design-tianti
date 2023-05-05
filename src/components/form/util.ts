/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-async-promise-executor */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import Schema from 'async-validator';
import React from 'react';
import { warning } from '@union-design/utils';
import { ValidatorRule } from './type';

export const toArray = (input: string | string[]) => {
  if (!input) {
    return [];
  }
  return Array.isArray(input) ? input : [input];
};

export const validateRule: (name: string, value: unknown, rule: ValidatorRule, messageVariables: Record<string, string>) => Promise<string[]> = async (name, value, rule) => {
  const validator = new Schema({
    [name]: [rule] as any,
  });
  try {
    await validator.validate({ [name]: value });
  } catch ({ errors, fields }) {
    if (errors) {
      return (errors as any).map((item: { message: {} | null | undefined; }, index: any) => {
        if (React.isValidElement(item.message)) {
          return React.cloneElement(item.message, { key: `error_at_${index}` });
        }
        return item.message;
      });
    }
  }
  return [];
};

export const validateRules = (name: string, value: unknown, rules: ValidatorRule[], validateFirst: boolean, messageVariables: Record<string, string>) => {
  const filledRules = rules.map((rule) => {
    const originValidator = rule.validator;
    if (!originValidator) {
      return rule;
    }
    // reset validator
    const validator = (rule: ValidatorRule, value: unknown, callback: (error?: string) => void) => {
      let hasPromise = false;
      /**
       * 如果originValidator返回的是primise，则忽略callback，否则callback将会被调用
       * @param args
       */
      const wrappedCallback = (...args: string[]) => {
        // 获取originValidator执行返回的结果是否为一个promise
        Promise.resolve().then(() => {
          warning(
            !hasPromise,
            'Your validator function has already return a promise. `callback` will be ignored.',
          );
          // 如果validator返回结果是一个promise，callback会被忽略
          if (!hasPromise) {
            callback && callback(...args);
          }
        });
      };
      const promise = originValidator(rule, value, wrappedCallback as any);
      hasPromise = (promise && typeof promise.then === 'function' && typeof promise.catch === 'function') as boolean;
      warning(hasPromise, '`callback` is deprecated. Please return a promise instead.');
      if (hasPromise) {
        (promise as Promise<void>).then(() => {
          callback();
        }).catch((err) => {
          callback(err || ' ');
        });
      } else {
        (promise as Promise<void>).then();
      }
    };
    return {
      ...rule,
      validator,
    };
  });
  let result: Promise<string[]>;
  // 是否出现错误的时候中断
  if (validateFirst === true) {
    result = new Promise(async (resolve, reject) => {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < filledRules.length; i++) {
        const errors = await validateRule(name, value, filledRules[i] as any, messageVariables);
        if (errors.length) {
          reject(errors);
          return;
        }
      }
      /* eslint-enable */
      resolve([]);
    });
  } else {
    // eslint-disable-next-line no-async-promise-executor
    result = new Promise(async (resolve, reject) => {
      Promise.all(filledRules.map((item) => validateRule(name, value, item as any, messageVariables)))
        .then((errors) => {
          const hasError = errors.some((item) => item.length > 0);
          if (!hasError) {
            resolve([]);
          } else {
            reject(errors);
          }
        });
    });
  }
  return result;
};

/**
 * 根据keypath去数组里面取出相应的值
 * @param name keypath 数组
 * @param values 值
 */
export const getValueFromKeypaths = (name: string, values: {[key: string]: any}) => {
  try {
    const names = name.split('.');
    const [key, ...rest] = [...names].reverse();
    // eslint-disable-next-line no-shadow
    const current = rest.reduceRight((composed, key) => {
      // eslint-disable-next-line no-param-reassign
      composed = composed[key];
      return composed;
    }, values);
    return current[key];
  // eslint-disable-next-line no-empty
  } catch (e) {}
  return '';
};

/**
 * 合成字段名称
 * @param formName form组件的名称
 * @param fieldName 字段的名称
 * @returns
 */
export const composeFieldName = (formName = '', fieldName = '') => `${formName}.${fieldName}`;

export const decomposeFiledName = (fieldName: string) => {
  const arr = fieldName.split('.');
  return arr.slice(1);
};

/**
 * 从各个组件的onChange/onSelect/onCheck事件中获取选择的值
 * @param valuePropName 值的名称
 * @param evts 事件
 * @returns 获取的值
 */
export const defaultGetValueFromEvent = (valuePropName: string, ...evts: any[]) => {
  const event = evts[0];
  if (event && event.target && valuePropName in event.target) {
    return (event.target as any)[valuePropName];
  }
  return event;
};
