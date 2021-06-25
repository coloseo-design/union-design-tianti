import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import Radio from './radio';
import { ConfigContext } from '../config-provider/context';
import { RadioGroupProps, RadioOptions } from './type';

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
    children,
    options,
    name,
    disabled,
    className,
    defaultValue,
    value: valueFromProps = '',
    ...rest
  } = props;
  const [value, setValue] = useState(valueFromProps || defaultValue);
  const [counter, setCounter] = useState(false);
  useEffect(() => {
    if (counter) {
      setValue(valueFromProps);
    } else {
      setCounter(true);
    }
  }, [valueFromProps]);

  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('radio-group', prefixCls);
  const mainClass = classNames(prefix, className);

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) {
      (onChange as React.ChangeEventHandler<HTMLInputElement>)(e);
    }
  };
  if (children) {
    return (
      <div {...rest} className={mainClass}>
        {(React.Children.toArray(children) || []).map((item) => (
          <Radio
            key={item.props.value}
            disabled={disabled || item.props.disabled}
            value={item.props.value}
            checked={value === item.props.value}
            name={name}
            onChange={onchange}
          >
            {item.props.children}
          </Radio>
        ))}
      </div>
    );
  }

  return (
    <div {...rest} className={mainClass}>
      {getOptions(options || []).map((item) => (
        <Radio
          key={item.value}
          disabled={disabled || item.disabled}
          value={item.value}
          checked={value === item.value}
          name={name}
          onChange={onchange}
        >
          {item.label}
        </Radio>
      ))}
    </div>
  );
};

export default Group;
