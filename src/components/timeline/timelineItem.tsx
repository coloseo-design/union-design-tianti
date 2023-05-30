import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';

export interface TimelineItemProps {
    className?: string;
    prefixCls?: string;
    style?: CSSProperties;
    label?:React.ReactNode;
}

class TimelineItem extends React.Component<TimelineItemProps> {
    renderTimelineItem = ({ getPrefixCls }:ConfigConsumerProps) => {
      const {
        prefixCls, children, className, style, label,
      } = this.props;
      const prefix = getPrefixCls('timeline', prefixCls);
      const clazzName = classNames({
        [`${prefix}-item`]: true,
      }, className);
      return (
        <li className={clazzName} style={{ ...style }}>
          <div className={`${prefix}-item-line`} style={{ height: 'calc(100% - 20px)' }} />
          <div className={`${prefix}-item-head`} />
          <div className={`${prefix}-item-label`}>
            {
              label && <div>{label}</div>
            }
            <div className={`${prefix}-item-content`}>{children}</div>
          </div>

        </li>
      );
    };

    render() {
      return (
        <ConfigConsumer>
          {this.renderTimelineItem}
        </ConfigConsumer>
      );
    }
}

export default TimelineItem;
