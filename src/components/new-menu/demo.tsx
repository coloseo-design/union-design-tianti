import React from 'react';
import { NewMenu, Icon } from '..';
import './styles/index';

const { Item, SubMenu } = NewMenu;
const NewDemo = () => {
  console.log('=111');
  return (
    <div style={{ padding: 20 }}>
      <h2>内嵌式</h2>
      <NewMenu style={{ height: 500 }}>
        <Item key="12" icon="home">工作台</Item>
        <Item key="2" title="一级项八个字符内" icon="apps-line" />
        <SubMenu icon="setting-line" key="1" title="表单页">
          <SubMenu key="4" title="二级菜单">
            <Item key="5" title="三级菜单七个字符" />
            <SubMenu key="7" title="三级菜单1">
              <Item key="8" title="四级六个字符吧" />
            </SubMenu>
          </SubMenu>
        </SubMenu>
        <SubMenu key="55" icon="delete-can" title="删除页">
          <Item key="81">第一季</Item>
        </SubMenu>
      </NewMenu>
      <h2>弹窗平铺</h2>
      <NewMenu style={{ marginTop: 40, height: 300 }} mode="tile">
        <Item key="12" icon="home">工作台</Item>
        <SubMenu key="55" icon="delete-can" title="删除页">
          <SubMenu key="234" title="二级导航">
            <SubMenu key="235" title="三级导航">
              <Item key="1234">四级导航四级导航四级导航</Item>
              <SubMenu key="2366" title="四级导航四级导航四级导航">
                <Item key="99">五级五级五级五级五级五</Item>
                <Item key="991">五级五级五级五级五级五</Item>
              </SubMenu>
            </SubMenu>
            <Item key="114">三级导航2</Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="56" icon="delete-can" title="详情页">
          <Item key="90">详情页第一季</Item>
        </SubMenu>
      </NewMenu>
    </div>
  );
};

export default NewDemo;
