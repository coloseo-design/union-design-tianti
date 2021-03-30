import React from 'react';
import Layout from './index';
import Menu from '../menu';

const {
  Header, Footer, Sider, Content,
} = Layout;

const LayoutDemo = () => (
  <>
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
    <br />
    <br />
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
    <br />
    <br />
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Content>Content</Content>
        <Sider>Sider</Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
    <br />
    <br />
    <Layout>
      <Sider collapsible theme="light">
        logo
        <Menu theme="light" mode="vertical">
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
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  </>
);

export default LayoutDemo;
