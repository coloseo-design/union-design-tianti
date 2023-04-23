/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable quotes */
import React, { useState } from "react";
import { TopNav } from "../index";
import "./styles/index";

const Demo = () => {
  type Data = { id: string; name: string; desc?: string; list?: Data[] };
  const data: Data[] = [
    {
      id: "1",
      name: "工作台",
      desc: "我是工作台描述我是工作台描述我是工作台描述我是工作台描述我是工作台描述我是工作台描述",
      list: [
        {
          id: "11",
          name: "二级菜单1",
          list: [
            {
              id: "111",
              name: "三级菜单1",
            },
            {
              id: "112",
              name: "三级菜单2",
            },
            {
              id: "113",
              name: "三级菜单3",
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
          name: "二级菜单3",
        },
        {
          id: "14",
          name: "二级菜单2",
          list: [
            {
              id: "141",
              name: "三级菜单1",
            },
            {
              id: "142",
              name: "三级菜单2",
            },
            {
              id: "143",
              name: "三级菜单3",
            },
          ],
        },
        {
          id: "15",
          name: "二级菜单2",
          list: [
            {
              id: "151",
              name: "三级菜单1",
            },
            {
              id: "152",
              name: "三级菜单2",
            },
            {
              id: "153",
              name: "三级菜单3",
            },
          ],
        },
        {
          id: "16",
          name: "二级菜单2",
          list: [
            {
              id: "161",
              name: "三级菜单1",
            },
            {
              id: "162",
              name: "三级菜单2",
            },
            {
              id: "163",
              name: "三级菜单3",
            },
          ],
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
      desc: "我是列表页描述我是列表页描述我是列表页描述我是列表页描述我是列表页描述我是列表页描述我是列表页描述",
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
    {
      id: "8",
      name: "异常页异常页异常",
    },
    {
      id: "9",
      name: "异常页异常页异常页",
    },
  ];

  const [selectedKey, setSelectedKey] = useState<string>("121");

  return (
    <div style={{ margin: 30 }}>
      <h4>顶部导航 md 点击模式 dropdown</h4>
      <TopNav
        popupZIndex={1000}
        data={data}
        mode="dropdown"
        keyExtractor={(i) => `${i.id}`}
        nameExtractor={(i) => i.name}
        childrenExtractor={(i) => i.list}
        onChangeSelectedKey={(key, data) =>
          console.log("topnav md onChangeSelectedKeys:", key, data)
        }
      />

      <div style={{ height: 20 }} />
      <h4>顶部导航 xl 点击模式 dropdown</h4>
      <TopNav
        size="xl"
        data={data}
        mode="dropdown"
        keyExtractor={(i) => `${i.id}`}
        nameExtractor={(i) => i.name}
        childrenExtractor={(i) => i.list}
        onChangeSelectedKey={(key, data) =>
          console.log("topnav xl onChangeSelectedKeys:", key, data)
        }
      />

      <h4>顶部导航 md 点击模式 expand</h4>
      <TopNav
        data={data}
        mode="expand"
        keyExtractor={(i) => `${i.id}`}
        nameExtractor={(i) => i.name}
        childrenExtractor={(i) => i.list}
        onChangeSelectedKey={(key, data) =>
          console.log("topnav md onChangeSelectedKeys:", key, data)
        }
      />

      <div style={{ height: 20 }} />
      <h4>顶部导航 xl 点击模式 expand</h4>
      <TopNav
        size="xl"
        data={data}
        mode="expand"
        keyExtractor={(i) => `${i.id}`}
        nameExtractor={(i) => i.name}
        childrenExtractor={(i) => i.list}
        onChangeSelectedKey={(key, data) =>
          console.log("topnav xl onChangeSelectedKeys:", key, data)
        }
      />

      <div style={{ height: 20 }} />
      <h4>顶部导航 md 点击模式 expand-img</h4>
      <TopNav
        data={data}
        mode="expand-img"
        keyExtractor={(i) => `${i.id}`}
        nameExtractor={(i) => i.name}
        childrenExtractor={(i) => i.list}
        descExtractor={(i) => i.desc}
        bgExtractor={() => (
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "pink" }}
          />
        )}
        onChangeSelectedKey={(key, data) =>
          console.log("topnav md onChangeSelectedKeys:", key, data)
        }
      />

      <div style={{ height: 20 }} />
      <h4>顶部导航 xl 点击模式 expand-img</h4>
      <TopNav
        size="xl"
        data={data}
        mode="expand-img"
        keyExtractor={(i) => `${i.id}`}
        nameExtractor={(i) => i.name}
        childrenExtractor={(i) => i.list}
        descExtractor={(i) => i.desc}
        bgExtractor={() => (
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "pink" }}
          />
        )}
        onChangeSelectedKey={(key, data) =>
          console.log("topnav xl onChangeSelectedKeys:", key, data)
        }
      />

      <div style={{ height: 20 }} />
      <h4>顶部导航 md 点击模式 expand 状态外部控制</h4>
      <TopNav
        data={data}
        mode="expand"
        selectedKey={selectedKey}
        keyExtractor={(i) => `${i.id}`}
        nameExtractor={(i) => i.name}
        childrenExtractor={(i) => i.list}
        onChangeSelectedKey={(key, data) => {
          setSelectedKey(key);
          console.log("topnav md onChangeSelectedKeys:", key, data);
        }}
      />
    </div>
  );
};

export default Demo;
