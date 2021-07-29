/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TreeDataType } from './type';

export const uniqAry = (array: any[]) => { // 去重
  let result: any[] = [];
  array.forEach((item: any) => {
    const isSome = result.some((s) => s.key === item.key && s.currentKey === item.currentKey);
    result = isSome ? [...result] : [...result, item];
  });
  return result;
};

export const flattenTree = (root: TreeDataType[]): TreeDataType[] => { // 展开treeData
  const res: TreeDataType[] = [];
  const loopData = (
    data:TreeDataType[],
    parent: any,
    parentKey: TreeDataType | null,
    level: number,
  ) => (data || []).forEach((item: any) => {
    const tempItem = {
      ...item,
      parentKey,
      level,
      parent,
    };
    res.push(tempItem);
    if (item.children && item.children.length) {
      loopData(item.children, tempItem, item.key, level + 1);
    }
  });
  loopData(root, null, null, 1);
  return res;
};

export const flatChildrenTree = (children: any) => { // 展开children
  const list: any[] = [];
  const loop = (
    data: any,
    parent: any,
    parentKey: string | null,
    level: number,
  ) => React.Children.map(data, (child) => {
    const i = {
      ...child?.props,
      level,
      parentKey,
      currentKey: child?.key,
      children: undefined,
      parent,
    };
    list.push(i);
    if (child.props && child.props.children) {
      loop(child.props.children, i, child?.key, level + 1);
    }
  });
  loop(children, null, null, 1);
  return list;
};

export const checkedFun = (
  current: any,
  checked: boolean,
  smooth: any,
  values: any,
) => { // 选择父级勾选子级， 子级选满勾选父级
  const temp = (smooth || []).filter((i: any) => values.indexOf(i.key || i.currentKey) >= 0);
  let lastList = [];
  const parentChild: any[] = [];
  const parentList: any[] = [];
  const currentSelected = [current.key || current.currentKey].concat(values);
  const loopParent = (data: any) => {
    data.forEach((item: any) => {
      if (item.children && item.children.length > 0) {
        const c = item.children.filter((i: any) => currentSelected.indexOf(i.key || i.currentKey) >= 0);
        if (c.length === (item.children || []).filter((i: any) => !i.disableCheckbox && !i.disabled).length
            && !item.disableCheckbox && !item.disabled
        ) {
          parentList.push(item);
          currentSelected.push(item.key);
        }
      }
      if (item.parent) {
        loopParent([item.parent]);
      }
    });
  };
  current.parent && loopParent([current.parent]);

  const loop = (data: any) => data.forEach((item: any) => {
    if (!item.disabled && !item.disableCheckbox) {
      parentChild.push(item);
    }
    if (item.children && item.children.length) {
      loop(item.children);
    }
  });
  loop([current]);
  if (checked) {
    lastList = temp.concat(parentChild).concat(parentList);
  } else {
    lastList = temp.filter((i:any) => parentChild.map((j) => (j.key || j.currentKey)).indexOf((i.key || i.currentKey)) === -1
      && parentList.map((m) => (m.key || m.currentKey)).indexOf((i.key || i.currentKey)) === -1);
  }
  return uniqAry(lastList);
};

const findParent = (AllData: any[], init: string[]) => {
  const parent: string[] = [];
  const parentInit: string[] = init;
  const loopParent = (data: any) => {
    data.forEach((item: any) => {
      const EffectiveChildren = (item.children || []).filter((i: any) => !i.disabled && !i.disableCheckbox);
      const includeChild = EffectiveChildren.filter((i: any) => init.indexOf(i.key) >= 0);
      if (EffectiveChildren.length > 0 && includeChild.length > 0
          && includeChild.length === EffectiveChildren.length && !item.disabled && !item.disableCheckbox) {
        parent.push(item);
        parentInit.push(item.key);
      }
      if (item.parent) {
        loopParent([item.parent]);
      }
    });
  };
  loopParent(AllData);
  return parent;
};

const findChildren = (AllData: any[]) => {
  const children: any[] = [];
  const loop = (data: any[]) => data.forEach((item) => {
    children.push(item);
    if (item.children && item.children.length) {
      loop(item.children);
    }
  });
  loop(AllData);
  return children;
};

export const initKeys = (init: string[], allData: any[]) => { // 默认选择的keys如果子级默认把子级也选上
  const initAllInfo = allData.filter((i: any) => init.indexOf(i.key || i.currentKey) >= 0);
  const p = findParent(initAllInfo, init);
  const c = findChildren(initAllInfo);
  return uniqAry([...p, ...c]);
};

export const translateDataToTree = (data: any) => {
  const parents = data.filter((value:any) => !value.parentKey);
  const childrens = data.filter((value: any) => value.parentKey);
  const translator = (parentsT: any[], childrensT: any[]) => {
    parentsT.forEach((parent: any) => {
      childrensT.forEach((current: any, index: number) => {
        if (current.parentKey === parent.currentKey) {
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
