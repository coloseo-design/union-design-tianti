import React from 'react';
import Popover from './index';
import Button from '../button';

const PopoverDemo = () => (
  <div style={{ paddingTop: 120 }}>
    {/* <h1>气泡卡片</h1> */}
    <Popover
      content="和哈哈哈哈1"
    >
      <Button>hover</Button>
    </Popover>
    <Popover
      title={<div>Title3</div>}
      trigger="click"
      content={<div>和哈哈哈哈3</div>}
    >
      <Button style={{ margin: 24 }}>click</Button>
    </Popover>
    <Popover
      title={<div>Title4</div>}
      trigger="focus"
      content={<div>和哈哈哈哈4</div>}
      visible
    >
      <Button style={{ margin: 24 }}>Focus</Button>
    </Popover>
  </div>
  // <Popover />
);

export default PopoverDemo;
