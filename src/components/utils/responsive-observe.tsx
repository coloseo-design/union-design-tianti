import enquire from 'enquire.js';
import { tuple } from './type';

const tup = tuple('xs', 'sm', 'md', 'lg', 'xl', 'xxl');
export type Breakpoint = (typeof tup)[number];
export type BreakpointMap = Partial<Record<Breakpoint, string>>;

export const breakpoints: Breakpoint[] = tup;

export const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};

let subscribers: Array<SubscribeFunc> = [];

type SubscribeFunc = (pointMap: BreakpointMap) => void;

let screen: BreakpointMap = {};
/**
 * 动态监听尺寸变化
 */
const responsiveObserve = {
  dispatch(pointMap: BreakpointMap) {
    screen = pointMap;
    subscribers.forEach((listener) => {
      listener(pointMap);
    });
  },
  subscribe(listener: SubscribeFunc) {
    // 第一次被调用的时候，启动enquire监听
    if (!subscribers.length) {
      this.register();
    }
    subscribers.push(listener);
    // 立即获取当前屏幕适配的断点
    listener(screen);
  },
  unsubscribe(listener: SubscribeFunc) {
    subscribers = subscribers.filter(item => item !== listener);
    if (!subscribers.length) {
      this.unregister();
    }
  },
  unregister() {
    (Object.keys(responsiveMap) as Breakpoint[]).map((screen: Breakpoint) =>
      enquire.unregister(responsiveMap[screen]!),
    );
  },
  register() {
    (Object.keys(responsiveMap) as Breakpoint[]).forEach((screen: Breakpoint) => {
      enquire.register(responsiveMap[screen]!, {
        match: () => {
          const pointMap = {
            [screen]: true,
          };
          this.dispatch(pointMap);
        },
        unmatch: () => {
          const pointMap = {
            [screen]: false,
          };
          this.dispatch(pointMap);
        }
      });
    });
  }
};

export default responsiveObserve;
