/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */

import React, { Component } from 'react';
import classnames from 'classnames';
import omit from 'omit.js';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';

// let timer: NodeJS.Timeout;

export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'afterChange' | 'beforeChange'> {
  prefixCls?: string;
  /* 控制面板形状 */
  dotsShape?: 'strip' | 'circle',
  /* 控制面板位置 */
  dotPosition?: 'bottom' | 'left' | 'right' | 'top',
  /* 是否展示控制面板 */
  dots?: boolean;
  /* 是否自动播放 */
  autoplay?: boolean;
  /* 动画效果函数 */
  effect?: 'fade' | 'scrollx';
  /* 切换面板的回调 */
  afterChange?: (current: number) => void;
  /* 切换面板的回调 */
  beforeChange?: (from: number, to: number) => void;
  children: any;
}

export interface CarouselState {
  activeIndex: number;
  transition: boolean;
  translateY?: string;
  width: number;
  time?: number;
  timer: NodeJS.Timeout | null;
}

class Carousel extends Component<CarouselProps, CarouselState> {
  node: HTMLSpanElement | undefined;

  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      width: 0,
      activeIndex: 0,
      timer: null,
      transition: false,
    };
  }

  componentDidMount() {
    if (this.node) {
      const { width } = this.node.getBoundingClientRect();
      this.setState({ width });
      const { autoplay } = this.props;
      const { timer } = this.state;
      if (autoplay) {
        timer && clearInterval(timer);
        this.autoInterval();
      }
    }
  }

  componentDidUpdate(preProp: CarouselProps) {
    const { children, autoplay } = this.props;
    const { timer } = this.state;
    if (children !== preProp.children) {
      if (autoplay) {
        timer && clearInterval(timer);
        if (children) this.autoInterval();
      }
    }
  }

  componentWillUnmount() {
    const { timer } = this.state;
    timer && clearInterval(timer);
  }

  getNode = (node: HTMLDivElement) => {
    this.node = node;
  }

  handleSwitch = (item: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const { timer, activeIndex } = this.state;
    const { autoplay } = this.props;
    this.setState({ activeIndex: item, transition: true });
    if (autoplay) {
      timer && clearInterval(timer);
      this.autoInterval();
    } else {
      this.carouselChange(activeIndex, item);
    }
  }

  carouselChange = (before: number, current: number) => {
    const { afterChange, beforeChange } = this.props;
    if (afterChange) {
      const t = setTimeout(() => {
        clearTimeout(t);
        afterChange(current);
      }, 500);
    }
    beforeChange && beforeChange(before, current);
  }

  autoInterval = () => {
    const timer = setInterval(() => {
      const { activeIndex } = this.state;
      const { children } = this.props;
      const idx = activeIndex >= children.length ? 0 : activeIndex + 1;
      this.carouselChange(activeIndex, idx);
      this.setState({
        transition: true,
        activeIndex: activeIndex + 1,
      });
    }, 3000);
    this.setState({ timer });
  }

  onTransitionEnd = () => {
    const { activeIndex } = this.state;
    const { children } = this.props;
    if (activeIndex >= (children || []).length) {
      this.setState({
        activeIndex: 0,
        transition: false,
      });
    }
  }

  renderCarousel = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      children,
      dotsShape = 'strip',
      dotPosition = 'bottom',
      dots = true,
      effect = 'scrollx',
      ...rest
    } = this.props;
    const { transition, width, activeIndex } = this.state;
    const wrapper = getPrefixCls('carousel', prefixCls);
    const content = classnames(`${wrapper}-content`);
    const dotStyle = classnames(`${wrapper}-dots`);
    const currentDot = classnames(`${wrapper}-dots-${dotsShape}-dot`);

    const childrenArray = React.Children.toArray(children);
    const childrenList = effect === 'fade' ? [...childrenArray] : [...childrenArray, childrenArray[0]];
    const dotsList = Array.from(Array(childrenArray.length), (_, k) => k);

    const restProps = omit(rest, ['afterChange', 'beforeChange', 'autoplay']);

    return (
      <div className={wrapper} ref={this.getNode} {...restProps}>
        <div
          className={content}
          style={{
            transform: effect === 'scrollx' ? `translate3d(-${activeIndex * width}px, 0, 0)` : 'unset',
            width: width !== 0 ? width * childrenList.length : '100%',
            transition: (effect === 'fade' || !transition) ? 'unset' : 'transform 500ms',
          }}
          onTransitionEnd={this.onTransitionEnd}
        >
          {(childrenList || []).map((item, index) => (
            <div
              key={`${index}-item`}
              className={classnames(`${content}-item`, {
                [`${content}-item-fade`]: effect === 'fade',
              })}
              style={{
                width: width || '100%',
                opacity: effect === 'fade' ? ((activeIndex === index || activeIndex === childrenList.length) ? 1 : 0) : undefined,
                left: effect === 'scrollx' ? undefined : -index * width,
              }}
            >
              {item}
            </div>
          ))}
        </div>
        {dots && (
        <div className={dotStyle} style={{ [dotPosition]: 10 }}>
          <div>
            {(dotsList || []).map((item: number) => (
              <div
                className={classnames(currentDot, {
                  [`${currentDot}-active`]: (activeIndex === dotsList.length ? 0 : activeIndex) === item,
                })}
                key={item}
                onClick={this.handleSwitch(item)}
              />
            ))}
          </div>
        </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderCarousel}
      </ConfigConsumer>
    );
  }
}

export default Carousel;
