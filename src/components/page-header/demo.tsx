import React from 'react';
import { PageHeader } from '../index';

const PageHeaderDemo: React.FC<unknown> = () => (
  <div style={{ padding: 100 }}>
    <div style={{ marginBottom: 50 }}>
      <PageHeader title="一级标题" />
    </div>
    <div style={{ marginBottom: 50 }}>
      <PageHeader title="一级标题" subTitle="二级标题" />
    </div>
  </div>
);

export default PageHeaderDemo;
