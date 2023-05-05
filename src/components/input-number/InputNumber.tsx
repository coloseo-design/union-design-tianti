/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';
import Icon from '@union-design/icon';
import { InputNumberProps } from './types';

class InputNumber extends React.Component<InputNumberProps, { value: string | number }> {
  static defaultProps = {
    size: 'default',
    step: 1,
  }

  private inputNumberRef = React.createRef<HTMLInputElement>();

  constructor(props: InputNumberProps) {
    super(props);
    const { defaultValue, value } = props;
    this.state = {
      value: defaultValue ?? value ?? '',
    };
  }

  componentDidMount() {
    const { value } = this.state;
    this.setState({ value: this.getFormatter(value).value });
  }

  componentDidUpdate(prevProps: InputNumberProps) {
    const { value } = this.props;
    if (value !== prevProps.value) {
      const temp = this.getFormatter(value);
      this.setState({ value: temp.value });
    }
  }

  getFormatter = (value?: string | number) => {
    const { formatter, min, max } = this.props;
    let res = value || 0;
    if (typeof min !== 'undefined' && Number(res) < min) res = min;
    if (typeof max !== 'undefined' && Number(res) > max) res = max;
    const val = this.handlePrecision(res);
    if (formatter) {
      return {
        value: value === '' ? value : formatter(val || ''),
        numberValue: value === '' ? value : val,
      };
    }
    return {
      value: value === '' ? value : val,
      numberValue: value === '' ? value : val,
    };
  }

  changeNumber = (currentValue: string | number) => {
    const { parser } = this.props;
    const value = parser ? parser(`${currentValue}`) : currentValue;
    const result = typeof value === 'string'
      ? value.indexOf('.') > -1
        ? parseFloat(value)
        : value.replace(/[^-?\d]/g, '')
      : value;

    return result;
  };

  handleBlur = () => {
    const { onChange } = this.props;
    const { value } = this.state;
    const res = this.changeNumber(value);
    const { value: formatterValue, numberValue } = this.getFormatter(res);
    this.setState({ value: formatterValue });
    this.inputNumberRef.current?.blur();
    onChange?.(this.handlePrecision(numberValue));
  }

  handlePrecision = (value: string | number) => {
    const { precision, step = 1, isRound = true } = this.props;
    let result: number | string = '';
    if (!(typeof value === 'string' && !value)) {
      const precisionT = precision || `${step}`.split('.').slice(1).join('').length;
      const needDecimal = precision || `${step}`.indexOf('.') > -1;
      const nD = Number('1'.padEnd((precision || 0) + 1, '0'));
      const hasPrecision = isRound
        ? Number(value).toFixed(precisionT)
        : (Math.floor(+value * nD) / nD).toFixed(precisionT);
      result = needDecimal ? hasPrecision : Number(value);
    }
    return result;
  }

  handleStep = (key: 'down' | 'up') => {
    const { value } = this.state;
    const { step = 1, onStep, onChange } = this.props;
    const current = +(this.changeNumber(value) || 0);
    const result = key === 'up' ? current + step : current - step;
    const { value: formatterValue, numberValue } = this.getFormatter(result);
    this.setState({ value: formatterValue });
    onStep?.(numberValue as number, { offset: step, type: key });
    onChange?.(numberValue);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    this.setState({ value: event.target.value });
    onChange?.(event.target.value);
  }

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const { onChange, onPressEnter } = this.props;
      const { value } = this.state;
      const val = this.changeNumber(value);
      const { value: formatterValue, numberValue } = this.getFormatter(val);
      this.setState({ value: formatterValue });
      onChange?.(numberValue);
      onPressEnter?.(numberValue);
    }
  }

  component = ({ getPrefixCls }: ConfigConsumerProps): React.ReactNode => {
    const {
      disabled,
      max,
      min,
      type = 'default',
      size,
      className, style,
    } = this.props;
    const { value } = this.state;
    const prefix = getPrefixCls('number');

    const prefixSize = classNames(prefix, className, {
      [`${prefix}-${size}`]: size,
      [`${prefix}-disabled`]: disabled,
      [`${prefix}-${type}`]: type === 'both',
    });

    const minDisabled = min && Number(this.changeNumber(value)) <= min;
    const maxDisabled = max && Number(this.changeNumber(value)) >= max;

    return (
      <div className={prefixSize} style={style}>
        <div className={classNames(`${prefix}-input-wrap`)}>
          {type === 'both' && (
          <div
            onClick={() => { this.handleStep('down'); }}
            className={classNames(`${prefix}-side`, `${prefix}-side-left`, {
              [`${prefix}-side-left-disabled`]: minDisabled || disabled,
            })}
          />
          )}
          <input
            value={value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            ref={this.inputNumberRef}
            onKeyDown={this.handleKeyPress}
            disabled={disabled}
          />
          {type === 'default' && (
          <div className={classNames(`${prefix}-steps`)}>
            <div
              onClick={() => { this.handleStep('up'); }}
              className={classNames((maxDisabled || disabled) && `${prefix}-steps-disabled`)}
            >
              <Icon type="up" />
            </div>
            <div
              onClick={() => { this.handleStep('down'); }}
              className={classNames((minDisabled || disabled) && `${prefix}-steps-disabled`)}
            >
              <Icon type="down" />
            </div>
          </div>
          )}
          {type === 'both' && (
          <div
            onClick={() => { this.handleStep('up'); }}
            className={classNames(`${prefix}-side`, {
              [`${prefix}-side-disabled`]: maxDisabled || disabled,
            })}
          >
            <Icon type="add" />
          </div>
          )}
        </div>
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.component}
      </ConfigConsumer>
    );
  }
}

export default React.forwardRef((props: InputNumberProps, ref: React.ForwardedRef<HTMLInputElement>) => <InputNumber {...props} ref={ref as any} />);
