import React from 'react';
import ReactIcon, { BaseIconProps } from 'union-icons-react';

export interface TransferLocale {
  icon: string;
}

export interface IconProps extends Pick<BaseIconProps, 'onClick'> {
  type?: string;
  className?: string;
  spin?: boolean;
  style?: React.CSSProperties;
  ref?: React.ForwardedRef<HTMLSpanElement>
}

const Icon = (props: Omit<IconProps, 'ref'>, ref: React.ForwardedRef<HTMLSpanElement>) => {
  const { type, ...rest } = props;
  if (type === 'loading' || type === 'loading_circle') {
    Object.assign(rest, {
      spin: true,
    });
  }
  return <ReactIcon {...rest} ref={ref} name={type} />;
};

export default React.forwardRef(Icon);
