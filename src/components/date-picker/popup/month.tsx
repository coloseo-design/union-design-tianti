/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
import dayjs, { UnitType } from 'dayjs';
import React from 'react';
import { cacheFunc } from '@union-design/utils';
import { PopupHead } from '../components/head';
import { PickerType, PopupData } from '../types';
import { Popup } from './popup';

const handleData = cacheFunc((year: number): PopupData[][] => {
  const temp: PopupData[] = [];

  for (let i = 0; i < 12; i++) {
    temp.push({
      cur: true,
      curLinePos: i % 3 === 0 ? 'start' : (i % 3 === 2 ? 'end' : 'cur'),
      date: dayjs().set('year', year).set('month', i),
      key: `${i + 1}月`,
      value: `${i + 1}月`,
    });
  }

  const data: PopupData[][] = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      (data[i] ??= []).push(temp[(i * 3) + j]);
    }
  }

  return data;
});

abstract class PopupYear<T extends PickerType> extends Popup<T> {
  protected abstract classItem: (item: PopupData) => string;

  protected formatTag = 'YYYY-MM';

  protected cmpTag: UnitType = 'month';

  protected view = () => (
    <>
      {this.viewHead()}
      {this.viewBody()}
    </>
  );

  protected viewHead = () => {
    const { onYear, viewDate } = this.props;

    return (
      <PopupHead
        {...this.props}
        showLeft={false}
        showRight={false}
        content={(
          <div>
            <div
              data-class={this.classNames(
                this.gpc('tag-title'),
                this.gpc('tag-hover'),
              )}
              onClick={onYear}
            >
              {`${viewDate?.get('year')}年`}
            </div>
          </div>
        )}
      />
    );
  };

  protected viewBody = () => {
    const { viewDate, onMouseEnter = () => { }, onMouseLeave = () => { } } = this.props;
    const data = handleData(viewDate.get('year'));

    return (
      <div
        onMouseLeave={onMouseLeave}
        className={this.getPrefixClass('popupmonth-normal')}
      >
        {data.map((line) => (
          <div data-class={this.gpc('tag-row')} key={line[0].key}>
            {line.map((item) => (
              <div
                key={item.key}
                data-class={this.gpc('tag-col')}
                onClick={() => this.clickDate(item)}
                onMouseEnter={() => onMouseEnter(item.date)}
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

  private clickDate = (item: PopupData) => {
    if (this.props.disabledValue?.(item.date)) return;
    if (item.disabled) return;
    const { onDate = () => { }, viewDate } = this.props;

    onDate(viewDate.set('month', item.date.get('month')));
  };
}

export class PopupSingleMonth extends PopupYear<'single'> {
  protected classItem = (item: PopupData) => this.singleClassItem(item);
}

export class PopupRangeMonth extends PopupYear<'range'> {
  protected classItem = (item: PopupData) => this.rangeClassItem(item);
}
