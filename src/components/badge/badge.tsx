import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';

export interface BaseBadgeProps{
  dot?:boolean; // 不展示数字，只有一个小红点 默认false
  count?:number; // 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏
  overflowCount?:number; // 默认值 99
  showZero?:boolean
  className?: string;
  prefixCls?: string;
  style?: CSSProperties;
  children?: any;
}

class Badge extends React.Component<BaseBadgeProps> {
  renderBadge = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      className,
      count = 0,
      overflowCount = 99,
      dot = false,
      children,
      style,
      showZero = false,
    } = this.props;

    const prefix = getPrefixCls('badge', prefixCls);

    const clazzName = classNames(prefix, className);

    let node = null;
    if (dot) {
      node = <sup className={`${prefix}-dot`} />;
    } else if (count || showZero) {
      node = <sup className={`${clazzName}-content`}>{count > overflowCount ? `${overflowCount}+` : count}</sup>;
    }
    return (
      <span className={clazzName} style={{ ...style }}>
        {children}
        {node}
      </span>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderBadge}
      </ConfigConsumer>
    );
  }
}

export default Badge;
