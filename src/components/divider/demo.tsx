import React from 'react';
import Divider from './index';
// import './styles/index';

const DividerDemo = () => (
  <div style={{ padding: 100, width: 900, border: '1px solid blue' }}>
    <div>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.`}
    </div>
    <Divider dashed />
    <p>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.`}
    </p>
    <Divider />
    <p>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.`}
    </p>
    <Divider>标题</Divider>
    <p>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.`}
    </p>
    <Divider dashed>center</Divider>
    <p>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.`}
    </p>
    <Divider orientation="left">left</Divider>
    <p>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.`}
    </p>
    <Divider orientation="right">right</Divider>

    <h2>垂直分割线不可带文字</h2>
    <div>
      哈哈哈
      <Divider direction="vertical" />
      呵呵呵
      <Divider direction="vertical" />
      嘿嘿嘿
    </div>

  </div>
);

export default DividerDemo;
