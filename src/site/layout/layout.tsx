/* eslint-disable */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import classname from 'classnames';
import { useHistory } from 'react-router-dom';
import Icon from '../../../src/components/icon';
import './layout.less';
import Menus, { Menu } from './menus';

interface LayoutProps {
  menus: Menu[];
}

interface RouteLinked {
  path: string;
  title: string;
  subTitle: string;
  themeColor: string;
  pre?: RouteLinked;
  next?: RouteLinked;
}

function linkedMenus(menus: Menu[] = []): RouteLinked[] {
  let pre: any = {
    path: '/',
    title: '',
    subTitle: '首页',
    themeColor: '#D1373D',
  };
  const routes: RouteLinked[] = [pre];
  menus.forEach((item: Menu) => {
    item.children?.forEach((sub) => {
      const element = {
        path: `/develop/${item.key}/${sub.key}`,
        title: item.title,
        subTitle: sub.title,
        themeColor: sub.themeColor || item.themeColor || '',
      };
      if (pre) {
        Object.assign(element, {
          pre,
        });
        Object.assign(pre, {
          next: element,
        });
      }
      pre = element;
      routes.push(element);
    });
  });
  return routes;
}

function getCurrentRoute(menus: RouteLinked[], path: string): RouteLinked | undefined {
  const current = menus.find((item) => item.path === path);
  return current;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, menus } = props;
  const linkedRoutes = useMemo(() => linkedMenus(menus), []);

  const history = useHistory();
  const [routeConfig, setRouteConfig] = useState<RouteLinked>(getCurrentRoute(linkedRoutes, history.location.pathname) || linkedRoutes[0]);

  useEffect(() => {
    history.listen((location) => {
      if (location.pathname) {
        const current = getCurrentRoute(linkedRoutes, location.pathname);
        if (current) {
          setRouteConfig(current);
          // 导航切换页面需要刷新到当前页面顶部
          document.documentElement.scrollTop = 0;
        }
      }
    });
  }, []);

  const [height, setHeight] = useState(176);
  const [fixed, setFixed] = useState(false);
  const scrollEvent = useCallback(() => {
    const scrollTop = Math.max(document.documentElement.scrollTop, 0);
    let height = 176;
    if (scrollTop < 176) {
      height = 176 - scrollTop;
    }
    if (height <= 64) {
      height = 64;
    }
    if (scrollTop >= 176) {
      height = 64;
    }
    setFixed(height <= 64);
    setHeight(height);
  }, [setHeight, setFixed]);

  useEffect(() => {
    window.onscroll = scrollEvent;
    return () => {
      window.onscroll = null;
    };
  }, [scrollEvent]);

  const navigateToNext = useCallback(() => {
    routeConfig.next && history.push(routeConfig.next?.path);
  }, [routeConfig]);

  const navigateToPrev = useCallback(() => {
    routeConfig.pre && history.push(routeConfig.pre?.path);
  }, [routeConfig]);

  const headerCls = classname('g-header', {
    'g-header-fixed': fixed,
  });
  // console.log('routeConfig:', routeConfig);
  return (
    <div className="g-layout">
      <div className="g-left">
        <a className="g-logo" href="#">
          <img className="logo" src={require('../assets/images/logo.png')} />
        </a>
        <div className="g-switch">
          <ul className="switch">
            <li className="active">设计师</li>
            <li>开发者</li>
          </ul>
        </div>
        <div className="g-search">
          <div className="search-box">
            <input className="input" />
            <span className="icon"><Icon type="search" /></span>
          </div>

        </div>
        <Menus menus={menus} routeConfig={routeConfig} />
      </div>
      <div className="g-content">
        {
          routeConfig.title && <header className={headerCls} style={{ backgroundColor: routeConfig.themeColor, height }}>{fixed ? `${routeConfig.title}-${routeConfig.subTitle}` : routeConfig.title}</header>
        }
        <div className="g-body" style={{ paddingTop: !routeConfig.title ? 0 : height }}>
          {children}
        </div>

        <footer className="g-footer" style={{ backgroundColor: routeConfig.themeColor }}>
          <div className="item" onClick={navigateToPrev}>
            {
                  routeConfig.pre && (
                    <>
                      <div>
                        <Icon type="arrow-left" />
                      </div>
                      <div className="action">
                        <div className="title">下一页</div>
                        <div className="sub-title">{routeConfig.pre?.subTitle}</div>
                      </div>
                    </>
                  )
                }
          </div>
          <div className="item" onClick={navigateToNext}>
            {
                  routeConfig.next && (
                    <>
                      <div className="action">
                        <div className="title">下一页</div>
                        <div className="sub-title">{routeConfig.next?.subTitle}</div>
                      </div>
                      <div>
                        <Icon type="arrow-right" />
                      </div>
                    </>
                  )
                }
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
