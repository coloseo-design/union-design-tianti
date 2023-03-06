/* eslint-disable no-mixed-operators */
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import classnames from 'classnames';
import { ConfigContext } from '@union-design/config-provider/context';
import { SliderProps } from './type';

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
    value: valueFromProps,
    defaultValue,
  } = props;
  const [value, setValue] = useState(valueFromProps || defaultValue || 0);
  const [isDrop, setIsDrop] = useState(false);
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);
  useEffect(() => {
    if (typeof valueFromProps !== 'undefined') {
      setValue(valueFromProps);
    }
  }, [valueFromProps]);
  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('slider', prefixCls);
  const wrapperClass = classnames(prefix, {
    [`${prefix}-disabled`]: disabled,
  }, className);

  const dotClass = classnames(`${prefix}-dot`, {});
  const markWraperClass = classnames(`${prefix}-mark`);

  const translateOffsetToValue = useCallback((evt: MouseEvent) => {
    const { pageXOffset } = window;
    const offsetX = evt.pageX - left - pageXOffset;
    const newValue = (offsetX / width * max);
    let formatedValue = newValue;
    if (formatedValue > max) {
      formatedValue = max;
    }
    if (formatedValue < min) {
      formatedValue = min;
    }
    return formatedValue;
  }, [left, max, min, width]);

  const onRailClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) return;
    const formatedValue = translateOffsetToValue(evt as unknown as MouseEvent);
    onChange && onChange(formateValue(formatedValue));
    setValue(formateValue(formatedValue));
  };

  const getPosition = (newValue = 0) => {
    const barWidthPercentage: number = newValue / max * 100;
    const barWidthCss = `${barWidthPercentage}%`;
    return barWidthCss;
  };

  const formateValue = (newValue: number) => Math.round(newValue);

  const getNode = (node: HTMLDivElement) => {
    if (node) {
      const { width: containerWidth, left: containerLeft } = node?.getBoundingClientRect();
      setWidth(containerWidth);
      setLeft(containerLeft);
    }
  };

  const onMarkClick = (newValue: number) => () => {
    if (disabled) return;
    onChange && onChange(formateValue(newValue));
    setValue(newValue);
  };

  const onMouseMove = useCallback((evt: MouseEvent) => {
    if (canDrop) {
      const formatedValue = translateOffsetToValue(evt);
      onChange && onChange(formateValue(formatedValue));
      setValue(formateValue(formatedValue));
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
    setIsDrop(false);
  }, [onChange, onMouseMove, translateOffsetToValue]);

  const onMouseDown = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) return;
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
    evt.stopPropagation();
    evt.preventDefault();
    canDrop = true;
    setIsDrop(true);
  };

  return (
    <div className={wrapperClass} ref={getNode} onClick={onRailClick}>
      <div className={`${prefix}-rail`} />
      <div className={`${prefix}-bar`} style={{ width: getPosition(value) }} onClick={onRailClick} />
      {
        marks.map((mark) => (
          <div
            key={`${mark.value}`}
            className={dotClass}
            style={{ left: getPosition(mark.value) }}
            onClick={onMarkClick(mark.value)}
          />
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
            visibility: isDrop ? 'visible' : 'hidden',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="uni-tooltip-content">
            <div className="uni-tooltip-content-arrow uni-tooltip-content-arrow-top" />
            <div className="uni-tooltip-content-inner">{formateValue(value)}</div>
          </div>
        </div>
      </div>
      <div className={markWraperClass}>
        {
          marks.map((mark) => (
            <span
              key={`${mark.value}`}
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
