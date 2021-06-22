/* eslint-disable no-confusing-arrow */
import React, { useState } from 'react';
import { Menu, Switch } from '../index';

const Demo = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div style={{ padding: '30px 40px' }}>
      <div style={{
        marginBottom: 20, display: 'flex', flexFlow: 'row', alignItems: 'center',
      }}
      >
        theme:
        {' '}
        <Switch onChange={(s) => setTheme(s ? 'dark' : 'light')} />
      </div>

      <div style={{
        width: 180,
        height: '50vh',
        position: 'relative',
        backgroundColor: 'red',
      }}
      >
        <Menu
          theme={theme}
          style={{ height: '100%' }}
          mode="vertical"
          triggerSubMenuAction="click"
          inlineCollapsedIcon
        >
          <Menu.Item icon="image">
            工作台1
          </Menu.Item>
          <Menu.SubMenu icon="image" title="工作台3">
            <Menu.SubMenu title="工作台1">
              {Array.from({ length: 100 }, (v, k) => k).map((v, i) => i % 3 === 0 ? (
                <Menu.SubMenu title="工作台4">
                  <Menu.Item>
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
                </Menu.SubMenu>
              ) : (
                <Menu.Item key={`${i}`} icon="image">
                  工作台
                  {i}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
            {Array.from({ length: 100 }, (v, k) => k).map((v, i) => (
              <Menu.Item key={`${i + 1}`} icon="image">
                工作台
                {i}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
          <Menu.SubMenu title="工作台4">
            <Menu.Item>
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
          </Menu.SubMenu>
          <Menu.SubMenu icon="image" title="工作台5">
            <Menu.Item>
              工作台1
            </Menu.Item>
            <Menu.Item icon="image">
              工作台2
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>

      </div>

      <div style={{ height: 20 }} />

      <Menu
        style={{ height: '40vh', width: 300 }}
        onClick={console.log}
        theme={theme}
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['2', '7']}
        triggerSubMenuAction="click"
        inlineCollapsedIcon
      >
        <Menu.Item key="1" icon="image">
          工作台
        </Menu.Item>
        <Menu.SubMenu key="2" icon="image" title="表单页1">
          <Menu.Item key="3">
            表单页
          </Menu.Item>
          <Menu.SubMenu key="4" title="表单页2">
            <Menu.Item key="5" data-icon="abc" data-c="12">
              表单页2
            </Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.Item key="6">
          列表页
        </Menu.Item>
        <Menu.SubMenu key="7" title="详情页">
          <Menu.Item key="8">
            详情页
          </Menu.Item>
          <Menu.ItemGroup title="工作台3">
            <Menu.Item key="9" icon="image">
              工作台1
            </Menu.Item>
            <Menu.Item key="10" icon="image">
              工作台2
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>

      <div style={{ height: 20 }} />

      <Menu style={{ width: 300, height: '40vh' }}>
        <Menu.Item>
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

      <div style={{ height: 20 }} />

      <Menu
        mode="horizontal"
        style={{ width: '100%' }}
        onSelect={console.log}
      >
        <Menu.Item>
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
          <Menu.SubMenu icon="image" title="表单页1">
            <Menu.Item>
              表单页
            </Menu.Item>
            <Menu.SubMenu title="表单页2">
              {Array.from({ length: 100 }, (v, k) => k).map((v, i) => (
                <Menu.Item key={`${i}`} icon="image">
                  工作台
                  {i}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          </Menu.SubMenu>
          <Menu.SubMenu icon="image" title="表单页1">
            <Menu.Item>
              表单页
            </Menu.Item>
            <Menu.ItemGroup title="表单页22">
              <Menu.Item>
                表单页2
              </Menu.Item>
              <Menu.Item>
                表单页2
              </Menu.Item>
              <Menu.Item>
                表单页2
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.Item>
          工作台21
        </Menu.Item>
        <Menu.Item>
          工作台23
        </Menu.Item>
      </Menu>
      <div style={{ height: '60vh' }} />
    </div>
  );
};

export default Demo;
