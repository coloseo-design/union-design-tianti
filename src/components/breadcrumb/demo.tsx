import React from 'react';
import { Breadcrumb } from '../index';
import './styles/index';

const BreadcrumbDemo = () => (
  <div>
    <Breadcrumb>
      <Breadcrumb.Item>一级页面</Breadcrumb.Item>
      <Breadcrumb.Item>
        <span>二级页面</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        三级页面
      </Breadcrumb.Item>
      <Breadcrumb.Item>当前页</Breadcrumb.Item>
    </Breadcrumb>

    <br />

    <Breadcrumb separator="bias">
      <Breadcrumb.Item>一级页面</Breadcrumb.Item>
      <Breadcrumb.Item>
        <span>二级页面</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        三级页面
      </Breadcrumb.Item>
      <Breadcrumb.Item>当前页</Breadcrumb.Item>
    </Breadcrumb>
  </div>
);

export default BreadcrumbDemo;
