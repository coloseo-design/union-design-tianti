/* eslint-disable react/prop-types */
import './styles';

import dayjs from 'dayjs';
import React, { RefObject } from 'react';
import { Picker } from './picker/picker';
import { PickerMode, PickerProps, PickerType } from './types';
import { PickerRangeTime, PickerSingleTime } from './picker/time';
import { PickerRangeDate, PickerSingleDate } from './picker/date';
import { PickerRangeMonth, PickerSingleMonth } from './picker/month';
import { PickerRangeYear, PickerSingleYear } from './picker/year';
import { cacheFunc } from '../utils/cacheFunc';

const handleSuffixIcon = cacheFunc((mode: PickerMode) => (mode.startsWith('time') ? 'time' : 'schedule-check'));

const handleSinglePlaceholder = cacheFunc((mode: PickerMode): string => {
  if (mode === 'time-full') return '请选择时间' as string;
  if (mode === 'time-ymd') return '请选择日期';
  if (mode === 'time-hms') return '请选择时间';
  if (mode === 'year') return '请选择年份';
  if (mode === 'month') return '请选择月份';
  if (mode === 'date') return '请选择日期';
  if (mode === 'date-time') return '请选择时间';
  // if (mode === 'week') return '请选择周';
  // if (mode === 'quarter') return '请选择季度';
  return '';
});

const handleRangePlaceholder = cacheFunc((mode: PickerMode): [string, string] => {
  if (mode === 'time-full') return ['开始时间', '结束时间'];
  if (mode === 'time-ymd') return ['开始日期', '结束日期'];
  if (mode === 'time-hms') return ['开始时间', '结束时间'];
  if (mode === 'year') return ['开始年份', '结束年份'];
  if (mode === 'month') return ['开始月份', '结束月份'];
  if (mode === 'date') return ['开始日期', '结束日期'];
  if (mode === 'date-time') return ['开始时间', '结束时间'];
  // if (mode === 'week-range') return ['开始周', '结束周'];
  // if (mode === 'quarter-range') return ['开始季度', '结束周'];
  return ['', ''];
});

const handleFromat = cacheFunc((mode: PickerMode) => {
  if (mode === 'time-full') return 'YYYY-MM-DD HH:mm:ss';
  if (mode === 'time-ymd') return 'YYYY-MM-DD';
  if (mode === 'time-hms') return 'HH:mm:ss';
  if (mode === 'year') return 'YYYY';
  if (mode === 'month') return 'YYYY-MM';
  if (mode === 'date') return 'YYYY-MM-DD';
  if (mode === 'date-time') return 'YYYY-MM-DD HH:mm:ss';
  // if (mode === 'week') return 'YYYY-MM';
  // if (mode === 'quarter') return 'YYYY-MM';
  return 'YYYY-MM-DD HH:mm:ss';
});

const DatePicker = React.forwardRef<
  RefObject<Picker<PickerType>>,
  PickerProps<PickerType>
>((props, ref) => {
  const { mode = 'date', type = 'single' } = props;

  const baseCommon = {
    mode,
    type,
    style: {},
    className: '',
    size: 'middle',
    disabled: false,
    allowClear: true,
    format: handleFromat(mode),
    suffixIcon: handleSuffixIcon(mode),
    yearRange: [1970, dayjs().add(50, 'year').get('year')],
    ...props,
  } as PickerProps<PickerType>;

  if (type === 'single') {
    const singleCommon = {
      width: 280,
      placeholder: handleSinglePlaceholder(mode),
      ...baseCommon,
    } as PickerProps<'single'>;

    if (mode.startsWith('time')) {
      return <PickerSingleTime {...singleCommon} ref={ref as RefObject<PickerSingleTime>} />;
    }

    if (mode.startsWith('year')) {
      return <PickerSingleYear {...singleCommon} ref={ref as RefObject<PickerSingleYear>} />;
    }

    if (mode.startsWith('month')) {
      return <PickerSingleMonth {...singleCommon} ref={ref as RefObject<PickerSingleMonth>} />;
    }

    if (mode.startsWith('date')) {
      return <PickerSingleDate {...singleCommon} ref={ref as RefObject<PickerSingleDate>} />;
    }
  }

  if (type === 'range') {
    const rangeCommon = {
      width: 380,
      placeholder: handleRangePlaceholder(mode),
      ...baseCommon,
    } as PickerProps<'range'>;

    if (mode.startsWith('time')) {
      return <PickerRangeTime {...rangeCommon} ref={ref as RefObject<PickerRangeTime>} />;
    }

    if (mode.startsWith('year')) {
      return <PickerRangeYear {...rangeCommon} ref={ref as RefObject<PickerRangeYear>} />;
    }

    if (mode.startsWith('month')) {
      return <PickerRangeMonth {...rangeCommon} ref={ref as RefObject<PickerRangeMonth>} />;
    }

    if (mode.startsWith('date')) {
      return <PickerRangeDate {...rangeCommon} ref={ref as RefObject<PickerRangeDate>} />;
    }
  }

  return <div />;
});

export default DatePicker;
