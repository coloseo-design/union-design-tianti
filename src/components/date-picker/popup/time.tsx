/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
import React from 'react';
import dayjs, { Dayjs, UnitType } from 'dayjs';
import { PickerMode, PickerType, PopupProps } from '../types';
import { Popup } from './popup';
import { Button } from '../..';
import { cacheFunc } from '../../utils/cacheFunc';
import { animation } from '../../utils/animation';

const handleData = cacheFunc((mode: PickerMode): UnitType[] => {
  if (mode === 'time-full') return ['year', 'month', 'date', 'hour', 'minute', 'second'];
  if (mode === 'time-ymd') return ['year', 'month', 'date'];
  if (mode === 'time-hms') return ['hour', 'minute', 'second'];
  return [];
});

const generateDatetimeKeyValue = (start: number, end: number, addOne = false) => {
  const re = [];
  for (let i = start; i < end; i++) {
    re.push({ key: i, value: `${addOne ? i + 1 : i}`.padStart(2, '0') });
  }
  return re;
};

const scrollToY = (containerId: string, targetId: string, duration: number) => {
  const target = document.getElementById(targetId);
  const container = document.getElementById(containerId);
  if (!target || !container) return;

  const startY = container.scrollTop;
  const endY = target.offsetTop;
  const distance = endY - startY;

  const func: Parameters<typeof animation>[0] = (percentage) => {
    container.scrollTop = startY + distance * percentage;
  };

  animation(func, duration);
};

abstract class PopupTime<T extends PickerType> extends Popup<T> {
  protected formatTag = 'YYYY-MM-DD HH:mm:ss';

  protected cmpTag: dayjs.UnitType = 'second';

  private scrollIdTag = 'scroll-popuptime';

  private viewData = {
    year: () => {
      const { yearRange } = this.props;
      return generateDatetimeKeyValue(yearRange![0], yearRange![1]);
    },
    month: generateDatetimeKeyValue(0, 12, true),
    date: () => {
      const { viewDate } = this.props;
      const re: { key: number, value: string }[] = [];
      const allDays = dayjs().set('year', viewDate.get('year'))
        .set('month', viewDate.get('month')).daysInMonth();

      for (let i = 0; i < allDays; i++) {
        re.push({ key: i + 1, value: `${i + 1}`.padStart(2, '0') });
      }

      return re;
    },
    hour: generateDatetimeKeyValue(0, 24),
    minute: generateDatetimeKeyValue(0, 60),
    second: generateDatetimeKeyValue(0, 60),
  } as {
      [key in UnitType]: { key: number, value: string }[]
      | (() => { key: number, value: string }[]) };

  public componentDidMount = () => {
    const { viewDate } = this.props;

    this.animationScrollToValue(this.getDate() ?? viewDate);
  };

  public componentDidUpdate = (preProps: PopupProps<T>) => {
    const { selectedDate: preSelectedDate } = preProps;
    const { selectedDate: curSelectedDate } = this.props;

    if (preSelectedDate !== curSelectedDate) {
      const date = this.getSelectDate() ?? this.getDate();
      date && this.animationScrollToValue(date);
    }
  };

  protected view = () => (
    <>
      {this.bodyView()}
      {this.footerView()}
    </>
  );

  protected bodyView = () => {
    const { mode } = this.props;
    const data = handleData(mode!);
    const date = this.getSelectDate() ?? this.getDate();

    return (
      <div className={this.getClass('popuptime')}>
        {data.map((col) => (
          <div
            id={`${this.scrollIdTag}-${col}`}
            key={`${this.scrollIdTag}-${col}`}
            data-class={['year', 'month', 'date'].includes(`${col}`) ? this.gpc('tag-date') : this.gpc('tag-time')}
          >
            {this.getCol(col).map((row) => (
              <div
                id={`${this.scrollIdTag}-${col}-${row.key}`}
                data-class={date?.get(col) === row.key ? this.gpc('tag-active') : 'none'}
                onClick={() => this.clickDate(col, row.key)}
                key={row.key}
              >
                {row.value}
              </div>
            ))}
            <div />
          </div>
        ))}
      </div>
    );
  };

  private getCol = (col: UnitType) => {
    const tempCol = this.viewData[col];
    return typeof tempCol === 'function' ? tempCol() : tempCol;
  }

  protected footerView = () => {
    const {
      showFooter = true,
      onNow = () => { },
      onOk = () => { },
    } = this.props;

    if (!showFooter) return;

    const okDisabled = !(this.getDate() || this.getSelectDate());

    return (
      <div className={this.getClass('popuptime-footer')}>
        <div>
          <Button
            type="link"
            size="small"
            onClick={onNow}
          >
            此刻
          </Button>
        </div>
        <div>
          <Button
            size="small"
            type="primary"
            onClick={onOk}
            disabled={okDisabled}
          >
            确定
          </Button>
        </div>
      </div>
    );
  };

  protected clickDate = (type: UnitType, num: number) => {
    const { onDate = () => { }, viewDate } = this.props;

    onDate(viewDate.set(type, num));
  };

  protected animationScrollToValue = (date: Dayjs) => {
    const { mode } = this.props;
    const data = handleData(mode!);

    data.forEach((item) => {
      const containerId = `${this.scrollIdTag}-${item}`;
      const targetId = `${this.scrollIdTag}-${item}-${date.get(item)}`;

      setTimeout(() => {
        scrollToY(containerId, targetId, 200);
      });
    });
  };
}

export class PopupSingleTime extends PopupTime<'single'> {

}

export class PopupRangeTime extends PopupTime<'range'> {
}
