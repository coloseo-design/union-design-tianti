/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { ConfigContext } from '@union-design/config-provider';
import { RadioProps } from './type';
import { RadioGroupContext } from './group';

const AnotherRadio: React.FC<RadioProps> = (props: RadioProps) => {
  const {
    onChange,
    prefixCls,
    children,
    disabled = false,
    name = 'radio',
    defaultChecked = false,
    className,
    value,
    checked: checkedFromProps = false,
    ...rest
  } = props;
  // eslint-disable-next-line prefer-const
  let [checked, setChecked] = useState(checkedFromProps || defaultChecked);
  useEffect(() => {
    setChecked(checkedFromProps);
  }, [checkedFromProps]);
  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('radio', prefixCls);
  const { onGroupChange, value: valueFromContext } = useContext(RadioGroupContext);
  if (valueFromContext) {
    checked = valueFromContext === value;
  }
  const mainClass = classNames(prefix, {
    [`${prefix}-checked`]: checked,
    [`${prefix}-disabled`]: disabled,
  }, className);

  const onchange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onGroupChange && onGroupChange(e);
    setChecked(e.target.checked);
    if (onChange) {
      (onChange as React.ChangeEventHandler<HTMLInputElement>)(e);
    }
  };

  return (
    <label {...rest as unknown as HTMLAttributes<HTMLLabelElement>} className={mainClass}>
      <input
        checked={checked}
        value={value}
        type="radio"
        disabled={disabled}
        name={name}
        onChange={onchange}
      />
      <span />
      <span>{children}</span>
    </label>
  );
};

export default AnotherRadio;
