/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import dayjs, { Dayjs, UnitType } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { BaseComponent } from '../../common/base-component';
import { PickerType, PopupData, PopupProps } from '../types';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export abstract class Popup<T extends PickerType> extends BaseComponent<PopupProps<T>> {
  protected abstract formatTag: string;

  protected abstract cmpTag: UnitType;

  protected classPrefix = 'datepicker';

  protected curDate = dayjs();

  protected getDate = (): Dayjs | undefined => {
    const { date, position } = this.props;

    return Array.isArray(date) ? date[position === 'start' ? 0 : 1] : date;
  }

  protected getSelectDate = (): Dayjs | undefined => {
    const { selectedDate, position } = this.props;

    return Array.isArray(selectedDate) ? selectedDate[position === 'start' ? 0 : 1] : selectedDate;
  }

  protected singleClassItem = <T extends PopupData>(item: T): string => {
    const isCur = item.date.isSame(this.curDate.format(this.formatTag), this.cmpTag);
    const temp = this.getSelectDate() ?? this.getDate();
    const isSelected = !!temp && item.date.isSame(temp.format(this.formatTag), this.cmpTag);

    return this.classNames(this.gpc('item'), {
      [this.gpc('item-hover')]: !isSelected && (!isCur || !item.cur),
      [this.gpc('item-cur')]: item.cur && isCur,
      [this.gpc('item-notcur')]: !item.cur,
      [this.gpc('item-selected')]: item.cur && isSelected,
    });
  };

  protected rangeClassItem = <T extends PopupData>(item: T): string => {
    const {
      date,
      selectedDate,
      hoverDate,
      position,
    } = this.props as PopupProps<'range'>;
    const [s, e] = date ?? [];
    const [startDate, endDate] = selectedDate ?? [];
    const [startSelectedDate = s, endSelectedDate = e] = selectedDate ?? [];

    const classNamesObj: any = {
      [this.gpc('item-hover')]: true,
      [this.gpc('item-disabled')]: false,
      [this.gpc('item-cur')]: false,
      [this.gpc('item-notcur')]: false,
      [this.gpc('item-selected')]: false,
      [this.gpc('item-border-start')]: false,
      [this.gpc('item-border-end')]: false,
      [this.gpc('item-border-range')]: false,
      [this.gpc('item-border-left')]: false,
      [this.gpc('item-border-right')]: false,
      [this.gpc('item-bg-start')]: false,
      [this.gpc('item-bg-end')]: false,
      [this.gpc('item-bg-range')]: false,
      [this.gpc('item-bg-hover')]: false,
    };

    if (!item.cur) {
      classNamesObj[this.gpc('item-notcur')] = true;
    }

    if (item.date.isSame(this.curDate.format(this.formatTag), this.cmpTag)) {
      classNamesObj[this.gpc('item-hover')] = false;
      item.cur && (classNamesObj['item-cur'] = true);
    }

    if (startSelectedDate || endSelectedDate) {
      if ((startSelectedDate && item.date.isSame(startSelectedDate.format(this.formatTag), this.cmpTag))
        || (endSelectedDate && item.date.isSame(endSelectedDate.format(this.formatTag), this.cmpTag))) {
        classNamesObj[this.gpc('item-hover')] = false;
        item.cur && (classNamesObj[this.gpc('item-selected')] = true);
      }

      if (item.cur && hoverDate) {
        classNamesObj[this.gpc('item-hover')] = false;
        if (position === 'end' && startSelectedDate && hoverDate.isAfter(startSelectedDate.format(this.formatTag), this.cmpTag)) {
          if (item.date.isSame(startSelectedDate.format(this.formatTag), this.cmpTag)) {
            classNamesObj[this.gpc('item-border-start')] = true;
            classNamesObj[this.gpc('item-border-left')] = true;
            if (item.curLinePos?.includes('end')) classNamesObj[this.gpc('item-border-end')] = true;
          } else if (item.date.isSame(hoverDate.format(this.formatTag), this.cmpTag)) {
            classNamesObj[this.gpc('item-border-end')] = true;
            if (item.curLinePos?.includes('start')) classNamesObj[this.gpc('item-border-start')] = true;
          } else if (item.date.isAfter(startSelectedDate.format(this.formatTag), this.cmpTag) && item.date.isBefore(hoverDate.format(this.formatTag), this.cmpTag)) {
            if (item.curLinePos?.includes('start')) classNamesObj[this.gpc('item-border-start')] = true;
            else if (item.curLinePos?.includes('end')) classNamesObj[this.gpc('item-border-end')] = true;
            else classNamesObj[this.gpc('item-border-range')] = true;
          }
        }

        if (position === 'start' && endSelectedDate && hoverDate.isBefore(endSelectedDate.format(this.formatTag), this.cmpTag)) {
          if (item.date.isSame(endSelectedDate.format(this.formatTag), this.cmpTag)) {
            classNamesObj[this.gpc('item-border-end')] = true;
            classNamesObj[this.gpc('item-border-right')] = true;
            if (item.curLinePos?.includes('start')) classNamesObj[this.gpc('item-border-start')] = true;
          } else if (item.date.isSame(hoverDate.format(this.formatTag), this.cmpTag)) {
            classNamesObj[this.gpc('item-border-start')] = true;
            if (item.curLinePos?.includes('end')) classNamesObj[this.gpc('item-border-end')] = true;
          } else if (item.date.isBefore(endSelectedDate.format(this.formatTag), this.cmpTag) && item.date.isAfter(hoverDate.format(this.formatTag), this.cmpTag)) {
            if (item.curLinePos?.includes('start')) classNamesObj[this.gpc('item-border-start')] = true;
            else if (item.curLinePos?.includes('end')) classNamesObj[this.gpc('item-border-end')] = true;
            else classNamesObj[this.gpc('item-border-range')] = true;
          }
        }
      }

      if (item.cur && startSelectedDate && endSelectedDate) {
        if (item.date.isAfter(startSelectedDate.format(this.formatTag), this.cmpTag) && item.date.isBefore(endSelectedDate.format(this.formatTag), this.cmpTag)) {
          classNamesObj[this.gpc('item-bg-range')] = true;
        } else if (item.date.isSame(startSelectedDate.format(this.formatTag), this.cmpTag)) {
          classNamesObj[this.gpc('item-bg-start')] = true;
        } else if (item.date.isSame(endSelectedDate.format(this.formatTag), this.cmpTag)) {
          classNamesObj[this.gpc('item-bg-end')] = true;
        }

        if (position === 'start' && hoverDate) {
          if (item.date.isSameOrBefore(endSelectedDate.format(this.formatTag), this.cmpTag) && hoverDate.isSameOrBefore(item.date.format(this.formatTag), this.cmpTag)) {
            classNamesObj[this.gpc('item-bg-hover')] = true;
            if (item.date.isBefore(startSelectedDate.format(this.formatTag), this.cmpTag)) classNamesObj[this.gpc('item-bg-hover')] = false;
          }
        }

        if (position === 'end' && hoverDate) {
          if (item.date.isSameOrAfter(startSelectedDate.format(this.formatTag), this.cmpTag) && hoverDate.isSameOrAfter(item.date.format(this.formatTag), this.cmpTag)) {
            classNamesObj[this.gpc('item-bg-hover')] = true;
            if (item.date.isAfter(endSelectedDate.format(this.formatTag), this.cmpTag)) classNamesObj[this.gpc('item-bg-hover')] = false;
          }
        }
      }

      if (classNamesObj[this.gpc('item-selected')] && classNamesObj[this.gpc('item-border-start')]) {
        if (position === 'start') classNamesObj[this.gpc('item-border-left')] = false;
        if (position === 'end') classNamesObj[this.gpc('item-border-left')] = true;
      }

      if (classNamesObj[this.gpc('item-selected')] && classNamesObj[this.gpc('item-border-end')]) {
        if (position === 'start') classNamesObj[this.gpc('item-border-right')] = true;
        if (position === 'end') classNamesObj[this.gpc('item-border-left')] = true;
      }

      if (classNamesObj[this.gpc('item-bg-range')]) {
        classNamesObj[this.gpc('item-cur')] = false;
      }
    }

    item.disabled = false;
    if ((startDate && startDate.isAfter(item.date.format(this.formatTag), this.cmpTag)) || (endDate && endDate.isBefore(item.date.format(this.formatTag), this.cmpTag))) {
      item.disabled = true;
      classNamesObj[this.gpc('item-disabled')] = true;
      classNamesObj[this.gpc('item-cur')] = false;
    }

    return this.classNames(this.gpc('item'), classNamesObj);
  };
}
