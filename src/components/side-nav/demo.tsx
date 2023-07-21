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

const Demo = () => {
  const data = [
    {
      id: "1",
      name: "工作台",
      list: [
        {
          id: "11",
          name: "二级菜单1",
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
          name: "二级菜单3",
        },
      ],
    },
    {
      id: "2",
      name: "表单页",
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

  console.log('=selectedKey1', selectedKey1, openKeys);
  return (
    <div style={{ margin: 30 }}>
      <h4>基本 内嵌式导航</h4>
      <Button onClick={() => {
        setSelectedKey1('32');
      }}
      >
        改变selectKey

      </Button>
      <SideNav
        style={{ height: 400 }}
        mode="inline"
        data={data}
        openKeys={openKeys}
        selectedKey={selectedKey1}
        keyExtractor={(i) => `${i.id}`}
        nameExtractor={(i) => (['12221', '12222', '12223'].includes(i.id) ? <Tooltip message={i.name} placement="bottom">{i.name}</Tooltip> : i.name)}
        childrenExtractor={(i) => i.list}
        iconExtractor={(i) => (iconMap as any)[i.id]}
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
        onChangeVisible={(visible) =>
          console.log("sidenav inline onChangeVisible:", visible)
        }
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
