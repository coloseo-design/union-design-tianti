/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React from 'react';
import classnames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
import { uuid } from '../cascader/utils';

export interface CarouselProps {
  prefixCls?: string;
  children?: React.ReactNode;
  dotsShape?: 'strip' | 'circle',
  dotPosition?: 'bottom' | 'left' | 'right' | 'top',
  dots?: boolean;
  autoplay?: boolean;
  effect?: 'fade' | 'scrollx';
  afterChange?: (current: number) => void;
  beforeChange?: (from: number, to: number) => void;
}

export interface CarouselState {
  active: number;
  translateX: number;
  translateY: number;
  width: number;
  height: number;
  time?: number;
}

let timer: NodeJS.Timeout;

class Carousel extends React.Component<CarouselProps, CarouselState> {
  private ids = uuid();

  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      active: 0,
      translateX: 0,
      translateY: 0,
      width: 0,
      height: 0,
      time: 500,
    };
  }

  componentDidMount() {
    const idContainter = document.getElementById(`${this.ids}`);
    const idList = document.getElementById(`${this.ids}_list`);
    const { autoplay, children } = this.props;
    if (idContainter && idList) {
      const arrayChildren = React.Children.toArray(children);
      this.setState({
        width: idList.clientWidth,
        height: idContainter.clientHeight,
      });
      if (autoplay) {
        timer && clearInterval(timer);
        this.anmiateTime(idList.clientWidth, idContainter.clientHeight, 1, arrayChildren.length);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  animate = (x: number, y: number, step: number) => {
    const { dotPosition = 'bottom' } = this.props;
    if (dotPosition === 'top' || dotPosition === 'bottom') {
      this.setState({ translateX: -step * x, active: step });
    } else {
      this.setState({ translateY: -step * y, active: step });
    }
  };

  anmiateTime = (x: number, y: number, next: number, childrenLen: number) => {
    const { effect = 'scrollx', afterChange, beforeChange } = this.props;
    let step: number = next;
    timer = setInterval(() => {
      if (step <= childrenLen) {
        if (effect === 'scrollx') {
          this.animate(x, y, step);
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
          this.animate(0, 0, 0);
        } else {
          this.setState({ active: 0 });
        }
        afterChange && afterChange(0);
        beforeChange && beforeChange(childrenLen - 1, 0);
        step = 0;
      }
    }, 2000);
  }

  handleClick = (item: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const { width, height, active } = this.state;
    const {
      dotPosition = 'bottom', children, autoplay, effect = 'scrollx', afterChange, beforeChange,
    } = this.props;
    const flag = dotPosition === 'bottom' || dotPosition === 'top' ? 'horizontal' : 'vertical';
    const arrayChildren = React.Children.toArray(children);
    if (effect === 'scrollx') {
      if (active === arrayChildren.length - 1 && item === 0) {
        this.setState({
          translateX: flag === 'horizontal' ? -(active + 1) * width : 0,
          translateY: flag === 'vertical' ? -(active + 1) * height : 0,
        });
        setTimeout(() => {
          this.setState({ time: 0, translateX: 0, translateY: 0 });
          setTimeout(() => {
            this.setState({ time: 500 });
          }, 10);
        }, 500);
      } else {
        this.setState({
          translateX: flag === 'horizontal' ? -item * width : 0,
          translateY: flag === 'vertical' ? -item * height : 0,
        });
      }
    }
    if (autoplay) {
      clearInterval(timer);
      // const { width, height } = this.state;
      this.anmiateTime(width, height, item, arrayChildren.length);
    } else {
      afterChange && setTimeout(() => { afterChange(item); }, 500);
      beforeChange && beforeChange(active, item);
    }
    this.setState({ active: item });
  };

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
      translateY, translateX, width, height, active, time,
    } = this.state;
    const positionFlag = (dotPosition === 'top' || dotPosition === 'bottom') ? 'horizontal' : 'vertical';
    const childrenArray = React.Children.toArray(children);
    const optionsChildren = React.Children.map(childrenArray,
      (child, index) => React.cloneElement(child, { id: index === 0 ? this.ids : undefined }));
    optionsChildren.length > 0 && optionsChildren.push(optionsChildren[0]);
    const carousel = getPrefixCls('carousel', prefixCls);
    const list = classnames(`${carousel}-list`);
    const dotsCalss = classnames(positionFlag === 'horizontal' ? `${carousel}-dots` : `${carousel}-dots-vertical`);
    const dotsList = Array.from(Array(childrenArray.length), (v, k) => k);

    return (
      <div className={carousel}>
        <div className={`${carousel}-wrapper`}>
          <div
            className={list}
            id={`${this.ids}_list`}
            style={positionFlag === 'horizontal' ? undefined : { height }}
          >
            <div
              className={`${list}-containter`}
              style={{
                width: positionFlag === 'horizontal' ? width * optionsChildren.length : undefined,
                transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                height: positionFlag === 'vertical' ? height * optionsChildren.length : undefined,
                transition: effect === 'fade' ? undefined : (autoplay ? `transform ${active === 0 ? '0ms' : '500ms'}` : `transform ${time}ms ease-in-out 0s`),
              }}
            >
              {optionsChildren.map((item, index) => (
                <div
                  className={`${list}-containter-current`}
                  style={{
                    width,
                    height: (positionFlag === 'horizontal') ? undefined : height,
                    display: (positionFlag === 'horizontal') ? 'inline-block' : 'block',
                    opacity: effect === 'scrollx' ? undefined : active === index ? 1 : 0,
                    transition: effect === 'scrollx' ? undefined : 'opacity 500ms ease 0s, visibility 500ms ease 0s',
                    position: effect === 'scrollx' ? undefined : 'relative',
                    left: effect === 'scrollx' ? undefined : -index * width,
                  }}
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          {dots && (
          <div className={dotsCalss} style={{ [dotPosition]: 12 }}>
            {dotsList.map((item) => (
              <div
                className={`${carousel}-dots-${dotsShape}-${positionFlag} ${(active === dotsList.length ? 0 : active) === item ? `${carousel}-dots-${dotsShape}-${positionFlag}-active` : ''}`}
                key={item}
                onClick={this.handleClick(item)}
              />
            ))}
          </div>
          )}
        </div>
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
