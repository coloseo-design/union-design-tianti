/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-classes-per-file */
import dayjs, { Dayjs } from 'dayjs';
import React, { ReactNode, createRef, RefObject } from 'react';
import { BaseComponent } from '../../common/base-component';
import { uuid } from '../../utils/uuid';
import { getOffset } from '../../utils/getOffset';
import Portal from '../../common/portal';
import { InputIcon } from '../components/input';
import {
  PickerMode,
  PickerModeType,
  PickerPosition,
  PickerProps,
  PickerState,
  PickerType,
} from '../types';

export abstract class Picker<
  T extends PickerType,
  P extends PickerProps<T> = PickerProps<T>,
  S extends PickerState<T> = PickerState<T>
> extends BaseComponent<P, S> {
  protected abstract inputView: () => ReactNode;

  protected abstract popupView: () => ReactNode;

  protected abstract getViewDate: () => Dayjs;

  protected abstract getInputRef: () => RefObject<HTMLInputElement>;

  protected abstract getDefaultViewDate: () => Dayjs;

  protected classPrefix = 'datepicker';

  private uuid = uuid();

  private container = createRef<HTMLDivElement>();

  public constructor(props: P) {
    super(props);

    const {
      mode, type, value, defaultValue,
    } = props;

    this.state = {
      popupVisible: false,
      modeType: this.getModeType(mode!, type!),
      date: defaultValue ?? value,
      left: 0,
      top: 0,
    } as S;
  }

  public componentDidMount = () => {
    document.addEventListener('click', this.clickBody);
  };

  public componentWillUnmount = () => {
    document.removeEventListener('click', this.clickBody);
  };

  public componentDidUpdate = (preProps: PickerProps<T>) => {
    if (preProps.value !== this.props.value) {
      this.setState({ date: this.props.value });
    }
  };

  protected view = () => {
    const {
      style,
      width,
      size,
      className = '',
      getPopupContainer,
    } = this.props;
    const { popupVisible, left, top } = this.state;

    return (
      <div
        ref={this.container}
        style={{ width, ...style }}
        className={`${this.getClass('picker', { [size!]: true })} ${className}`}
        data-uuid={this.uuid}
      >
        {this.inputView()}
        {popupVisible && (
          <Portal {...{ getPopupContainer }}>
            <div
              style={{
                display: 'block',
                position: 'absolute',
                top,
                left,
                zIndex: 9999,
              }}
              className={`${this.getClass('picker', {
                [size!]: true,
              })} ${className}`}
            >
              <div
                className={this.gpc('picker-popup')}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {popupVisible
                  && React.cloneElement(this.popupView() as any, {
                    disabledValue: this.props.disabledValue,
                  })}
              </div>
            </div>
          </Portal>
        )}
      </div>
    );
  };

  protected onDoubleLeft = (num = 1) => {
    this.setState({ viewDate: this.getViewDate().subtract(num, 'year') });
  };

  protected onDoubleRight = (num = 1) => {
    this.setState({ viewDate: this.getViewDate().add(num, 'year') });
  };

  protected onLeft = (num = 1) => {
    this.setState({ viewDate: this.getViewDate().subtract(num, 'month') });
  };

  protected onRight = (num = 1) => {
    this.setState({ viewDate: this.getViewDate().add(num, 'month') });
  };

  protected getModeType = (
    mode: PickerMode,
    type: PickerType,
  ): PickerModeType => `${mode}-${type}` as PickerModeType;

  protected changeModeType = (
    modeType: PickerModeType,
    obj?: ((state: S, props: P) => Partial<S>) | Partial<S>,
  ) => this.setState((state, props) => ({
    ...state,
    ...(typeof obj === 'function' ? obj(state, props) : obj),
    modeType,
  }));

  protected openPopup = (
    obj?: ((state: S, props: P) => Partial<S>) | Partial<S>,
  ) => {
    const { getPopupContainer } = this.props;
    if (this.container?.current) {
      const { height } = this.container?.current.getBoundingClientRect();
      const containter = getPopupContainer && getPopupContainer();
      const { left: offsetLeft, top: offsetTop } = getOffset(
        this.container?.current,
        containter,
      );
      this.setState({
        left: offsetLeft,
        top: offsetTop + height + 4,
      });
    }
    this.setState((state, props) => ({
      ...state,
      ...(typeof obj === 'function' ? obj(state, props) : obj),
      popupVisible: true,
      viewDate: this.getViewDate(),
    }));
  };

  protected callPropsOnChange = () => ({});

  protected closePopup = (
    obj?: ((state: S, props: P) => Partial<S>) | Partial<S>,
    isCallPropsOnChange = false,
  ) => this.setState(
    (state, props) => ({
      ...state,
      ...(typeof obj === 'function' ? obj(state, props) : obj),
      popupVisible: false,
      selectedDate: undefined,
      viewDate: undefined,
      hoverDate: undefined,
      position: undefined,
      modeType: this.getModeType(props.mode!, props.type!),
    }),
    () => isCallPropsOnChange && this.callPropsOnChange(),
  );

  private handleClickBodyWithoutDatePicker = (target: HTMLElement) => {
    if (target.getAttribute('data-uuid') === this.uuid) {
      this.getInputRef().current?.focus();
      return;
    }

    if (target.nodeName === 'BODY') {
      this.closePopup();
      return;
    }

    if (target.parentNode) {
      this.handleClickBodyWithoutDatePicker(target.parentNode as HTMLElement);
    }
  };

  private clickBody = (event: Event) => {
    const { popupVisible } = this.state;

    if (!popupVisible) return;

    event.target
      && this.handleClickBodyWithoutDatePicker(event.target as HTMLElement);
  };
}

