import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
import CollapsePanel from './collapsePanel';

export interface CollapseProps {
  activeKey?: number;
  defaultActiveKey?: number;
  onChange?: (value: number | undefined, show: boolean) => void;
  className?: string;
  prefixCls?: string;
  style?: { [key: string]: unknown };
  children?: any;
}

class Collapse extends React.Component<CollapseProps> {
  static Panel = CollapsePanel;

  renderCollapse = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, className, onChange, defaultActiveKey, activeKey, style, children,
    } = this.props;
    const prefix = getPrefixCls('collapse', prefixCls);
    const clazzName = classNames(prefix, className);
    const newChildren: unknown[] = [];
    React.Children.map(children, (item: unknown) => {
      if (!item) return;
      const { key } = item;
      const props = {
        k: parseInt(key, 10),
        defaultActiveKey,
        onChange,
        activeKey,
      };
      newChildren.push(React.cloneElement(item, props));
    });
    return <div className={clazzName} style={{ ...style }}>{newChildren}</div>;
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderCollapse}
      </ConfigConsumer>
    );
  }
}

Collapse.Panel = CollapsePanel;

export default Collapse;
