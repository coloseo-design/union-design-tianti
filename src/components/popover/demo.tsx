import React from 'react';
import { Popover, Button } from '../index';
import './styles/index';
import '../button/styles/index';

const PopoverDemo = () => (
  <div id="popover-demo" style={{ paddingTop: 120, position: 'relative' }}>
    <Popover
      content="和哈哈哈哈1"
    >
      <Button>hover</Button>
    </Popover>
    <Popover
      title={<div>Title3</div>}
      trigger="click"
      content={<div>和哈哈哈哈3</div>}
      defaultVisible
      getPopupContainer={() => document.querySelector('#popover-demo')}
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
