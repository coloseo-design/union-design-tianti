import React, { useState } from 'react';
import { Tabs, Icon } from '../index';
import './styles/index';
import '../icon/styles/index';

const { Pane } = Tabs;

const TabsDemo = () => {
  const [data, setData] = useState(['页签', '四字页签', '五个字页签']);
  return (
    <>
      <div style={{ margin: 20, backgroundColor: '#FFF' }}>
        <p>type为line示例</p>
        <Tabs defaultActiveKey="3" type="line">
          <Pane key="1" tab="页签" closable>
            <div style={{ background: 'red' }}>a</div>
          </Pane>
          <Pane key="2" tab="四字页签" closable>
            <div style={{ background: 'white' }}>b</div>
          </Pane>
          <Pane tab="五个字页签" key="3" closable>
            <div style={{ background: 'green' }}>c</div>
          </Pane>
          <Pane
            key="4"
            tab={(
              <span>
                <Icon type="apps" />
                带icon页签
              </span>
            )}
            closable
          >
            <div style={{ background: 'purple' }}>d</div>
          </Pane>
        </Tabs>
      </div>
      <div style={{ margin: 20 }}>
        <p>type为plain示例</p>
        <Tabs defaultActiveKey="2" type="plain">
          <Pane key="1" tab="页签">
            <div style={{ background: 'red' }}>a</div>
          </Pane>
          <Pane key="2" tab="四字页签">
            <div style={{ background: 'white' }}>b</div>
          </Pane>
          <Pane tab="五个字页签" key="3">
            <div style={{ background: 'green' }}>c</div>
          </Pane>
          <Pane
            key="4"
            tab={(
              <span>
                <Icon type="apps" />
                带icon页签
              </span>
  )}
          >
            <div style={{ background: 'purple' }}>d</div>
          </Pane>
        </Tabs>
      </div>
      <div style={{ margin: 20 }}>
        <p>type为card示例</p>
        <Tabs defaultActiveKey="2" type="card">
          <Pane closable key="1" tab="页签">
            <div style={{ background: 'red' }}>a</div>
          </Pane>
          <Pane closable key="2" tab="四字页签">
            <div style={{ background: 'white' }}>b</div>
          </Pane>
          <Pane closable tab="五个字页签" key="3">
            <div style={{ background: 'green' }}>c</div>
          </Pane>
          <Pane
            key="4"
            tab={(
              <span>
                <Icon type="apps" />
                带icon页签
              </span>
  )}
            closable
          >
            <div style={{ background: 'purple' }}>d</div>
          </Pane>
        </Tabs>
      </div>
      <div style={{ margin: 20 }}>
        <p>type为page示例</p>
        <Tabs
          defaultActiveKey="1"
          type="page"
          onClose={(key) => {
            // setTimeout(() => {
            //   setData(['页签', '四字页签', '五个字页签']);
            // }, 3000);
          }}
        >
          {
            data.map((item, key) => (
              <Pane key={`${key}`} tab={item} closable>
                <div style={{ background: ['white', 'green', 'blue', 'yello'][key] }}>{item}</div>
              </Pane>
            ))
          }
        </Tabs>
      </div>
    </>
  );
};

export default TabsDemo;
