/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-classes-per-file */
import dayjs from 'dayjs';
import React from 'react';
import { PopupRangeYear, PopupSingleYear, PopupSingleYearRange } from '../popup/year';
import { PickFuncs, PopupProps } from '../types';
import { PickerRange, PickerSingle } from './picker';

export class PickerSingleYear extends PickerSingle {
  protected getDefaultViewDate = () => dayjs(`${dayjs().get('year')}-01-01 00:00:00`);

  protected popupView = () => {
    const {
      modeType, selectedDate, viewDate, date,
    } = this.state;

    const common = {
      date,
      selectedDate,
      viewDate: viewDate!,
    };

    if (modeType === 'range-year') {
      return (
        <PopupSingleYearRange
          {...common}
          {...this.popupSingleYearRange}
        />
      );
    }

    return (
      <PopupSingleYear
        {...common}
        {...this.popupSingleYear}
      />
    );
  };

  private popupSingleYear: PickFuncs<PopupProps<'single'>> = {
    onYear: () => this.changeModeType('range-year'),
    onDate: (date) => this.closePopup({ date }, true),
    onIconClick: (tag) => {
      if (tag === 'doubleLeft') this.onDoubleLeft(10);
      if (tag === 'doubleRight') this.onDoubleRight(10);
    },
  };

  private popupSingleYearRange: PickFuncs<PopupProps<'single'>> = {
    onDate: (date) => this.changeModeType('year-single', { viewDate: date }),
    onIconClick: (tag) => {
      if (tag === 'doubleLeft') this.onDoubleLeft(100);
      if (tag === 'doubleRight') this.onDoubleRight(100);
    },
  };
}

export class PickerRangeYear extends PickerRange {
  protected getDefaultViewDate = () => dayjs(`${dayjs().get('year')}-01-01 00:00:00`);

  protected popupView = () => {
    const {
      modeType, selectedDate, viewDate, date, hoverDate, position,
    } = this.state;

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
      <div className={this.gpc('picker-range')}>
        <div>
          <PopupRangeYear
            {...common}
            viewDate={viewDate!}
            showDoubleRight={false}
            disabledValue={this.props.disabledValue}
            {...this.popupSingleRangeYear}
          />
        </div>
        <div>
          <PopupRangeYear
            {...common}
            showDoubleLeft={false}
            viewDate={viewDate!.add(10, 'year')}
            disabledValue={this.props.disabledValue}
            {...this.popupSingleRangeYear}
          />
        </div>
      </div>
    );
  };

  private popupSingleRangeYear: PickFuncs<PopupProps<'range'>> = {
    onYear: () => this.changeModeType('range-year'),
    onDate: (date) => this.setState({
      selectedDate: this.handleSelectDate(date),
    }, this.onDateNext),
    onMouseEnter: (date) => this.onMouseEnterDate(date),
    onMouseLeave: () => this.onMouseLeaveDate(),
    onIconClick: (tag) => {
      if (tag === 'doubleLeft') this.onDoubleLeft(10);
      if (tag === 'doubleRight') this.onDoubleRight(10);
    },
  };

  private popupSingleYearRange: PickFuncs<PopupProps<'single'>> = {
    onDate: (date) => this.changeModeType('year-range', { viewDate: date }),
    onIconClick: (tag) => {
      if (tag === 'doubleLeft') this.onDoubleLeft(100);
      if (tag === 'doubleRight') this.onDoubleRight(100);
    },
  };
}
