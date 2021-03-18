import React from 'react';
import PopConfirm from './index';
import Button from '../button';

const PopconfirmDemo: React.FC<unknown> = () => {
  const handleVisibleChange = (visible: boolean) => {
    console.log('-visible-', visible);
  };
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const onConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 2000);
  };

  const handleClick = () => {
    setVisible(true);
  };
  return (
    <div id="pop" style={{ padding: 120 }}>
      <div>
        <PopConfirm
          title={<div>异步关闭气泡确认框？</div>}
          placement="topLeft"
          getPopupContainer={() => document.getElementById('pop') || document.body}
          okButtonProps={{ loading }}
          onConfirm={onConfirm}
          visible={visible}
        >
          <Button onClick={handleClick}>topLeft</Button>
        </PopConfirm>
        <PopConfirm
          title="你是否确定这是一个气泡确认框？"
          placement="top"
          onVisibleChange={handleVisibleChange}
        >
          <Button style={{ margin: 24 }}>top</Button>
        </PopConfirm>
        <PopConfirm
          title="你是否确定这是一个气泡确认框？"
          placement="topRight"
        >
          <Button style={{ margin: 24 }}>topRight</Button>
        </PopConfirm>
      </div>
      <div>
        <div style={{ display: 'inline-block' }}>
          <div>
            <PopConfirm
              title="你是否确定这是一个气泡确认框？"
              placement="leftTop"
            >
              <Button style={{ margin: 24, marginLeft: 0 }}>leftTop</Button>
            </PopConfirm>
          </div>
          <div>
            <PopConfirm
              title="你是否确定这是一个气泡确认框？"
              placement="left"
            >
              <Button style={{ margin: 24, marginLeft: 0 }}>left</Button>
            </PopConfirm>
          </div>
          <div>
            <PopConfirm
              title="你是否确定这是一个气泡确认框？"
              placement="leftBottom"
            >
              <Button style={{ margin: 24, marginLeft: 0 }}>leftBottom</Button>
            </PopConfirm>
          </div>
        </div>
        <div style={{ display: 'inline-block', paddingLeft: 64 }}>
          <div>
            <PopConfirm
              title="你是否确定这是一个气泡确认框？"
              placement="rightTop"
            >
              <Button style={{ margin: 24 }}>rightTop</Button>
            </PopConfirm>
          </div>
          <div>
            <PopConfirm
              title="你是否确定这是一个气泡确认框？"
              placement="right"
            >
              <Button style={{ margin: 24 }}>right</Button>
            </PopConfirm>
          </div>
          <div>
            <PopConfirm
              title="你是否确定这是一个气泡确认框？"
              placement="rightBottom"
            >
              <Button style={{ margin: 24 }}>rightBottom</Button>
            </PopConfirm>
          </div>
        </div>
      </div>
      <div>
        <PopConfirm
          title="你是否确定这是一个气泡确认框？"
          placement="bottomLeft"
        >
          <Button>bottomLeft</Button>
        </PopConfirm>
        <PopConfirm
          title="你是否确定这是一个气泡确认框？"
          placement="bottom"
        >
          <Button style={{ margin: 24 }}>bottom</Button>
        </PopConfirm>
        <PopConfirm
          title="你是否确定这是一个气泡确认框？"
          placement="bottomRight"
        >
          <Button style={{ margin: 24 }}>bottomRight</Button>
        </PopConfirm>
      </div>
      <div style={{ marginTop: 34 }}>
        <PopConfirm
          title="你是否确定这是一个气泡确认框？"
          placement="top"
        >
          <span>top</span>
        </PopConfirm>
      </div>
    </div>
  );
};

export default PopconfirmDemo;
