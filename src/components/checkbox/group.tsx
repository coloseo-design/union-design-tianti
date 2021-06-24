import React, { useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import Checkbox from './checkbox';
import { ConfigContext } from '../config-provider/context';
import { CheckboxGroupProps, CheckboxOption, GroupCheckboxConsumerProps } from './type';

export const CheckboxGroupContext = React.createContext<GroupCheckboxConsumerProps>({});

const Group: React.FC<CheckboxGroupProps> = (props: CheckboxGroupProps) => {
  const {
    options,
    disabled,
    className,
    value: valueFromProps,
    defaultValue,
    onChange,
    prefixCls: customizePrefixCls,
    ...rest
  } = props;
  let { children } = props;
  const formatOptions: () => CheckboxOption[] = () => (options || [])
    .map((option: string | CheckboxOption) => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });
  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('checkbox-group', customizePrefixCls);
  const classString = classnames(prefix, className);
  const [value, setValue] = useState<Array<string>>(valueFromProps || defaultValue || []);

  useEffect(() => {
    if (valueFromProps) {
      setValue(valueFromProps);
    }
  }, [valueFromProps]);

  // 如果包含children
  if (options) {
    // 如果设置了options
    children = formatOptions().map((option) => (
      <Checkbox
        disabled={'disabled' in option ? option.disabled : disabled}
        key={`${option.label}`}
        checked={value.indexOf(option.value) >= 0}
        className={`${prefix}-item`}
        onChange={option.onChange}
        value={option.value}
      >
        {option.label}
      </Checkbox>
    ));
  }

  const onGroupChange = (checkedOption: CheckboxOption) => {
    const { value: _value, label } = checkedOption;
    const valueOfItem = _value || label;
    const valueOfState = value;
    const index = valueOfState.findIndex((item) => item === valueOfItem);
    if (valueOfState.indexOf(valueOfItem) >= 0) {
      valueOfState.splice(index, 1);
    } else {
      valueOfState.splice(index, 0, valueOfItem);
    }
    setValue([...valueOfState]);
    onChange && onChange([...valueOfState]);
  };

  return (
    <div {...rest} className={classString}>
      <CheckboxGroupContext.Provider
        value={{
          value,
          onGroupChange,
        }}
      >
        {
          children
        }
      </CheckboxGroupContext.Provider>
    </div>
  );
};

export default Group;
