import React from 'react';
import Badge from './index';

const BadgeDemo = () => (
  <div style={{ height: 600, padding: 100 }}>
    <Badge />
    <Badge dot />
    <Badge style={{ marginLeft: 50 }} />
    <Badge count={0} overflowCount={9} style={{ marginLeft: 50 }} showZero />
    <Badge count={0} overflowCount={9} style={{ marginLeft: 50 }} />
    <Badge overflowCount={9} style={{ marginLeft: 50 }} />
    <Badge count={8} overflowCount={9} style={{ marginLeft: 50 }} />
    <Badge count={88} overflowCount={99} style={{ marginLeft: 50 }} />
    <Badge count={888} overflowCount={999} style={{ marginLeft: 50 }} />
    <Badge count={999} overflowCount={888} style={{ marginLeft: 50 }} />
  </div>
);

export default BadgeDemo;
