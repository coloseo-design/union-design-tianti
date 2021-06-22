/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import {
  PopupRangeDate, PopupRangeDatetime, PopupSingleDate, PopupSingleDatetime,
} from '../popup/date';
import { PopupSingleMonth } from '../popup/month';
import { PopupSingleYear, PopupSingleYearRange } from '../popup/year';
import { PickerModeType, PickFuncs, PopupProps } from '../types';
import { PickerRange, PickerSingle } from './picker';

export class PickerSingleDate extends PickerSingle {
    protected getDefaultViewDate = () => dayjs(`${dayjs().format('YYYY-MM-DD')} 00:00:00`);

    private initModeType!: PickerModeType;

    protected popupView = () => {
      const {
        modeType, selectedDate, viewDate, date,
      } = this.state;
      this.initModeType ??= modeType;
      if (modeType === 'year-single') {
        return (
          <PopupSingleYear
            viewDate={viewDate!}
            {...this.popupSingleYear}
          />
        );
      }

      if (modeType === 'range-year') {
        return (
          <PopupSingleYearRange
            viewDate={viewDate!}
            {...this.popupSingleYearRange}
          />
        );
      }

      if (modeType === 'month-single') {
        return (
          <PopupSingleMonth
            viewDate={viewDate!}
            {...this.popupSingleMonth}
          />
        );
      }

      const common = {
        date,
        selectedDate,
        viewDate: viewDate!,
      };

      if (modeType === 'date-time-single') {
        return (
          <PopupSingleDatetime
            {...common}
            {...this.popupSingleDatetime}
          />
        );
      }

      return (
        <PopupSingleDate
          {...common}
          {...this.popupSingleDate}
        />
      );
    };

    private popupSingleDate: PickFuncs<PopupProps<'single'>> = {
      onNow: () => this.closePopup({ date: dayjs() }, true),
      onYear: () => this.changeModeType('year-single'),
      onMonth: () => this.changeModeType('month-single'),
      onDate: (date) => this.closePopup({ date }, true),
      onIconClick: (tag) => {
        if (tag === 'doubleLeft') this.onDoubleLeft();
        if (tag === 'doubleRight') this.onDoubleRight();
        if (tag === 'left') this.onLeft();
        if (tag === 'right') this.onRight();
      },
    };

    private popupSingleDatetime: PickFuncs<PopupProps<'single'>> = {
      ...this.popupSingleDate,
      onNow: () => this.setState({ selectedDate: dayjs(), viewDate: dayjs() }),
      onDate: (date) => this.setState({ selectedDate: date, viewDate: date }),
      onOk: () => this.closePopup(({ selectedDate, date }) => ({ date: selectedDate ?? date }), true),
    };

    private popupSingleMonth: PickFuncs<PopupProps<'single'>> = {
      onYear: () => this.changeModeType('year-single'),
      onDate: (date) => this.changeModeType(this.initModeType, { viewDate: date }),
      onIconClick: (tag) => {
        if (tag === 'doubleLeft') this.onDoubleLeft();
        if (tag === 'doubleRight') this.onDoubleRight();
      },
    };

    private popupSingleYearRange: PickFuncs<PopupProps<'single'>> = {
      onDate: (date) => this.changeModeType('year-single', { viewDate: date }),
      onIconClick: (tag) => {
        if (tag === 'doubleLeft') this.onDoubleLeft(100);
        if (tag === 'doubleRight') this.onDoubleRight(100);
      },
    };

    private popupSingleYear: PickFuncs<PopupProps<'single'>> = {
      onYear: () => this.changeModeType('range-year'),
      onDate: (date) => this.changeModeType(this.initModeType, { viewDate: date }),
      onIconClick: (tag) => {
        if (tag === 'doubleLeft') this.onDoubleLeft(10);
        if (tag === 'doubleRight') this.onDoubleRight(10);
      },
    };
}

