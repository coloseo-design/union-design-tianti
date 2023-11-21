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
    menus = [],
    search = false,
    showBg,
    size = 'md',
    topMenus = [],
    navProps,
    bordered = true,
    onLogoClick,
    className,
    ...rest
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('header');

  return (
    <div {...rest} className={classNames(prefix, className)}>
      {topMenus.length > 0 && (
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
                <div>{(item as Menu).title}</div>
              </>
            )}
          </div>
        ))}
      </div>
      )}
      <div className={classNames(`${prefix}-content`, {
        [`${prefix}-content-${size}`]: size,
        [`${prefix}-content-bordered`]: navProps ? false : bordered,
      })}
      >
        {showBg && (
        <div className={`${prefix}-content-bg`}>
          {typeof showBg === 'boolean' ? <Bg /> : <img src={showBg} alt="" width="100%" />}
        </div>
        )}
        <div className={`${prefix}-left`}>
          <div
            className={`${prefix}-left-logo`}
            onClick={(e) => onLogoClick?.(e)}
          >
            {size === 'md' ? <Logo1 /> : <Logo />}
          </div>
          <div className={`${prefix}-left-title`}>{title}</div>
          {search && (
            <Search
              {...search as SearchProps}
              prefix={prefix}
            />
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
                  {(item as Menu).icon && <div className={`${prefix}-menu-icon`}>{(item as Menu).icon}</div>}
                  <div className={`${prefix}-menu-title`}>{(item as Menu).title}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {navProps && <TopNav {...navProps} />}
    </div>
  );
};

export default Header;
