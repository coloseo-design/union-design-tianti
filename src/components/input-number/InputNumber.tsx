/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/sort-comp */
import React, { ReactText } from 'react';
import classNames from 'classnames';
import { ConfigConsumer } from '../config-provider';
import Icon from '../icon';
import getPrefixCls from '../utils/getPrefixCls';
import { InputNumberProps } from './types';

// const InputNumber = (props: InputNumberProps) => {
class InputNumber extends React.Component<InputNumberProps, { value: ReactText }> {
  static defaultProps = {
    size: 'default',
    step: 1,
  }

  constructor(props: InputNumberProps) {
    super(props);
    const { defaultValue, value, formatter } = props;
    const formaterValue: ReactText = formatter ? formatter(defaultValue ?? value ?? '') : defaultValue ?? value ?? '';
    this.state = {
      value: formaterValue,
    };
  }

  private inputNumberRef = React.createRef<HTMLInputElement>();

  foucs() {
    this.inputNumberRef.current?.focus();
  }

  blur() {
    this.inputNumberRef.current?.blur();
  }

  component = (): React.ReactNode => {
    const {
      value, disabled, max, min, size, step, readOnly, className, precision, style, onPressEnter, onChange, onStep, formatter, parser,
    } = this.props;
    // 将传递给input的属性组合
    const compse = {
      disabled, step, max, min, readOnly,
    };
    let { value: val } = this.state;
    // 自定义高度
    const prefix: string = getPrefixCls('number');
    const input_wrap: string = getPrefixCls('number-input-wrap');
    const handle_wrap: string = getPrefixCls('number-handle-wrap');
    const size_class = `${prefix}-${size}`;
    const up_class = getPrefixCls('number-handle-wrap-up');
    const down_class = getPrefixCls('number-handle-wrap-down');
    const input_diable: string = classNames('', '', {
      [`${prefix}-input`]: 'input',
      [`${prefix}-disable`]: disabled,
    });
    const prefixSize: string = classNames(prefix, className, {
      [size_class]: !(style && style.height),
      [`${prefix}-disable`]: disabled,
    });
    const input_wrap_size: string = classNames(input_wrap);
    const handle_wrap_size: string = classNames(handle_wrap);
    const handleStep = (type: 'up' | 'down'): void => {
      // step必须是数字且类型为number
      const isStep: number = step ?? 0;
      let result: ReactText = val;
      // 解析值
      if (parser) {
        val = +parser(val);
      }
      result = type === 'up' ? +val + isStep : +val - isStep;
      if (min && typeof (min) === 'number' && result < min && result >= Number.MIN_SAFE_INTEGER) {
        result = min;
      }
      if (max && typeof (max) === 'number' && result > max && result <= Number.MAX_SAFE_INTEGER) {
        result = max;
      }
      // todo 小数精度问题
      result = +result.toFixed(precision);
      this.setState({
        value: formatter ? formatter(result) : result,
      });
      if (onStep) {
        onStep(result, { offset: isStep, type });
      }
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
      event.preventDefault();
      this.inputNumberRef.current?.blur();
    };
    /**
     * 上下箭头， enter
     * @param event
     */
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
      event.preventDefault();
      // @ts-ignore
      const { key, target: { value } } = event;
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        handleStep(key === 'ArrowUp' ? 'up' : 'down');
      }
      if (key === 'Enter' && onPressEnter) {
        onPressEnter(value, { offset: step ?? 0, key });
      }
    };
    /**
     * 输入框change
     * @param event
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { target: { value: val } } = event;
      const parserValue: number = parser ? +parser(val) : +val;
      const formatValue: string = formatter ? formatter(parserValue) : val;
      this.setState({ value: formatValue });
      if (onChange) {
        onChange(parserValue);
      }
    };
    return (
      <div style={style} className={prefixSize}>
        <div className={input_wrap_size}>
          <input
            {...compse}
            value={val}
            ref={this.inputNumberRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyPress}
            className={input_diable}
          />
        </div>
        {
          disabled
          || (
          <div className={handle_wrap_size}>
            <span
              style={{ cursor: (max && val === max) ? 'not-allowed' : 'pointer' }}
              className={up_class}
              onClick={handleStep.bind(null, 'up')}
            >
              <Icon type="up" />
            </span>
            <span
              style={{ cursor: (min && value === min) ? 'not-allowed' : 'pointer' }}
              className={down_class}
              onClick={handleStep.bind(null, 'down')}
            >
              <Icon type="down" />
            </span>
          </div>
          )
        }
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

export default React.forwardRef((props: InputNumberProps, ref: React.MutableRefObject<HTMLInputElement>) => <InputNumber {...props} ref={ref} />);
