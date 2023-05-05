import React, { ReactNode, isValidElement, useContext } from 'react';
import classNames from 'classnames';
import TopNav from '@union-design/top-nav';
import { ConfigContext } from '@union-design/config-provider';
import Search from './search';
import Logo from './logo';
import Logo1 from './logo1';
import Bg from './bg';
import { HeaderProps, SearchProps, Menu } from './type';

const Header: React.FC<HeaderProps> = (props) => {
  const {
    title,
    showNav,
    menus = [],
    search,
    showBg,
    type = 'business',
    topMenus = [],
    navProps,
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('header');

  return (
    <div className={prefix}>
      {type === 'comprehensive' && (
      <div className={`${prefix}-top-menu`}>
        {(topMenus || []).map((item: Menu | ReactNode, index: number) => (
          <div
            key={index}
            onClick={(e) => {
              (item as Menu)?.onClick?.(e, (item as Menu).key);
            }}
          >
            {isValidElement(item) ? item : (
              <>
                <span>{(item as Menu).title}</span>
              </>
            )}
          </div>
        ))}
      </div>
      )}
      <div className={classNames(`${prefix}-content`, {
        [`${prefix}-content-${type}`]: type,
        [`${prefix}-content-no-menu`]: !showNav,
      })}
      >
        {showBg && <div className={`${prefix}-content-bg`}><Bg /></div>}
        <div className={`${prefix}-left`}>
          <div className={`${prefix}-left-logo`}>
            {type === 'business' ? <Logo1 /> : <Logo />}
          </div>
          <div className={`${prefix}-left-title`}>{title}</div>
          {search && (
          <div className={`${prefix}-left-search`}>
            <Search
              {...search as SearchProps}
              type={type === 'business' ? 'default' : 'primary'}
              prefix={prefix}
            />
          </div>
          )}
        </div>
        <div className={`${prefix}-right`}>
          {(menus || []).map((item: Menu | ReactNode, index: number) => (
            <div
              className={`${prefix}-menu`}
              key={index}
              onClick={(e) => {
                (item as Menu)?.onClick?.(e, (item as Menu)?.key);
              }}
            >
              {isValidElement(item) ? item : (
                <>
                  <span className={`${prefix}-menu-icon`}>{(item as Menu).icon}</span>
                  <span>{(item as Menu).title}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {navProps && <TopNav {...navProps} size={type === 'business' ? 'md' : 'xl'} />}
    </div>
  );
};

export default Header;
