import React from 'react';
import Layout from './index';

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
      <Sider collapsible theme="light">Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  </>
);

export default LayoutDemo;
