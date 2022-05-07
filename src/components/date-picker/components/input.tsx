/* eslint-disable @typescript-eslint/no-empty-function */
import React, { DOMAttributes, InputHTMLAttributes, RefObject } from 'react';
import { BaseComponent, BaseProps } from '../../common/base-component';

import Icon from '../../icon';

export type InputRef = RefObject<HTMLInputElement>;

export type InputIconProps = {
  suffixIcon?: string;
  inputRef?: InputRef;
  inputValue?: string;
  className?: string;
  onIcon?: () => void;
} & InputHTMLAttributes<HTMLInputElement> &
  DOMAttributes<HTMLDivElement> &
  BaseProps;

export class InputIcon extends BaseComponent<InputIconProps> {
  protected classPrefix = 'datepicker';

  protected view = () => {
    const {
      className,
      suffixIcon,
      onMouseEnter,
      onMouseLeave,
      onIcon,
      inputRef,
      inputValue,
      ...input
    } = this.props;

    return (
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={className}
      >
        <div
          onClick={() => {
            this.props.disabled || onIcon?.();
          }}
          className={this.gpc('picker-icon')}
        >
          <Icon type={suffixIcon} />
        </div>

        <div className={this.gpc('picker-input')}>
          <input
            autoComplete="off"
            disabled
            onChange={() => {}}
            {...input}
            value={inputValue}
            ref={inputRef}
          />
        </div>
      </div>
    );
  };
}
