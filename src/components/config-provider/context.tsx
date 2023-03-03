import React, { ComponentType, createContext } from 'react';

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
export const withGlobalConfig = <T extends ConfigConsumerProps>(Component: ComponentType<T>) => React.forwardRef((props: Exclude<T, 'getPrefixCls'>, ref) => (
  <ConfigConsumer>
    {
      ({ getPrefixCls }: ConfigConsumerProps) => (
        <Component
          {...props}
          ref={ref}
          getPrefixCls={getPrefixCls}
        />
      )
    }
  </ConfigConsumer>
));
