import React from 'react';
import Anchor from './index';

const { Link } = Anchor;

const AnchorDemo = () => (
  <div>
    <Anchor
      style={{
        position: 'fixed', top: 0, right: 20,
      }}
    >
      <Link href="#A" title="A demo" />
      <Link href="#B" title="B demo" />
      <Link href="#C" title="C demo" />
      <Link href="#D" title="D demo" />
      <Link href="#E" title="E demo" />
    </Anchor>

    <div id="A" style={{ height: 200, background: 'red' }}>A</div>
    <div id="B" style={{ height: 200, background: 'orange' }}>B</div>
    <div id="C" style={{ height: 200, background: 'yellow' }}>C</div>
    <div id="D" style={{ height: 200, background: 'green' }}>D</div>
    <div id="E" style={{ height: 200, background: 'blue' }}>E</div>
  </div>
);

export default AnchorDemo;
