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
