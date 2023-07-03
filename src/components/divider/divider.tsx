import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';

export interface DividerProps {
    className?: string;
    prefixCls?: string;
    style?: React.CSSProperties;
    dashed?:boolean;
    orientation?: 'left' | 'right' | 'center';
    direction?: 'horizontal' |'vertical';
}

class Divider extends React.Component<DividerProps> {
    renderDivider = ({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        prefixCls, className, dashed, children, style, orientation = 'center', direction = 'horizontal',
      } = this.props;
      const orientationfix = orientation.length > 0 ? `-${orientation}` : '';
      const prefix = getPrefixCls('divider', prefixCls);
      const clazzName = classNames(prefix, {
        [`${prefix}-${direction}`]: direction,
        [`${prefix}-dashed`]: dashed,
        [`${prefix}-with-text`]: !!children,
        [`${prefix}-with-text${orientationfix}`]: !!children,
      }, className);
      return (
        <div className={clazzName} style={{ ...style }}>
          {
                    children && direction === 'horizontal' && <span className={`${prefix}-text`}>{children}</span>
                }
        </div>
      );
    }

    render() {
      return (
        <ConfigConsumer>
          {this.renderDivider}
        </ConfigConsumer>
      );
    }
}

export default Divider;
