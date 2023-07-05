/* eslint-disable max-len */
/* eslint-disable react/sort-comp */
import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';

export interface OptGroupProps {
  label: React.ReactNode;
  children: any;
  prefixCls?: string | undefined;
  onClick?: (value: string, option: any, evt?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  inputValue?: any;
}

class OptGroup extends React.Component<OptGroupProps> {
  renderOption = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      label,
      children,
      prefixCls,
      inputValue,
      onClick,
    } = this.props;
    const prefix = getPrefixCls('auto-complete', prefixCls);
    const itemClass = classNames(`${prefix}-select-group`);
    return (
      <div
        className={itemClass}
      >
        <div className={`${itemClass}-label`}>
          <span>{label}</span>
        </div>
        {
          React.Children.map(children, (child) => React.cloneElement(child, { onClick, inputValue }))
        }
      </div>
    );
  }

  static isSelectOptGroup: boolean;

  render() {
    return (
      <ConfigConsumer>
        {this.renderOption}
      </ConfigConsumer>
    );
  }
}
export default OptGroup;
