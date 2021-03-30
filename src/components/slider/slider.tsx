/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable react/sort-comp */
import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Tooltip from '../tooltip';

interface mark {
  label: ReactNode;
  value: number;
}
export interface SliderProps {
  /* 默认值 */
  defaultValue?: number;
  /* 滑块取值，默认为0 */
  value: number;
  /* 滑块拖拽事件 */
  onChange?: (value: number) => void;
  /** 自定义类名称 */
  className?: string;
  /** 自定义类前缀 */
  prefixCls?: string;
  /* 滑块的最大区间，默认为0 */
  min?: number;
  /* 滑块的最大区间，默认为10 */
  max?: number;
  /** 是否水平方向 默认false */
  vertical?: boolean;
  marks?: mark[];
  /* 是否被禁用 */
  disabled?: boolean;
}

export interface SliderState {
  value: number;
  canDrop: boolean;
}

class Slider extends React.Component<SliderProps, SliderState> {
  node?: HTMLDivElement;

  constructor(props: SliderProps) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || 0,
      canDrop: false,
    };
  }

  getNode = (node: HTMLDivElement) => {
    this.node = node;
  }

  componentDidUpdate(props: SliderProps) {
    const { value } = this.props;
    if (value != props.value) {
      this.setState({
        value,
      });
    }
  }

  translateOffsetToValue = (evt: MouseEvent) => {
    const { pageXOffset } = window;
    const { max = 100, min = 0 } = this.props;
    const { width: containerWidth, left } = this.node?.getBoundingClientRect();
    const offsetX = evt.pageX - left - pageXOffset;
    const value = (offsetX / containerWidth * max);
    let formatedValue = value;
    if (formatedValue > max) {
      formatedValue = max;
    }
    if (formatedValue < min) {
      formatedValue = min;
    }
    return formatedValue;
  }

  onRailClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { disabled } = this.props;
    if (disabled) return;
    const formatedValue = this.translateOffsetToValue(evt as unknown as MouseEvent);
    const { onChange } = this.props;
    onChange && onChange(this.formateValue(formatedValue));
    this.setState({
      value: formatedValue,
    });
  };

  onMouseMove = (evt: MouseEvent) => {
    if (this.state.canDrop) {
      const formatedValue = this.translateOffsetToValue(evt);
      const { onChange } = this.props;
      onChange && onChange(this.formateValue(formatedValue));
      this.setState({
        value: formatedValue,
      });
    }
  }

  formateValue = (value: number) => Math.round(value)

  onMouseUp = (evt: MouseEvent) => {
    evt.stopPropagation();
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.setState({
      canDrop: false,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseDown = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { disabled } = this.props;
    if (disabled) return;
    evt.stopPropagation();
    evt.preventDefault();
    this.setState({
      canDrop: true,
    });
    document.addEventListener('mousemove', this.onMouseMove, true);
    document.addEventListener('mouseup', this.onMouseUp, true);
  }

  getPosition = (value = 0) => {
    const { max = 100 } = this.props;
    const barWidthPercentage: number = value / max * 100;
    const barWidthCss = `${barWidthPercentage}%`;
    return barWidthCss;
  }

  onMarkClick = (value: number) => () => {
    const { disabled } = this.props;
    if (disabled) return;
    const { onChange } = this.props;
    onChange && onChange(this.formateValue(value));
    this.setState({
      value,
    });
  };

  renderSlider = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      className, prefixCls, disabled = false, marks = [],
    } = this.props;
    const { value = 0 } = this.state;
    const prefix = getPrefixCls!('slider', prefixCls);
    const wrapperClass = classnames(prefix, {
      [`${prefix}-disabled`]: disabled,
    }, className);

    const dotClass = classnames(`${prefix}-dot`, {});
    const markWraperClass = classnames(`${prefix}-mark`);

    return (
      <div className={wrapperClass} ref={this.getNode} onClick={this.onRailClick}>
        <div className={`${prefix}-rail`} />
        <div className={`${prefix}-bar`} style={{ width: this.getPosition(value) }} onClick={this.onRailClick} />
        {
          marks.map((mark) => (
            <div className={dotClass} style={{ left: this.getPosition(mark.value) }} onClick={this.onMarkClick(mark.value)} />
          ))
        }
        <Tooltip trigger="hover" message={Math.round(value)}>
          <div className={dotClass} style={{ left: this.getPosition(value), zIndex: 1 }} onMouseDown={this.onMouseDown} />
        </Tooltip>
        <div className={markWraperClass}>
          {
            marks.map((mark) => (
              <span
                className={`${prefix}-mark-item`}
                style={{ left: this.getPosition(mark.value) }}
              >
                {mark.label}
              </span>
            ))
          }
        </div>
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderSlider}
      </ConfigConsumer>
    );
  }
}

export default Slider;
