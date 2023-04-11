import React from 'react';
import { NewMenu } from '..';
import './styles/index';

const { Item, SubMenu } = NewMenu;
const NewDemo = () => {
  console.log('=111');
  return (
    <div style={{ padding: 20 }}>
      <NewMenu>
        <Item key="2" title="工作台" icon="apps-line" />
        <SubMenu icon="setting-line" key="1" title="表单页">
          <Item key="4" title="hh" />
        </SubMenu>
      </NewMenu>
    </div>
  );
};

export default NewDemo;
