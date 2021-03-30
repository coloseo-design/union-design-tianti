/* eslint-disable react/sort-comp */
/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';

export interface OptionProps {
  value: string;
  key: string | number;
  children?: any;
  onClick: (value: string, option: any, evt?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  prefixCls?: string | undefined;

}

class Option extends React.Component<OptionProps> {
  handleClick = (value: string, children: unknown) => (evt?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { onClick } = this.props;
    onClick && onClick(value, children, evt);
  };

  renderOption = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      value,
      children,
      prefixCls,
    } = this.props;
    const prefix = getPrefixCls('auto-complete', prefixCls);
    const itemclass = classNames(`${prefix}-select-item`);
    return (
      <div
        onClick={this.handleClick(value, children)}
        className={itemclass}
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
