/* eslint-disable max-len */
import React from 'react';
import { Icon, Steps } from '../index';
import './styles/index';
import '../icon/styles/index';

const Demo = () => (
  <div style={{
    minHeight: '40vh', padding: 40, backgroundColor: 'rgb(250, 250, 250)',
  }}
  >
    <h1>direction=horizontal</h1>
    <div>
      <Steps isShowPop={false} size="big" onClick={(cur) => console.log(cur)} current={1} style={{ width: '100%' }}>
        <Steps.Step title="处理完成" />
        <Steps.Step title="正在处理" />
        <Steps.Step title="等待处理" />
        <Steps.Step title="等待处理" />
      </Steps>
    </div>

    <div style={{ margin: '64px auto' }}>
      <Steps isShowPop={false} onClick={(cur) => console.log(cur)} current={1}>
        <Steps.Step title="处理完成" />
        <Steps.Step title="正在处理" />
        <Steps.Step title="等待处理" />
        <Steps.Step title="等待处理" />
      </Steps>
    </div>

    <div style={{ margin: '64px auto' }}>
      <Steps current={1} size="small">
        <Steps.Step title="处理完成" />
        <Steps.Step title="正在处理" />
        <Steps.Step title="等待处理" />
        <Steps.Step title="等待处理" />
      </Steps>
    </div>

    <h1>direction=horizontal 带描述</h1>
    <div style={{ margin: '64px auto' }}>
      <Steps current={1} size="big">
        <Steps.Step title="处理完成" description="这里是描述文案，超出折行显示, 这里是描述文案，超出折行显示,这里是描述文案，超出折行显示 这里是描述文案，超出折行显示" />
        <Steps.Step title="正在处理" description="这里是描述文案，超出折行显示,这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示" />
        <Steps.Step title="等到处理" description="这里是描述文案，超出折行显示,这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示" />
      </Steps>
    </div>

    <div style={{ margin: '64px auto' }}>
      <Steps current={1}>
        <Steps.Step title="处理完成" description="这里是描述文案，超出折行显示, 这里是描述文案，超出折行显示,这里是描述文案，超出折行显示 这里是描述文案，超出折行显示" />
        <Steps.Step title="正在处理" description="这里是描述文案，超出折行显示,这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示" />
        <Steps.Step title="等到处理" description="这里是描述文案，超出折行显示,这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示" />
      </Steps>
    </div>

    <div style={{ margin: '64px auto' }}>
      <Steps size="small" current={1}>
        <Steps.Step title="处理完成" description="这里是描述文案，超出折行显示, 这里是描述文案，超出折行显示,这里是描述文案，超出折行显示 这里是描述文案，超出折行显示" />
        <Steps.Step title="正在处理" description="这里是描述文案，超出折行显示,这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示" />
        <Steps.Step title="等到处理" description="这里是描述文案，超出折行显示,这里是描述文案，超出折行显示这里是描述文案，超出折行显示这里是描述文案，超出折行显示" />
      </Steps>
    </div>

    <h1 style={{ marginTop: 32 }}>direction=horizontal 横向步骤条上下结构</h1>
    <div style={{ marginTop: 32 }}>
      <Steps labelPlacement="vertical" current={1} size="big">
        <Steps.Step title="处理完成" />
        <Steps.Step title="正在处理" />
        <Steps.Step title="等待处理" />
        <Steps.Step title="等待处理" />
      </Steps>
    </div>

    <div style={{ marginTop: 32 }}>
      <Steps labelPlacement="vertical" current={1}>
        <Steps.Step title="处理完成" />
        <Steps.Step title="正在处理" />
        <Steps.Step title="等待处理" />
        <Steps.Step title="等待处理" />
      </Steps>
    </div>

    <div style={{ marginTop: 32 }}>
      <Steps size="small" labelPlacement="vertical" current={1}>
        <Steps.Step title="处理完成" />
        <Steps.Step title="正在处理" />
        <Steps.Step title="等待处理" />
        <Steps.Step title="等待处理" />
      </Steps>
    </div>

    <h1 style={{ marginTop: 32 }}>direction=horizontal 横向带描述步骤条上下结构</h1>
    <div style={{ marginTop: 32 }}>
      <Steps labelPlacement="vertical" current={1} size="big">
        <Steps.Step title="处理完成" description="这里是描述文案" />
        <Steps.Step title="正在处理" description="这里是描述文案" />
        <Steps.Step title="等待处理" description="这里是描述文案" />
        <Steps.Step title="等待处理" description="这里是描述文案" />
      </Steps>
    </div>

    <div style={{ marginTop: 32 }}>
      <Steps labelPlacement="vertical" current={1}>
        <Steps.Step title="处理完成" description="这里是描述文案" />
        <Steps.Step title="等待处理" description="这里是描述文案" />
        <Steps.Step title="等待处理" description="这里是描述文案" />
        <Steps.Step title="等待处理" description="这里是描述文案" />
      </Steps>
    </div>

    <div style={{ marginTop: 32 }}>
      <Steps size="small" labelPlacement="vertical" current={1}>
        <Steps.Step title="处理完成" description="这里是描述文案" />
        <Steps.Step title="正在处理" description="这里是描述文案" />
        <Steps.Step title="等待处理" description="这里是描述文案" />
        <Steps.Step title="等待处理" description="这里是描述文案" />
      </Steps>
    </div>

    <h1 style={{ marginTop: 32 }}>direction=vertical 垂直步骤条</h1>
    <div style={{ display: 'flex', marginTop: 64, justifyContent: 'space-between' }}>
      <Steps size="big" direction="vertical" style={{ width: '30%' }}>
        <Steps.Step status="finish" title="处理完成" />
        <Steps.Step status="process" title="正在处理" />
        <Steps.Step status="wait" title="等待处理" />
      </Steps>
      <Steps direction="vertical" style={{ width: '30%' }}>
        <Steps.Step title="处理完成" />
        <Steps.Step title="正在处理" />
        <Steps.Step title="等待处理" />
      </Steps>

      <Steps size="small" direction="vertical" style={{ width: '30%' }}>
        <Steps.Step title="处理完成" />
        <Steps.Step title="正在处理" />
        <Steps.Step title="等待处理" />
      </Steps>
    </div>
    <h1 style={{ marginTop: 32 }}>direction=vertical 垂直步骤条带描述</h1>
    <div style={{ display: 'flex', marginTop: 64, justifyContent: 'space-between' }}>
      <Steps size="big" direction="vertical" style={{ width: '30%' }}>
        <Steps.Step status="finish" title="处理完成" description="这里是描述文案" />
        <Steps.Step status="process" title="正在处理" description="这里是描述文案" />
        <Steps.Step status="wait" title="等待处理" description="这里是描述文案" />
      </Steps>
      <Steps direction="vertical" style={{ width: '30%' }}>
        <Steps.Step title="处理完成" description="这里是描述文案" />
        <Steps.Step title="正在处理" description="这里是描述文案" />
        <Steps.Step title="等待处理" description="这里是描述文案" />
      </Steps>

      <Steps size="small" direction="vertical" style={{ width: '30%' }}>
        <Steps.Step title="处理完成" description="这里是描述文案" />
        <Steps.Step title="正在处理" description="这里是描述文案" />
        <Steps.Step title="等待处理" description="这里是描述文案" />
      </Steps>
    </div>

    <h1 style={{ marginTop: 32 }}>direction=vertical 垂直步骤条上下结构</h1>
    <div style={{ display: 'flex', marginTop: 64, justifyContent: 'space-between' }}>
      <Steps labelPlacement="vertical" size="big" direction="vertical" style={{ width: '30%' }}>
        <Steps.Step status="finish" title="处理完成" />
        <Steps.Step status="process" title="正在处理" />
        <Steps.Step status="wait" title="等待处理" />
      </Steps>
      <Steps labelPlacement="vertical" current={1} direction="vertical" style={{ width: '30%' }}>
        <Steps.Step title="处理完成" />
        <Steps.Step title="正在处理" />
        <Steps.Step title="等待处理" />
      </Steps>

      <Steps labelPlacement="vertical" current={1} size="small" direction="vertical" style={{ width: '30%' }}>
        <Steps.Step title="处理完成" />
        <Steps.Step title="正在处理" />
        <Steps.Step title="等待处理" />
      </Steps>
    </div>

    <h1>自定义icon</h1>
    <div style={{ marginTop: 64 }}>
      <Steps direction="vertical" style={{ width: '30%' }}>
        <Steps.Step title="处理完成" icon={<Icon type="home" />} />
        <Steps.Step title="正在处理" icon={<Icon type="folder" />} description="这里是描述文案，超出折行显示" />
        <Steps.Step title="等待处理" icon={<Icon type="home" />} description="这里是描述文案，超出折行显示" />
      </Steps>
    </div>
  </div>
);

export default Demo;
