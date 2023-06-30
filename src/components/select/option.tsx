/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import classnames from 'classnames';
import Checkbox from '@union-design/checkbox';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';
import { SelectContext } from './context';
import { OptionType } from './select';

interface commonParams {
  disabled?: boolean,
  value: string | string[],
  children: string | React.ReactNode;
  label?: string | React.ReactNode;
  note?: string | React.ReactNode;
  description?: string | React.ReactNode;
}
export interface OptionProps extends commonParams{
  prefixCls?: string,
}

class Option extends React.Component<OptionProps> {
  static isOption = true;

  renderOption = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      disabled, value, children, label, note, description,
    } = this.props;
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
              !disabled && onSelect({ value, label: label || children });
            }}
            className={`${sectionClass}`}
          >
            <div
              className={classnames(`${prefix}-drop-item-title`, {
                [`${prefix}-drop-item-hasNote`]: note,
              })}
              title={(label || children) as string}
            >
              {multiple && <Checkbox checked={selected} disabled={disabled} />}
              <span style={{ paddingLeft: multiple ? 8 : 0 }}>{label || children}</span>
              {note && <span className={`${prefix}-drop-item-note`}>{note}</span>}
            </div>
            {description && <div className={`${prefix}-drop-item-description`}>{description}</div>}
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
