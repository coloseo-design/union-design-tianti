/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable no-mixed-operators */
/* eslint-disable max-classes-per-file */
import dayjs, { UnitType } from 'dayjs';
import React from 'react';
import { cacheFunc } from '../../utils/cacheFunc';
import { PopupHead } from '../components/head';
import { PickerType, PopupData } from '../types';
import { Popup } from './popup';

const handleYearData = cacheFunc((year: number) => {
  const startYear = year - year % 10;
  const endYear = startYear + 9;

  let temp: PopupData[] = [];

  const startArrIndex = [0, 2, 5, 8];
  const endArrIndex = [1, 4, 7, 9];

  for (let i = 0; i < 10; i++) {
    const key = `${startYear + i}`.padStart(4, '0');
    const value = `${startYear + i}`;
    const date = dayjs().set('year', startYear + i);
    temp.push({
      date,
      key,
      value,
      cur: true,
      curLinePos: startArrIndex.includes(i) ? 'start' : (endArrIndex.includes(i) ? 'end' : 'cur'),
    });
  }

  temp = [{
    cur: false,
    curLinePos: undefined,
    key: `${startYear - 1}`,
    date: dayjs().set('year', startYear - 1),
    value: `${startYear - 1}`,
  },
  ...temp,
  {
    cur: false,
    curLinePos: undefined,
    key: `${endYear + 1}`,
    date: dayjs().set('year', endYear + 1),
    value: `${endYear + 1}`,
  }];

  const data: PopupData[][] = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      (data[i] ??= []).push(temp[(i * 3) + j]);
    }
  }

  return { startYear, endYear, data };
});

const handleYearRangeData = cacheFunc((year: number) => {
  const startYear = year - year % 100;
  const endYear = startYear + 99;

  let temp: PopupData[] = [];

  for (let i = 0; i < 10; i++) {
    const key = `${startYear + i * 10}`.padStart(4, '0');
    const value = `${startYear + i * 10}-${startYear + (i + 1) * 10 - 1}`;
    const date = dayjs().set('year', startYear + i * 10);
    temp.push({
      key,
      date,
      value,
      cur: true,
      curLinePos: undefined,
    });
  }

  temp = [{
    cur: false,
    curLinePos: undefined,
    key: `${startYear - 10}`,
    date: dayjs().set('year', startYear - 10),
    value: `${startYear - 10}-${startYear - 1}`,
  },
  ...temp,
  {
    cur: false,
    curLinePos: undefined,
    key: `${endYear + 1}`,
    date: dayjs().set('year', endYear - 1),
    value: `${endYear + 1}-${endYear + 10}`,
  }];

  const data: PopupData[][] = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      (data[i] ??= []).push(temp[(i * 3) + j]);
    }
  }

  return { startYear, endYear, data };
});

abstract class PopupYear<T extends PickerType> extends Popup<T> {
    protected abstract handleData: (year: number) => { startYear: number, endYear: number, data: PopupData[][] };

    protected abstract classItem: (item: PopupData) => string;

    protected formatTag = 'YYYY';

    protected cmpTag: UnitType = 'year';

    protected view = () => (
      <>
        {this.headView()}
        {this.bodyView()}
      </>
    );

    protected headView = () => {
      const { viewDate, onYear } = this.props;
      const { startYear, endYear } = this.handleData(viewDate.get('year'));

      return (
        <PopupHead
          {...this.props}
          showLeft={false}
          showRight={false}
          content={(
            <div>
              <div
                data-class={`title ${onYear ? 'hover' : 'nohover'}`}
                onClick={onYear}
              >
                {`${startYear}-${endYear}`}
              </div>
            </div>
                )}
        />
      );
    };

    protected bodyView = () => {
      const { viewDate, onMouseEnter = () => { }, onMouseLeave = () => { } } = this.props;
      const { data } = this.handleData(viewDate.get('year'));

      return (
        <div
          onMouseLeave={onMouseLeave}
          className={this.getPrefixClass('popupyear-normal')}
        >
          {data.map((line) => (
            <div data-class="row" key={line[0].key}>
              {line.map((item) => (
                <div
                  key={item.key}
                  data-class="col"
                  onMouseEnter={() => onMouseEnter(item.date)}
                  onClick={() => this.clickDate(item)}
                  className={this.classItem(item)}
                >
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    };

    protected clickDate = (item: PopupData) => {
      if (item.disabled) return;
      const { onDate = () => { }, viewDate } = this.props;

      onDate(viewDate.set('year', item.date.get('year')));
    };
}

export class PopupSingleYear extends PopupYear<'single'> {
    protected handleData = (year: number) => handleYearData(year);

    protected classItem = (item: PopupData) => this.singleClassItem(item);
}

export class PopupSingleYearRange extends PopupSingleYear {
    protected handleData = (year: number) => handleYearRangeData(year);

    protected classItem = (item: PopupData) => this.classNames('item item-range-year-hover', {
      'item-notcur': !item.cur,
    });
}

export class PopupRangeYear extends PopupYear<'range'> {
    protected handleData = (year: number) => handleYearData(year);

    protected classItem = (item: PopupData) => this.rangeClassItem(item);
}
