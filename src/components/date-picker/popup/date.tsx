/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
import dayjs, { UnitType } from 'dayjs';
import React from 'react';
import { cacheFunc } from '@union-design/utils/cacheFunc';
import { PopupHead } from '../components/head';
import { PickerType, PopupData } from '../types';
import { Popup } from './popup';
import Button from '@union-design/button';
import { PopupSingleTime } from './time';

const handleData = cacheFunc((year: number, month: number) => {
  const cTime = dayjs().set('year', year).set('month', month);
  const cFirstDay = cTime.startOf('month').day();

  const temp: PopupData[] = [];

  const lDay = () => {
    const lTime = cTime.subtract(1, 'month');
    const lAllDays = lTime.daysInMonth();
    const lYear = lTime.get('year');
    const lMonth = lTime.get('month');
    const startDay = lAllDays - cFirstDay;
    for (let i = 0; i < cFirstDay; i++) {
      const value = `${startDay + i + 1}`;
      const key = `${lYear}-${`${lMonth + 1}`.padStart(
        2,
        '0',
      )}-${value.padStart(2, '0')}`;
      const date = dayjs()
        .set('year', lYear)
        .set('month', lMonth)
        .set('date', startDay + i + 1);
      temp.push({
        key,
        value,
        date,
        cur: false,
        curLinePos: undefined,
      });
    }
  };

  const cDay = () => {
    const cYear = cTime.get('year');
    const cMonth = cTime.get('month');
    const cAllDays = cTime.daysInMonth();
    for (let i = 0; i < cAllDays; i++) {
      const value = `${i + 1}`;
      const key = `${cYear}-${`${cMonth + 1}`.padStart(
        2,
        '0',
      )}-${value.padStart(2, '0')}`;
      const date = dayjs()
        .set('year', cYear)
        .set('month', cMonth)
        .set('date', i + 1);
      const curLinePos = (() => {
        let result = 'cur' as 'start' | 'end' | 'cur' | 'startend';

        if (date.day() === 0 || i + 1 === 1) result = 'start';
        if (date.day() === 6 || date.daysInMonth() === i + 1) result = 'end';
        if (result === 'start' && date.daysInMonth() === i + 1) {
          result = 'startend';
        }
        if (result === 'end' && i + 1 === 1) result = 'startend';

        return result;
      })();

      temp.push({
        key,
        value,
        date,
        cur: true,
        curLinePos,
      });
    }
  };

  const rDay = () => {
    const rTime = cTime.add(1, 'month');
    const rYear = rTime.get('year');
    const rMonth = rTime.get('month');
    const len = 42 - temp.length;
    for (let i = 0; i < len; i++) {
      const value = `${i + 1}`;
      const key = `${rYear}-${`${rMonth + 1}`.padStart(
        2,
        '0',
      )}-${value.padStart(2, '0')}`;
      const date = dayjs()
        .set('year', rYear)
        .set('month', rMonth)
        .set('date', i + 1);
      temp.push({
        key,
        value,
        date,
        cur: false,
        curLinePos: undefined,
      });
    }
  };

  if (cFirstDay === 0) {
    cDay();
    rDay();
  } else {
    lDay();
    cDay();
    rDay();
  }

  const result: PopupData[][] = [];

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      (result[i] ??= []).push(temp[i * 7 + j]);
    }
  }

  return result;
});

abstract class PopupDate<T extends PickerType> extends Popup<T> {
  protected abstract classItem: (item: PopupData) => string;

  protected formatTag = 'YYYY-MM-DD';

  protected cmpTag: UnitType = 'date';

  private weeks = [
    { key: 0, value: '日' },
    { key: 1, value: '一' },
    { key: 2, value: '二' },
    { key: 3, value: '三' },
    { key: 4, value: '四' },
    { key: 5, value: '五' },
    { key: 6, value: '六' },
  ];

  protected view = () => (
    <>
      {this.viewHead()}
      {this.viewBody()}
      {this.viewFooter()}
    </>
  );

  protected viewHead = () => {
    const { onYear, onMonth, viewDate } = this.props;

    return (
      <PopupHead
        {...this.props}
        content={(
          <div>
            <div
              data-class={this.classNames(
                this.gpc('tag-title'),
                this.gpc('tag-hover'),
              )}
              onClick={onYear}
            >
              {`${viewDate.get('year')}年`}
            </div>
            <div
              data-class={this.classNames(
                this.gpc('tag-title'),
                this.gpc('tag-hover'),
              )}
              style={{ marginLeft: 5 }}
              onClick={onMonth}
            >
              {`${viewDate.get('month') + 1}月`}
            </div>
          </div>
        )}
      />
    );
  };

