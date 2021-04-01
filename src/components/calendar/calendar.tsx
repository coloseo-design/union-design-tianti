import dayjs, { Dayjs } from 'dayjs';
import React, { ReactNode } from 'react';

import { BaseComponent, BaseProps, BaseState } from '../common/base-component';
import { cacheFunc } from '../utils/cacheFunc';
import { ButtonGroup } from './button-group';
import { Select } from './select';

export type CalendarBaseData = {
    key: string;
    value: string;
    date: Dayjs;
};

export type CalendarYearData = CalendarBaseData;

export type CalendarMonthData = {
    cur: boolean;
} & CalendarBaseData;

export type CalendarMode = 'year' | 'month';

export type CalendarProps = {
    /** 可选择年的范围 */
    yearRange?: [number, number];
    /** 初始模式 */
    mode?: CalendarMode;
    /** 展示日期 */
    value?: Dayjs;
    /** 默认展示的日期 */
    defaultValue?: Dayjs;
    /** 日期变化回调 */
    onChange?: (date: Dayjs) => void;
    /** 日期面板变化回调 */
    onPanelChange?: (date: Dayjs, mode: CalendarMode) => void;
    /** 点击选择日期回调 */
    onSelect?: (date: Dayjs) => void;
    /** 自定义渲染月单元格，返回内容会被追加到单元格 */
    monthCellRender?: (date: Dayjs) => ReactNode;
    /** 自定义渲染月单元格，返回内容覆盖单元格 */
    monthFullCellRender?: (date: Dayjs) => ReactNode;
    /** 自定义渲染日期单元格，返回内容会被追加到单元格 */
    dateCellRender?: (date: Dayjs) => ReactNode;
    /** 自定义渲染日期单元格，返回内容覆盖单元格 */
    dateFullCellRender?: (date: Dayjs) => ReactNode;
} & BaseProps;

export type CalendarState = {
    mode: CalendarMode;
    selectDate: Dayjs;
} & BaseState;

export default class extends BaseComponent<CalendarProps, CalendarState> {
    public static defaultProps: CalendarProps = {
      yearRange: [1970, dayjs().add(50, 'year').get('year')],
      onChange: () => ({ }),
      onPanelChange: () => ({ }),
      onSelect: () => ({ }),
    };

    protected classPrefix = 'calendar';

    private curDate = dayjs();

    public constructor(props: CalendarProps) {
      super(props);

      this.state = {
        mode: props.mode ?? 'year',
        selectDate: props.defaultValue ?? dayjs(),
      };
    }

    public componentDidUpdate = (preProps: CalendarProps) => {
      if (this.props.value && preProps.value !== this.props.value) {
        this.setState({ selectDate: this.props.value });
      }
    };

    protected view = () => {
      const { mode, selectDate } = this.state;
      const { yearRange } = this.props;
      const yearData = handleYearData(yearRange?.[0], yearRange?.[1]);
      const { dim1 } = handleMonthData(selectDate.get('year'));

      return (
        <div className={this.getPrefixClass('container')}>
          <div className="title">
            日程日历
          </div>
          <div className="head">
            <div className="year">
              <Select
                data={yearData}
                value={`${selectDate.get('year')}年`}
                onChange={(item) => this.onSelectYear(item)}
              />
            </div>
            {mode === 'month' && (
            <div className="month">
              <Select
                data={dim1}
                value={`${selectDate.get('month') + 1}月`}
                onChange={(item) => this.onSelectMonth(item)}
              />
            </div>
            )}
            <div className="btns">
              <ButtonGroup
                mode={mode}
                onYear={this.onBtnYear}
                onMonth={this.onBtnMonth}
              />
            </div>
          </div>
          {mode === 'year' && this.year()}
          {mode === 'month' && this.month()}
        </div>
      );
    };

