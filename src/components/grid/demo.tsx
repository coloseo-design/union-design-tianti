import React from 'react';
import { Row, Col } from './index';

const GridDemo = () => (
  <div>
    <div className="grid-demo">
      <div>采用flex布局</div>
      <div style={{ padding: 20 }}>
        <Row
          gutter={[{ xl: 10, xxl: 20 }, { xl: 20, xxl: 40 }]}
          justify="center"
          align="middle"
          type="flex"
          style={{ background: '#1890ff' }}
        >
          <Col span={8} xl={{ span: 8 }} lg={{ span: 4 }}>
            <div style={{ height: 20, background: 'red' }}>red</div>
          </Col>
          <Col span={8} xl={{ span: 8 }} lg={{ span: 4 }}>
            <div style={{ height: 30, background: 'green' }}>green</div>
          </Col>
          <Col span={8} xl={{ span: 8 }} lg={{ span: 4 }}>
            <div style={{ height: 20, background: 'yellow' }}>yellow</div>
          </Col>
        </Row>
      </div>
      <div>采用flex布局, order演示</div>
      <div style={{ padding: 20 }}>
        <Row
          gutter={[{ xl: 10, xxl: 20 }, { xl: 20, xxl: 40 }]}
          justify="center"
          align="middle"
          type="flex"
          style={{ background: '#1890ff' }}
        >
          <Col order={2} span={8} xl={{ span: 8 }} lg={{ span: 4 }}>
            <div style={{ height: 20, background: 'red' }}>red 1</div>
          </Col>
          <Col order={1} span={8} xl={{ span: 8 }} lg={{ span: 4 }}>
            <div style={{ height: 30, background: 'green' }}>green 2</div>
          </Col>
          <Col order={3} span={8} xl={{ span: 8 }} lg={{ span: 4 }}>
            <div style={{ height: 20, background: 'yellow' }}>yellow 3</div>
          </Col>
        </Row>
      </div>
      <div>采用float布局</div>
      <div style={{ padding: 20 }}>
        <Row
          gutter={[{ xl: 10, xxl: 20 }, { xl: 20, xxl: 40 }]}
          style={{ background: '#1890ff' }}
        >
          <Col span={8} xl={{ span: 8 }} lg={{ span: 4 }}>
            <div style={{ height: 20, background: 'red' }}>red</div>
          </Col>
          <Col span={8} xl={{ span: 8 }} lg={{ span: 4 }}>
            <div style={{ height: 30, background: 'green' }}>green</div>
          </Col>
          <Col span={8} xl={{ span: 8 }} lg={{ span: 4 }}>
            <div style={{ height: 20, background: 'yellow' }}>yellow</div>
          </Col>
        </Row>
      </div>

      <div>offset演示</div>
      <div style={{ padding: 20 }}>
        <Row
          gutter={[{ xl: 10, xxl: 20 }, { xl: 20, xxl: 40 }]}
          style={{ background: '#1890ff' }}
        >
          <Col span={6} offset={1}>
            <div style={{ height: 20, background: 'red' }}>red</div>
          </Col>
          <Col span={6} offset={1}>
            <div style={{ height: 30, background: 'green' }}>green</div>
          </Col>
          <Col span={6} offset={1}>
            <div style={{ height: 20, background: 'yellow' }}>yellow</div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
);

export default GridDemo;
