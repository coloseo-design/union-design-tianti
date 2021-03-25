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

export const scrollToTop = (id: string, duration: number) => {
  const ele = document.querySelector(id);
  const startTop = document.documentElement.scrollTop;
  if (!ele) return;
  const { offsetTop } = ele;
  // const { height } = document.getElementsByTagName('header')[0].getBoundingClientRect();
  const endTop = offsetTop;
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
    document.documentElement.scrollTop = startTop + tempDistance;
    if (elapsed < duration) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};
