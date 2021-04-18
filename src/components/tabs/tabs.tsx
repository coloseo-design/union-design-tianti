import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/context';
import Icon from '../icon';
import { warning } from '../utils/warning';
import { uuid } from '../utils/uuid';
import Pane from './pane';

export type TabsType = 'line' | 'card' | 'page';

export interface TitleType {
  key: string;
  text: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<unknown>, 'onChange'> {
  prefixCls?: string;
  defaultActiveKey?: string;
  activeKey?: string;
  type?: TabsType;
  onChange?: (key: string) => void;
}

const Tabs: React.FC<TabsProps> & { Pane: typeof Pane} = (props: TabsProps) => {
  const {
    defaultActiveKey,
    type = 'line',
    className,
    onChange,
    children,
    activeKey,
    ...others
  } = props;
  let { prefixCls } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  prefixCls = getPrefixCls('tabs', prefixCls);

  const [checkedKey, setCheckedKey] = useState(defaultActiveKey);
  const [offsetBar, setOffsetBar] = useState([0, 0]);
  const [closed, setClosed] = useState<string[]>([]);
  const navRef = React.useRef<HTMLDivElement>();

  useEffect(() => {
    if (activeKey) {
      setCheckedKey(activeKey);
    }
  }, [activeKey]);

  useEffect(() => {
    const tabNodeList = navRef.current?.children || [];
    for (let i = 0; i < tabNodeList.length; i += 1) {
      const hasTabActive = (tabNodeList[i].className.split(' ')).indexOf(`${prefixCls}-tab-active`);
      if (hasTabActive !== -1) {
        const { offsetLeft, offsetWidth } = tabNodeList[i] as HTMLDivElement;
        setOffsetBar([offsetLeft, offsetWidth]);
        return;
      }
    }
  }, [prefixCls]);

  const changeKey = (key: string, e: React.MouseEvent<HTMLDivElement>): void => {
    const { offsetLeft, offsetWidth } = e.currentTarget;
    if (type === 'line') {
      setOffsetBar([offsetLeft, offsetWidth]);
    }
    setCheckedKey(key);
    onChange?.(key);
  };

  const closeClick = (key: string, e: React.MouseEvent<HTMLSpanElement>): void => {
    e.stopPropagation();
    closed.push(key);
    if (closed.length >= titles.length) return;
    if (key === checkedKey) {
      setCheckedKey(titles[0].key);
    }
    setClosed([...closed]);
  };

  const tabNode = (title: TitleType) => (
    !(type === 'page')
      ? (<span className={`${prefixCls}-title`}>{title.text}</span>)
      : (
        <span>
          <span className={`${prefixCls}-title`}>{title.text}</span>
          <Icon type="close" className={`${prefixCls}-closeIcon`} onClick={(e) => closeClick(title.key, e)} />
          <span className={`${prefixCls}-page-fence`} />
        </span>
      )
  );

  const navClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
    },
    className,
  );
  const titles: TitleType[] = React.Children.map(children, (item) => {
    if (item && typeof item === 'object' && 'props' in item) {
      const { tab } = item.props;
      const key = item.key || uuid();
      warning(!item.key, '必须为pane指定key');
      return {
        text: tab,
        key,
      } as TitleType;
    }
    return null;
  }) || [];
  const contentClassName = `${prefixCls}-content`;
  const selectedIndex = titles.filter((item) => closed.indexOf(item.key) === -1)
    .findIndex((item) => item.key === checkedKey);
  const index = selectedIndex >= 0 ? selectedIndex : 0;
  const tabContentStyle = {
    marginLeft: `-${index * 100}%`,
  };

  return (
    <div className={navClassName}>
      <div ref={navRef} className={`${prefixCls}-nav`} {...others}>
        {
          titles.filter((item) => closed.indexOf(item.key) === -1).map((title) => (
            <div
              key={title.key}
              className={classNames({ [`${prefixCls}-tab`]: true, [`${prefixCls}-tab-active`]: title.key === checkedKey })}
              onClick={(e) => changeKey(title.key, e)}
            >
              {tabNode(title)}
            </div>
          ))
        }
        <div className={`${prefixCls}-bar`} style={{ left: offsetBar[0], width: offsetBar[1] }} />
      </div>
      <div className={contentClassName} style={tabContentStyle}>
        {/* {children} */}
        {
          React.Children.map(children, (item) => {
            if (item && typeof item === 'object' && 'props' in item) {
              const key = item.key || uuid();
              if (closed.indexOf(key) >= 0) {
                return null;
              }
              return item;
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
