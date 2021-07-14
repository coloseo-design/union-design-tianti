import React from 'react';
import { Layout, Menu } from '../index';
import './styles/index';
import '../menu/styles/index';

const {
  Header, Footer, Sider, Content,
} = Layout;

const LayoutDemo = () => {
  const layoutStyle = { color: 'white', textAlign: 'center' };
  const headerStyle = { background: '#7dbcea' };
  const contentStyle = { background: 'rgba(16, 142, 233, 1)', height: 120, lineHeight: '120px' };
  const siderStyle = { background: '#3ba0e9', lineHeight: '120px' };
  const [dataT, setData] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, []);
  return (
    <>
      <h3>基本结构</h3>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>Content</Content>
        <Footer style={headerStyle}>Footer</Footer>
      </Layout>
      <br />
      <br />
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Header</Header>
        <Layout>
          <Sider style={siderStyle}>Sider</Sider>
          <Content style={contentStyle}>Content</Content>
        </Layout>
        <Footer style={headerStyle}>Footer</Footer>
      </Layout>
      <br />
      <br />
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Header</Header>
        <Layout>
          <Content style={contentStyle}>Content</Content>
          <Sider style={siderStyle}>Sider</Sider>
        </Layout>
        <Footer style={headerStyle}>Footer</Footer>
      </Layout>
      <br />
      <br />

      <h3>侧边布局</h3>
      <Layout>
        {dataT && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(_collapsed) => { setCollapsed(_collapsed); }}
        >
          logo
          <Menu>
            <Menu.Item icon="image">
              工作台1
            </Menu.Item>
            <Menu.SubMenu icon="image" title="工作台3">
              <Menu.Item icon="image">
                工作台1
              </Menu.Item>
              <Menu.Item icon="image">
                工作台2
              </Menu.Item>
              <Menu.ItemGroup title="工作台3">
                <Menu.Item icon="image">
                  工作台1
                </Menu.Item>
                <Menu.Item icon="image">
                  工作台2
                </Menu.Item>
              </Menu.ItemGroup>
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
        </Sider>
        )}
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>Header</Header>
          <Content style={contentStyle}>Content</Content>
          <Footer style={headerStyle}>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutDemo;
