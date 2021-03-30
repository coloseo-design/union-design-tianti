/* eslint-disable max-len */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Dropdown from './index';
import Button from '../button';
import Icon from '../icon';

const { Menu } = Dropdown;
const { SubMenu } = Menu;

const menu = (
  <Menu>
    <Menu.Item title="哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈" key="1" icon={<Icon type="user" />} />
    <Menu.Item title="呵呵呵" key="2" icon={<Icon type="user" />} />
    <Menu.Item title="看看看" key="3" icon={<Icon type="user" />} disabled={true} />
    <Menu.Item title="孤寡孤寡" key="4" icon={<Icon type="user" />} danger={true} />
  </Menu>
);
const menu1 = (
  <Menu>
    <SubMenu key="sub" title="sub">
      <Menu.Item title="哈哈哈哈" key="h" disabled={true} />
      <Menu.Item title="kkkkkk" key="k" />
      <SubMenu key="sub1" title="sub1">
        <Menu.Item title="sub child" key="child" />
      </SubMenu>
    </SubMenu>
    <Menu.Item title="test" key="t" />
  </Menu>
);

const test = (
  <div style={{ width: 200 }}>
    <div>哈哈哈哈哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈哈哈哈哈</div>
  </div>
);

const DropdownDemo = () => (
  <div style={{ padding: 32 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Dropdown placement="bottomLeft" overlayStyle={{ width: 220 }} overlay={menu1} arrow={true} trigger={['click']}>
          <Button>click bottomLeft</Button>
        </Dropdown>
      </div>
      <div>
        <Dropdown placement="bottomCenter" trigger={['click']} overlayStyle={{ maxWidth: 240 }} overlay={menu} arrow={true}>
          <Button>click bottomCenter</Button>
        </Dropdown>
      </div>
      <div>
        <Dropdown placement="bottomRight" overlay={menu} arrow={true}>
          <Button>hover bottomRight</Button>
        </Dropdown>
      </div>
      <div>
        <Dropdown placement="topLeft" overlay={menu}>
          <Button>hover topLeft</Button>
        </Dropdown>
      </div>
      <div>
        <Dropdown placement="topCenter" overlay={menu}>
          <Button>hover topCenter</Button>
        </Dropdown>
      </div>
      <div>
        <Dropdown placement="topRight" overlay={menu} trigger={['contextMenu']}>
          <Button>contentMenu topRight</Button>
        </Dropdown>
      </div>
    </div>

    <div style={{ marginTop: 32 }}>
      <Dropdown.Button overlay={test} type="primary" icon={<Icon style={{ fontSize: 14 }} type="zoomout" />}>
        default dropdown
      </Dropdown.Button>
    </div>
    <div style={{ marginTop: 32 }}>
      <Dropdown.Button overlay={test} size="large" icon={<Icon style={{ fontSize: 16 }} type="zoomout" />}>
        bigButton
      </Dropdown.Button>
    </div>
    <div style={{ marginTop: 32 }}>
      <Dropdown.Button overlay={test} size="small" icon={<Icon style={{ fontSize: 12 }} type="zoomout" />}>
        small Button
      </Dropdown.Button>
    </div>
    <div style={{ marginTop: 32 }}>
      <Dropdown.Button overlay={test} type="dashed">
        dashed
      </Dropdown.Button>
    </div>
    <div style={{ marginTop: 32 }}>
      <Dropdown.Button disabled={true} type="dashed" overlay={test} trigger={['click']}>
        dashed
      </Dropdown.Button>
    </div>
    <div style={{ marginTop: 32 }}>
      <Dropdown.Button type="danger" overlay={test} trigger={['click']}>
        dashed
      </Dropdown.Button>
    </div>
    <div style={{ marginTop: 32 }}>
      <Dropdown.Button type="link" overlay={test}>
        dashed
      </Dropdown.Button>
    </div>
  </div>
);

export default DropdownDemo;
