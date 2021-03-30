/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { createRef } from 'react';
import { BaseComponent } from '../common/base-component';
import { StepProps } from './steps';
import { Icon, Popover, Typography } from '..';

export const STEP_NAME = 'UNI_STEP';

export class Step extends BaseComponent<StepProps> {
    public static tag = STEP_NAME;

    protected classPrefix = 'step';

    private titleRef = createRef<HTMLDivElement>();

    private lineRef = createRef<HTMLDivElement>();

    public containerRef = createRef<HTMLDivElement>();

    public componentDidMount() {
      this.handleHorizontal();
    }

    protected view = () => {
      const {
        icon,
        status,
        title,
        description,
        _defaultStatus,
        _serialNumber,
        _direction,
        _size,
        _onClick,
      } = this.props;
      const _status = status ?? _defaultStatus;
      this.handleHorizontal();

      return (
        <div
          ref={this.containerRef}
          className={`${this.getPrefixClass('wrap')}`}
        >
          <div ref={this.lineRef} className={`line-${_direction} ${_size}`} />
          <div
            className={this.classNames('icon', `icon-${_size}`)}
            onClick={() => _onClick?.(_serialNumber!)}
          >
            {icon || (
              <>
                {_status === 'wait' && <div className={`icon-wait ${_size}`}><span>{_serialNumber}</span></div>}
                {_status === 'process' && <div className={`icon-process ${_size}`}><span>{_serialNumber}</span></div>}
                {_status === 'finish' && <div className={`icon-finish ${_size}`}><Icon type="checkout" /></div>}
                {_status === 'error' && <div className={`icon-error ${_size}`}><Icon type="close" /></div>}
              </>
            )}
          </div>
          <div
            ref={this.titleRef}
            className={this.classNames('title', `title-${_size}`, _status)}
            onClick={() => _onClick?.(_serialNumber!)}
          >
            {title}
          </div>
          <Popover
            content={description}
            overlayStyle={{ width: '30%' }}
            trigger="click"
          >
            <Typography className={`description ${_size} ${_status}`} rows={3}>
              {description}
            </Typography>
          </Popover>
        </div>
      );
    };

    private handleHorizontal = () => {
      if (this.props._direction !== 'horizontal') return;
      setTimeout(() => {
        if (!this.lineRef.current) return;
        if (!this.titleRef.current) return;
        const width = this.props._size === 'default' ? 24 : 32;
        const titleWidth = this.titleRef.current.offsetWidth;
        this.lineRef.current.style.left = `${titleWidth + width}px`;
      });
    };
}
