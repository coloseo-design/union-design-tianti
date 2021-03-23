import React, { useEffect } from 'react';
import Affix from './index';

const Demo = () => {
  // const [target, setTarget] = React.useState(window);
  const t = React.useRef(window);
  useEffect(() => {
    console.log('demo1', t.current);
  }, []);

  return (
    <div className="content">
      <div className="target" ref={t}>
        这是开头
        <Affix offsetTop={20} target={() => t.current}>
          <div className="inner" />
        </Affix>
        这是结尾
        <div className="other" />
        这是开头2
        <Affix offsetTop={20} offsetBottom={20} target={() => t.current}>
          <div className="inner" />
        </Affix>
        这是结尾2
        <div className="other" />
      </div>
    </div>
  );
};

export default Demo;
