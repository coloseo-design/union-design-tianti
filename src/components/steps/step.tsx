/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
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

  public descriptionRef = createRef<HTMLDivElement>();

  public iconRef = createRef<HTMLDivElement>();

  // public componentDidMount() {
  //   this.handleHorizontal();
  // }

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
      isShowPop,
      isLast = false,
      contentDirection,
      progressDot,
    } = this.props;
    this.handleHorizontal();
    const _status = status ?? _defaultStatus;
    const dot = progressDot ? <div className={this.classNames(this.gpc('tag-icon-dot'), this.gpc(`tag-icon-dot-${_status}`))} /> : null;
    return (
      <div
        ref={this.containerRef}
        className={`${this.getPrefixClass('wrap')}`}
      >
        <div
          ref={this.lineRef}
          className={this.classNames(
            this.gpc(`tag-line-${_direction}`),
            this.gpc(`tag-${_size}`),
          )}
        />
        <div
          ref={this.iconRef}
          className={this.classNames(
            this.gpc('tag-icon'),
            !progressDot && this.gpc(`tag-icon-${_size}`),
          )}
          onClick={() => _onClick?.(_serialNumber!)}
          style={{ verticalAlign: 'middle' }}
        >
          {dot || icon || (
            <>
              {_status === 'wait' && (
                <div className={this.classNames(
                  this.gpc('tag-icon-wait'),
                  this.gpc(`tag-${_size}`),
                )}
                >
                  <span>{_serialNumber}</span>
                </div>
              )}
              {_status === 'process' && (
                <div className={this.classNames(
                  this.gpc('tag-icon-process'),
                  this.gpc(`tag-${_size}`),
                )}
                >
                  <span>{_serialNumber}</span>
                </div>
              )}
              {_status === 'finish' && (
                <div className={this.classNames(
                  this.gpc('tag-icon-finish'),
                  this.gpc(`tag-${_size}`),
                )}
                >
                  <Icon type="checkout" />
                </div>
              )}
              {_status === 'error' && (
                <div className={this.classNames(
                  this.gpc('tag-icon-error'),
                  this.gpc(`tag-${_size}`),
                )}
                >
                  <Icon type="close" />
                </div>
              )}
            </>
          )}
        </div>
        <div
          ref={this.titleRef}
          className={this.classNames(
            this.gpc('tag-title'),
            this.gpc(`tag-title-${contentDirection}`),
            this.gpc(`tag-title-${_size}`),
            this.gpc(`tag-${_status}`),
          )}
          onClick={() => _onClick?.(_serialNumber!)}
        >
          {title}
        </div>
        <div
          ref={this.descriptionRef}
          className={this.classNames(
            this.gpc(`tag-${_status}`),
            this.gpc('tag-description'),
            this.gpc(`tag-description-${contentDirection}`),
            this.gpc(`tag-${_size}`),
            progressDot && this.gpc('tag-description-dot'),
          )}
          style={{
            maxWidth: _direction === 'horizontal' && contentDirection !== 'vertical' ? (isLast ? 240 : '55%') : undefined,
          }}
        >
          <Popover
            content={description}
            overlayStyle={{ width: '30%' }}
            trigger="click"
            visible={(isShowPop || description) ? undefined : false}
          >
            <Typography
              className={this.classNames(
                this.gpc('tag-description'),
              )}
              rows={3}
            >
              {description}
            </Typography>
          </Popover>
        </div>
      </div>
    );
  };

  private handleHorizontal = () => {
    if (this.props._direction !== 'horizontal') return;
    const { contentDirection } = this.props;
    setTimeout(() => {
      if (!this.lineRef.current) return;
      if (!this.titleRef.current) return;
      if (!this.descriptionRef.current) return;
      if (!this.iconRef.current) return;
      const tempRight = this.containerRef?.current?.style.marginRight || '-0px';
      const right = tempRight.toString().slice(1, tempRight.toString().length - 2);
      const width = this.props._size === 'default' ? 20 : 28;
      const titleWidth = contentDirection === 'vertical' ? 0 : this.titleRef.current.offsetWidth;
      const gap = contentDirection === 'vertical' ? 30 : 12;
      const descriptionWidth = contentDirection === 'vertical' ? this.descriptionRef.current.offsetWidth : 0;
      const maxWidth = descriptionWidth > titleWidth ? descriptionWidth : titleWidth;
      let linLeft = '0px';
      let lineRight = '0px';
      linLeft = `${titleWidth + width + gap}px`;
      lineRight = `${Number(right) + gap}px`;
      if (contentDirection === 'vertical') {
        this.iconRef.current.style.marginLeft = `${(maxWidth / 2) - (width / 2)}px`;
        linLeft = `${titleWidth + (width / 2) + gap + (maxWidth / 2)}px`;
        lineRight = `${Number(right) + gap - (maxWidth / 2) + (width / 2)}px`;
      }
      this.lineRef.current.style.left = linLeft;
      this.lineRef.current.style.right = lineRight;
    });
  };
}
