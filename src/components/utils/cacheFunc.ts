/* eslint no-unused-vars: 0 */
/* eslint import/prefer-default-export: 0 */
export const cacheFunc = <F extends (...args: any[]) => any>(fn: F): F => {
  const cache = Object.create(null);
  return ((...args) => {
    const arg = JSON.stringify(args);
    /* eslint no-multi-assign: 0 */
    const result = cache[arg] ??= fn(...args);
    return result;
  }) as F;
};
