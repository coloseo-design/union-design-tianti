import React, { useState } from 'react';
import { Button, Skeleton } from '../index';
import './styles/index';
import '../button/styles/index';

const SkeletonDemo = () => {
  const [show, setShow] = useState(false);
  return (

    <div style={{ marginTop: 20, padding: 20 }}>
      <Skeleton />
      <Skeleton avatar={{ shape: 'square' }} active loading={show} paragraph={{ rows: 6 }}>
        <Button onClick={() => {
          setShow(!show);
        }}
        >
          点击我切换
        </Button>
      </Skeleton>
    </div>
  );
};

export default SkeletonDemo;
