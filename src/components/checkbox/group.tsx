import React from 'react';
import classnames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Checkbox from './checkbox';

export interface GroupCheckboxConsumerProps {
  value: string[];
  onGroupChange: (value: CheckboxOption) => void;
}

const CheckboxGroupContext = React.createContext<GroupCheckboxConsumerProps>(null);
export const CheckboxGroupConsumer = CheckboxGroupContext.Consumer;

interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (checkedValue: boolean) => void;
}

export interface CheckboxGroupProps extends Omit<React.HtmlHTMLAttributes<any>, 'onChange'> {
  defaultValue?: string[];
  name?: string;
  options?: string[] | CheckboxOption[];
  value?: string[];
  onChange?: (checkedValues: string[]) => void;
  disabled?: boolean;
}

export interface CheckboxGroupState {
  value: string[];
}

class Group extends React.Component<CheckboxGroupProps, CheckboxGroupState> {
  static defaultProps = {
    disabled: false,
  };

  constructor(props: CheckboxGroupProps) {
    super(props);
    console.log('props.value', props.value, props.defaultValue, props.value || props.defaultValue || []);
    this.state = {
      value: props.value || props.defaultValue || [],
    };
  }

  // 托管value
  static getDerivedStateFromProps(nextProps: CheckboxGroupProps) {
    console.log('nextProps', nextProps);
    if ('value' in nextProps) {
      console.log('xxx');
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  formatOptions: () => CheckboxOption[] = () => {
    const { options } = this.props;
    return (options || []).map((option: string | CheckboxOption) => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        };
      }
      return option;
    });
  }

  onGroupChange = (checkedOption: CheckboxOption) => {
    const { value: _value, label } = checkedOption;
    const value = _value || label;
    const { onChange } = this.props;
    const { value: valueOfState = [] } = this.state;
    console.log('valueOfState', valueOfState);
    const index = valueOfState.findIndex((item) => item === value);
    if (valueOfState.indexOf(value) >= 0) {
      valueOfState.splice(index, 1);
    } else {
      valueOfState.splice(index, 0, value);
    }
    this.setState({
      value: [...valueOfState],
    });
    onChange && onChange([...valueOfState]);
  }

  renderGroup = ({ getPrefixCls }: ConfigConsumerProps) => {
    const prefix = getPrefixCls('checkbox-group');
    const classString = classnames(prefix);
    const {
      options, disabled, className, style,
    } = this.props;
    const { value } = this.state;
    // 如果包含children
    let { children } = this.props;
    if (options) {
      // 如果设置了options
      children = this.formatOptions().map((option) => (
        <Checkbox
          disabled={'disabled' in option ? option.disabled : disabled}
          key={`${option.label}`}
          checked={value.indexOf(option.value) >= 0}
          className={`${prefix}-item`}
          onChange={option.onChange}
          value={option.value}
        >
          {option.label}
        </Checkbox>
      ));
    }
    return (
      <div {...({ className, style })} className={classString}>
        <CheckboxGroupContext.Provider
          value={{
            value,
            onGroupChange: this.onGroupChange,
          }}
        >
          {
            children
          }
        </CheckboxGroupContext.Provider>
      </div>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderGroup}
      </ConfigConsumer>
    );
  }
}

export default Group;
