import React from 'react';
import Tabs from './index';
import Icon from '../icon';

const TabsDemo = () => {
  const titles = [{ key: '1', text: '页签' }, { key: '2', text: '四字页签' }, { key: '3', text: '五个字页签' },
    {
      key: '4',
      text:
  <span>
    <Icon type="apps" />
    带icon页签
  </span>,
    }];

  return (
    <>
      <div style={{ margin: 50 }}>
        <p>type=&lsquo;line&rsquo;示例</p>
        <Tabs titles={titles} defaultKey="2" type="line" />
      </div>
      <div style={{ margin: 50 }}>
        <p>type=&lsquo;line&rsquo;示例</p>
        <Tabs titles={titles} defaultKey="2" type="card" />
      </div>
      <div style={{ margin: 50 }}>
        <p>type=&lsquo;page&rsquo;示例</p>
        <Tabs titles={titles} defaultKey="2" type="page" />
      </div>
    </>
  );
};

export default TabsDemo;
