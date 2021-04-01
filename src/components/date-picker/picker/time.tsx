/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
import dayjs from 'dayjs';
import React from 'react';
import { PopupRangeTime, PopupSingleTime } from '../popup/time';
import { PickFuncs, PopupProps } from '../types';
import { PickerRange, PickerSingle } from './picker';

export class PickerSingleTime extends PickerSingle {
    protected getDefaultViewDate = () => dayjs(`${dayjs().get('year')}-01-01 00:00:00`);

    protected popupView = () => {
      const { mode, yearRange } = this.props;
      const { selectedDate, viewDate, date } = this.state;

      return (
        <PopupSingleTime
          date={date}
          selectedDate={selectedDate}
          viewDate={viewDate!}
          yearRange={yearRange}
          mode={mode}
          {...this.popupSingleTimeProps}
        />
      );
    };

    private popupSingleTimeProps: PickFuncs<PopupProps<'single'>> = {
      onDate: (date) => this.setState({ selectedDate: date, viewDate: date }),
      onNow: () => this.setState({ selectedDate: dayjs(), viewDate: dayjs() }),
      onOk: () => this.closePopup(({ selectedDate, date }) => ({ date: selectedDate ?? date }), true),
    };
}

export class PickerRangeTime extends PickerRange {
    protected getDefaultViewDate = () => dayjs(`${dayjs().get('year')}-01-01 00:00:00`);

    protected popupView = () => {
      const { mode, yearRange } = this.props;
      const {
        selectedDate, viewDate, date, position,
      } = this.state;

      return (
        <PopupRangeTime
          position={position!}
          date={date ?? []}
          selectedDate={selectedDate ?? []}
          viewDate={viewDate!}
          yearRange={yearRange}
          mode={mode}
          {...this.popupSingleTimeProps}
        />
      );
    };

    private popupSingleTimeProps: PickFuncs<PopupProps<'range'>> = {
      onDate: (date) => this.setState({
        selectedDate: this.handleSelectDate(date),
        viewDate: date,
      }),
      onNow: () => this.setState({
        selectedDate: this.handleSelectDate(dayjs()),
        viewDate: dayjs(),
      }),
      onOk: () => this.onDateNext(),
    };
}
