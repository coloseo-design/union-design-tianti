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
    const sectionClass = classnames(`${prefix}-drop-item`, {
      [`${prefix}-drop-item-disabled`]: disabled,
      [`${prefix}-drop-item-selected`]: valueObj.value === value || (multiple && (valueObj as OptionType[])?.map((i) => (i.value)).indexOf(value) !== -1),
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
            {multiple ? (
              <Checkbox
                checked={(valueObj as OptionType[])?.map((i) => (i.value)).indexOf(value) !== -1}
                disabled={disabled}
              >
                {children || label}
              </Checkbox>
            ) : children || label}
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
