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
      labelPlacement,
      maxDescriptionLine = 3,
    } = this.props;
    this.handleHorizontal();
    const _status = status ?? _defaultStatus;
    const dot = _size === 'small' ? <div className={this.classNames(this.gpc(`tag-icon-small-${_status}`))} /> : null;
    return (
      <div
        ref={this.containerRef}
        className={this.classNames(`${this.getPrefixClass('wrap')}`, this.getPrefixClass(`wrap-${_size}`))}
      >
        <div
          ref={this.lineRef}
          className={this.classNames(
            this.gpc(`tag-line-${_direction}`),
            this.gpc(`tag-line-${_direction}-${_size}`),
            labelPlacement === 'vertical' && _size === 'small' && this.gpc(`tag-line-${_direction}-small-label-vertical`),
          )}
        />
        <div
          ref={this.iconRef}
          className={this.classNames(
            this.gpc('tag-icon'),
            this.gpc(`tag-icon-${_size}`),
            labelPlacement === 'vertical' && this.gpc(`tag-icon-label-${labelPlacement}`),
          )}
          onClick={() => _onClick?.(_serialNumber!)}
          style={{ verticalAlign: 'middle' }}
        >
          {dot || icon || (
            <>
              {_status === 'wait' && (
                <div className={this.classNames(
                  this.gpc('tag-icon-wait'),
                  this.gpc(`tag-icon-${_size}`),
                )}
                >
                  <span>{_serialNumber}</span>
                </div>
              )}
              {_status === 'process' && (
                <div className={this.classNames(
                  this.gpc('tag-icon-process'),
                  this.gpc(`tag-icon-${_size}`),
                )}
                >
                  <span>{_serialNumber}</span>
                </div>
              )}
              {_status === 'finish' && (
                <div className={this.classNames(
                  this.gpc('tag-icon-finish'),
                  this.gpc(`tag-icon-${_size}`),
                )}
                >
                  <Icon type="checkout" />
                </div>
              )}
              {_status === 'error' && (
                <div className={this.classNames(
                  this.gpc('tag-icon-error'),
                  this.gpc(`tag-icon-${_size}`),
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
            this.gpc(`tag-title-label-${labelPlacement}`),
            this.gpc(`tag-title-${_size}`),
            this.gpc(`tag-title-${_status}`),
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
            this.gpc(`tag-description-label-${labelPlacement}`),
            this.gpc(`tag-description-${_size}`),
          )}
          style={{
            maxWidth: _direction === 'horizontal' && labelPlacement !== 'vertical' ? (isLast ? 240 : '55%') : undefined,
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
              rows={maxDescriptionLine}
            >
              {description}
            </Typography>
          </Popover>
        </div>
      </div>
    );
  };

  private getIconWidth = () => { // 获取icon或者圆点的宽度
    const { _size, icon } = this.props;
    if (icon && this.iconRef.current) return this.iconRef.current?.offsetWidth;
    if (_size === 'small') return 8;
    if (_size === 'big') return 28;
    return 20;
  }

  private getColGap = () => { // 获取不同尺寸样式的间距
    const { labelPlacement, description } = this.props;
    if (labelPlacement === 'vertical') return 30;
    if (description) return 12;
    return 32;
  }

  private getRowGap = () => {
    const { _size } = this.props;
    if (_size === 'big') return 16;
    if (_size === 'small') return 10;
    return 12;
  }

  private handleHorizontal = () => {
    const { labelPlacement, _direction, isLastLine } = this.props;
    if (_direction !== 'horizontal' && labelPlacement !== 'vertical') return;
    setTimeout(() => {
      if (!this.lineRef.current) return;
      if (!this.titleRef.current) return;
      if (!this.descriptionRef.current) return;
      if (!this.iconRef.current) return;
      const gap = this.getColGap();
      const IconWidth = this.getIconWidth();
      const tempRight = this.containerRef?.current?.style.marginRight || '-0px';
      const right = tempRight.toString().slice(1, tempRight.toString().length - 2);
      const titleWidth = labelPlacement === 'vertical' ? 0 : this.titleRef.current.offsetWidth;
      const descriptionWidth = labelPlacement === 'vertical' ? this.descriptionRef.current.offsetWidth : 0;
      const maxWidth = descriptionWidth > titleWidth ? descriptionWidth : titleWidth;
      const titleHeight = this.titleRef.current.offsetHeight;
      if (_direction === 'horizontal') {
        let linLeft = '0px';
        let lineRight = '0px';
        linLeft = `${titleWidth + IconWidth + gap + 8}px`;
        lineRight = `${Number(right) + gap}px`;
        if (labelPlacement === 'vertical') { // 内容水平居中
          this.iconRef.current.style.marginLeft = `${(maxWidth / 2) - (IconWidth / 2)}px`;
          linLeft = `${titleWidth + (IconWidth / 2) + gap + (maxWidth / 2)}px`;
          lineRight = isLastLine ? `${gap}px` : `${Number(right) + gap - (maxWidth / 2) + (IconWidth / 2)}px`;
        }
        this.lineRef.current.style.left = linLeft;
        this.lineRef.current.style.right = lineRight;
      } else {
        this.iconRef.current.style.marginLeft = `${(maxWidth / 2) - (IconWidth / 2)}px`;
        this.lineRef.current.style.left = `${(maxWidth / 2)}px`;
        this.lineRef.current.style.top = `${IconWidth + titleHeight + this.getRowGap() + 8}px`;
      }
    });
  };
}
