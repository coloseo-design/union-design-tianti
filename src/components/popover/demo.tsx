import React from 'react';
import { Popover, Button } from '../index';
import './styles/index';
import '../button/styles/index';

const PopoverDemo = () => (
  <div style={{ paddingTop: 120, display: 'flex' }} id="testPop">
    <Popover
      content="和哈哈哈哈1"
    >
      <div style={{
        width: 250, height: 250, border: '1px solid red', padding: 24,
      }}
      >
        <div style={{
          width: 170, height: 150, border: '1px solid black', padding: 24,
        }}
        >
          <Button>hover</Button>
        </div>
      </div>
    </Popover>
    <Popover
      title={<div>Title3</div>}
      trigger="click"
      placement="right"
      defaultVisible
      content={<div>和哈哈哈哈3</div>}
    >
      <Button style={{ margin: 24 }}>click</Button>
    </Popover>
    <Popover
      title={<div>Title4</div>}
      trigger="focus"
      content={<div>和哈哈哈哈4</div>}
    >
      <Button style={{ margin: 24 }}>Focus</Button>
    </Popover>
  </div>
);

export default PopoverDemo;
