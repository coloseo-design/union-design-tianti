/* eslint import/prefer-default-export: 0 */
export const uuid = (): string => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  /* eslint no-bitwise: 0 */
  /* eslint prefer-template: 0 */
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
};
