import React from 'react';
import { List } from '../index';
import './styles/index';

export default () => {
  const data = [
    'Racing car sprays burning fuel into crowd.Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  const anotherData = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
  return (
    <div>
      <List
        dataSource={data}
        renderItem={
          (item, index) => (
            <List.Item
              key={`${index}`}
            >
              {item}
            </List.Item>
          )
        }
      />
      <br />
      <List
        dataSource={anotherData}
        renderItem={
          (item, index) => (
            <List.Item
              key={`${index}`}
              actions={[<span key={1}>查看详情</span>]}
            >
              <List.Item.Meta
                title={<span>{item.title}</span>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </List.Item>
          )
        }
      />
    </div>
  );
};