export abstract class PickerSingle extends Picker<'single'> {
  private inputRef = createRef<HTMLInputElement>();

  private suffixIcon?: string;

  protected getViewDate = () => {
    const { date, viewDate } = this.state;

    return viewDate ?? date ?? this.getDefaultViewDate();
  };

  protected getInputRef = () => this.inputRef;

  protected callPropsOnChange = () => {
    const { onChange } = this.props;
    const { date } = this.state;
    if (date) {
      onChange!(date, this.getFormatDate());
      return {};
    }
    onChange!();
    return {};
  };

  protected getFormatDate = (): string => {
    const { format } = this.props;
    const { date, selectedDate } = this.state;
    if (date || selectedDate) return dayjs(selectedDate ?? date).format(format);
    return '';
  };

  protected inputView = () => {
    const { placeholder, disabled, suffixIcon } = this.props;
    const { popupVisible } = this.state;

    return (
      <InputIcon
        inputRef={this.inputRef}
        suffixIcon={this.suffixIcon ?? suffixIcon}
        inputValue={this.getFormatDate()}
        onFocus={this.onFocus}
        onClick={this.onFocus}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        placeholder={placeholder}
        disabled={disabled}
        onIcon={this.onInputIcon}
        className={this.classNames(this.gpc('picker-input-single'), {
          [this.gpc('picker-input-single-hover')]: !disabled,
          [this.gpc('picker-input-single-focus')]: !disabled && popupVisible,
          [this.gpc('picker-input-single-disabled')]: disabled,
        })}
      />
    );
  };

  protected onFocus = () => {
    const { disabled } = this.props;
    const { popupVisible } = this.state;

    popupVisible
      || disabled
      || this.openPopup({ viewDate: this.getViewDate() });
  };

  protected onInputIcon = () => {
    if (this.suffixIcon === 'delete') {
      this.closePopup({ date: undefined }, true);
    } else {
      this.onFocus();
    }
  };

  protected onMouseEnter = () => {
    const { allowClear } = this.props;
    if (!allowClear) return;
    const { date } = this.state;
    if (date) {
      this.suffixIcon = 'delete';
      this.updateView();
    }
  };

  protected onMouseLeave = () => {
    const { allowClear } = this.props;
    if (!allowClear) return;
    this.suffixIcon = undefined;
    this.updateView();
  };
}

export abstract class PickerRange extends Picker<'range'> {
  private inputRef = [
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
  ];

  private position!: PickerPosition;

  private suffixIcons: string[] = [];

  protected getInputRef = () => this.inputRef[this.state.position === 'start' ? 0 : 1];

  protected getViewDate = () => {
    const { date = [], viewDate } = this.state;

    if (this.position === 'end') {
      return viewDate ?? date[1] ?? this.getDefaultViewDate();
    }

    return viewDate ?? date[0] ?? this.getDefaultViewDate();
  };

  protected callPropsOnChange = () => {
    const { onChange } = this.props;
    const { date } = this.state;

    if (date) {
      onChange?.(date, this.getFormatDate());
      return {};
    }

    onChange?.();
    return {};
  };

  protected getFormatDate = (): [string, string] => {
    const { format } = this.props;
    const { date = [], selectedDate = [] } = this.state;
    const startDate = (selectedDate && selectedDate[0]) ?? (date && date[0]);
    const endDate = (selectedDate && selectedDate[1]) ?? (date && date[1]);

    return [
      startDate ? dayjs(startDate).format(format) : '',
      endDate ? dayjs(endDate).format(format) : '',
    ];
  };

