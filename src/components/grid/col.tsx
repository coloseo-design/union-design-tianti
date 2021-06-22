/* eslint-disable max-len */
import React, { useContext } from 'react';
import classnames from 'classnames';
import { RowContenxt } from './context';
import { breakpoints } from '../utils/responsive-observe';
import { BaseProps, ResponsiveColProps } from '../utils/type';
import { ConfigContext } from '../config-provider/context';

interface ResponsiveColComponentProps extends ResponsiveColProps, BaseProps, React.HTMLAttributes<HTMLDivElement> {

}

const Col: React.FC<ResponsiveColComponentProps> = (props: ResponsiveColComponentProps) => {
  const {
    prefixCls: customizePrefixCls,
    span,
    order,
    offset,
    className,
    children,
    ...rest
  } = props;
  const sizeCls: any = {};
  const { getPrefixCls } = useContext(ConfigContext);
  // 根据传入的响应式设置，来组装样式
  // 生成col-xs-1 col-xs-offset-1 col-xs-order-1
  const prefixCls = getPrefixCls('col', customizePrefixCls);
  breakpoints.forEach((size: string) => {
    const valueOfSize = (rest as any)[size];
    const sizeProps: Partial<ResponsiveColProps> = {};
    if (typeof valueOfSize === 'number') {
      Object.assign(sizeProps, {
        span: valueOfSize,
      });
    }
    if (typeof valueOfSize === 'object') {
      Object.assign(sizeProps, valueOfSize);
    }
    Object.assign(sizeCls, {
      [`${prefixCls}-${size}-${sizeProps.span}`]: !!sizeProps.span,
      [`${prefixCls}-${size}-offset-${sizeProps.offset}`]: !!sizeProps.offset,
      [`${prefixCls}-${size}-order-${sizeProps.order}`]: !!sizeProps.order,
    });
    delete (rest as any)[size];
  });
  const classes = classnames(prefixCls, {
    [`${prefixCls}-${span}`]: typeof span !== 'undefined',
    [`${prefixCls}-offset-${offset}`]: !!offset,
    [`${prefixCls}-order-${order}`]: !!order,
  }, className, sizeCls);
  const { gutter } = useContext(RowContenxt);
  const horizontalGap = gutter[0] / 2;
  const verticalGap = gutter[1] / 2;
  const style = {
    ...(gutter[0] > 0 ? {
      paddingLeft: horizontalGap,
      paddingRight: horizontalGap,
    } : {}),
    ...(gutter[1] > 0 ? {
      paddingTop: verticalGap,
      paddingBottom: verticalGap,
    } : {}),
    ...rest.style,
  };
  return (<div className={classes} style={style}>{children}</div>);
};

export default Col;
