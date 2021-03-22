import React from 'react';
import Result from './index';
import Icon from '../icon';
import Button from '../button';

const ResultDemo: React.FC<unknown> = () => (
  <div style={{ padding: 100 }}>
    <Result
      status="success"
      title="项目创建成功"
      subTitle="这是一句创建成功的描述这是一句创建成功的描述"
      extra={[
        <Button type="primary" key="1">创建应用</Button>,
        <Button key="2">返回列表</Button>,
      ]}
    />
    <Result
      status="error"
      title="项目创建失败"
      subTitle="这是一句创建成功的描述这是一句创建成功的描述"
      extra={[
        <Button type="primary" key="1">创建应用</Button>,
        <Button key="2">返回列表</Button>,
      ]}
    />
    <Result
      status="applicationSuccess"
      title="应用创建成功"
      subTitle="这是一句创建成功的描述这是一句创建成功的描述"
      extra={[
        <Button type="primary" key="1">创建应用</Button>,
        <Button key="2">返回列表</Button>,
      ]}
    />
    <Result
      status="applicationError"
      title="应用创建失败"
      subTitle="这是一句创建成功的描述这是一句创建成功的描述"
      extra={[
        <Button type="primary" key="1">创建应用</Button>,
        <Button key="2">返回列表</Button>,
      ]}
    />
    <Result
      icon={<Icon type="user-circle" style={{ fontSize: 72, color: 'red', textAlign: 'center' }} />}
      title="自定义icon"
      subTitle="这是一句创建成功的描述这是一句创建成功的描述"
      extra={[
        <Button type="primary" key="1">创建应用</Button>,
        <Button key="2">返回列表</Button>,
      ]}
    />
  </div>
);

export default ResultDemo;
