import React, { createContext } from 'react';

export interface ConfigConsumerProps {
  getPrefixCls: (cls: string, customizePrefix?: string) => string;
}

/**
 * 创建一个全局的context
 */
export const ConfigContext = createContext<ConfigConsumerProps>({
  getPrefixCls: (cls: string, customizedPrefix?: string) => {
    if (customizedPrefix) {
      return customizedPrefix;
    }
    return `uni-${cls}`;
  },
});

export const { Consumer: ConfigConsumer } = ConfigContext;
/* eslint max-len: 0 */
/* eslint react/display-name: 0 */
export const withGlobalConfig = <T extends ConfigConsumerProps>(Component: React.FC<T> | React.Component<T>) => React.forwardRef((props, ref) => (
  <ConfigConsumer>
    {
      ({ getPrefixCls }: ConfigConsumerProps) => (<Component {...props} ref={ref} getPrefixCls={getPrefixCls} />)
    }
  </ConfigConsumer>
));
