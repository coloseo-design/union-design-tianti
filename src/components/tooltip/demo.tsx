import React from 'react';
import { Button, Tooltip } from '../index';
import './styles/index';
import '../button/styles/index';

const TooltipDemo = () => (
  <div style={{ padding: 20 }}>
    <div style={{ marginBottom: 20 }}>
      <Tooltip message="hi billy" placement="bottom" trigger="hover">
        <span>hello, this is my little friend billy,</span>
      </Tooltip>
    </div>
    <div>
      <Tooltip message="hi billy" placement="top" trigger="click">
        <Button onClick={() => console.log('accc')}>clickMe</Button>
      </Tooltip>
    </div>
    <div>
      <Tooltip message="hi billy" placement="left" trigger="click">
        <Button>clickMe</Button>
      </Tooltip>
    </div>
    <div>
      <Tooltip message="hi billy" placement="right" trigger="click">
        <Button>clickMe</Button>
      </Tooltip>
    </div>
    <div>
      <Tooltip message="hi billy" placement="bottom" trigger="click">
        <Button>clickMe</Button>
      </Tooltip>
    </div>
  </div>
);

export default TooltipDemo;
