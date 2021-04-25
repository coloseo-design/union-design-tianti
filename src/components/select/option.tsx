import React from 'react';
import classnames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
import { SelectContext } from './context';
import Checkbox from '../checkbox';

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
    const prefix = getPrefixCls('select', customizePrefixCls);
    const sectionClass = classnames(`${prefix}-dropdown-item`, {
      [`${prefix}-dropdown-item-disabled`]: disabled,
    });
    return (
      <SelectContext.Consumer>
        {({ onSelect, multiple, selectedOptions }) => (
          <section
            onClick={(event) => {
              event.stopPropagation();
              event.nativeEvent.stopImmediatePropagation();
              !disabled && !multiple && onSelect(value, children);
            }}
            className={sectionClass}
            title={children}
          >
            {multiple && (
              <Checkbox
                onChange={(checkedValue: boolean) => { onSelect(value, children, checkedValue); }}
                checked={selectedOptions?.map((i) => (i.value)).indexOf(value) !== -1}
                disabled={disabled}
              />
            )}
            {children}
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

export default Option;
