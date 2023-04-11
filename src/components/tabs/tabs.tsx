/* eslint-disable max-len */
import React, {
  Key,
  useContext,
  useEffect,
  useState,
  isValidElement,
} from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/context';
import Icon from '../icon';
import { warning } from '../utils/warning';
import Pane from './pane';

export type TabsType = 'line' | 'card' | 'page' | 'plain';

export interface TitleType {
  key: string;
  text: React.ReactNode;
  closable?: boolean;
}

interface TabBarExtraContent {
  left?: React.ReactNode;
  right?: React.ReactNode
}

export interface TabsProps extends Omit<React.HTMLAttributes<unknown>, 'onChange'> {
  prefixCls?: string;
  defaultActiveKey?: string;
  activeKey?: string;
  type?: TabsType;
  onChange?: (key: string) => void;
  onTabClick?: (key: string, e: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: (key: string) => void;
  tabBarExtraContent?: React.ReactNode | TabBarExtraContent;
}

const Tabs: React.FC<TabsProps> & { Pane: typeof Pane} = (props: TabsProps) => {
  const {
    defaultActiveKey,
    type = 'line',
    className,
    onChange,
    onTabClick,
    children,
    activeKey,
    onClose,
    tabBarExtraContent,
    ...others
  } = props;
  let { prefixCls } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  prefixCls = getPrefixCls('tabs', prefixCls);

  const [checkedKey, setCheckedKey] = useState(defaultActiveKey);
  const [offsetBar, setOffsetBar] = useState([0, 0]);
  const [closed, setClosed] = useState<Key[]>([]);
  const navRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (activeKey) {
      setCheckedKey(activeKey);
    }
  }, [activeKey]);

  useEffect(() => {
    // 只有type为line的情况下才会有bar
    if (type === 'line') {
      const tabNodeList = navRef.current?.children || [];
      for (let i = 0; i < tabNodeList.length; i += 1) {
        const hasTabActive = (tabNodeList[i].className.split(' ')).indexOf(`${prefixCls}-tab-active`);
        if (hasTabActive !== -1) {
          const { offsetLeft, offsetWidth } = tabNodeList[i] as HTMLDivElement;
          setOffsetBar([offsetLeft, offsetWidth]);
          return;
        }
      }
    }
  }, [prefixCls, type, closed]);

  const changeKey = (key: string, e: React.MouseEvent<HTMLDivElement>): void => {
    const { offsetLeft, offsetWidth } = e.currentTarget;
    if (type === 'line') {
      setOffsetBar([offsetLeft, offsetWidth]);
    }
    setCheckedKey(key);
    onChange?.(key);
    onTabClick?.(key, e);
  };

  const closeClick = (key: string, e: React.MouseEvent<HTMLSpanElement>): void => {
    e.stopPropagation();
    // closed.push(key);
    const temp = closed.filter((i) => i !== key);
    // if (closed.length >= titles.length) return;
    onClose && onClose(key);
    setClosed([...temp]);
  };

  useEffect(() => {
    const list: string[] = [];
    console.log('==children', children);
    React.Children.forEach(children, (item) => {
      if (isValidElement(item)) {
        list.push(item.key as string || '');
      }
    });
    setClosed(list);
  }, [children]);

  const tabNode = (title: TitleType) => (
    !(type === 'page')
      ? (<span className={`${prefixCls}-title`}>{title.text}</span>)
      : (
        <span>
          <span className={`${prefixCls}-title`}>{title.text}</span>
          {
            title.closable && (<Icon type="close" className={`${prefixCls}-closeIcon`} onClick={(e) => closeClick(title.key, e)} />)
          }
          <span className={`${prefixCls}-page-fence`} />
        </span>
      )
  );

  const tabCls = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
    },
    className,
  );
  const titles: TitleType[] = React.Children.map(children, (item) => {
    if (isValidElement(item)) {
      const { tab, closable = true } = item.props;
      const key = item.key || '';
      warning(!item.key, '必须为pane指定key');
      return {
        text: tab,
        key,
        closable,
      } as TitleType;
    }
    return null;
  }) || [];
  const contentClassName = `${prefixCls}-content`;
  const selectedIndex = titles.filter((item) => closed.indexOf(item.key) > -1)
    .findIndex((item) => item.key === checkedKey);
  const index = selectedIndex >= 0 ? selectedIndex : 0;
  const tabContentStyle = {
    marginLeft: `-${index * 100}%`,
  };

  return (
    <div className={tabCls}>
      <div className={`${prefixCls}-nav`} {...others}>
        <div className={`${prefixCls}-extra-content`}>
          {tabBarExtraContent && (tabBarExtraContent as TabBarExtraContent).left}
        </div>
        <div className={`${prefixCls}-nav-content`} ref={navRef}>
          {
            titles.filter((item) => closed.indexOf(item.key) > -1).map((title, i) => (
              <div
                key={title.key}
                className={classNames({
                  [`${prefixCls}-tab`]: true,
                  [`${prefixCls}-tab-active`]: (
                    title.key === checkedKey
                    || (!checkedKey && i === 0)
                    || (checkedKey && !titles.find((item) => item.key === checkedKey) && i === 0)
                    || (checkedKey && !closed.includes(checkedKey) && i === 0)
                    // checkedKey 没有值默认选择第一个， checkedKey有值但不再titles里面也默认选择第一个
                  ),
                })}
                onClick={(e) => changeKey(title.key, e)}
              >
                {tabNode(title)}
              </div>
            ))
          }
          <div className={`${prefixCls}-bar`} style={{ left: offsetBar[0], width: offsetBar[1] }} />
        </div>
        <div className={`${prefixCls}-extra-content`}>
          {
            React.isValidElement(tabBarExtraContent)
              ? tabBarExtraContent
              : tabBarExtraContent && (tabBarExtraContent as TabBarExtraContent).right
          }
        </div>
      </div>
      <div className={contentClassName} style={type === 'page' ? {} : tabContentStyle}>
        {/* {children} */}
        {
          React.Children.map(children, (item, i) => {
            if (isValidElement(item)) {
              const key = item.key || '';
              if (closed.indexOf(key) === -1) {
                return null;
              }
              if (type === 'page' && i !== index) {
                return null;
              }
              return React.cloneElement(item, { active: i === index });
            }
            return null;
          }) || []
        }
      </div>
    </div>
  );
};
Tabs.Pane = Pane;
export default Tabs;
