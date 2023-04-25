/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import classnames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
import { SelectContext } from './context';
import Checkbox from '../checkbox';
import { OptionType } from './select';

interface commonParams {
  disabled?: boolean,
  value: string | string[],
  children: string | React.ReactNode;
  label?: string | React.ReactNode;
}
export interface OptionProps extends commonParams{
  prefixCls?: string,
}
export type OptionState = commonParams
class Option extends React.Component<OptionProps, OptionState> {
  static isOption = true;

  constructor(props: OptionProps) {
    super(props);
    const {
      value, disabled, children, label,
    } = props;
    this.state = {
      value,
      disabled,
      children,
      label,
    };
  }

  renderOption = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      disabled, value, children, label,
    } = this.state;
    const {
      prefixCls: customizePrefixCls,
    } = this.props;
    const { valueObj, multiple } = this.context;
    const prefix = getPrefixCls('select', customizePrefixCls);

    const selected = multiple ? (valueObj as OptionType[])?.some((i) => i.value === value) : valueObj.value === value;
    const sectionClass = classnames(`${prefix}-drop-item`, {
      [`${prefix}-drop-item-disabled`]: disabled,
      [`${prefix}-drop-item-selected`]: selected,
    });

    return (
      <SelectContext.Consumer>
        {({ onSelect }) => (
          <div
            onClick={(event) => {
              event.stopPropagation();
              event.nativeEvent.stopImmediatePropagation();
              !disabled && onSelect({ value, label: children || label });
            }}
            className={`${sectionClass}`}
            title={(children || label) as string}
          >
            {multiple && <Checkbox checked={selected} disabled={disabled} />}
            <span style={{ paddingLeft: multiple ? 8 : 0 }}>{children || label}</span>
          </div>
        )}
      </SelectContext.Consumer>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderOption}
      </ConfigConsumer>
    );
  }
}
Option.contextType = SelectContext;

export default Option;
