import React from 'react';
import { Button, Icon } from '../index';
import Popconfirm from './index';
import './styles/index';
import '../button/styles/index';

const PopconfirmDemo: React.FC<unknown> = () => {
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);
  const onConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 2000);
  };

  return (
    <div id="pop" style={{ padding: 120, position: 'relative' }}>
      <h2>基础气泡确认框</h2>
      <Popconfirm title="基础气泡确认框文案示意文字按钮">
        <Button>基础气泡确认框</Button>
      </Popconfirm>
      <h2>带图标的气泡确认框</h2>
      <Popconfirm title="基础气泡确认框文案示意文字按钮" showIcon icon="success">
        <Button style={{ marginTop: 16 }}>成功图标气泡确认框</Button>
      </Popconfirm>
      <br />
      <Popconfirm title="基础气泡确认框文案示意文字按钮" showIcon icon="error">
        <Button style={{ marginTop: 16 }}>错误图标气泡确认框</Button>
      </Popconfirm>
      <br />
      <Popconfirm title="基础气泡确认框文案示意文字按钮" showIcon icon="help">
        <Button style={{ marginTop: 16 }}>帮助图标气泡确认框</Button>
      </Popconfirm>
      <br />
      <Popconfirm title="基础气泡确认框文案示意文字按钮" showIcon>
        <Button style={{ marginTop: 16 }}>默认图标气泡确认框</Button>
      </Popconfirm>
      <h2>带描述的图标的气泡确认框</h2>
      <Popconfirm title="基础气泡确认框文案示意文字按钮" description="一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。" showIcon icon="success">
        <Button style={{ marginTop: 16 }}>成功描述图标气泡确认框</Button>
      </Popconfirm>
      <br />
      <Popconfirm title="基础气泡确认框文案示意文字按钮" description="一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。" showIcon icon="error">
        <Button style={{ marginTop: 16 }}>错误描述图标气泡确认框</Button>
      </Popconfirm>
      <br />
      <Popconfirm title="基础气泡确认框文案示意文字按钮" description="一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。" showIcon icon="help">
        <Button style={{ marginTop: 16 }}>帮助描述图标气泡确认框</Button>
      </Popconfirm>
      <br />
      <Popconfirm title="基础气泡确认框文案示意文字按钮" description="一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。" showIcon>
        <Button style={{ marginTop: 16 }}>默认描述图标气泡确认框</Button>
      </Popconfirm>
      <h2>不同位置弹窗</h2>
      <h4>顶部</h4>
      <div style={{ marginBottom: 16 }}>
        <Popconfirm title="基础气泡确认框文案示意文字按钮">
          <Button style={{ marginRight: 24 }}>顶部</Button>
        </Popconfirm>
        <Popconfirm placement="topRight" title="基础气泡确认框文案示意文字按钮">
          <Button style={{ marginRight: 24 }}>顶部右边</Button>
        </Popconfirm>
        <Popconfirm placement="topLeft" title="基础气泡确认框文案示意文字按钮">
          <Button style={{ marginRight: 24 }}>顶部左边</Button>
        </Popconfirm>
      </div>
      <h4>底部</h4>
      <div style={{ marginBottom: 16 }}>
        <Popconfirm placement="bottom" title="基础气泡确认框文案示意文字按钮">
          <Button style={{ marginRight: 24 }}>底部</Button>
        </Popconfirm>
        <Popconfirm placement="bottomRight" title="基础气泡确认框文案示意文字按钮">
          <Button style={{ marginRight: 24 }}>底部右边</Button>
        </Popconfirm>
        <Popconfirm placement="bottomLeft" title="基础气泡确认框文案示意文字按钮">
          <Button style={{ marginRight: 24 }}>底部左边</Button>
        </Popconfirm>
      </div>
      <h4>右侧</h4>
      <div style={{ marginBottom: 16 }}>
        <Popconfirm placement="right" title="基础气泡确认框文案示意文字按钮">
          <Button style={{ marginRight: 24 }}>右侧</Button>
        </Popconfirm>
        <Popconfirm placement="rightTop" title="基础气泡确认框文案示意文字按钮">
          <Button style={{ marginRight: 24 }}>右侧上边</Button>
        </Popconfirm>
        <Popconfirm placement="rightBottom" title="基础气泡确认框文案示意文字按钮">
          <Button style={{ marginRight: 24 }}>右侧下边</Button>
        </Popconfirm>
      </div>
      <h4>左侧</h4>
      <div style={{ marginBottom: 16 }}>
        <Popconfirm placement="left" title="基础气泡确认框文案示意文字按钮">
          <Button style={{ marginRight: 24 }}>左侧</Button>
        </Popconfirm>
        <Popconfirm placement="leftTop" title="基础气泡确认框文案示意文字按钮">
          <Button style={{ marginRight: 24 }}>左侧上边</Button>
        </Popconfirm>
        <Popconfirm placement="leftBottom" title="基础气泡确认框文案示意文字按钮">
          <Button style={{ marginRight: 24 }}>左侧下边</Button>
        </Popconfirm>
      </div>
      <h2>自定义弹窗展示和按钮样式</h2>
      <Popconfirm
        title={(
          <div>
            你是否确定这是一个气泡确认框
          </div>
)}
        description="你是否确定这是一个气泡确认框？你是否确定这是一个气泡确认框？"
        placement="topLeft"
        getPopupContainer={() => document.getElementById('pop')}
        onConfirm={onConfirm}
        overlayStyle={{ maxWidth: 220 }}
        onVisibleChange={(v) => setVisible(v)}
        onCancel={() => setVisible(false)}
        okButtonProps={{ loading, size: 'small' }}
        cancelButtonProps={{ size: 'small' }}
        visible={visible}
      >
        <Button>自定义展示</Button>
      </Popconfirm>
      <h2>不展示箭头</h2>
      <Popconfirm title="基础气泡确认框文案示意文字按钮" showArrow={false}>
        <Button>不展示箭头</Button>
      </Popconfirm>
      <h2>自定义图标</h2>
      <Popconfirm title="基础气泡确认框文案示意文字按钮" showIcon icon={<Icon type="consistent-surface" />}>
        <Button>自定义图标</Button>
      </Popconfirm>
    </div>
  );
};

export default PopconfirmDemo;
