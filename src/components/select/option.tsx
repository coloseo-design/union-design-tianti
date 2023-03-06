import React from 'react';
import classnames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider/context';
import { SelectContext } from './context';
import Checkbox from '@union-design/checkbox';

interface commonParams {
  disabled?: boolean,
  value: string | string[],
  children: string,
}
export interface OptionProps extends commonParams{
  prefixCls?: string,
}
export type OptionState = commonParams
class Option extends React.Component<OptionProps, OptionState> {
  constructor(props: OptionProps) {
    super(props);
    const { value, disabled, children } = props;
    this.state = {
      value,
      disabled,
      children,
    };
  }

  renderOption = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { disabled, value, children } = this.state;
    const {
      prefixCls: customizePrefixCls,
    } = this.props;
    const { renderObj } = this.context;
    const prefix = getPrefixCls('select', customizePrefixCls);
    const sectionClass = classnames(`${prefix}-dropdown-item`, {
      [`${prefix}-dropdown-item-disabled`]: disabled,
      [`${prefix}-dropdown-item-selected`]: renderObj.value === value,
    });

    return (
      <SelectContext.Consumer>
        {({ onSelect, multiple, selectedOptions }) => (
          <section
            onClick={(event) => {
              event.stopPropagation();
              event.nativeEvent.stopImmediatePropagation();
              !disabled && onSelect(value, children);
            }}
            className={`${sectionClass}`}
            title={children}
          >
            {multiple && (
              <Checkbox
                checked={selectedOptions?.map((i) => (i.value)).indexOf(value) !== -1}
                disabled={disabled}
              />
            )}
            <span style={{ paddingLeft: multiple ? 8 : 0 }}>{children}</span>
          </section>
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
