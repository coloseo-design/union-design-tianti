/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable quotes */
import React, { useState } from "react";
import SideNav from './index';
import Icon from '../icon';
import Button from '../button';
import Tooltip from "../tooltip/tooltip";
// import "./styles/index";

const list: any[] = [];
Array.from({ length: 300 }).map((_, k) => k + 1).forEach((item) => {
  list.push({
    id: item,
    name: "工作台工作",
    list: [
      {
        id: `${item}-children`,
        name: "工作台工-child",
      },
    ],
  });
});
const Demo = () => {
  const data = [
    {
      id: "1",
      name: "工作台工作台工作",
      list: [
        {
          id: '1235r',
          name: '二级导航栏',
          list: [
            {
              id: '2234r',
              name: '三级导航',
              list: [
                {
                  id: '334r',
                  name: '四级导航四级导航四级导航四',
                },
                {
                  id: '334r1',
                  name: '四级导航四级导航四级导',
                },
                {
                  id: '334r2',
                  name: '四级导航四级导航',
                },
                {
                  id: '334r3',
                  name: '四级导航四级导航四级导航',
                },
              ],
            },
          ],
        },
        {
          id: "11",
          name: "二级导航",
          list: [
            {
              id: '11fr',
              name: '三级导航',
              list: [
                {
                  id: '3rgs',
                  name: '四级导航四级导航四级导',
                },
              ],
            },
            {
              id: '11fr33',
              name: '三级导航',
            },
          ],
        },
        {
          id: "12",
          name: "二级菜单2",
          list: [
            {
              id: "121",
              name: "三级菜单1",
            },
            {
              id: "122",
              name: "三级菜单2",
              list: [
                {
                  id: "1221",
                  name: "四级菜单1",
                },
                {
                  id: "1222",
                  name: "四级菜单2",
                  list: [
                    {
                      id: "12221",
                      name: "五级菜单1a",
                    },
                    {
                      id: "12222",
                      name: "五级菜单2b",
                    },
                    {
                      id: "12223",
                      name: "五级菜单3",
                    },
                  ],
                },
                {
                  id: "1223",
                  name: "四级菜单3",
                },
              ],
            },
            {
              id: "123",
              name: "三级菜单3",
            },
          ],
        },
        {
          id: "13",
          name: "二级菜单3二级菜单3",
        },
      ],
    },
    {
      id: "2",
      name: "表单页表单页表单页",
    },
    {
      id: "3",
      name: "列表页",
      list: [
        {
          id: "31",
          name: "二级菜单1a",
        },
        {
          id: "32",
          name: "二级菜单2b",
        },
        {
          id: "33",
          name: "二级菜单3",
        },
      ],
    },
    {
      id: "4",
      name: "详情页",
    },
    {
      id: "5",
      name: "结果页",
    },
    {
      id: "6",
      name: "弹框页",
    },
    {
      id: "7",
      name: "异常页",
    },
  ];

  const iconMap = {
    1: <Icon type="safety" style={{ fontSize: 18 }} />,
    2: <Icon type="stockright" style={{ fontSize: 18 }} />,
    3: <Icon type="map" style={{ fontSize: 18 }} />,
    4: <Icon type="menu" style={{ fontSize: 18 }} />,
    5: <Icon type="money" style={{ fontSize: 18 }} />,
    6: <Icon type="meeting" style={{ fontSize: 18 }} />,
    7: <Icon type="plugin" style={{ fontSize: 18 }} />,
  };

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const [selectedKey, setSelectedKey] = useState<string>("121");
  const [selectedKey1, setSelectedKey1] = useState<string>('');

  const [close, setClose] = useState(true);

  return (
    <div style={{ margin: 30 }}>
      <Button onClick={() => {
        setClose(!close);
      }}
      >
        改变isClose

      </Button>
      <h4>测试</h4>
      <SideNav
        // close={close}
        showAllDom={false}
        style={{ height: 400 }}
        mode="inline"
        data={[{ id: 'home', name: '首页' }, ...list]}
        keyExtractor={(i) => `${i.id}`}
        nameExtractor={(i) => i.name}
        childrenExtractor={(i) => i.list}
        iconExtractor={(i) => <Icon type="menu" style={{ fontSize: 18 }} />}
        onChangeVisible={(v) => {
          setClose(v);
        }}
      />
      <h4>基本用法 inline</h4>
      <SideNav
        style={{ height: 400 }}
        mode="inline"
        data={data}
        openKeys={openKeys}
        selectedKey={selectedKey1}
        keyExtractor={(i) => `${i.id}`}
        nameExtractor={(i, level) => {
          if (((level === 1 || level === 2) && i.name.length > 8) || (level === 3 && i.name.length > 7) || (level === 4 && i.name.length > 6) || (level === 5 && i.name.length > 5)) {
            return <Tooltip message={i.name} placement="bottom">{i.name}</Tooltip>;
          }
          return i.name;
        }}
        childrenExtractor={(i) => i.list}
        iconExtractor={(i) => <Icon type="menu" style={{ fontSize: 18 }} />}
        onChangeSelectedKey={(key, data) => {
          console.log('pppp', data);
          setSelectedKey1(key);
          console.log("sidenav inline onChangeSelectedKeys:", key, data);
        }}
        onChangeOpenKeys={(keys) => {
          const last = keys[keys.length - 1];
          if (data.map((i) => i.id).includes(last) && last) {
            setOpenKeys([...keys.filter((j) => !data.map((i) => i.id).includes(j)), last]);
          } else {
            setOpenKeys(keys);
          }
          console.log('=onChangeOpenKeys');
        }}
      />
      <div style={{ height: 20 }} />
      <h4>基本 展开式导航</h4>
      <SideNav
        style={{ height: 400 }}
        mode="expand"
        data={data}
        keyExtractor={(i) => `${i.id}`}
        nameExtractor={(i) => i.name}
        childrenExtractor={(i) => i.list}
        iconExtractor={(i) => (iconMap as any)[i.id]}
        onChangeSelectedKey={(key, data) =>
          console.log("sidenav expand onChangeSelectedKeys:", key, data)
        }
        onChangeOpenKeys={(key) =>
          console.log("sidenav expand onChangeOpenKeys:", key)
        }
        onChangeVisible={(visible) =>
          console.log("sidenav expand onChangeVisible:", visible)
        }
      />

      <div style={{ height: 20 }} />
      <h4>内嵌式导航 初始默认值</h4>
      <SideNav
        style={{ height: 400 }}
        mode="inline"
        data={data}
        defaultOpenKeys={["1", "12"]}
        defaultSelectedKey="121"
        keyExtractor={(i) => `${i.id}`}
        nameExtractor={(i) => i.name}
        childrenExtractor={(i) => i.list}
        iconExtractor={(i) => (iconMap as any)[i.id]}
        onChangeSelectedKey={(key, data) =>
          console.log("sidenav inline onChangeSelectedKeys:", key, data)
        }
        onChangeOpenKeys={(key) =>
          console.log("sidenav inline onChangeOpenKeys:", key)
        }
        onChangeVisible={(visible) =>
          console.log("sidenav inline onChangeVisible:", visible)
        }
      />

      <div style={{ height: 20 }} />
      <h4>内嵌式导航 初始默认值 外部控制状态</h4>
      <SideNav
        style={{ height: 400 }}
        mode="inline"
        data={data}
        // openKeys={openKeys}
        selectedKey={selectedKey}
        keyExtractor={(i) => `${i.id}`}
        nameExtractor={(i) => i.name}
        childrenExtractor={(i) => i.list}
        iconExtractor={(i) => (iconMap as any)[i.id]}
        onChangeSelectedKey={(key, data) => {
          setSelectedKey(key);
          console.log("sidenav inline onChangeSelectedKeys:", key, data);
        }}
        onChangeOpenKeys={(key) => {
          setOpenKeys(key);
          console.log("sidenav inline onChangeOpenKeys:", key);
        }}
        onChangeVisible={(visible) =>
          console.log("sidenav inline onChangeVisible:", visible)
        }
      />
    </div>
  );
};

export default Demo;
