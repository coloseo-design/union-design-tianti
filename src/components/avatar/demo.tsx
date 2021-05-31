import React from 'react';
import { Avatar, Icon, Badge } from '../index';

const AvatarDemo = () => (
  <div style={{ padding: 100 }}>
    <Avatar>田姬辰</Avatar>
    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ marginLeft: 100 }} />
    <Avatar src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" style={{ marginLeft: 100 }} />
    <Avatar src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" style={{ marginLeft: 100 }} size={50} />
    <Avatar src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" style={{ marginLeft: 100 }} size={100} />
    <Avatar icon={<Icon type="user-circle" />} style={{ marginLeft: 100 }} />
    <Avatar icon={<Icon type="user-circle" />} style={{ marginLeft: 100 }} size={50} />
    <Avatar icon={<Icon type="user-circle" />} style={{ marginLeft: 100 }} size={100} />
    <div style={{ paddingTop: 100 }}>
      <Badge dot>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      </Badge>
      <Badge count={8} style={{ marginLeft: 50 }}>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      </Badge>
      <Badge count={88} overflowCount={105} style={{ marginLeft: 50 }}>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      </Badge>
      <Badge count={888} overflowCount={999} style={{ marginLeft: 50 }}>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      </Badge>
      <Badge count={1000} overflowCount={888} style={{ marginLeft: 50 }}>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      </Badge>
    </div>
    <div style={{ paddingTop: 100 }}>
      <Badge dot>
        <Avatar icon={<Icon type="user-circle" />} />
      </Badge>
      <Badge count={8} style={{ marginLeft: 50 }}>
        <Avatar icon={<Icon type="user-circle" />} />
      </Badge>
      <Badge count={88} overflowCount={105} style={{ marginLeft: 50 }}>
        <Avatar icon={<Icon type="user-circle" />} />
      </Badge>
      <Badge count={888} overflowCount={999} style={{ marginLeft: 50 }}>
        <Avatar icon={<Icon type="user-circle" />} />
      </Badge>
      <Badge count={1000} overflowCount={888} style={{ marginLeft: 50 }}>
        <Avatar icon={<Icon type="user-circle" />} />
      </Badge>
    </div>
  </div>
);

export default AvatarDemo;