export class PickerRangeDate extends PickerRange {
    protected getDefaultViewDate = () => dayjs(`${dayjs().format('YYYY-MM-DD')} 00:00:00`);

    private initModeType!: PickerModeType;

    protected popupView = () => {
      const {
        modeType, selectedDate, viewDate, date, position, hoverDate,
      } = this.state;
      this.initModeType ??= modeType;

      if (modeType === 'year-single') {
        return (
          <PopupSingleYear
            viewDate={viewDate!}
            {...this.popupSingleYear}
          />
        );
      }

      if (modeType === 'range-year') {
        return (
          <PopupSingleYearRange
            viewDate={viewDate!}
            {...this.popupSingleYearRange}
          />
        );
      }

      if (modeType === 'month-single') {
        return (
          <PopupSingleMonth
            viewDate={viewDate!}
            {...this.popupSingleMonth}
          />
        );
      }

      const common = {
        date,
        position,
        hoverDate,
        selectedDate,
      };

      if (modeType === 'date-time-range') {
        return (
          <PopupRangeDatetime
            {...common}
            viewDate={viewDate!}
            {...this.popupRangeDatetime}
          />
        );
      }

      return (
        <div className={this.gpc('picker-range')}>
          <div>
            <PopupRangeDate
              {...common}
              showRight={false}
              showDoubleRight={false}
              viewDate={viewDate!}
              showFooter={false}
              {...this.popupRangeDate}
            />
          </div>
          <div>
            <PopupRangeDate
              {...common}
              showLeft={false}
              showDoubleLeft={false}
              showFooter={false}
              viewDate={viewDate?.add(1, 'month') as Dayjs}
              {...this.popupRangeDate}
            />
          </div>
        </div>
      );
    };

    private popupRangeDate: PickFuncs<PopupProps<'range'>> = {
      onYear: () => this.changeModeType('year-single'),
      onMonth: () => this.changeModeType('month-single'),
      onDate: (date) => this.setState({ selectedDate: this.handleSelectDate(date) }, this.onDateNext),
      onMouseEnter: (date) => this.onMouseEnterDate(date),
      onMouseLeave: () => this.onMouseLeaveDate(),
      onIconClick: (tag) => {
        if (tag === 'doubleLeft') this.onDoubleLeft();
        if (tag === 'doubleRight') this.onDoubleRight();
        if (tag === 'left') this.onLeft();
        if (tag === 'right') this.onRight();
      },
    };

    private popupRangeDatetime: PickFuncs<PopupProps<'range'>> = {
      ...this.popupRangeDate,
      onNow: () => () => this.setState({
        selectedDate: this.handleSelectDate(dayjs()),
        viewDate: dayjs(),
      }),
      onDate: (date) => this.setState({
        selectedDate: this.handleSelectDate(date),
        viewDate: date,
      }),
      onOk: () => this.onDateNext(),
    };

    private popupSingleMonth: PickFuncs<PopupProps<'single'>> = {
      onYear: () => this.changeModeType('year-single'),
      onDate: (date) => this.changeModeType(this.initModeType, { viewDate: date }),
      onIconClick: (tag) => {
        if (tag === 'doubleLeft') this.onDoubleLeft();
        if (tag === 'doubleRight') this.onDoubleRight();
      },
    };

    private popupSingleYearRange: PickFuncs<PopupProps<'single'>> = {
      onDate: (date) => this.changeModeType('year-single', { viewDate: date }),
      onIconClick: (tag) => {
        if (tag === 'doubleLeft') this.onDoubleLeft(100);
        if (tag === 'doubleRight') this.onDoubleRight(100);
      },
    };

    private popupSingleYear: PickFuncs<PopupProps<'single'>> = {
      onYear: () => this.changeModeType('range-year'),
      onDate: (date) => this.changeModeType(this.initModeType, { viewDate: date }),
      onIconClick: (tag) => {
        if (tag === 'doubleLeft') this.onDoubleLeft(10);
        if (tag === 'doubleRight') this.onDoubleRight(10);
      },
    };
}
