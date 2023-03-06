import React from 'react';
import { BaseComponent, BaseProps } from '@union-design/base-component';
import { CalendarMode } from './calendar';

export type ButtonGroupProps = {
    mode: CalendarMode;
    onYear?: () => void;
    onMonth?: () => void;
} & BaseProps;

export class ButtonGroup extends BaseComponent<ButtonGroupProps> {
    protected classPrefix = 'calendar';

    public static defaultProps: Omit<ButtonGroupProps, 'mode'> = {
      onYear: () => ({ }),
      onMonth: () => ({ }),
    };

    protected view = () => {
      const { onYear, onMonth, mode } = this.props;

      return (
        <div className={this.getPrefixClass('buttongroup')}>
          <div
            className={this.gpc('tag-year')}
            data-active={mode === 'year'}
            onClick={onYear}
          >
            年
          </div>
          <div
            className={this.gpc('tag-month')}
            data-active={mode === 'month'}
            onClick={onMonth}
          >
            月
          </div>
        </div>
      );
    };
}
