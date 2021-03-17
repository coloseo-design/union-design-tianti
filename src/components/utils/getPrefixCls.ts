const getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
  // less 需要处理前缀
  const prefixCls = 'uni';
  if (customizePrefixCls) return customizePrefixCls;
  return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
};
export default getPrefixCls;
