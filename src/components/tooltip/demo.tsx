import React from 'react';
import { Button } from '../index';
import Tooltip from './index';
// import './styles/index';
// import '../button/styles/index';

const TooltipDemo = () => (
  <div style={{ padding: 20, position: 'relative' }} id="toolTip-demo">
    <div style={{ marginBottom: 20 }}>
      <Tooltip message="悬浮出现的气泡" zIndex={1200} placement="top" trigger="hover">
        <span>带箭头文字提示</span>
      </Tooltip>
    </div>
    <div style={{ marginBottom: 20 }}>
      <Tooltip showArrow={false} message="悬浮出现的气泡" placement="top" trigger="hover">
        <span>不带箭头文字提示</span>
      </Tooltip>
    </div>
    <h2>顶部出现</h2>
    <div style={{ marginBottom: 20 }}>
      <Tooltip message="悬浮出现的气泡" placement="top">
        <Button>顶部出现</Button>
      </Tooltip>
      <Tooltip message="悬浮出现的气泡" placement="topLeft" trigger="hover">
        <Button style={{ margin: '0px 64px' }}>顶部箭头在左出现</Button>
      </Tooltip>
      <Tooltip message="悬浮出现的气泡" placement="topRight" trigger="hover">
        <Button>顶部箭头在右出现</Button>
      </Tooltip>
    </div>

    <h2>底部出现</h2>
    <div style={{ marginBottom: 20 }}>
      <Tooltip message="悬浮出现的气泡" placement="bottom" trigger="hover">
        <Button>底部出现</Button>
      </Tooltip>
      <Tooltip message="悬浮出现的气泡" placement="bottomLeft" trigger="hover">
        <Button style={{ margin: '0px 64px' }}>底部箭头在左出现</Button>
      </Tooltip>
      <Tooltip message="悬浮出现的气泡" placement="bottomRight" trigger="hover">
        <Button>底部箭头在右出现</Button>
      </Tooltip>
    </div>
    <h2>左侧出现</h2>
    <div style={{ marginBottom: 20 }}>
      <Tooltip message="悬浮出现的气泡" placement="left" trigger="hover">
        <Button>左侧出现</Button>
      </Tooltip>
    </div>
    <h2>右侧出现</h2>
    <div style={{ marginBottom: 20 }}>
      <Tooltip message="悬浮出现的气泡" placement="right" trigger="hover">
        <Button>右侧出现</Button>
      </Tooltip>
    </div>
    <h2 style={{ marginBottom: 32 }}>主题组件</h2>
    <div style={{ marginBottom: 20 }}>
      <Tooltip message="悬浮出现的气泡" placement="bottom" trigger="hover" type="danger">
        <Button>危险主题</Button>
      </Tooltip>
    </div>
    <div style={{ marginBottom: 20 }}>
      <Tooltip message="悬浮出现的气泡" placement="bottom" trigger="hover" type="warning">
        <Button>警告主题</Button>
      </Tooltip>
    </div>
    <div style={{ marginBottom: 20 }}>
      <Tooltip message="悬浮出现的气泡" placement="bottom" trigger="hover" type="success">
        <Button>成功主题</Button>
      </Tooltip>
    </div>
    <div style={{ marginBottom: 20 }}>
      <Tooltip message="悬浮出现的气泡" placement="bottom" trigger="hover" type="info">
        <Button>帮助主题</Button>
      </Tooltip>
    </div>
  </div>
);

export default TooltipDemo;
