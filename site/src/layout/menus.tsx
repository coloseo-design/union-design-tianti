import React, { useCallback, useMemo } from 'react';
import classname from 'classnames';
import Icon from '../../../src/components/icon';
import { useHistory } from 'react-router-dom';

export interface Menu {
  title: string;
  key: string;
  themeColor?: string;
  children?: Menu[];
}

interface MenuFCProps {
  menus: Menu[];
  routeConfig: object,
}

const Menus: React.FC<MenuFCProps> = (props: MenuFCProps) => {
  const { menus, routeConfig } = props;
  const subMenusCls = classname('sub-menu-box');
  const menuCls = classname('menu-box');

  const toggleMenus = useCallback((evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = (evt.target as HTMLElement).nextSibling as HTMLElement;
    const cls = target.getAttribute('class') || '';
    const clsList = cls.split(' ');
    const index = clsList.indexOf('sub-menu-open');
    if (index === -1) {
      clsList.push('sub-menu-open');
    } else {
      clsList.splice(index, 1);
    }
    target.setAttribute('class', clsList.join(' '));
  }, []);
  const history = useHistory();
  const onRouteChange = useCallback((key, subKey) => () => {
    history.push(`/develop/${key}/${subKey}`);
  }, []);

  const menuNodes = useMemo(() => menus.map((item) => (
    <div className={menuCls} key={item.title}>
      <div
        className="menu"
        onClick={toggleMenus}
        style={{ padding: '0px 30px' }}
      >
        <div className="title">
          {item.title}
        </div>
        <div className="icon">
          <Icon type="down" />
        </div>
      </div>
      <div className={subMenusCls}>
        {
          (item.children || []).map((sub) => {
            const selected = routeConfig.path === `/develop/${item.key}/${sub.key}`;
            const color = selected ? `${routeConfig.themeColor}` : 'rgba(0, 0, 0, 0.85)';
            return (
              <div
                className="menu"
                key={sub.title}
                style={{ padding: '0px 30px 0px 45px' }}
                onClick={onRouteChange(item.key, sub.key)}
              >
                <div style={{ color }} className="title">
                  {sub.title}
                </div>
              </div>
            );
          })
        }
      </div>
    </div>)), [menus, menuCls, routeConfig]);
  return (
    <div className="g-menus">
      {
        menuNodes
      }
    </div>
  );
};

export default Menus;
