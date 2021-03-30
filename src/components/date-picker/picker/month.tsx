/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
import dayjs from 'dayjs';
import React from 'react';
import { PopupRangeMonth, PopupSingleMonth } from '../popup/month';
import { PopupSingleYear, PopupSingleYearRange } from '../popup/year';
import { PickFuncs, PopupProps } from '../types';
import { PickerRange, PickerSingle } from './picker';

export class PickerSingleMonth extends PickerSingle {
    protected getDefaultViewDate = () => dayjs(`${dayjs().format('YYYY-MM')}-01 00:00:00`);

    protected popupView = () => {
      const {
        modeType, selectedDate, viewDate, date,
      } = this.state;

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

      return (
        <PopupSingleMonth
          date={date}
          selectedDate={selectedDate}
          viewDate={viewDate!}
          {...this.popupSingleMonth}
        />
      );
    };

    private popupSingleMonth: PickFuncs<PopupProps<'single'>> = {
      onYear: () => this.changeModeType('year-single'),
      onDate: (date) => this.closePopup({ date }, true),
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
      onDate: (date) => this.changeModeType('month-single', { viewDate: date }),
      onIconClick: (tag) => {
        if (tag === 'doubleLeft') this.onDoubleLeft(10);
        if (tag === 'doubleRight') this.onDoubleRight(10);
      },
    };
}

export class PickerRangeMonth extends PickerRange {
    protected getDefaultViewDate = () => dayjs(`${dayjs().format('YYYY-MM')}-01 00:00:00`);

    protected popupView = () => {
      const {
        modeType, selectedDate, viewDate, date, position, hoverDate,
      } = this.state;

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

      const common = {
        date,
        position,
        hoverDate,
        selectedDate,
      };

      return (
        <div className="range">
          <div>
            <PopupRangeMonth
              {...common}
              viewDate={viewDate!}
              showDoubleRight={false}
              {...this.popupRangeMonth}
            />
          </div>
          <div>
            <PopupRangeMonth
              {...common}
              showDoubleLeft={false}
              viewDate={viewDate?.add(1, 'year')}
              {...this.popupRangeMonth}
            />
          </div>
        </div>

      );
    };

    private popupRangeMonth: PickFuncs<PopupProps<'single'>> = {
      onYear: () => this.changeModeType('year-single'),
      onDate: (date) => this.setState({ selectedDate: this.handleSelectDate(date) }, this.onDateNext),
      onMouseEnter: (date) => this.onMouseEnterDate(date),
      onMouseLeave: () => this.onMouseLeaveDate(),
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
      onDate: (date) => this.changeModeType('month-single', { viewDate: date }),
      onIconClick: (tag) => {
        if (tag === 'doubleLeft') this.onDoubleLeft(10);
        if (tag === 'doubleRight') this.onDoubleRight(10);
      },
    };
}
