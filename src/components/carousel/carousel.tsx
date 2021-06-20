/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */

import React, { Component } from 'react';
import classnames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';

let timer: NodeJS.Timeout;

export interface CarouselProps {
  /* classname 前缀 */
  prefixCls?: string;

  // children?: React.ReactNode;
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
  active: number;
  translateX: number;
  translateY?: string;
  width: number;
  time?: number;
}

class Carousel extends Component<CarouselProps, CarouselState> {
  node: HTMLSpanElement | undefined;

  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      active: 0,
      translateX: 0,
      width: 0,
      time: 500,
    };
  }

  componentDidMount() {
    if (this.node) {
      const { width } = this.node.getBoundingClientRect();
      this.setState({
        width,
      });
      const { autoplay, children } = this.props;
      if (autoplay) {
        timer && clearInterval(timer);
        if (children) {
          const childrenArray = React.Children.toArray(children);
          this.anmiateTime(width, 1, childrenArray.length);
        }
      }
    }
  }

  componentDidUpdate(preProp: CarouselProps) {
    const { children, autoplay } = this.props;
    const { width } = this.state;
    if (children !== preProp.children) {
      if (autoplay) {
        timer && clearInterval(timer);
        if (children) {
          const childrenArray = React.Children.toArray(children);
          this.anmiateTime(width, 1, childrenArray.length);
        }
      }
    }
  }

  getNode = (node: HTMLDivElement) => {
    this.node = node;
  }

  anmiateTime = (width: number, next: number, childrenLen: number) => {
    const { effect = 'scrollx', afterChange, beforeChange } = this.props;
    let step: number = next;
    timer = setInterval(() => {
      if (step <= (effect === 'scrollx' ? childrenLen : childrenLen - 1)) {
        if (effect === 'scrollx') {
          this.setState({ translateX: -step * width, active: step });
        } else {
          this.setState({ active: step });
        }
        afterChange && afterChange(step);
        beforeChange && beforeChange(step === 0
          ? step
          : step - 1, (step === childrenLen ? 0 : step));
        step = step === childrenLen ? 0 : step + 1;
      } else {
        if (effect === 'scrollx') {
          this.setState({ translateX: 0, active: 0 });
        } else {
          this.setState({ active: 0 });
        }
        afterChange && afterChange(0);
        beforeChange && beforeChange(childrenLen - 1, 0);
        step = 0;
      }
    }, 3000);
  }

  handleSwitch = (item: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const { width, active } = this.state;
    const {
      effect = 'scrollx', children, autoplay, afterChange, beforeChange,
    } = this.props;
    const childrenArray = React.Children.toArray(children);
    if (effect === 'scrollx') {
      if (active === childrenArray.length - 1) {
        this.setState({
          translateX: -(active + 1) * width,
        });
        setTimeout(() => {
          this.setState({ time: 0, translateX: 0 });
          setTimeout(() => {
            this.setState({ time: 500 });
          }, 10);
        }, 500);
      } else {
        this.setState({
          translateX: -(item) * width,
        });
      }
    }
    if (autoplay) {
      clearInterval(timer);
      this.anmiateTime(width, item, childrenArray.length);
      this.setState({ active: item });
    } else {
      afterChange && setTimeout(() => { afterChange(item); }, 500);
      beforeChange && beforeChange(active, item);
      this.setState({ active: active === childrenArray.length - 1 ? childrenArray.length : item });
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
      autoplay,
    } = this.props;

    const {
      active, translateX, width, time,
    } = this.state;

    const wrapper = getPrefixCls('carousel', prefixCls);
    const content = classnames(`${wrapper}-content`);
    const dotStyle = classnames(`${wrapper}-dots`);

    const currentDot = classnames(`${wrapper}-dots-${dotsShape}-dot`);

    const childrenArray = React.Children.toArray(children);
    const childrenList = effect === 'fade' ? [...childrenArray] : [...childrenArray, childrenArray[0]];
    const dotsList = Array.from(Array(childrenArray.length), (_, k) => k);

    return (
      <div className={wrapper} ref={this.getNode}>
        <div
          className={content}
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            width: width !== 0 ? width * childrenList.length : '100%',
            transition: effect === 'fade' ? undefined : (autoplay ? `transform ${active === 0 ? '0ms' : '500ms'}` : `transform ${time}ms ease-in-out 0s`),
          }}
        >
          {(childrenList || []).map((item, index) => (
            <div
              key={`${index}-item`}
              style={{
                width: width || '100%',
                display: 'inline-block',
                opacity: effect === 'fade' ? (active === index ? 1 : 0) : 1,
                transition: effect === 'scrollx' ? undefined : 'opacity 500ms ease 0s, visibility 500ms ease 0s',
                position: effect === 'scrollx' ? undefined : 'relative',
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
                className={`${currentDot} ${(active === dotsList.length ? 0 : active) === item ? `${currentDot}-active` : ''}`}
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
