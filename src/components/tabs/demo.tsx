import React, { useState } from 'react';
import { Tabs, Icon, Button } from '../index';
import './styles/index';
import '../icon/styles/index';

const { Pane } = Tabs;

const TabsDemo = () => {
  const initialData = Array.from({ length: 5 }, (_, i) => `${i}`);
  const [data, setData] = useState(initialData);
  const [active, setKeys] = useState('1');
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
        <p>type为page示例 循环展示</p>
        <Button onClick={() => {
          setKeys('5');
          setTimeout(() => {
            data.push(`${Number(data[data.length - 1]) + 1}`);
            setData([...data]);
          }, 300);
        }}
        >
          增加tab
        </Button>
        <Tabs
          activeKey={active}
          type="page"
          onClose={(key) => {
            setData([...data.filter((i) => i !== key)]);
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
        <br />
        <br />
        <br />
        <p>平铺展示pane</p>
        <Tabs
          defaultActiveKey="3"
          type="page"

        >
          <Pane key="1" tab="h1">1</Pane>
          <Pane key="2" tab="h2">2</Pane>
          <Pane key="3" tab="h3">3</Pane>
          <Pane key="4" tab="h4">4</Pane>
        </Tabs>
      </div>
    </>
  );
};

export default TabsDemo;
