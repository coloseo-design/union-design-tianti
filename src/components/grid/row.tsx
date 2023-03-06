/* eslint-disable react/sort-comp */
/* eslint-disable @typescript-eslint/ban-types */
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import classnames from 'classnames';
import { tuple } from '@union-design/utils/type';
import { RowProvider } from './context';
import ResponsiveObserve, { BreakpointMap, breakpoints } from '@union-design/utils/responsive-observe';
import { ConfigContext } from '@union-design/config-provider/context';

const AlignValues = tuple('top', 'middle', 'bottom');
const JustifyValues = tuple('start', 'end', 'center', 'space-around', 'space-between');

type AlignType = (typeof AlignValues)[number];
type JustifyType = (typeof JustifyValues)[number];

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  prefixCls?: string;
  /* 栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距] */
  gutter?: number | number[] | object;
  /* 垂直排列方式 */
  align?: AlignType;
  /* 水平排列方式 */
  justify?: JustifyType;
  /* 是否自动换行 */
  wrap?: boolean;
  /** 当设置为flex的时候，采用flex布局  */
  type?: 'flex';
}

const Row: React.FC<RowProps> = (props: RowProps) => {
  const {
    type,
    prefixCls: customizePrefixCls,
    className,
    justify,
    align,
    children,
    gutter: rawGutter,
    ...rest
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('row', customizePrefixCls);
  // 如果type为flex， class为uni-row-flex，否则为union-row
  const cls = classnames({
    [prefix]: !type,
    [`${prefix}-${type}`]: type,
    [`${prefix}-${type}-${justify}`]: type && justify,
    [`${prefix}-${type}-${align}`]: type && align,
  },
  className);

  const [screens, setScreens] = useState<BreakpointMap>({});

  const listener = useCallback((newScreens: BreakpointMap) => {
    setScreens(newScreens);
  }, []);

  useEffect(() => {
    ResponsiveObserve.subscribe(listener);
    () => {
      ResponsiveObserve.unsubscribe(listener);
    };
  }, [listener]);

  const getGutter = (gutter: any) => {
    const gutters = [0, 0]; // [水平， 垂直]
    const formatedGutter = Array.isArray(gutter) ? gutter : [gutter, 0];
    formatedGutter.forEach((item, index) => {
      if (typeof item === 'object') {
        breakpoints.forEach((breakpoint) => {
          if (screens[breakpoint] && typeof item[breakpoint] !== 'undefined') {
            gutters[index] = item[breakpoint];
          }
        });
      } else {
        gutters[index] = item || 0;
      }
    });
    return gutters;
  };
  const gutter = getGutter(rawGutter);
  const horizontalGap = gutter[0] / 2;
  const verticalGap = gutter[1] / 2;
  const style = {
    ...(horizontalGap > 0 ? {
      marginLeft: -horizontalGap,
      marginRight: -horizontalGap,
    } : {}),
    ...(verticalGap > 0 ? {
      marginTop: -verticalGap,
      marginBottom: -verticalGap,
    } : {}),
    ...rest.style,
  };

  return (
    <div {...rest} className={cls} style={style}>
      <RowProvider value={{ gutter }}>
        {children}
      </RowProvider>
    </div>
  );
};

export default Row;
