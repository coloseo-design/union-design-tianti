/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export const test = () => false;

export const updateKeyItem = (data: any) => {
  const list: any[] = [];
  (data || []).forEach((item: any) => {
    list.push({
      ...item.props,
      currentKey: item.key,
    });
  });
  return list;
};

export const flatChildren = (children: any) => {
  const list: any[] = [];
  const loopChidren = (data: any, parent: string | null) => React.Children.map(data, (child) => {
    list.push({
      ...child.props,
      currentKey: child.key,
      parentKey: parent,
      children: undefined,
      componentType: child.type.menuType,
    });
    if (child.props && child.props.children) {
      loopChidren(child.props.children, child.key);
    }
  });
  loopChidren(children, null);
  return list;
};
