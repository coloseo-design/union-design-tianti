import React from 'react';
import { Button } from '../index';
import Tooltip from './index';
import './styles/index';
import '../button/styles/index';

const TooltipDemo = () => (
  <div style={{ padding: 20, position: 'relative' }} id="toolTip-demo">
    <Tooltip message="展开代码" placement="bottom">
      <div style={{ width: 36, border: '1px solid red' }}>
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="形状" d="M19.8125 2C20.3252 2 20.7417 2.41138 20.75 2.922L20.75 15.7812C20.75 16.2938 20.3389 16.7103 19.8281 16.7186L19.8125 16.7188L16.7422 16.7188L16.7422 19.8125C16.7422 20.3251 16.3311 20.7416 15.8203 20.75L2.9375 20.75C2.4248 20.75 2.0083 20.3386 2 19.828L2 6.92188C2 6.4093 2.41113 5.9928 2.92188 5.9845L2.9375 5.98438L6.03125 5.98438L6.03125 2.9375C6.03125 2.42493 6.44238 2.00842 6.95312 2L19.8125 2ZM8.65625 3.875L18.1372 3.875C18.5415 3.88159 18.8682 4.20819 18.875 4.61255L18.875 14.106C18.8687 14.5105 18.542 14.8371 18.1372 14.8438L16.7422 14.8438L16.7422 6.92188L16.7422 6.90637C16.7339 6.39575 16.3174 5.98438 15.8047 5.98438L7.90625 5.98438L7.90625 4.61255C7.91309 4.2041 8.24609 3.875 8.65625 3.875ZM9.38281 9.24219C8.76758 9.24219 8.26807 9.73584 8.25781 10.3486L8.25781 10.3672L8.25781 12.2422L6.38281 12.2422C5.76758 12.2422 5.26807 12.7358 5.25781 13.3486L5.25781 13.3672C5.25781 13.9823 5.75146 14.4821 6.36426 14.4921L6.38281 14.4922L8.25781 14.4922L8.25781 16.3672C8.25781 16.9823 8.75146 17.4821 9.36426 17.4921L9.38281 17.4922C9.99805 17.4922 10.4976 16.9985 10.5078 16.3858L10.5078 16.3672L10.5078 14.4922L12.3828 14.4922C12.998 14.4922 13.4976 13.9985 13.5078 13.3858L13.5078 13.3672C13.5078 12.7521 13.0142 12.2523 12.4014 12.2423L12.3828 12.2422L10.5078 12.2422L10.5078 10.3672C10.5078 9.75208 10.0142 9.25226 9.40137 9.24231L9.38281 9.24219Z" clipRule="evenodd" fillRule="evenodd" fill="currentColor" fillOpacity="1.000000" />
          <defs />
        </svg>
      </div>
    </Tooltip>
    <div style={{ marginBottom: 20 }}>
      <Tooltip message="悬浮出现的气泡" placement="top" trigger="hover">
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
      <Tooltip message="悬浮出现的气泡" placement="top" trigger="hover">
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
