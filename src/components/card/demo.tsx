import React from 'react';
import { Card, Icon } from '../index';
import './styles/index';

const CardDemo = () => (
  <>
    <div style={{ margin: 20 }}>
      <Card title="card1 点我试一试" onClick={() => { alert('点击card'); }}>
        card内容
      </Card>
      <br />
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
            <Icon type="bell" style={{ color: '#ACAFB9', paddingRight: 6, fontSize: 16 }} />
            加Icon
          </span>
        )}
        width={492}
        height={222}
      >
        内容加ReactNode
      </Card>
      <br />

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

export default CardDemo;
