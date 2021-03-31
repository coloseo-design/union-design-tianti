/* eslint-disable max-len */
/* eslint-disable camelcase */

import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer } from '../config-provider';
import Icon from '../icon';
import getPrefixCls from '../utils/getPrefixCls';
import { InputNumberProps } from './types';

class InputNumber extends React.Component<InputNumberProps, { value: string | number }> {
  static defaultProps = {
    size: 'default',
    step: 1,
  }

  private inputNumberRef = React.createRef<HTMLInputElement>();

  constructor(props: InputNumberProps) {
    super(props);
    const { defaultValue, value, formatter } = props;
    const formaterValue = formatter ? formatter(defaultValue ?? value ?? '') : defaultValue ?? value ?? '';
    this.state = {
      value: formaterValue,
    };
  }

  componentDidUpdate(prevProps: InputNumberProps) {
    const { value } = this.props;
    if (value !== prevProps.value) {
      this.setState({ value: value || '' });
    }
  }

  foucs = () => {
    this.inputNumberRef.current?.focus();
  }

  changeNumber = (currentValue: string | number) => {
    let result;
    const reg = /\d+(\.\d+)?/g; // 提取数字
    const numberval = currentValue && currentValue !== '' ? currentValue.toString().match(reg) : undefined;
    if (numberval) {
      const str = numberval.join(',');
      result = str.replace(/,/g, ''); // 去掉逗号
    }
    return result;
  };

  blur = () => {
    const { onChange, precision } = this.props;
    const { value } = this.state;
    const res = this.changeNumber(value);
    const result = res && precision ? Number(res).toFixed(precision) : res || '';
    onChange && onChange(result);
    this.setState({ value: result });
    this.inputNumberRef.current?.blur();
  }

  component = (): React.ReactNode => {
    const {
      value,
      disabled,
      max,
      min,
      size, step, className, precision, style, onPressEnter, onChange, onStep, formatter, parser,
    } = this.props;
    // 将传递给input的属性组合
    const compse = {
      disabled, step, max, min,
    };
    const { value: val } = this.state;
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
      let result = this.changeNumber(val) || 0;
      result = type === 'up' ? +result + isStep : +result - isStep;
      if (min && typeof (min) === 'number' && result < min && result >= Number.MIN_SAFE_INTEGER) {
        result = min;
      }
      if (max && typeof (max) === 'number' && result > max && result <= Number.MAX_SAFE_INTEGER) {
        result = max;
      }
      // todo 小数精度问题
      result = +result.toFixed(precision);
      this.setState({
        value: result,
      });
      if (onStep) {
        onStep(result, { offset: isStep, type });
      }
      onChange && onChange(result);
    };
    /**
     * 上下箭头， enter
     * @param event
     */
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
      const { key } = event;
      if (key === 'ArrowUp' || key === 'ArrowDown') {
        handleStep(key === 'ArrowUp' ? 'up' : 'down');
      }
      if (key === 'Enter' && onPressEnter) {
        onPressEnter(event);
      }
    };
    /**
     * 输入框change
     * @param event
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      this.setState({ value: event.target.value });
      console.log('dewdw2222222222', event.target.value);
      onChange && onChange(event.target.value);
    };
    let last = val;
    if (parser) {
      last = parser(last.toString());
    }
    if (formatter) {
      last = formatter(last);
    }
    return (
      <div style={style} className={prefixSize}>
        <div className={input_wrap_size}>
          <input
            {...compse}
            value={last}
            ref={this.inputNumberRef}
            onChange={handleChange}
            onKeyUp={handleKeyPress}
            className={input_diable}
            onFocus={this.foucs}
            onBlur={this.blur}
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

export default React.forwardRef((props: InputNumberProps, ref: React.ForwardedRef<HTMLInputElement>) => <InputNumber {...props} ref={ref} />);