  protected inputView = () => {
    const { suffixIcon, placeholder, disabled } = this.props;
    const { popupVisible, position } = this.state;

    const startDisabled = Array.isArray(disabled) ? disabled[0] : disabled!;
    const endDisabled = Array.isArray(disabled) ? disabled[1] : disabled!;
    const inputValue = this.getFormatDate();

    return (
      <div
        className={this.classNames(this.gpc('picker-input-range'), {
          [this.gpc('picker-input-range-start-hover')]: !startDisabled,
          [this.gpc('picker-input-range-end-hover')]: !endDisabled,
          [this.gpc('picker-input-range-start-focus')]:
            !startDisabled && popupVisible && position === 'start',
          [this.gpc('picker-input-range-end-focus')]:
            !endDisabled && popupVisible && position === 'end',
          [this.gpc('picker-input-range-start-disabled')]: startDisabled,
          [this.gpc('picker-input-range-end-disabled')]: endDisabled,
        })}
      >
        <InputIcon
          inputRef={this.inputRef[0]}
          suffixIcon={this.suffixIcons[0] ?? suffixIcon}
          inputValue={inputValue[0]}
          onFocus={this.onStartFocus}
          onIcon={this.onStartInputIcon}
          onMouseEnter={this.onStartMouseEnter}
          onMouseLeave={this.onMouseLeave}
          className={this.gpc('picker-start-container')}
          placeholder={placeholder?.[0]}
          disabled={Array.isArray(disabled) ? disabled[0] : disabled}
        />
        <InputIcon
          inputRef={this.inputRef[1]}
          suffixIcon={this.suffixIcons[1] ?? suffixIcon}
          inputValue={inputValue[1]}
          onFocus={this.onEndFocus}
          onIcon={this.onEndInputIcon}
          onMouseEnter={this.onEndMouseEnter}
          onMouseLeave={this.onMouseLeave}
          className={this.gpc('picker-end-container')}
          placeholder={placeholder?.[1]}
          disabled={Array.isArray(disabled) ? disabled[1] : disabled}
        />
      </div>
    );
  };

  protected handleSelectDate = (date: Dayjs): [Dayjs?, Dayjs?] => {
    const { position, selectedDate = [] } = this.state;
    const result: [Dayjs?, Dayjs?] = [];
    const [startSelectedDate, endSelectedDate] = selectedDate;

    if (position === 'start') {
      result[0] = date;
      result[1] = endSelectedDate;
    }

    if (position === 'end') {
      result[0] = startSelectedDate;
      result[1] = date;
    }

    return result;
  };

  protected onDateNext = () => {
    const { selectedDate = [], date = [], position } = this.state;
    const [startDate, endDate] = date;
    const [startSelectedDate, endSelectedDate] = selectedDate;

    const close = () => {
      this.closePopup(
        ({ selectedDate }) => ({
          date: (() => {
            const [start, end] = selectedDate ?? [];
            if (dayjs(start).isAfter(dayjs(end))) {
              return [end, start] as [Dayjs?, Dayjs?];
            }
            return selectedDate;
          })(),
        }),
        true,
      );
    };

    if (startSelectedDate && endSelectedDate) {
      close();
      return;
    }

    if (position === 'start') {
      if (endSelectedDate) {
        this.setState(
          {
            selectedDate: [startSelectedDate ?? startDate, endSelectedDate],
          },
          () => close(),
        );
      } else {
        this.setState(
          {
            selectedDate: [startSelectedDate ?? startDate, endSelectedDate],
          },
          () => this.onFocus('end'),
        );
      }
      return;
    }

    if (position === 'end') {
      if (startSelectedDate) {
        this.setState(
          {
            selectedDate: [startSelectedDate, endSelectedDate ?? endDate],
          },
          () => close(),
        );
      } else {
        this.setState(
          {
            selectedDate: [startSelectedDate, endSelectedDate ?? endDate],
          },
          () => this.onFocus('start'),
        );
      }
    }
  };

  protected onStartFocus = () => this.onFocus('start');

  protected onEndFocus = () => this.onFocus('end');

  protected onFocus = (position: PickerPosition) => {
    this.position = position;
    const { position: statePosition } = this.state;

    if (position !== statePosition) {
      this.openPopup({ position });
    }
  };

  protected onStartInputIcon = () => this.onInputIcon('start');

  protected onEndInputIcon = () => this.onInputIcon('end');

  protected onInputIcon = (position: PickerPosition) => {
    const index = position === 'start' ? 0 : 1;
    if (this.suffixIcons[index] === 'delete') {
      this.closePopup({ date: undefined }, true);
    } else {
      this.onFocus(position);
    }
  };

  protected onStartMouseEnter = () => this.onMouseEnter('start');

  protected onEndMouseEnter = () => this.onMouseEnter('end');

  protected onMouseEnter = (position: PickerPosition) => {
    const { allowClear } = this.props;
    if (!allowClear) return;
    const { date = [] } = this.state;
    const index = position === 'start' ? 0 : 1;
    if (date[index]) {
      this.suffixIcons[index] = 'delete';
      this.updateView();
    }
  };

  protected onMouseLeave = () => {
    const { allowClear } = this.props;
    if (!allowClear) return;
    this.suffixIcons = [];
    this.updateView();
  };

  protected onMouseEnterDate = (date: Dayjs) => {
    const { selectedDate = [], date: stateDate = [] } = this.state;
    const [startSelectedDate, endSelectedDate] = selectedDate;
    const [startDate, endDate] = stateDate;

    if (startDate || endDate || startSelectedDate || endSelectedDate) {
      this.setState({ hoverDate: date });
    }
  };

  protected onMouseLeaveDate = () => {
    this.setState({ hoverDate: undefined });
  };
}
