import React from 'react';
import Card from './index';
import Icon from '../icon';

export default () => (
  <>
    <div style={{ margin: 20 }}>
      <Card title="card1 点我试一试" onClick={() => { alert('点击card'); }}>
        card内容
      </Card>
      <Card title="card2">
        card
      </Card>
      <Card title="card3">
        card内容
      </Card>
      <br />

      <Card
        title={(
          <span>
            <Icon type="bell" />
            加Icon
          </span>
        )}
        width={492}
        height={222}
      >
        内容加ReactNode
        <div className="test">
          <div className="test-title" />
          <div className="test-content" />
        </div>
      </Card>
      <br />

      {/* <Card  width={300}   titleHeight={50} style={{color:'red'}}
      title='限制title高限制宽度我是超长的title我是超长的title我是超长的title我是超长的title我是超长的t
      itle我是超长的title我是超长的title我是超长的title我是超长的title我是超长的title我是超长的tit
      le我是超长的title我是超长的title我是超长的title我是超长的title' >
        限制宽度我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我
        是超长的内容我是超长的内容我是超长的内容
        我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容
      </Card>
      <br/>

      <Card  width={492} style={{color:'red'}} title='限制宽度我是超长的title我是超长的title我是超长的title我是超长的title
      我是超长的title我是超长的title我是超长的title我是超长的title我是超长的title我是超长的title我是超长的title我是超长的titl
      e我是超长的title我是超长的title我是超长的title' >
        限制宽度我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的
        内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容
      </Card> */}

      <Card title="我是超长的title我是超长的title我是超长的title我是超长的title我是超长的title我是超长的title我是超长的title我是超长
      的title我是超长的title我是超长的title我是超长的title我是超长的title我是超长的title我是超长的title我是超长的title"
      >
        我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长
        的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容我
        是超长的内容我是超长的内容我是超长的内容我是超长的内容我是超长的内容
      </Card>
    </div>
  </>
);
