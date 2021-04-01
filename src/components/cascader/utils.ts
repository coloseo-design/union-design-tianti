/* eslint-disable no-bitwise */
/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
import { FieldNamesType } from './types/common';

/**
 * 通过key值对数组树进行过滤
 * data 数组树
 * filterFn 处理方法
 * options 用于获取子级key值
 */
export function arrayTreeFilter<T>(
  data: T[],
  filterFn: (item: T, level: number) => boolean,
  options?: { childrenKeyName?: string },
) {
  options = options || {};
  options.childrenKeyName = options.childrenKeyName || 'children';
  let children = data || [];
  const result: T[] = [];
  let level = 0;
  do {
    const foundItem: T = children.filter((item) => filterFn(item, level))[0];
    if (!foundItem) {
      break;
    }
    result.push(foundItem);
    children = (foundItem as any)[options.childrenKeyName] || [];
    level += 1;
  } while (children.length > 0);
  return result;
}

export function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
}

export function getFieldName(name: keyof FieldNamesType, fieldNames?: FieldNamesType) {
  return fieldNames ? fieldNames[name] : name;
}
