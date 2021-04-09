/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import Dropdown from './index';
import Button from '../button';
import Icon from '../icon';
import Menu from '../menu';

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
const test = (
  <div style={{ width: 130, padding: 12 }}>
    <div style={{ height: 32 }}>和哈哈哈哈</div>
    <div style={{ height: 32 }}>和哈哈哈哈</div>
  </div>
);
const DropdownDemo = () => {
  const [visible, setVisible] = React.useState(false);
  const handleButtonClick = () => {
    setVisible(!visible);
  };
  const onVisibleChange = (vis: boolean) => {
    console.log('--change', vis);
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Dropdown
            placement="bottomLeft"
            overlay={test}
            arrow={true}
            visible={visible}
            onVisibleChange={onVisibleChange}
            trigger={['click']}
            overlayStyle={{ width: 130 }}
          >
            <Button onClick={handleButtonClick}>open bottomLeft</Button>
          </Dropdown>
        </div>
        <div>
          <Dropdown placement="bottomCenter" overlayStyle={{ width: '100px' }} trigger={['click']} overlay={menu} arrow={true}>
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
            <Button>右键点击 topRight</Button>
          </Dropdown>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <Dropdown.Button
          overlay={menu}
          type="primary"
          icon={<Icon style={{ fontSize: 14 }} type="zoomout" />}
          // visible={visible}
          onClick={handleButtonClick}
          onVisibleChange={onVisibleChange}
          trigger={['click']}
        // onClick={() => setVisible1(true)}
        >
          primary dropdown
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
        <Dropdown.Button disabled={true} type="dashed" overlay={menu} trigger={['click']}>
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
