import * as React from 'react';
import { ConfigContext } from '../config-provider/context';
import { Omit } from '../utils/type';
import classNames from 'classnames';


export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  prefixCls?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  titleHeight?: number;
}



const Card: React.FC<CardProps> = props => {

  let {
    prefixCls,
    title,
    children,
    className,
    width,
    height,
    titleHeight,
    style,
    ...others
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);

  prefixCls = getPrefixCls('card', prefixCls);

  const titleDom = <div className={`${prefixCls}-title`} style={{ height: titleHeight }}>{title}</div>;
  const contentDom = <div className={`${prefixCls}-content`}>{children}</div>;

  const cardClassName = classNames(prefixCls, className)
  const cardStyle = {
    ...style,
    width,
    height,
  }

  return (
    <div className={cardClassName} style={cardStyle} {...others} >
      {titleDom}
      {contentDom}
    </div>
  );
};



export default Card;
