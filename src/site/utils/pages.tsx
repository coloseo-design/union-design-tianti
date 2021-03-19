/* eslint-disable */
import React from 'react';
import * as PageComponents from '../pages/index';

export interface PageProps {
  name: string;
}

function rename(name: string, sparator = '-') {
  const arr = name.split(sparator).map((item) => {
    let [first, ...reset] = item;
    const codepoint = first.codePointAt(0);
    if (codepoint && codepoint > 96 && codepoint < 123) {
      const upper = codepoint - 32;
      first = String.fromCodePoint(upper);
    }
    reset.unshift(first);
    return reset.join('');
  }).join('');
  return arr;
}

export const PagesComponent: React.FC<PageProps> = (props) => {
  const { match } = props;
  const { params: { child } } = match;
  const componentName: string = rename(child);
  const CurrentComponent = PageComponents[componentName];
  return (
    <div>
      {React.createElement(CurrentComponent)}
    </div>
  );
};

export default PagesComponent;
