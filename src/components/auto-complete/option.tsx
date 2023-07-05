/* eslint-disable react/sort-comp */
/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';

export interface OptionProps {
  value: string;
  key: string | number;
  children?: any;
  onClick?: (value: string, option: any, evt?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  prefixCls?: string | undefined;
  disabled?: boolean;
  className?: string;
  inputValue?: any;

}

class Option extends React.Component<OptionProps> {
  handleClick = (value: string, children: unknown) => (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
    const { onClick } = this.props;
    onClick && onClick(value, children, evt);
  };

  renderOption = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      value,
      children,
      prefixCls,
      inputValue,
    } = this.props;
    const prefix = getPrefixCls('auto-complete', prefixCls);
    const itemClass = classNames(`${prefix}-select-item`, {
      [`${prefix}-select-item-selected`]: value === inputValue,
    });

    return (
      <div
        onClick={this.handleClick(value, children)}
        className={itemClass}
      >
        {children}
      </div>
    );
  }

  static isSelectOption: boolean;

  render() {
    return (
      <ConfigConsumer>
        {this.renderOption}
      </ConfigConsumer>
    );
  }
}
export default Option;
