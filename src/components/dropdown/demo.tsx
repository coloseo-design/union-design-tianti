/* eslint-disable max-len */
import React from 'react';
import {
  Dropdown, Button, Icon, Menu,
} from '../index';
import './styles/index';

const menu = (
  <Menu>
    <Menu.Item icon={<Icon type="user" />}>
      工作台1
    </Menu.Item>
    <Menu.SubMenu title="工作台2">
      <Menu.Item>
        工作台1
      </Menu.Item>
      <Menu.Item>
        工作台2
      </Menu.Item>
    </Menu.SubMenu>
    <Menu.SubMenu title="工作台3">
      <Menu.Item>
        工作台1
      </Menu.Item>
      <Menu.Item>
        工作台2
      </Menu.Item>
      <Menu.SubMenu key="2" icon="image" title="表单页1">
        <Menu.Item key="3">
          表单页
        </Menu.Item>
        <Menu.SubMenu key="4" title="表单页2">
          <Menu.Item key="5">
            表单页2
          </Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
    </Menu.SubMenu>
  </Menu>
);

const DropdownDemo = () => {
  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);
  const test = (
    <div style={{
      width: 160, padding: 12, display: 'flex', justifyContent: 'space-between',
    }}
    >
      <Button>重置</Button>
      <Button type="primary" onClick={() => setVisible(false)}>关闭</Button>
    </div>
  );
  const test1 = (
    <div style={{
      width: 160, padding: 12, display: 'flex', justifyContent: 'space-between',
    }}
    >
      <Button>重置</Button>
      <Button type="primary" onClick={() => setVisible1(false)}>关闭</Button>
    </div>
  );

  return (
    <div style={{ padding: 32 }}>
      <div id="drop-demo" style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Dropdown
            placement="bottomLeft"
            overlay={test}
            arrow
            visible={visible}
            onVisibleChange={(v) => setVisible(v)}
            trigger={['click']}
            overlayStyle={{ width: 160 }}
            getPopupContainer={() => document.querySelector('#drop-demo')}
          >
            <Button>open bottomLeft</Button>
          </Dropdown>
        </div>
        <div>
          <Dropdown
            placement="bottomCenter"
            overlayStyle={{ width: '200px' }}
            trigger={['click']}
            overlay={menu}
            arrow
            getPopupContainer={() => document.querySelector('#drop-demo')}
          >
            <Button>click bottomCenter</Button>
          </Dropdown>
        </div>
        <div>
          <Dropdown placement="bottomRight" overlay={menu} arrow>
            <Button>hover bottomRight</Button>
          </Dropdown>
        </div>
        <div>
          <Dropdown placement="topLeft" overlay={menu}>
            <Button>hover topLeft</Button>
          </Dropdown>
        </div>
        <div>
          <Dropdown placement="topRight" overlay={menu} trigger={['contextMenu']}>
            <Button>右键点击 topRight</Button>
          </Dropdown>
        </div>
      </div>
      <div>
        <Dropdown placement="topCenter" overlay={menu}>
          <div style={{
            width: 250, height: 250, margin: 32, border: '1px solid red', padding: 24,
          }}
          >
            <div style={{
              width: 170, height: 150, border: '1px solid black', padding: 24,
            }}
            >
              <Button>hover topCenter</Button>
            </div>
          </div>
        </Dropdown>
      </div>
      <div style={{ marginTop: 32 }}>
        <Dropdown.Button
          overlay={test1}
          type="primary"
          icon={<Icon style={{ fontSize: 14 }} type="zoomout" />}
          trigger={['click']}
          visible={visible1}
          onVisibleChange={(v) => setVisible1(v)}
          getPopupContainer={() => document.querySelector('#drop-demo')}
        >
          <div>primary dropdown</div>
        </Dropdown.Button>
      </div>
      <div style={{ marginTop: 32 }}>
        <Dropdown.Button overlay={menu} size="large" icon={<Icon style={{ fontSize: 16 }} type="zoomout" />}>
          bigButton
        </Dropdown.Button>
      </div>
      <div style={{ marginTop: 32 }}>
        <Dropdown.Button overlay={menu} size="small" icon={<Icon style={{ fontSize: 12 }} type="zoomout" />}>
          small Button
        </Dropdown.Button>
      </div>
      <div style={{ marginTop: 32 }}>
        <Dropdown.Button overlay={menu} type="dashed">
          dashed
        </Dropdown.Button>
      </div>
      <div style={{ marginTop: 32 }}>
        <Dropdown.Button disabled type="dashed" overlay={menu} trigger={['click']}>
          dashed
        </Dropdown.Button>
      </div>
      <div style={{ marginTop: 32 }}>
        <Dropdown.Button type="danger" overlay={menu} trigger={['click']}>
          dashed
        </Dropdown.Button>
      </div>
      <div style={{ marginTop: 32 }}>
        <Dropdown.Button type="link" overlay={menu}>
          dashed
        </Dropdown.Button>
      </div>
    </div>
  );
};

export default DropdownDemo;
