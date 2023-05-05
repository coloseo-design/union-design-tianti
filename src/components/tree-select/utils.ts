/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React from 'react';
import { TreeSelectData } from './type';

export const uniqAry = (array: any[]) => {
  let result: any[] = [];
  array.forEach((item: any) => {
    const isSome = result.some((s) => s.value === item.value);
    result = isSome ? [...result] : [...result, item];
  });
  return result;
};

export const flattenTree = (root: TreeSelectData[]): TreeSelectData[] => {
  const res: TreeSelectData[] = [];
  const loopData = (
    data:TreeSelectData[],
    parent: TreeSelectData | null, level: number,
  ) => (data || []).forEach((item: any) => {
    const tempItem = { ...item, parent, level };
    res.push(tempItem);
    if (item.children && item.children.length) {
      loopData(item.children, tempItem, level + 1);
    }
  });
  loopData(root, null, 1);
  return res;
};

export const flatChildrenTree = (children: any) => {
  const list: any[] = [];
  const loop = (data: any, parent: any, level: number) => React.Children.map(data, (child) => {
    const i = {
      ...child?.props,
      parent,
      level,
      children: undefined,
      parentValue: parent ? parent.value : null,
      currentValue: child?.props.value,
    };
    list.push(i);
    if (child.props && child.props.children) {
      loop(child.props.children, i, level + 1);
    }
  });
  loop(children, null, 1);
  return list;
};

export const checkedFun = (
  current: any, // 当前选择的数据
  checked: boolean, // 取消选择还是选中
  smooth: any, // 所有的展开的数据
  values: any, // 选择框回填的数据（输入框的数据）
  checkedKeys: string[], // 选择的数据
  backFill: string | undefined, // 回填的形式
) => { // 选择父级勾选子级， 子级选满勾选父级 showCheckedStrategy: SHOW_CHILD
  const temp: any[] = smooth.filter((i: any) => values.indexOf(i.value) >= 0);
  const temChecked: any[] = smooth.filter((i: any) => checkedKeys.indexOf(i.value) >= 0);
  let lastList: any[] = [...temChecked];
  let backFillValues: any[] = [...temp];
  const parentChild: any[] = [];
  const parentList: any[] = [];
  const currentSelected = [current.value].concat(checkedKeys);
  const loopParent = (data: any) => {
    data.forEach((item: any) => {
      if (item.children && item.children.length > 0) {
        const c = item.children.filter((i: any) => currentSelected.indexOf(i.value) >= 0);
        if (c.length === (item.children || []).filter((i: any) => !i.disabled).length && !item.disabled) {
          parentList.push(item);
          currentSelected.push(item.value);
        }
      }
      if (item.parent) {
        loopParent([item.parent]);
      }
    });
  };
  current.parent && loopParent([current.parent]);

  const loop = (data: any) => data.forEach((item: any) => {
    if (!item.disabled) {
      parentChild.push(item);
    }
    if (item.children && item.children.length) {
      loop(item.children);
    }
  });
  loop([current]);
  if (checked) {
    lastList = temChecked.concat(parentChild).concat(parentList);
    if (backFill === 'SHOW_ALL') {
      backFillValues = temp.concat(parentChild).concat(parentList);
    }
    if (backFill === 'SHOW_PARENT') {
      if (parentList.length > 0) {
        const parentValue = parentList.map((i) => i.value);
        // 去掉child
        const deleteValue = temp.filter((i: any) => parentValue.indexOf(i.parent && i.parent.value) >= 0).map((i: any) => i.value);
        backFillValues = temp.concat(parentList).filter((i: any) => deleteValue.indexOf(i.value) === -1);
      } else if (current.children && current.children.length > 0) {
        const parentValue = [current.value];
        // 去掉child
        const deleteValue = temp.filter((i: any) => parentValue.indexOf(i.parent && i.parent.value) >= 0).map((i: any) => i.value);
        backFillValues = temp.concat([current]).filter((i: any) => deleteValue.indexOf(i.value) === -1);
      } else {
        backFillValues = temp.concat(parentChild);
      }
    }
    if (backFill === 'SHOW_CHILD') {
      const deletePrent: any[] = (parentChild || []).filter((i) => !i.children || (i.children && i.children.length === 0)); // 去掉parent
      backFillValues = temp.concat(deletePrent);
    }
  } else {
    lastList = temChecked.filter((i:any) => parentChild.map((j) => j.value).indexOf(i.value) === -1
      && parentList.map((m) => m.value).indexOf(i.value) === -1);
    if (backFill === 'SHOW_PARENT') {
      backFillValues = temChecked.filter((i:any) => parentChild.map((j) => j.value).indexOf(i.value) === -1
        && parentList.map((m) => m.value).indexOf(i.value) === -1);
    } else {
      backFillValues = (backFillValues || []).filter((i: any) => current.value !== i.value && lastList.map((j: any) => j.value).indexOf(i.value) >= 0);
    }
  }
  return {
    checkedList: uniqAry(lastList),
    backFillList: uniqAry(backFillValues),
  };
};

