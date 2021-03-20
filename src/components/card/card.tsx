import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/context';
import { Omit } from '../utils/type';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  prefixCls?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  titleHeight?: number;
  onClick?:React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const {
    title,
    children,
    className,
    width,
    height,
    titleHeight,
    style,
    onClick,
  } = props;

  let { prefixCls } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);

  prefixCls = getPrefixCls('card', prefixCls);

  const titleDom = <div className={`${prefixCls}-title`} style={{ height: titleHeight }}>{title}</div>;
  const contentDom = <div className={`${prefixCls}-content`}>{children}</div>;

  const cardClassName = classNames(prefixCls, className);
  const cardStyle = {
    ...style,
    width,
    height,
  };

  return (
    <div className={cardClassName} style={cardStyle} onClick={onClick} aria-hidden="true">
      {titleDom}
      {contentDom}
    </div>
  );
};

export default Card;
