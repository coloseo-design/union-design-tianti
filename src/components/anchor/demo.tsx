import React from 'react';
import { Anchor } from '../index';

const AnchorDemo = () => (
  <div>
    <Anchor
      options={[{ id: 'a', name: 'a-demoa-demoa-demoa-demoa-demoa-demoa-demo' }, { id: 'b', name: 'b-demo' }, { id: 'c', name: 'c-demo' }, { id: 'd', name: 'd-demo' }, { id: 'e', name: 'e-demo' }]}
    />

    <div id="a" style={{ height: 200, background: 'red' }}>A</div>
    <div id="b" style={{ height: 200, background: 'orange' }}>B</div>
    <div id="c" style={{ height: 200, background: 'yellow' }}>C</div>
    <div id="d" style={{ height: 200, background: 'green' }}>D</div>
    <div id="e" style={{ height: 200, background: 'blue' }}>E</div>
  </div>
);

export default AnchorDemo;
