import React from 'react';
import { Pagination } from '../index';
import './styles/index';

const Demo = () => (
  <div style={{ minHeight: '40vh', padding: 40 }}>
    <Pagination
      total={89}
      showSizeChanger
      showQuickJumper
      hideOnSinglePage
    />
    <div style={{ height: 20 }} />
    <div style={{ marginTop: 320 }}>
      <Pagination
        total={137}
        showSizeChanger
        showQuickJumper
        showTotal={(page, pageSize) => (
          <div style={{ lineHeight: '24px', marginRight: 5 }}>
            {`${(page - 1) * pageSize}-${pageSize * page}`}
          </div>
        )}
      />
    </div>

  </div>
);

export default Demo;
