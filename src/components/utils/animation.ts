/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint import/prefer-default-export: 0 */
export const animation = (
  func: (percentage: number) => void,
  duration: number,
) => {
  let startTime: number;
  const step: FrameRequestCallback = (timestamp) => {
    startTime ??= Math.ceil(timestamp);
    const time = Math.ceil(timestamp) - startTime;
    if (time < duration) {
      /** 回调 动画 执行 过程 时间 比率 */
      func(time / duration);
      window.requestAnimationFrame(step);
    } else {
      /** 回调 动画 执行 过程 时间 结束 */
      func(1);
    }
  };

  window.requestAnimationFrame(step);
};

export const scrollToTop = (id: string, duration: number, scrollTop?: number, container?: HTMLElement) => {
  const ele = id === 'body' ? document.getElementsByTagName('body')[0] : document.getElementById(id);
  const startTop = scrollTop || document.documentElement.scrollTop;
  if (!ele) return;
  const { offsetTop } = ele;
  const header = document.getElementsByTagName('header');
  const height = container && id !== 'body' ? 0 : header && header[0] && header[0].getBoundingClientRect().height || 0;
  const endTop = offsetTop - height;
  const distance = endTop - startTop;
  if (Math.abs(distance) === 0) return;
  let start: number;
  const step: FrameRequestCallback = (timestamp) => {
    if (start === undefined) {
      start = timestamp;
    }
    const timeGap = Math.ceil(timestamp - start);
    const elapsed = Math.min(timeGap, duration);
    if (elapsed > duration) return;
    const tempDistance = distance * elapsed / duration;
    if (container && id !== 'body') {
      container.scrollTop = startTop + tempDistance;
    } else {
      document.documentElement.scrollTop = startTop + tempDistance;
    }
    if (elapsed < duration) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};
