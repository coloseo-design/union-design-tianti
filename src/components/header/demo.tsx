import React from 'react';
import Dropdown from '../dropdown';
import Icon from '../icon';
import Header from './header';
import { AdvancedSearchProps } from './type';
// import './styles/index';

const Demo = () => {
  const [down, setDown1] = React.useState(true);
  const options = [
    {
      value: '1',
      label: '全部',
      key: '1',
    },
    {
      value: '2',
      label: '选项一',
      key: '2',
    },
    {
      value: '3',
      label: '选项二',
      key: '3',
    },
  ];
  const menus = [
    {
      key: '2',
      title: '公告',
      icon: <Icon type="rational-surface" />,
      onClick: (e: any, key: string) => {
        console.log('==key', key);
      },
    },
    {
      key: '4',
      title: '展示岗位名称八个字',
      icon: <Icon type="consistent-surface" />,
      onClick: (e: any, key: string) => {
        console.log('==key', key);
      },
    },
    <Dropdown key="7" overlay={<div style={{ padding: 16 }}>选项卡</div>}>
      <div>
        自定义
        <Icon type="down" style={{ fontSize: 14 }} />
      </div>
    </Dropdown>,
    <div key="8" style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
      <Icon type="meeting-surface" style={{ fontSize: 20, marginRight: 8 }} />
      <span>你好</span>
    </div>,
  ];

  const topMenus = [
    {
      key: '1',
      title: '自定义',
      onClick: (e: any, key: string) => {
        console.log('==key', key);
      },
    },
    {
      key: '8',
      title: '自定义',
      onClick: (e: any, key: string) => {
        console.log('==key', key);
      },
    },
    {
      key: '2',
      title: '自定义',
      onClick: (e: any, key: string) => {
        console.log('==key', key);
      },
    },
    {
      key: '4',
      title: '自定义',
      icon: <Icon type="user" />,
      onClick: (e: any, key: string) => {
        console.log('==key', key);
      },
    },
    <Dropdown
      key="drop"
      overlay={<div style={{ padding: 16 }}>哈哈哈</div>}
      trigger={['click']}
      onVisibleChange={(v: boolean) => {
        setDown1(!v);
      }}
    >
      <div key="01">
        自定义列表
        <Icon type={down ? 'down2-line' : 'up2-line'} style={{ fontSize: 14 }} />
      </div>
    </Dropdown>,
  ];

  const selectChange = (val: string) => {
    console.log('==val', val);
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('==ee', e);
  };

  const inputSearch = (val: string) => {
    console.log('==val', val);
  };

  const inputProps = {
    placeholder: '输入查询内容',
    onChange: inputChange,
    onSearch: inputSearch,
  };

  type Data = { id: string; name: string; desc?: string; list?: Data[] };
  const data: Data[] = [
    {
      id: '1',
      name: '工作台',
      desc: '我是工作台描述我是工作台描述我是工作台描述我是工作台描述我是工作台描述我是工作台描述',
      list: [
        {
          id: '11',
          name: '二级菜单1',
          list: [
            {
              id: '111',
              name: '三级菜单1',
            },
            {
              id: '112',
              name: '三级菜单2',
            },
            {
              id: '113',
              name: '三级菜单3',
            },
          ],
        },
        {
          id: '12',
          name: '二级菜单2',
          list: [
            {
              id: '121',
              name: '三级菜单1',
            },
            {
              id: '122',
              name: '三级菜单2',
              list: [
                {
                  id: '1221',
                  name: '四级菜单1',
                },
                {
                  id: '1222',
                  name: '四级菜单2',
                  list: [
                    {
                      id: '12221',
                      name: '五级菜单1a',
                    },
                    {
                      id: '12222',
                      name: '五级菜单2b',
                    },
                    {
                      id: '12223',
                      name: '五级菜单3',
                    },
                  ],
                },
                {
                  id: '1223',
                  name: '四级菜单3',
                },
              ],
            },
            {
              id: '123',
              name: '三级菜单3',
            },
          ],
        },
        {
          id: '13',
          name: '二级菜单3',
        },
        {
          id: '14',
          name: '二级菜单2',
          list: [
            {
              id: '141',
              name: '三级菜单1',
            },
            {
              id: '142',
              name: '三级菜单2',
            },
            {
              id: '143',
              name: '三级菜单3',
            },
          ],
        },
        {
          id: '15',
          name: '二级菜单2',
          list: [
            {
              id: '151',
              name: '三级菜单1',
            },
            {
              id: '152',
              name: '三级菜单2',
            },
            {
              id: '153',
              name: '三级菜单3',
            },
          ],
        },
        {
          id: '16',
          name: '二级菜单2',
          list: [
            {
              id: '161',
              name: '三级菜单1',
            },
            {
              id: '162',
              name: '三级菜单2',
            },
            {
              id: '163',
              name: '三级菜单3',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      name: '表单页',
    },
    {
      id: '3',
      name: '列表页',
      desc: '我是列表页描述我是列表页描述我是列表页描述我是列表页描述我是列表页描述我是列表页描述我是列表页描述',
      list: [
        {
          id: '31',
          name: '二级菜单1a',
        },
        {
          id: '32',
          name: '二级菜单2b',
        },
        {
          id: '33',
          name: '二级菜单3',
        },
      ],
    },
    {
      id: '4',
      name: '详情页',
    },
    {
      id: '5',
      name: '结果页',
    },
    {
      id: '6',
      name: '弹框页',
    },
    {
      id: '7',
      name: '异常页',
    },
    {
      id: '8',
      name: '异常页异常页异常',
    },
    {
      id: '9',
      name: '异常页异常页异常页',
    },
  ];

  const navProps = {
    data,
    mode: 'dropdown' as any,
    keyExtractor: (i: Data) => `${i.id}`,
    nameExtractor: (i: Data) => i.name,
    childrenExtractor: (i: Data) => i.list,
    onChangeSelectedKey: (key: string, data1: any) => console.log('topnav md onChangeSelectedKeys:', key, data1),
  };

  return (
    <div style={{ padding: '32px' }}>
      <h1>业务类</h1>
      <h2>基础头部</h2>
      <Header
        title="中国联通设计系统"
        search={false}
        menus={menus}
        className="test"
        onLogoClick={() => {
          console.log('=1111');
        }}
      />
      <br />
      <br />
      <br />
      <h2>基础头部-带搜索框</h2>
      <Header
        title="中国联通设计系统"
        search={inputProps}
        menus={menus}
      />
      <br />
      <br />
      <br />
      <h2>基础头部-配合导航使用</h2>
      <Header
        title="中国联通设计系统"
        search={{
          ...inputProps,
          select: {
            options,
            onChange: selectChange,
          },
        }}
        menus={menus}
        navProps={navProps}
      />
      <br />
      <br />
      <br />
      <h1>宣传类</h1>
      <h2>宣传类纯色背景-无搜索框</h2>
      <Header
        title="中国联通设计系统"
        size="lg"
        search={false}
        menus={menus.slice(1)}
      />
      <br />
      <br />
      <br />
      <h2>宣传类-带背景色</h2>
      <Header
        title="中国联通设计系统"
        search={{ ...inputProps, type: 'primary' }}
        size="lg"
        menus={menus.slice(1)}
        showBg
      />
      <br />
      <br />
      <br />
      <h2>宣传类-带导航纯色背景</h2>
      <Header
        title="中国联通设计系统"
        search={{
          ...inputProps,
          type: 'primary',
          select: {
            options,
            onChange: selectChange,
          },
        }}
        size="lg"
        menus={menus.slice(1)}
        navProps={{ ...navProps, size: 'xl' }}
      />
      <br />
      <br />
      <br />
      <h2>宣传类-带导航带背景背景</h2>
      <Header
        title="中国联通设计系统"
        search={{ ...inputProps, type: 'primary' }}
        size="lg"
        menus={menus.slice(1)}
        navProps={{ ...navProps, size: 'xl' }}
        showBg
      />
      <br />
      <br />
      <br />
      <h1>综合类</h1>
      <h2>综合类纯色背景</h2>
      <Header
        title="中国联通设计系统"
        search={false}
        size="lg"
        menus={menus.slice(1)}
        topMenus={topMenus}
      />
      <br />
      <br />
      <br />
      <h2>综合类-带背景</h2>
      <Header
        title="中国联通设计系统"
        showBg
        search={{
          ...inputProps,
          type: 'primary',
          select: {
            options,
            onChange: selectChange,
          },
        }}
        topMenus={topMenus}
        size="lg"
        menus={menus.slice(1)}
      />
      <br />
      <br />
      <br />
      <h2>综合类-纯色背景带导航</h2>
      <Header
        title="中国联通设计系统"
        search={{
          ...inputProps,
          type: 'primary',
          select: {
            options,
            onChange: selectChange,
          },
          advanced: {
            title: '高级搜索',
            onClick() {
              console.log('高级搜索点击');
            },
            tip: (
              <div>
                <span>推荐商品:</span>
                <a href="http://www.baidu.com" style={{ marginLeft: 4, color: '#595959' }}>某某某</a>
                <a href="http://www.baidu.com" style={{ marginLeft: 4, color: '#595959' }}>某某某</a>
                <a href="http://www.baidu.com" style={{ marginLeft: 4, color: '#595959' }}>某某某</a>
                <a href="http://www.baidu.com" style={{ marginLeft: 4, color: '#595959' }}>某某某</a>
                <a href="http://www.baidu.com" style={{ marginLeft: 4, color: '#595959' }}>某某某</a>
                <a href="http://www.baidu.com" style={{ marginLeft: 4, color: '#595959' }}>某某某</a>
                <a href="http://www.baidu.com" style={{ marginLeft: 4, color: '#595959' }}>某某某</a>
                <a href="http://www.baidu.com" style={{ marginLeft: 4, color: '#595959' }}>某某某</a>
              </div>
            ),
          } as AdvancedSearchProps,
        }}
        topMenus={topMenus}
        size="lg"
        menus={menus.slice(1)}
        navProps={{ ...navProps, size: 'xl' }}
      />
      <br />
      <br />
      <br />
      <h2>综合类-带背景带导航</h2>
      <Header
        title="中国联通设计系统"
        search={{
          ...inputProps,
          type: 'primary',
          select: {
            options,
            onChange: selectChange,
          },
        }}
        topMenus={topMenus}
        size="lg"
        menus={menus.slice(1)}
        navProps={{ ...navProps, size: 'xl' }}
        showBg
      />
    </div>
  );
};

export default Demo;
