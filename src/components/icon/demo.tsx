import React from 'react';
import * as icons from '@uni/icons';
import { Icon } from '../index';
import './styles/index';
import './demo.less';

function rename(name: string, separator = '-'): string {
  let newNameBucket = '';
  [...name].forEach((char, index) => {
    let codepoint = char.codePointAt(0);
    if (codepoint) {
      if (codepoint >= 65 && codepoint <= 90) {
        codepoint += 32;
        if (index > 0) {
          newNameBucket += separator;
        }
      }
      newNameBucket += String.fromCodePoint(codepoint);
    }
  });
  return newNameBucket;
}

const IconDemo: React.FC<unknown> = () => (
  <ul className="icon-container">
    {
      Object.keys(icons).map((icon: string) => {
        const name = rename(icon);
        return (
          <li key={icon}>
            <div className="icon">
              <Icon type={name} style={{ fontSize: 32 }} />
            </div>
            <div className="icon-name">
              {name}
            </div>
          </li>
        );
      })
    }
  </ul>
);

export default IconDemo;
