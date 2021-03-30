import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/context';
import Icon from '../icon';

export type TabsType = 'line' | 'card' | 'page';

export interface TitleType {
  key: string;
  text: React.ReactNode;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  titles: TitleType[];
  defaultKey: string;
  type?: TabsType;
  onClose?: (key: string) => void;
  onChoose?: (key: string) => void;
}

const Tabs: React.FC<TabsProps> = (props: TabsProps) => {
  const {
    titles,
    defaultKey,
    type = 'line',
    className,
    onClose,
    onChoose,
    ...others
  } = props;
  let { prefixCls } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  prefixCls = getPrefixCls('tabs', prefixCls);

  const [checkedKey, setCheckedKey] = useState(defaultKey);
  const [offsetBar, setOffsetBar] = useState([0, 0]);
  const navRef = React.useRef();
  const barRef = React.useRef();

  useEffect(() => {
    const tabNodeList = navRef.current.children;

    for (let i = 0; i < tabNodeList.length; i += 1) {
      const hasTabActive = (tabNodeList[i].className.split(' ')).indexOf(`${prefixCls}-tab-active`);
      if (hasTabActive !== -1) {
        setOffsetBar([tabNodeList[i].offsetLeft, tabNodeList[i].offsetWidth]);
        return;
      }
    }
  }, []);

  const changeKey = (key: string, e: React.MouseEvent<HTMLDivElement>): void => {
    if (type === 'line') {
      barRef.current.style.display = 'block';
      setOffsetBar([e.currentTarget.offsetLeft, e.currentTarget.offsetWidth]);
    }
    setCheckedKey(key);
    onChoose?.(key);
  };

  const closeClick = (key: string, e: React.MouseEvent<HTMLSpanElement>): void => {
    e.stopPropagation();
    e.currentTarget.parentElement.parentElement.style.display = 'none';
    if (key === defaultKey) {
      setCheckedKey('');
    }
    onClose?.(key);
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

  return (
    <div className={navClassName}>

      <div ref={navRef} className={`${prefixCls}-nav`} {...others}>
        {
          titles.map((title) => <div key={title.key} className={classNames({ [`${prefixCls}-tab`]: true, [`${prefixCls}-tab-active`]: title.key === checkedKey })} onClick={(e) => changeKey(title.key, e)}>{tabNode(title)}</div>)
        }
        <div ref={barRef} className={`${prefixCls}-bar`} style={{ left: offsetBar[0], width: offsetBar[1] }} />
      </div>
    </div>
  );
};

export default Tabs;
