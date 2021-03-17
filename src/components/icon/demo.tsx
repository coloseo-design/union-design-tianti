import React from 'react';
import Icon from './index';
import * as icons from 'union-icons';
import './demo.less';


function rename(name: string, separator: string = '-'): string {
  let newNameBucket = '';
  [...name].forEach((char, index) => {
    let codepoint = char.codePointAt(0);
    if (codepoint) {
      if (codepoint >= 65 && codepoint <= 90) {
        codepoint = codepoint + 32;
        if (index > 0) {
          newNameBucket += separator;
        }
      }
      newNameBucket += String.fromCodePoint(codepoint);
    }
  });
  return newNameBucket;
}

export default () => {
  return (
    <ul className="icon-container">
      {
        Object.keys(icons).map((icon: string) => {
          const name = rename(icon);
          return (
            <li>
              <div className="icon">
                <Icon type={name} style={{ fontSize: 32 }} />
              </div>
              <div className="icon-name">
                {name}
              </div>
            </li>
          )
        })
      }
    </ul>
  )
};
