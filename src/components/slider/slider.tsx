/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable react/sort-comp */
import React, {
  ReactNode, useCallback, useContext, useEffect, useState,
} from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../config-provider/context';

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

// export interface SliderState {
//   value: number;
//   canDrop: boolean;
// }

let canDrop = false;
const Slider: React.FC<SliderProps> = (props: SliderProps) => {
  const {
    className,
    prefixCls,
    disabled = false,
    marks = [],
    max = 100,
    min = 0,
    onChange,
  } = props;
  const [value, setValue] = useState(props.value || props.defaultValue || 0);
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('slider', prefixCls);
  const wrapperClass = classnames(prefix, {
    [`${prefix}-disabled`]: disabled,
  }, className);

  const dotClass = classnames(`${prefix}-dot`, {});
  const markWraperClass = classnames(`${prefix}-mark`);

  const translateOffsetToValue = useCallback((evt: MouseEvent) => {
    const { pageXOffset } = window;
    // const { max = 100, min = 0 } = this.props;
    const offsetX = evt.pageX - left - pageXOffset;
    const value = (offsetX / width * max);
    let formatedValue = value;
    if (formatedValue > max) {
      formatedValue = max;
    }
    if (formatedValue < min) {
      formatedValue = min;
    }
    return formatedValue;
  }, [left, max, min, width]);

  const onRailClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // const { disabled } = this.props;
    if (disabled) return;
    const formatedValue = translateOffsetToValue(evt as unknown as MouseEvent);
    // const { onChange } = this.props;
    onChange && onChange(formateValue(formatedValue));
    setValue(formatedValue);
  };

  const getPosition = (value = 0) => {
    // const { max = 100 } = props;
    const barWidthPercentage: number = value / max * 100;
    const barWidthCss = `${barWidthPercentage}%`;
    return barWidthCss;
  };

  const formateValue = (value: number) => Math.round(value);

  const getNode = (node: HTMLDivElement) => {
    if (node) {
      const { width: containerWidth, left: containerLeft } = node?.getBoundingClientRect();
      setWidth(containerWidth);
      setLeft(containerLeft);
    }
  };

  const onMarkClick = (value: number) => () => {
    if (disabled) return;
    onChange && onChange(formateValue(value));
    setValue(value);
  };

  const onMouseMove = useCallback((evt: MouseEvent) => {
    console.log('candrop move', canDrop);
    if (canDrop) {
      const formatedValue = translateOffsetToValue(evt);
      onChange && onChange(formateValue(formatedValue));
      setValue(formatedValue);
    }
  }, [onChange, translateOffsetToValue]);

  const onMouseUp = useCallback((evt: MouseEvent) => {
    evt.stopPropagation();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    if (canDrop) {
      const formatedValue = translateOffsetToValue(evt);
      onChange && onChange(formateValue(formatedValue));
    }
    canDrop = false;
  }, [onChange, onMouseMove, translateOffsetToValue]);

  const onMouseDown = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) return;
    document.addEventListener('mousemove', onMouseMove, true);
    document.addEventListener('mouseup', onMouseUp, true);
    evt.stopPropagation();
    evt.preventDefault();
    canDrop = true;
  };

  return (
    <div className={wrapperClass} ref={getNode} onClick={onRailClick}>
      <div className={`${prefix}-rail`} />
      <div className={`${prefix}-bar`} style={{ width: getPosition(value) }} onClick={onRailClick} />
      {
        marks.map((mark) => (
          <div className={dotClass} style={{ left: getPosition(mark.value) }} onClick={onMarkClick(mark.value)} />
        ))
      }
      <div
        className={dotClass}
        style={{ left: getPosition(value), zIndex: 1 }}
        onMouseDown={onMouseDown}
      >
        <div
          className="uni-tooltip"
          style={{
            top: -45,
            visibility: canDrop ? 'visible' : 'hidden',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="uni-tooltip-content">
            <div className="uni-tooltip-content-arrow uni-tooltip-content-arrow-top" />
            <div className="uni-tooltip-content-inner">{Math.round(value)}</div>
          </div>
        </div>
      </div>
      <div className={markWraperClass}>
        {
          marks.map((mark) => (
            <span
              className={`${prefix}-mark-item`}
              style={{ left: getPosition(mark.value) }}
            >
              {mark.label}
            </span>
          ))
        }
      </div>
    </div>
  );
};
export default Slider;
