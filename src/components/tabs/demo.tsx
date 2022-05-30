import React, { useState } from 'react';
import { Tabs, Icon, Button } from '../index';
import './styles/index';
import '../icon/styles/index';

const { Pane } = Tabs;

const TabsDemo = () => {
  const initialData = Array.from({ length: 5 }, (_, i) => `${i}`);
  const [data, setData] = useState(initialData);
  return (
    <>
      <div style={{ margin: 20, backgroundColor: '#FFF' }}>
        <p>type为line示例</p>
        <Tabs defaultActiveKey="3" type="line" tabBarExtraContent={<Button>tabBarExtraContent</Button>}>
          <Pane key="1" tab="页签" closable forceRender>
            <div style={{ background: 'red' }}>a</div>
          </Pane>
          <Pane key="2" tab="四字页签" closable forceRender>
            <div style={{ background: 'white' }}>b</div>
          </Pane>
          <Pane tab="五个字页签" key="3" closable forceRender>
            <div style={{ background: 'green' }}>c</div>
          </Pane>
          <Pane
            key="4"
            tab={(
              <span>
                <Icon type="apps" style={{ marginRight: 8, color: '#444A5E' }} />
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
                <Icon type="apps" style={{ marginRight: 8, color: '#444A5E' }} />
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
                <Icon type="apps" style={{ marginRight: 8, color: '#444A5E' }} />
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
        <Button onClick={() => {
          data.push(`${Number(data[data.length - 1]) + 1}`);
          setData([...data]);
        }}
        >
          增加tab
        </Button>
        <Tabs
          defaultActiveKey="1"
          type="page"
          onClose={(key) => {
            const index = data.indexOf(key);
            data.splice(index, 1);
            setData([...data]);
          }}
        >
          {
            data.map((item) => (
              <Pane key={item} tab={`页签${item}`} closable>
                <div>{`页签${item}-----${JSON.stringify(data)}`}</div>
              </Pane>
            ))
          }
        </Tabs>
      </div>
    </>
  );
};

export default TabsDemo;
