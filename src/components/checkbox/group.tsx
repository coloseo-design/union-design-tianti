import React, { useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import Checkbox from './checkbox';
import { ConfigContext } from '../config-provider/context';

export interface GroupCheckboxConsumerProps {
  value?: string[];
  onGroupChange?: (value: CheckboxOption) => void;
}

export const CheckboxGroupContext = React.createContext<GroupCheckboxConsumerProps>({});

interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (checkedValue: boolean) => void;
}

export interface CheckboxGroupProps extends Omit<React.HtmlHTMLAttributes<HTMLInputElement>, 'onChange'> {
  defaultValue?: string[];
  name?: string;
  options?: string[] | CheckboxOption[];
  value?: string[];
  onChange?: (checkedValues: string[]) => void;
  disabled?: boolean;
}

const Group: React.FC<CheckboxGroupProps> = (props: CheckboxGroupProps) => {
  const {
    options,
    disabled,
    className,
    style,
    value: valueFromProps,
    defaultValue,
    onChange,
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
  const prefix = getPrefixCls('checkbox-group');
  const classString = classnames(prefix);
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
    <div {...rest} {...({ className, style })} className={classString}>
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
