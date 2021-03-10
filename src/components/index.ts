const ENV = process.env.NODE_ENV;
/* eslint import/prefer-default-export: 0 */
if (
  ENV !== 'production'
  && ENV !== 'test'
  && typeof console !== 'undefined'
  && console.warn // eslint-disable-line no-console
  && typeof window !== 'undefined'
) {
  // eslint-disable-next-line no-console
  console.warn(
    `You are using a whole package of antd,
      please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.`,
  );
}

// 请在此处导出所有组件
export { default as Button } from './button';
