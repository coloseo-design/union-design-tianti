import React, { useState } from 'react';
import { AutoComplete } from '../index';
import './styles/index';

const { Option, OptGroup } = AutoComplete;
export default () => {
  const inputRef = React.createRef();
  const [data, SetData] = useState([]);
  const handleSearch = (value) => {
    let result;
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = ['gmail.com', '163.com', 'qq.com'].map((domain) => `${value}@${domain}`);
    }
    SetData(result);
  };
  const children = data.map((email) => <Option key={email} value={email}>{email}</Option>);
  const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
  const searchChild = dataSource.map((item) => <Option key={item} value={item}>{item}</Option>);
  const dataSource1 = [
    {
      title: 'Libraries',
      children: [
        {
          title: 'AntDesign',
          count: 10000,
        },
        {
          title: 'AntDesign UI',
          count: 10600,
        },
      ],
    },
    {
      title: 'Solutions',
      children: [
        {
          title: 'AntDesign UI',
          count: 60100,
        },
        {
          title: 'AntDesign',
          count: 30010,
        },
      ],
    },
    {
      title: 'Articles',
      children: [
        {
          title: 'AntDesign design language',
          count: 100000,
        },
      ],
    },
  ];
  function renderTitle(title) {
    return (
      <span>
        {title}
        <a
          style={{ float: 'right' }}
          href="https://www.google.com/search?q=antd"
          target="_blank"
          rel="noopener noreferrer"
        >
          more
        </a>
      </span>
    );
  }

  const options = dataSource1.map((group) => (
    <OptGroup key={group.title} label={renderTitle(group.title)}>
      {group.children.map((opt) => (
        <Option key={opt.title} value={opt.title}>
          {opt.title}
          <span className="certain-search-item-count">
            {opt.count}
            {' '}
            people
          </span>
        </Option>
      ))}
    </OptGroup>
  )).concat([
    <Option disabled key="all" className="show-all">
      <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
        View all results
      </a>
    </Option>,
  ]);
  const handleFocus = () => {
    console.log('---11');
  };
  const handleBlur = () => {
    console.log('---blur');
  };

  return (
    <div id="autoplate" style={{ position: 'relative' }}>
      <h2>基本的</h2>
      <div style={{ width: 256, margin: 32 }}>
        <AutoComplete
          placeholder="请输入"
          onSearch={handleSearch}
          dataSource={children}
          onFocus={handleFocus}
          onBlur={handleBlur}
          getPopupContainer={() => document.querySelector('#autoplate')}
        />
      </div>
      <h2>多行的</h2>
      <AutoComplete
        onSearch={handleSearch}
        dataSource={children}
        placeholder="请输入"
        style={{ marginLeft: 32, width: 256 }}
        multiInput
        ref={inputRef}
        rows={3}
      />
      <h2>可搜索的</h2>
      <AutoComplete
        placeholder="请输入"
        onSearch={handleSearch}
        style={{ margin: 32, width: 256 }}
        showSearch
        dataSource={searchChild}
      />
      <AutoComplete
        placeholder="请输入"
        style={{ margin: 32, width: 256 }}
        dataSource={[
          {
            value: 1,
            label: 'glyphicon',
          },
          {
            value: 2,
            label: 'fff',
          },
        ]}
        disabled
        showSearch
      />

      <AutoComplete
        placeholder="请输入"
        // onSearch={handleSearch}
        style={{ margin: 32, width: 256 }}
        dataSource={options}
      />
    </div>
  );
};
