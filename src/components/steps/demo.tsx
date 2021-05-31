import React from 'react';
import { Icon, Steps } from '../index';

const Demo = () => (
  <div style={{
    minHeight: '40vh', padding: 40, backgroundColor: 'rgb(250, 250, 250)',
  }}
  >
    <h1>direction=horizontal</h1>
    <Steps onClick={(cur) => console.log(cur)} current={0} size="default" direction="horizontal" style={{ width: '100%' }}>
      <Steps.Step title="正在处理" description="这里是描述文案，超出折行显示" />
      <Steps.Step title="等待处理" description="这里是描述文案，超出折行显示" />
      <Steps.Step title="等待处理" description="这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示" />
    </Steps>
    <div style={{ height: 20 }} />
    <Steps current={2} size="default" direction="horizontal" style={{ width: '100%' }}>
      <Steps.Step title="处理完成" description="这里是描述文案，超出折行显示" />
      <Steps.Step title="处理完成" description="这里是描述文案，超出折行显示" />
      <Steps.Step status="error" title="处理错误" description="这里是描述文案，超出折行显示" />
    </Steps>
    <div style={{ height: 20 }} />
    <h2>size=big</h2>
    <Steps current={1} size="big" direction="horizontal">
      <Steps.Step title="处理完成" description="这里是描述文案，超出折行显示" />
      <Steps.Step title="正在处理" description="这里是描述文案，超出折行显示" />
      <Steps.Step title="等待处理" description="这里是描述文案，超出折行显示" />
    </Steps>
    <div style={{ height: 20 }} />
    <Steps current={2} size="big" direction="horizontal" style={{ width: '100%' }}>
      <Steps.Step title="处理完成" description="这里是描述文案，超出折行显示" />
      <Steps.Step title="处理完成" description="这里是描述文案，超出折行显示" />
      <Steps.Step status="error" title="处理错误" description="这里是描述文案，超出折行显示" />
    </Steps>
    <div style={{ height: 20 }} />
    <h1>direction=vertical</h1>
    <Steps size="default" direction="vertical" style={{ width: '30%' }}>
      <Steps.Step title="处理完成" description="这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示" />
      <Steps.Step title="正在处理" description="这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示" />
      <Steps.Step title="等待处理" description="这里是描述文案，超出折行显示" />
    </Steps>
    <div style={{ height: 20 }} />
    <h2>size=big</h2>
    <Steps size="big" direction="vertical" style={{ width: '30%' }}>
      <Steps.Step status="finish" title="处理完成" description="这里是描述文案，超出折行显示" />
      <Steps.Step status="process" title="正在处理" description="这里是描述文案，超出折行显示" />
      <Steps.Step status="wait" title="等待处理" description="这里是描述文案，超出折行显示" />
    </Steps>
    <h1>自定义Icon</h1>
    <Steps size="big" direction="horizontal" style={{ width: '100%' }}>
      <Steps.Step icon={<Icon type="database" />} status="finish" title="处理完成" description="这里是描述文案，超出折行显示" />
      <Steps.Step icon={<Icon type="collection" />} status="process" title="正在处理" description="这里是描述文案，超出折行显示" />
      <Steps.Step icon={<Icon type="dislike" />} status="wait" title="等待处理" description="这里是描述文案，超出折行显示" />
    </Steps>
  </div>
);

export default Demo;
