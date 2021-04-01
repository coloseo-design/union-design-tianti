import React from 'react';
import Breadcrumb from './index';

const BreadcrumbDemo = () => (
  <Breadcrumb>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>
      <span>Application Center</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="#/develop/components/list">Application List</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>An Application</Breadcrumb.Item>
  </Breadcrumb>
);

export default BreadcrumbDemo;
