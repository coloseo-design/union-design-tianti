import React, { ForwardedRef, ForwardRefRenderFunction, useContext } from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/context';
import Icon from '../icon';
import { AnchorButtonProps, ButtonProps, NativeButtonProps } from './type';

const ButtonSizeMap = {
  large: 'lg',
  small: 'sm',
  default: '',
};

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const {
    children,
    size,
    className, // 自定义的className
    type,
    shape,
    icon,
    block = false,
    ghost = false,
    loading = false,
    prefixCls: customizedPrefixCls,
    onClick: clickFromProps,
    suffixIcon,
    ...rest
  } = props;

  const onClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (loading) return;
    if (clickFromProps) {
      (clickFromProps as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

  const { getPrefixCls } = useContext(ConfigContext);
  let sizeCls = '';
  if (size) {
    sizeCls = ButtonSizeMap[size];
  }

  const prefixCls = getPrefixCls('btn', customizedPrefixCls);
  const classes: string = classNames(prefixCls, className, {
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${shape}`]: shape,
    [`${prefixCls}-loading`]: !!loading,
    [`${prefixCls}-background-ghost`]: ghost,
    [`${prefixCls}-block`]: block,
  });
  const iconName = loading ? 'loading' : icon;
  const iconElement = iconName ? <Icon type={iconName} /> : undefined;
  const linkButtonRestProps = omit(rest, ['htmlType']) as AnchorButtonProps;
  // link-like button
  if (typeof linkButtonRestProps.href !== 'undefined') {
    return (
      <a
        {...linkButtonRestProps}
        className={classes}
        href={linkButtonRestProps.href}
        onClick={onClick}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
      >
        {iconElement}
        <span>{children}</span>
      </a>
    );
  }
  // TODO: htmlType属性将来用于form中进行劫持
  const { htmlType = 'button', ...otherProps } = rest as NativeButtonProps;
  // loading作用于图标
  /* eslint react/button-has-type: 0 */
  return (
    <button
      {...(otherProps)}
      type={htmlType}
      className={classes}
      onClick={onClick}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      {iconElement}
      <span>{children}</span>
      {suffixIcon && <Icon type={suffixIcon} />}
    </button>
  );
};

export default React.forwardRef(Button);
