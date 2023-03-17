import React, {
  useContext, useEffect, useState, createContext, useCallback,
} from 'react';
import classNames from 'classnames';
import Radio from './radio';
import { ConfigContext } from '../config-provider/context';
import { GroupRadioContextProps, RadioGroupProps, RadioOptions } from './type';

export const RadioGroupContext = createContext<GroupRadioContextProps>({});

const getOptions = (options: RadioOptions) => options.map((item) => {
  if (typeof item === 'string') {
    return {
      label: item,
      value: item,
    };
  }
  return item;
});

const Group: React.FC<RadioGroupProps> = (props: RadioGroupProps) => {
  const {
    onChange,
    prefixCls,
    options,
    name,
    disabled,
    className,
    defaultValue,
    value: valueFromProps,
    direction,
    ...rest
  } = props;
  let { children } = props;
  const [value, setValue] = useState<string>(valueFromProps || defaultValue || '');
  useEffect(() => {
    if (valueFromProps) {
      setValue(valueFromProps);
    }
  }, [valueFromProps]);

  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('radio-group', prefixCls);
  const mainClass = classNames(prefix, {
    [`${prefix}-vertical`]: direction === 'vertical',
  }, className);

  const onGroupChange = useCallback((e) => {
    setValue(e.target.value);
    if (onChange) {
      (onChange as React.ChangeEventHandler<HTMLInputElement>)(e);
    }
  }, [onChange]);

  if (!children && options) {
    children = getOptions(options || []).map((item) => (
      <Radio
        {...item}
        key={item.value}
        disabled={disabled || item.disabled}
        value={item.value}
        checked={value === item.value}
        name={name}
      >
        {item.label}
      </Radio>
    ));
  }

  return (
    <div {...rest} className={mainClass}>
      <RadioGroupContext.Provider
        value={{
          value,
          onGroupChange,
        }}
      >
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
};

export default Group;
