import React, { useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import { CheckboxGroupContext } from './group';
import { ConfigContext } from '../config-provider/context';
import { CheckboxProps } from './type';

const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
  const {
    checked: checkFromProps,
    defaultChecked = false,
    children,
    prefixCls: customizePrefixCls,
    disabled,
    className,
    value,
    onChange,
    indeterminate, // 是否是未确定状态
  } = props;
  // eslint-disable-next-line prefer-const
  let [checked, setChecked] = useState(checkFromProps || defaultChecked);
  useEffect(() => {
    setChecked(checkFromProps || false);
  }, [checkFromProps]);
  const { getPrefixCls } = useContext(ConfigContext);

  const { onGroupChange, value: values } = useContext(CheckboxGroupContext);
  // eslint-disable-next-line no-underscore-dangle
  const composedValue = value || children;
  // 如果是来自于group的values
  if (values) {
    checked = values.includes(composedValue as string);
  }
  const prefix = getPrefixCls('checkbox', customizePrefixCls);
  const wrapperClass = classnames(`${prefix}-wrapper`, {
    [`${prefix}-wrapper-checked`]: checked,
    [`${prefix}-wrapper-disabled`]: disabled,
  }, className);
  const mainClass = classnames(prefix, {
    [`${prefix}-indeterminate`]: indeterminate,
    [`${prefix}-checked`]: checked,
    [`${prefix}-disabled`]: disabled,
  });
  const inputClass = classnames(`${prefix}-input`, {
    [`${prefix}-input-disabled`]: disabled,
  });

  const onClick = () => {
    if (disabled) return;
    const checkedC = !checked;
    if (typeof checkFromProps === 'undefined') {
      setChecked(checkedC);
    }
    onGroupChange && onGroupChange({
      label: children as string,
      value: composedValue as string,
    });
    onChange && onChange(checkedC);
  };

  const innerClass = classnames(`${prefix}-inner`);
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={wrapperClass}>
      <span className={mainClass}>
        <input type="checkbox" className={inputClass} onClick={onClick} />
        <span className={innerClass} />
      </span>
      {
        children && (<span>{children}</span>)
      }
    </label>
  );
};

export default Checkbox;
