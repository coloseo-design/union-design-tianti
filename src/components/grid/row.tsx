/* eslint-disable react/sort-comp */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import classnames from 'classnames';
import { tuple } from '../utils/type';
import { RowProvider } from './context';
import ResponsiveObserve, { BreakpointMap, breakpoints } from '../utils/responsive-observe';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

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

interface RowState {
  screens: BreakpointMap;
}

export default class Row extends React.Component<RowProps, RowState> {
  constructor(props: RowProps) {
    super(props);
    this.state = {
      screens: {},
    };
  }

  listener = (screens: BreakpointMap) => {
    this.setState({
      screens,
    });
  }

  componentDidMount() {
    // 监听屏幕变化，动态响应gutter，然后设置margin值
    ResponsiveObserve.subscribe(this.listener);
  }

  componentWillUnmount() {
    ResponsiveObserve.unsubscribe(this.listener);
  }

  getGutter = (gutter: any) => {
    const gutters = [0, 0]; // [水平， 垂直]
    const formatedGutter = Array.isArray(gutter) ? gutter : [gutter, 0];
    const { screens } = this.state;
    formatedGutter.forEach((item, index) => {
      // [{xs: 8, xxl: 200}, {xs: 20, xxl: 300}];
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
  }

  renderRow = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      type,
      prefixCls: customizePrefixCls,
      className,
      justify,
      align,
      children,
      gutter: rawGutter,
      ...rest
    } = this.props;
    const prefix = getPrefixCls('row', customizePrefixCls);
    // 如果type为flex， class为uni-row-flex，否则为union-row
    const cls = classnames({
      [prefix]: !type,
      [`${prefix}-${type}`]: type,
      [`${prefix}-${type}-${justify}`]: type && justify,
      [`${prefix}-${type}-${align}`]: type && align,
    },
    className);
    const gutter = this.getGutter(rawGutter);
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
  }

  render() {
    return (
      <ConfigConsumer>{this.renderRow}</ConfigConsumer>
    );
  }
}
