/* eslint-disable max-len */
import { Dayjs } from 'dayjs';
import { CSSProperties } from 'react';

import { BaseProps, BaseState } from '../common/base-component';
import { PopupHeadProps } from './components/head';

export type PickerMode = 'time-full'
    | 'time-ymd'
    | 'time-hms'
    | 'year'
    | 'month'
    | 'date'
    | 'date-time';

export type PickerType = 'single' | 'range';

export type PickerTypeSplit<T extends PickerType, S, R> = T extends 'single' ? S : R;

export type PickerModeType = `${PickerMode}-${PickerType}` | 'range-year';

export type PickerPosition = 'start' | 'end';

export type PickerSize = 'small' | 'middle' | 'large';

export type PickFuncs<O> = { [K in keyof O as O[K] extends (undefined | ((...args: unknown[]) => unknown)) ? K : never]: O[K] };

export type PickerProps<T extends PickerType> = {
    type?: T;
    mode?: PickerMode;
    size?: PickerSize;
    suffixIcon?: string;
    width?: number;
    style?: CSSProperties;
    format?: string;
    allowClear?: boolean;
    className?: string;
    yearRange?: [number, number];
    placeholder?: PickerTypeSplit<T, string, [string, string]>;
    disabled?: PickerTypeSplit<T, boolean, boolean | [boolean, boolean]>;
    value?: PickerTypeSplit<T, Dayjs, [Dayjs?, Dayjs?]>;
    defaultValue?: PickerTypeSplit<T, Dayjs, [Dayjs?, Dayjs?]>;
    onChange?: (
        date?: PickerTypeSplit<T, Dayjs, [Dayjs, Dayjs]>,
        format?: PickerTypeSplit<T, string, [string, string]>
    ) => void;
    disabledValue?: (date: Dayjs) => boolean;
} & BaseProps;

export type PickerState<T extends PickerType> = {
    modeType: PickerModeType;
    popupVisible: boolean;
    position?: PickerPosition;
    hoverDate?: Dayjs;
} & Pick<PopupProps<T>, 'date' | 'selectedDate'>
    & Partial<Pick<PopupProps<T>, 'viewDate'>>
    & BaseState;

export type PopupProps<T extends PickerType> = {
    viewDate: Dayjs;
    position?: PickerPosition;
    hoverDate?: Dayjs;
    date?: PickerTypeSplit<T, Dayjs, [Dayjs?, Dayjs?]>;
    selectedDate?: PickerTypeSplit<T, Dayjs, [Dayjs?, Dayjs?]>;
    showFooter?: boolean;
    onDate?: (date: Dayjs, position?: PickerPosition) => void;
    onNow?: () => void;
    onOk?: () => void;
    onYear?: () => void;
    onMonth?: () => void;
    onMouseEnter?: (date: Dayjs) => void;
    onMouseLeave?: () => void;
} & Pick<PickerProps<T>, 'mode' | 'yearRange'> & PopupHeadProps & BaseProps;

export type PopupData = {
    key: string,
    value: string,
    cur: boolean;
    curLinePos?: 'start' | 'cur' | 'end' | 'startend';
    date: Dayjs;
    disabled?: boolean;
};
