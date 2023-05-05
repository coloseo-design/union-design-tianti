import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';
import TimelineItem from './timelineItem';

export interface TimeLineProps{
    className?: string;
    prefixCls?: string;
    style?: {[key: string]: unknown};
    reverse?:boolean; // 排序
}

class Timeline extends React.Component<TimeLineProps, any> {
    static Item = TimelineItem;

    renderTimeline = ({ getPrefixCls }:ConfigConsumerProps) => {
      const {
        prefixCls, children, reverse = false, style, className,
      } = this.props;
      const prefix = getPrefixCls('timeline', prefixCls);
      const clazzName = classNames(prefix, className);
      const timelineItems = React.Children.toArray(children);
      if (reverse) {
        timelineItems.reverse();
      }
      const timelineItem = timelineItems.filter((item) => !!item);
      const max = React.Children.count(timelineItem);

      const nodes = React.Children.map(timelineItem, (node:any, index) => React.cloneElement(node, {
        className: classNames([
          node.props.className,
          index === max - 1 ? `${prefix}-item-last` : '',
        ]),
      }));
      return (
        <ul style={{ ...style }} className={clazzName}>
          {nodes}
        </ul>
      );
    };

    render() {
      return (
        <ConfigConsumer>
          {this.renderTimeline}
        </ConfigConsumer>
      );
    }
}

export default Timeline;