export const initValues = (init: string[] | string, allData: any[], backFill: string) => { // 初始值value
  let values: string[] = [];
  let checkedValues: string[] = [];
  const initAllInfo = allData.filter((i: any) => init.indexOf(i.value) >= 0);
  if (backFill === 'SHOW_CHILD') {
    const { parentC } = findParent(initAllInfo, typeof init === 'string' ? [] : init);
    const { childC, childV } = findChild(initAllInfo);
    values = values.concat(childV);
    checkedValues = checkedValues.concat(parentC).concat(childC);
  } else if (backFill === 'SHOW_PARENT') {
    const { parentC, parentV } = findParent(initAllInfo, typeof init === 'string' ? [] : init);
    const { childC, childV } = findChild(initAllInfo);

    if (parentV.length > 0) {
      const pValue = parentV.map((i: any) => i.value);
      const child = childV.filter((i: any) => pValue.indexOf(i.parent && i.parent.value) === -1);
      parentV.forEach((i: any, index) => {
        if (parentV.filter((item: any) => i.parent && item.value === i.parent.value).length > 0) {
          parentV.splice(index, 1);
        }
      });
      values = values.concat(parentV).concat(child);
    } else {
      values = values.concat(childV);
    }
    checkedValues = checkedValues.concat(parentC).concat(childC);
  } else {
    const { parentC, parentV } = findParent(initAllInfo, typeof init === 'string' ? [] : init);
    const { childC, childV } = findChild(initAllInfo);
    values = values.concat(childV).concat(parentV);
    checkedValues = checkedValues.concat(parentC).concat(childC);
  }

  return {
    values: uniqAry(values),
    checkedValues: uniqAry(checkedValues),
  };
};

const findParent = (AllData: any[], init: string[]) => {
  const cl: any[] = [];
  const vl: any[] = [];
  const parentInit: string[] = init;
  const loopParent = (data: any) => {
    data.forEach((item: any) => {
      const EffectiveChildren = (item.children || []).filter((i: any) => !i.disabled);
      const includeChild = EffectiveChildren.filter((i: any) => init.indexOf(i.value) >= 0);
      if (EffectiveChildren.length > 0 && includeChild.length > 0
          && includeChild.length === EffectiveChildren.length && !item.disabled) {
        vl.push(item);
        cl.push(item);
        parentInit.push(item.value);
      }
      if (!item.disabled) {
        if (!item.children || (item.children && item.children.length === 0)) {
          cl.push(item);
        }
      }
      if (item.parent) {
        loopParent([item.parent]);
      }
    });
  };
  loopParent(AllData);
  return {
    parentC: cl,
    parentV: vl,
  };
};

const findChild = (AllData: any[]) => {
  const cl: any[] = [];
  const vl: any[] = [];
  const loopChild = (data: any[]) => data.forEach((item) => {
    if (!item.disabled) {
      cl.push(item);
      if (!item.children || (item.children && item.children.length === 0)) {
        vl.push(item);
      }
    }
    if (item.children && item.children.length) {
      loopChild(item.children);
    }
  });
  loopChild(AllData);
  return {
    childC: cl,
    childV: vl,
  };
};

export const translateDataToTree = (data: any) => {
  const parents: any[] = data.filter((value: any) => !value.parentValue);
  const childrens: any[] = data.filter((value: any) => value.parentValue);
  const translator = (parentsT: any[], childrensT: any[]) => {
    parentsT.forEach((parent: any) => {
      childrensT.forEach((current: any, index: number) => {
        if (current.parentValue === parent.value) {
          const temp = [...childrensT];
          temp.splice(index, 1);
          translator([current], temp);
          // eslint-disable-next-line no-param-reassign
          parent.children ? parent.children.push(current) : parent.children = [current];
        }
      });
    });
  };

  translator(parents, childrens);
  return parents;
};

export const commonInit = (
  value: string | string[] | undefined,
  defaultValue: string | string[] | undefined,
  multiple: boolean,
  treeCheckable: boolean,
  showCheckedStrategy: string,
  sm: any[],
) => {
  let valuesList: any[] = [];
  let selectList: any[] = [];
  if (multiple || treeCheckable) {
    if ((value && Object.prototype.toString.call(value) !== '[object Array]')
        || (defaultValue && Object.prototype.toString.call(defaultValue) !== '[object Array]')) {
      throw new Error('多选模式value和defaultValue 类型应是 Array');
    } else {
      const mergeValue = [...(value || []), ...(defaultValue || [])];
      if (treeCheckable) {
        const { values, checkedValues } = initValues(mergeValue, sm, showCheckedStrategy);
        valuesList = values.map((i: any) => i.value);
        selectList = checkedValues.map((i: any) => i.value);
      } else {
        valuesList = mergeValue;
        selectList = mergeValue;
      }
    }
  } else if ((value && typeof value !== 'string') || (defaultValue && typeof defaultValue !== 'string')) {
    throw new Error('单选选模式value和defaultValue 类型应是 String');
  } else {
    const mergeValue = [...(value || []), ...(defaultValue || [])];
    valuesList = mergeValue;
    selectList = mergeValue;
  }
  return {
    valuesList,
    selectList,
  };
};
