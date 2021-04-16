import React, { Component, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

function retain(num: number, d: number) {
  return (parseInt(`${num * 100}`, 10) / 100).toFixed(d);
}

export interface StatisticProps extends React.HTMLAttributes<HTMLDivElement> {
  /* 用户自定义类前缀，默认uni-statistic */
  prefixCls?: string;
  /* 自定义数值展示 */
  formatter?: (value: string | number) => ReactNode;
  /* 数值精度 */
  precision?: number;
  /* 设置数值的前缀 */
  prefix?: ReactNode | undefined;
  /* 设置数值的后缀 */
  suffix?: ReactNode;
  /* 数值的标题 */
  title?: ReactNode;
  /* 数值内容 */
  value?: string | number;
  /* 设置数值的样式 */
  valueStyle?: CSSProperties;
}

export interface StatisticState {
  /* 数值内容 */
  value?: string | number;
}

class Statistic extends Component<StatisticProps, StatisticState> {
  static getDerivedStateFromProps(props: StatisticProps, state: StatisticState) {
    if (props.value !== state.value) {
      return {
        value: props.value,
      };
    }
    return null;
  }

  constructor(props: StatisticProps) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  renderStatistic = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, title, prefix, suffix, valueStyle, precision = 0, formatter, className, ...rest
    } = this.props;
    const { value = 0 } = this.state;
    let newValue = value;
    if (typeof newValue === 'number') {
      newValue = retain(newValue, precision).toLocaleString();
    }
    const classPrefix = getPrefixCls('statistic', prefixCls);
    const mainClass = classNames(classPrefix, className, {
      // [`${prefix}-has-sider`]: siders.length > 0,
    });

    return (
      <div {...rest} className={mainClass}>
        <div className={`${classPrefix}-title`}>{title}</div>
        <div className={`${classPrefix}-content`} style={valueStyle}>
          {prefix && <span className={`${classPrefix}-content-prefix`}>{prefix}</span>}
          <span className={`${classPrefix}-content-value`}>{formatter ? formatter(value) : newValue}</span>
          {suffix && <span className={`${classPrefix}-content-suffix`}>{suffix}</span>}
        </div>
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderStatistic}
      </ConfigConsumer>
    );
  }
}

export default Statistic;
