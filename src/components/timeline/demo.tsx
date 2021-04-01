import React from 'react';
import Timeline from './index';

const TimelineDemo = {
  render() {
    return (
      <div style={{ padding: 100 }}>
        <div style={{ display: 'inline-block' }}>
          <Timeline>
            <Timeline.Item label="2019-12-20 15:30">这里是描述文案这里是描述文案这里是描述文案1</Timeline.Item>
            <Timeline.Item label="2019-12-20 15:30">这里是描述文案这里是描述文案这里是描述文案2</Timeline.Item>
            <Timeline.Item label="2019-12-20 15:30">这里是描述文案这里是描述文案这里是描述文案3</Timeline.Item>
            <Timeline.Item label="2019-12-20 15:30">这里是描述文案这里是描述文案这里是描述文案4</Timeline.Item>
            <Timeline.Item label="2019-12-20 15:30">这里是描述文案这里是描述文案这里是描述文案5</Timeline.Item>
            <Timeline.Item label="2019-12-20 15:30">这里是描述文案这里是描述文案这里是描述文案6</Timeline.Item>
            <Timeline.Item label="2019-12-20 15:30">这里是描述文案这里是描述文案这里是描述文案7</Timeline.Item>
          </Timeline>
        </div>
        <div style={{ display: 'inline-block', marginLeft: 100 }}>
          <Timeline reverse>
            <Timeline.Item>这里是描述文案这里是描述文案这里是描述文案1</Timeline.Item>
            <Timeline.Item>这里是描述文案这里是描述文案这里是描述文案2</Timeline.Item>
            <Timeline.Item>这里是描述文案这里是描述文案这里是描述文案3</Timeline.Item>
            <Timeline.Item>这里是描述文案这里是描述文案这里是描述文案4</Timeline.Item>
            <Timeline.Item>这里是描述文案这里是描述文案这里是描述文案5</Timeline.Item>
            <Timeline.Item>这里是描述文案这里是描述文案这里是描述文案6</Timeline.Item>
            <Timeline.Item>这里是描述文案这里是描述文案这里是描述文案7</Timeline.Item>
          </Timeline>
        </div>
        <div style={{ display: 'inline-block', marginLeft: 100 }}>
          <Timeline>
            <Timeline.Item>这里是描述文案这里是描述文案这里是描述文案</Timeline.Item>
            <Timeline.Item label="2019-12-20 15:30">这里是描述文案这里是描述文案这里是描述文案</Timeline.Item>
            <Timeline.Item label="2019-12-20 15:30">这里是描述文案这里是描述文案这里是描述文案</Timeline.Item>
            <Timeline.Item label="2019-12-20 15:30">这里是描述文案这里是描述文案这里是描述文案</Timeline.Item>
            <Timeline.Item>这里是描述文案这里是描述文案这里是描述文案</Timeline.Item>
            <Timeline.Item>这里是描述文案这里是描述文案这里是描述文案</Timeline.Item>
            <Timeline.Item>这里是描述文案这里是描述文案这里是描述文案</Timeline.Item>
          </Timeline>
        </div>
      </div>

    );
  },
};

export default TimelineDemo;
