import React from 'react';
import { Popover, Button } from '../index';
import './styles/index';
import '../button/styles/index';

const arr = Array.from({ length: 20 }).map((_, index) => index);
const PopoverDemo = () => (
  <div style={{ paddingTop: 120 }} id="testPop">
    <Popover
      content="和哈哈哈哈1"
    >
      <Button>hover</Button>
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
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {arr.map((_, index) => (
        <Popover content={<div>和哈哈哈哈4</div>} key={index}>
          <div style={{
            width: 96, height: 73, border: '1px solid red', margin: '0px 16px 16px 0px',
          }}
          >
            <div style={{
              width: 50, margin: '16px', height: 40, border: '1px solid #e8e8e8',
            }}
            >
              哈哈哈哈哈
            </div>
          </div>
        </Popover>
      ))}
    </div>
  </div>
);

export default PopoverDemo;