  protected viewBody = () => {
    const {
      viewDate,
      onMouseEnter = () => {},
      onMouseLeave = () => {},
    } = this.props;
    const data = handleData(viewDate.get('year'), viewDate.get('month'));

    return (
      <div className={this.getClass('popupdate-normal')}>
        <div
          onMouseLeave={onMouseLeave}
          data-class={this.classNames(
            this.gpc('tag-head'),
            this.gpc('tag-row'),
          )}
        >
          {this.weeks.map((item) => (
            <div
              data-class={this.classNames(
                this.gpc('tag-head'),
                this.gpc('tag-col'),
              )}
              key={item.key}
            >
              {item.value}
            </div>
          ))}
        </div>
        {data.map((line) => (
          <div
            data-class={this.classNames(
              this.gpc('tag-content'),
              this.gpc('tag-row'),
            )}
            key={line[0].key}
          >
            {line.map((item) => (
              <div
                data-class={this.classNames(
                  this.gpc('tag-content'),
                  this.gpc('tag-col'),
                )}
                key={item.key}
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

  protected viewFooter = () => {
    const { onNow = () => {}, showFooter = true } = this.props;

    if (!showFooter) return;

    return (
      <div className={this.getClass('popupdate-normal-footer')}>
        <Button
          onClick={onNow}
          disabled={this.props.disabledValue?.(dayjs())}
          type="link"
          size="small"
        >
          今天
        </Button>
      </div>
    );
  };

  private clickDate = (item: PopupData) => {
    if (this.props.disabledValue?.(item.date)) return;
    if (item.disabled) return;
    const { viewDate, onDate = () => {} } = this.props;

    onDate(
      viewDate
        .set('year', item.date.get('year'))
        .set('month', item.date.get('month'))
        .set('date', item.date.get('date')),
    );
  };
}

export class PopupSingleDate extends PopupDate<'single'> {
  protected classItem = (item: PopupData) => this.singleClassItem(item);
}

export class PopupSingleDatetime extends PopupDate<'single'> {
  protected classItem = (item: PopupData) => this.singleClassItem(item);

  protected view = () => (
    <div className={this.getClass('popupdate-showtime')}>
      {this.viewLeft()}
      {this.viewRight()}
      {this.viewFooter()}
    </div>
  );

  protected viewLeft = () => (
    <div>
      {this.viewHead()}
      {this.viewBody()}
    </div>
  );

  protected viewRight = () => {
    const {
      onDate, viewDate, selectedDate, date,
    } = this.props;

    return (
      <div>
        <div>{viewDate ? viewDate.format('HH:mm:ss') : ''}</div>
        <PopupSingleTime
          date={date}
          selectedDate={selectedDate}
          viewDate={viewDate}
          showFooter={false}
          mode="time-hms"
          onDate={onDate}
        />
      </div>
    );
  };

  protected viewFooter = () => {
    const { onOk, onNow = () => {} } = this.props;
    const okDisabled = !(this.getDate() || this.getSelectDate());

    return (
      <div className={this.getClass('popuptime-footer')}>
        <div>
          <Button
            onClick={onNow}
            type="link"
            size="small"
            disabled={this.props.disabledValue?.(dayjs())}
          >
            此刻
          </Button>
        </div>
        <div>
          <Button
            onClick={onOk}
            disabled={okDisabled}
            type="primary"
            size="small"
          >
            确定
          </Button>
        </div>
      </div>
    );
  };
}

export class PopupRangeDate extends PopupDate<'range'> {
  protected classItem = (item: PopupData) => this.rangeClassItem(item);
}

export class PopupRangeDatetime extends PopupDate<'range'> {
  protected classItem = (item: PopupData) => this.rangeClassItem(item);

  protected view = () => (
    <div className={this.getClass('popupdate-showtime')}>
      {this.viewLeft()}
      {this.viewRight()}
      {this.viewFooter()}
    </div>
  );

  protected viewLeft = () => (
    <div>
      {this.viewHead()}
      {this.viewBody()}
    </div>
  );

  protected viewRight = () => {
    const { onDate, viewDate } = this.props;

    return (
      <div>
        <div>{viewDate ? viewDate.format('HH:mm:ss') : ''}</div>
        <PopupSingleTime
          date={this.getDate()}
          selectedDate={this.getSelectDate()}
          viewDate={viewDate}
          showFooter={false}
          mode="time-hms"
          onDate={onDate}
        />
      </div>
    );
  };

  protected viewFooter = () => {
    const { onOk, onNow = () => {} } = this.props;
    const okDisabled = !(this.getDate() || this.getSelectDate());

    return (
      <div className={this.getClass('popuptime-footer')}>
        <div>
          <Button onClick={onNow} type="link" size="small">
            此刻
          </Button>
        </div>
        <div>
          <Button
            onClick={onOk}
            disabled={okDisabled}
            type="primary"
            size="small"
          >
            确定
          </Button>
        </div>
      </div>
    );
  };
}