    private year = () => {
      const { monthCellRender, monthFullCellRender } = this.props;
      const { selectDate } = this.state;
      const { dim2 } = handleMonthData(selectDate.get('year'));

      return (
        <div className={this.getPrefixClass('year')}>
          {dim2.map((line) => (
            <div key={line[0].key} className="row">
              {line.map((item) => (
                <div
                  key={item.key}
                  onClick={() => this.onYearDate(item)}
                  className={this.yearDateItemClass(item)}
                >
                  {monthFullCellRender ? monthFullCellRender(item.date) : (
                    <>
                      <div className="title">{item.value}</div>
                      <div className="content">
                        {monthCellRender && monthCellRender(item.date)}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    };

    private month = () => {
      const { selectDate } = this.state;
      const { dateCellRender, dateFullCellRender } = this.props;
      const data = handleCalendarData(selectDate.get('year'), selectDate.get('month'));

      return (
        <div className={this.getPrefixClass('month')}>
          <div className="head-row">
            {weeks.map((item) => (
              <div
                key={item.key}
                className="col"
              >
                {item.value}
              </div>
            ))}
          </div>
          {data.map((line) => (
            <div
              className="content-row"
              key={line[0].key}
            >
              {line.map((item) => (
                <div
                  key={item.key}
                  onClick={() => this.onMonthDate(item)}
                  className={this.monthDateItemClass(item)}
                >
                  {dateFullCellRender ? dateFullCellRender(item.date) : (
                    <>
                      {item.value}
                      {dateCellRender && dateCellRender(item.date)}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    };

    private yearDateItemClass = (item: CalendarYearData) => {
      const { selectDate } = this.state;

      const colCur = item.date.isSame(this.curDate.format(), 'month');
      const colSelected = selectDate && item.date.isSame(selectDate.format(), 'month');
      return this.classNames('col', {
        'col-cur': colCur,
        'col-selected': colSelected,
      });
    };

    private monthDateItemClass = (item: CalendarMonthData) => {
      const { selectDate } = this.state;
      const { dateFullCellRender } = this.props;

      if (dateFullCellRender) return 'col item';

      const itemCurDate = item.date.isSame(this.curDate.format(), 'date');
      const itemSelected = selectDate && item.date.isSame(selectDate.format(), 'date');
      const itemHover = !itemSelected;
      return this.classNames('col item', {
        'item-notcur': !item.cur,
        'item-hover': itemHover,
        'item-cur-date': itemCurDate,
        'item-selected': itemSelected,
      });
    };

    private onSelectYear = (item: { key: number; value: string }) => this.setState(({ selectDate }) => ({ selectDate: selectDate.set('year', item.key) }), () => {
      const { selectDate } = this.state;
      const { onSelect, onChange, onPanelChange } = this.props;
      onPanelChange?.(selectDate, this.state.mode);
      onSelect?.(selectDate);
      onChange?.(selectDate);
    });

    private onSelectMonth = (item: CalendarBaseData) => this.setState(({ selectDate }) => ({ selectDate: selectDate.set('month', item.date.get('month')) }), () => {
      const { selectDate } = this.state;
      const { onSelect, onChange, onPanelChange } = this.props;
      onPanelChange?.(selectDate, this.state.mode);
      onSelect?.(selectDate);
      onChange?.(selectDate);
    });

    private onBtnYear = () => this.setState({ mode: 'year' }, () => {
      const { onPanelChange } = this.props;
      const { selectDate } = this.state;
      onPanelChange?.(selectDate, 'year');
    });

    private onBtnMonth = () => this.setState({ mode: 'month' }, () => {
      const { onPanelChange } = this.props;
      const { selectDate } = this.state;
      onPanelChange?.(selectDate, 'month');
    });

    private onMonthDate = (item: CalendarMonthData) => this.setState({
      selectDate: item.date,
    }, () => {
      const { selectDate } = this.state;
      const { onSelect, onChange } = this.props;
      onSelect?.(selectDate);
      onChange?.(selectDate);
    });

    private onYearDate = (item: CalendarYearData) => this.setState({
      selectDate: item.date,
    }, () => {
      const { selectDate } = this.state;
      const { onSelect, onChange } = this.props;
      onSelect?.(selectDate);
      onChange?.(selectDate);
    });
}

const weeks = [
  { key: 0, value: '日' },
  { key: 1, value: '一' },
  { key: 2, value: '二' },
  { key: 3, value: '三' },
  { key: 4, value: '四' },
  { key: 5, value: '五' },
  { key: 6, value: '六' },
];

const handleYearData = cacheFunc((startYear: number, endYear: number) => {
  const re = [];
  for (let i = startYear; i < endYear; i += 1) {
    re.push({ key: i, value: `${i}年`.padStart(4, '0') });
  }
  return re;
});

const handleMonthData = cacheFunc((year: number) => {
  const dim1: CalendarYearData[] = [];

  for (let i = 0; i < 12; i += 1) {
    dim1.push({
      key: `${i + 1}月`,
      value: `${i + 1}月`.padStart(2, '0'),
      date: dayjs().set('year', year).set('month', i),
    });
  }

  const dim2: CalendarYearData[][] = [];

  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      (dim2[i] ??= []).push(dim1[(i * 3) + j]);
    }
  }

  return { dim1, dim2 };
});

const handleCalendarData = cacheFunc((year: number, month: number) => {
  const cTime = dayjs().set('year', year).set('month', month);
  const cFirstDay = cTime.startOf('month').day();

  const temp: CalendarMonthData[] = [];

  const lDay = () => {
    const lTime = cTime.subtract(1, 'month');
    const lAllDays = lTime.daysInMonth();
    const lYear = lTime.get('year');
    const lMonth = lTime.get('month');
    const startDay = lAllDays - cFirstDay;
    for (let i = 0; i < cFirstDay; i += 1) {
      const value = `${startDay + i + 1}`;
      const key = `${lYear}-${(`${lMonth + 1}`).padStart(2, '0')}-${value.padStart(2, '0')}`;
      const date = dayjs().set('year', lYear).set('month', lMonth).set('date', startDay + i + 1);

      temp.push({
        key, value, date, cur: false,
      });
    }
  };

  const cDay = () => {
    const cYear = cTime.get('year');
    const cMonth = cTime.get('month');
    const cAllDays = cTime.daysInMonth();
    for (let i = 0; i < cAllDays; i += 1) {
      const value = `${i + 1}`;
      const key = `${cYear}-${(`${cMonth + 1}`).padStart(2, '0')}-${value.padStart(2, '0')}`;
      const date = dayjs().set('year', cYear).set('month', cMonth).set('date', i + 1);

      temp.push({
        key, value, date, cur: true,
      });
    }
  };

  const rDay = () => {
    const rTime = cTime.add(1, 'month');
    const rYear = rTime.get('year');
    const rMonth = rTime.get('month');
    const len = 42 - temp.length;
    for (let i = 0; i < len; i += 1) {
      const value = `${i + 1}`;
      const key = `${rYear}-${(`${rMonth + 1}`).padStart(2, '0')}-${value.padStart(2, '0')}`;
      const date = dayjs().set('year', rYear).set('month', rMonth).set('date', i + 1);
      temp.push({
        key, value, date, cur: false,
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

  const result: CalendarMonthData[][] = [];

  for (let i = 0; i < 6; i += 1) {
    for (let j = 0; j < 7; j += 1) {
      (result[i] ??= []).push(temp[(i * 7) + j]);
    }
  }

  return result;
});
