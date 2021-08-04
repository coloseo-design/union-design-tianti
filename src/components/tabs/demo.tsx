import React from 'react';
import { Tabs, Icon } from '../index';
import './styles/index';
import '../icon/styles/index';

const { Pane } = Tabs;

const TabsDemo = () => (
  <>
    <div style={{ margin: 20 }}>
      <p>type=&lsquo;line&rsquo;示例</p>
      <Tabs defaultActiveKey="3" type="line">
        <Pane key="1" tab="页签">
          <div style={{ background: 'red' }}>a</div>
        </Pane>
        <Pane key="2" tab="四字页签">
          <div style={{ background: 'blue' }}>b</div>
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
      <p>type=&lsquo;card&rsquo;示例</p>
      <Tabs defaultActiveKey="2" type="card">
        <Pane key="1" tab="页签">
          <div style={{ background: 'red' }}>a</div>
        </Pane>
        <Pane key="2" tab="四字页签">
          <div style={{ background: 'blue' }}>b</div>
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
      <p>type=&lsquo;page&rsquo;示例</p>
      <Tabs defaultActiveKey="3" type="page" onClose={(key) => console.log('key', key)}>
        <Pane key="1" tab="页签">
          <div>
            <Tabs defaultActiveKey="3" type="line">
              <Pane key="1" tab="页签">
                <div style={{ background: 'red' }}>a</div>
              </Pane>
              <Pane key="2" tab="四字页签">
                <div style={{ background: 'blue' }}>b</div>
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
        </Pane>
        <Pane key="2" tab="四字页签">
          <div style={{ background: 'blue' }}>b</div>
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
  </>
);

export default TabsDemo;
