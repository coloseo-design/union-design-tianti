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

      return this.classNames('item', {
        'item-hover': !isSelected && (!isCur || !item.cur),
        'item-cur': item.cur && isCur,
        'item-notcur': !item.cur,
        'item-selected': item.cur && isSelected,
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
        'item-hover': true,
        'item-disabled': false,
        'item-cur': false,
        'item-notcur': false,
        'item-selected': false,
        'item-border-start': false,
        'item-border-end': false,
        'item-border-range': false,
        'item-border-left': false,
        'item-border-right': false,
        'item-bg-start': false,
        'item-bg-end': false,
        'item-bg-range': false,
        'item-bg-hover': false,
      };

      if (!item.cur) {
        classNamesObj['item-notcur'] = true;
      }

      if (item.date.isSame(this.curDate.format(this.formatTag), this.cmpTag)) {
        classNamesObj['item-hover'] = false;
        item.cur && (classNamesObj['item-cur'] = true);
      }

      if (startSelectedDate || endSelectedDate) {
        if ((startSelectedDate && item.date.isSame(startSelectedDate.format(this.formatTag), this.cmpTag))
                || (endSelectedDate && item.date.isSame(endSelectedDate.format(this.formatTag), this.cmpTag))) {
          classNamesObj['item-hover'] = false;
          item.cur && (classNamesObj['item-selected'] = true);
        }

        if (item.cur && hoverDate) {
          classNamesObj['item-hover'] = false;
          if (position === 'end' && startSelectedDate && hoverDate.isAfter(startSelectedDate.format(this.formatTag), this.cmpTag)) {
            if (item.date.isSame(startSelectedDate.format(this.formatTag), this.cmpTag)) {
              classNamesObj['item-border-start'] = true;
              classNamesObj['item-border-left'] = true;
              if (item.curLinePos?.includes('end')) classNamesObj['item-border-end'] = true;
            } else if (item.date.isSame(hoverDate.format(this.formatTag), this.cmpTag)) {
              classNamesObj['item-border-end'] = true;
              if (item.curLinePos?.includes('start')) classNamesObj['item-border-start'] = true;
            } else if (item.date.isAfter(startSelectedDate.format(this.formatTag), this.cmpTag) && item.date.isBefore(hoverDate.format(this.formatTag), this.cmpTag)) {
              if (item.curLinePos?.includes('start')) classNamesObj['item-border-start'] = true;
              else if (item.curLinePos?.includes('end')) classNamesObj['item-border-end'] = true;
              else classNamesObj['item-border-range'] = true;
            }
          }

          if (position === 'start' && endSelectedDate && hoverDate.isBefore(endSelectedDate.format(this.formatTag), this.cmpTag)) {
            if (item.date.isSame(endSelectedDate.format(this.formatTag), this.cmpTag)) {
              classNamesObj['item-border-end'] = true;
              classNamesObj['item-border-right'] = true;
              if (item.curLinePos?.includes('start')) classNamesObj['item-border-start'] = true;
            } else if (item.date.isSame(hoverDate.format(this.formatTag), this.cmpTag)) {
              classNamesObj['item-border-start'] = true;
              if (item.curLinePos?.includes('end')) classNamesObj['item-border-end'] = true;
            } else if (item.date.isBefore(endSelectedDate.format(this.formatTag), this.cmpTag) && item.date.isAfter(hoverDate.format(this.formatTag), this.cmpTag)) {
              if (item.curLinePos?.includes('start')) classNamesObj['item-border-start'] = true;
              else if (item.curLinePos?.includes('end')) classNamesObj['item-border-end'] = true;
              else classNamesObj['item-border-range'] = true;
            }
          }
        }

        if (item.cur && startSelectedDate && endSelectedDate) {
          if (item.date.isAfter(startSelectedDate.format(this.formatTag), this.cmpTag) && item.date.isBefore(endSelectedDate.format(this.formatTag), this.cmpTag)) {
            classNamesObj['item-bg-range'] = true;
          } else if (item.date.isSame(startSelectedDate.format(this.formatTag), this.cmpTag)) {
            classNamesObj['item-bg-start'] = true;
          } else if (item.date.isSame(endSelectedDate.format(this.formatTag), this.cmpTag)) {
            classNamesObj['item-bg-end'] = true;
          }

          if (position === 'start' && hoverDate) {
            if (item.date.isSameOrBefore(endSelectedDate.format(this.formatTag), this.cmpTag) && hoverDate.isSameOrBefore(item.date.format(this.formatTag), this.cmpTag)) {
              classNamesObj['item-bg-hover'] = true;
              if (item.date.isBefore(startSelectedDate.format(this.formatTag), this.cmpTag)) classNamesObj['item-bg-hover'] = false;
            }
          }

          if (position === 'end' && hoverDate) {
            if (item.date.isSameOrAfter(startSelectedDate.format(this.formatTag), this.cmpTag) && hoverDate.isSameOrAfter(item.date.format(this.formatTag), this.cmpTag)) {
              classNamesObj['item-bg-hover'] = true;
              if (item.date.isAfter(endSelectedDate.format(this.formatTag), this.cmpTag)) classNamesObj['item-bg-hover'] = false;
            }
          }
        }

        if (classNamesObj['item-selected'] && classNamesObj['item-border-start']) {
          if (position === 'start') classNamesObj['item-border-left'] = false;
          if (position === 'end') classNamesObj['item-border-left'] = true;
        }

        if (classNamesObj['item-selected'] && classNamesObj['item-border-end']) {
          if (position === 'start') classNamesObj['item-border-right'] = true;
          if (position === 'end') classNamesObj['item-border-left'] = true;
        }

        if (classNamesObj['item-bg-range']) {
          classNamesObj['item-cur'] = false;
        }
      }

      item.disabled = false;
      if ((startDate && startDate.isAfter(item.date.format(this.formatTag), this.cmpTag)) || (endDate && endDate.isBefore(item.date.format(this.formatTag), this.cmpTag))) {
        item.disabled = true;
        classNamesObj['item-disabled'] = true;
        classNamesObj['item-cur'] = false;
      }

      return this.classNames('item', classNamesObj);
    };
}
