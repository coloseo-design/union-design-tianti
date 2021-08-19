/* eslint-disable jsx-a11y/aria-props */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon/index';

export interface RateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  // 是否允许半选
  allowHalf?: boolean;
  // star 总数
  count?: number;
  // 默认值
  defaultValue?: number;
  // 自定义样式类名
  className?: string;
  // 当前数，受控值
  value?: number;
  // 选择时的回调
  onChange?: (value: number) => void;
  forwardedRef?: React.MutableRefObject<HTMLInputElement>;
  /* 用户自定义类前缀，默认uni-input */
  prefixCls?: string;
}

export interface RateState {
  value?: number;
  arr?: number[];
}

class Rate extends Component<RateProps, RateState> {
  static defaultProps: RateProps = {
    value: 0,
    onChange: () => {},
    count: 5,
  };

  constructor(props: RateProps) {
    super(props);
    const arr = Array.from(Array(props.allowHalf ? props.count * 2 : props.count), (v, k) => k + 1);
    const _value = props.allowHalf ? (props.value || props.defaultValue) * 2 : props.value || props.defaultValue;
    this.state = {
      arr,
      value: [...arr].reverse()[_value - 1],
    };
  }

  componentDidUpdate(prevProps: RateProps) {
    const { value = 0 } = this.props;
    const { props } = this;
    if (value !== prevProps.value) {
      const arr = Array.from(Array(props.allowHalf ? props.count * 2 : props.count), (v, k) => k + 1);
      const _value = props.allowHalf ? (props.value) * 2 : props.value;
      this.setState({
        value: [...arr].reverse()[_value - 1],
      });
    }
  }

  renderRate = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      forwardedRef, onChange, prefixCls, allowHalf, className, ...rest
    } = this.props;
    const { value, arr } = this.state;

    const prefix = getPrefixCls('rate', prefixCls);
    const mainClass = classNames(prefix, className, {
      // [`${prefix}-allowHalf`]: allowHalf,
    });
    const handleClick = (index: number) => {
      const value = arr[index];
      this.setState({ value });
      if (onChange) {
        const _value = [...arr].reverse()[value - 1];
        onChange(allowHalf ? _value / 2 : _value);
      }
    };

    if (allowHalf) {
      return (
        <div {...rest} className={mainClass} ref={forwardedRef}>
          {(arr || []).map((item, index) => (
            <div
              className="allowHalf"
              role="radio"
              aria-name="rate"
              area-type={item % 2 ? 'right' : 'left'}
              aria-checked={item >= value}
              key={item}
              onClick={handleClick.bind(null, index)}
              style={{
                width: item % 2 ? '25px' : '5px',
                paddingRight: item % 2 ? '5px' : 0,
                marginRight: item % 2 ? '-5px' : 0,
                zIndex: item % 2 ? 1 : 2,
              }}
            >
              {item % 2
                ? <Icon type="favorite" />
                : <Icon type="half-star" />}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div {...rest} className={mainClass} ref={forwardedRef}>
        {(arr || []).map((item, index) => (
          <div role="radio" aria-name="rate" aria-checked={item >= value} key={item} onClick={handleClick.bind(null, index)}>
            <Icon type="favorite" />
          </div>
        ))}
      </div>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderRate}
      </ConfigConsumer>
    );
  }
}

export default React.forwardRef((props: RateProps, ref) => (
  <Rate {...props} forwardedRef={ref} />
));
