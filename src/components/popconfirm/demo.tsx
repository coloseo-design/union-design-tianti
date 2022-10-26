import React from 'react';
import { Popconfirm, Button } from '../index';
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
      <div>
        <Popconfirm
          title={(
            <div>
              你是否确定这是一个气泡确认框kkk
              你是否确定这是一个气泡确认框？你是否确定这是一个气泡确认框？
            </div>
)}
          placement="topLeft"
          getPopupContainer={() => document.getElementById('pop')}
          onConfirm={onConfirm}
          overlayStyle={{ maxWidth: 200 }}
          onCancel={() => setVisible(false)}
          okButtonProps={{ loading }}
          visible={visible}
        >
          <Button onClick={() => setVisible(!visible)}>topLeft</Button>
        </Popconfirm>
        <Popconfirm
          title="你是否确定这是一个气泡确认框"
          placement="top"
          onVisibleChange={(v) => setVisible1(v)}
          getPopupContainer={() => document.getElementById('pop')}
          visible={visible1}
        >
          <Button style={{ margin: 24 }}>top</Button>
        </Popconfirm>
        <Popconfirm
          title="你是否确定这是一个气泡确认框？"
          placement="topRight"
          // defaultVisible
        >
          <Button style={{ margin: 24 }}>topRight</Button>
        </Popconfirm>
      </div>
      <div>
        <div style={{ display: 'inline-block' }}>
          <div>
            <Popconfirm
              trigger="hover"
              title="你是否确定这是一个气泡确认框？"
              placement="leftTop"
            >
              <Button style={{ margin: 24, marginLeft: 0 }}>leftTop</Button>
            </Popconfirm>
          </div>
          <div>
            <Popconfirm
              title="你是否确定这是一个气泡确认框？"
              placement="left"
            >
              <Button style={{ margin: 24, marginLeft: 0 }}>left</Button>
            </Popconfirm>
          </div>
          <div>
            <Popconfirm
              title="你是否确定这是一个气泡确认框？"
              placement="leftBottom"
            >
              <Button style={{ margin: 24, marginLeft: 0 }}>leftBottom</Button>
            </Popconfirm>
          </div>
        </div>
        <div style={{ display: 'inline-block', paddingLeft: 64 }}>
          <div>
            <Popconfirm
              title="你是否确定这是一个气泡确认框？"
              placement="rightTop"
            >
              <Button style={{ margin: 24 }}>rightTop</Button>
            </Popconfirm>
          </div>
          <div>
            <Popconfirm
              title="你是否确定这是一个气泡确认框？"
              placement="right"
            >
              <Button style={{ margin: 24 }}>right</Button>
            </Popconfirm>
          </div>
          <div>
            <Popconfirm
              title="你是否确定这是一个气泡确认框？"
              placement="rightBottom"
            >
              <Button style={{ margin: 24 }}>rightBottom</Button>
            </Popconfirm>
          </div>
        </div>
      </div>
      <div>
        <Popconfirm
          title="你是否确定这是一个气泡确认框？"
          placement="bottomLeft"
        >
          <Button>bottomLeft</Button>
        </Popconfirm>
        <Popconfirm
          title="你是否确定这是一个气泡确认框？"
          placement="bottom"
        >
          <Button style={{ margin: 24 }}>bottom</Button>
        </Popconfirm>
        <Popconfirm
          title="你是否确定这是一个气泡确认框？"
          placement="bottomRight"
        >
          <Button style={{ margin: 24 }}>bottomRight</Button>
        </Popconfirm>
      </div>
      <div style={{ marginTop: 34 }}>
        <Popconfirm
          title="你是否确定这是一个气泡确认框？"
          placement="top"
          trigger="hover"
        >
          <span>top</span>
        </Popconfirm>
      </div>
    </div>
  );
};

export default PopconfirmDemo;
