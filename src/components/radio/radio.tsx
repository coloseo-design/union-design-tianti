/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/context';
import { RadioProps } from './type';

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
  const [checked, setChecked] = useState(checkedFromProps || defaultChecked);
  useEffect(() => {
    setChecked(checkedFromProps);
  }, [checkedFromProps]);
  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('radio', prefixCls);
  const mainClass = classNames(prefix, {
    [`${prefix}-checked`]: checked,
    [`${prefix}-disabled`]: disabled,
  }, className);

  const onchange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(e.target.checked);
    if (onChange) {
      (onChange as React.ChangeEventHandler<HTMLInputElement>)(e);
    }
  };
  return (
    <label {...rest as HTMLAttributes<HTMLLabelElement>} className={mainClass}>
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
