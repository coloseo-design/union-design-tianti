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
      isShowPop,
      isLast = false,
    } = this.props;
    const _status = status ?? _defaultStatus;
    this.handleHorizontal();
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
          className={this.classNames(
            this.gpc('tag-icon'),
            this.gpc(`tag-icon-${_size}`),
          )}
          onClick={() => _onClick?.(_serialNumber!)}
          style={{ verticalAlign: 'top' }}
        >
          {icon || (
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
            this.gpc(`tag-title-${_size}`),
            this.gpc(`tag-${_status}`),
          )}
          onClick={() => _onClick?.(_serialNumber!)}
        >
          {title}
        </div>
        {isShowPop ? (
          <Popover
            content={description}
            overlayStyle={{ width: '30%' }}
            trigger="click"
          >
            <Typography
              className={this.classNames(
                this.gpc(`tag-${_status}`),
                this.gpc('tag-description'),
                this.gpc(`tag-${_size}`),
              )}
              style={{
                maxWidth: _direction === 'horizontal' ? (isLast ? 240 : '55%') : undefined,
              }}
              rows={3}
            >
              {description}
            </Typography>
          </Popover>
        ) : (
          <Typography
            className={this.classNames(
              this.gpc(`tag-${_status}`),
              this.gpc('tag-description'),
              this.gpc(`tag-${_size}`),
            )}
            style={{
              maxWidth: _direction === 'horizontal' ? (isLast ? 240 : '55%') : undefined,
            }}
            rows={3}
          >
            {description}
          </Typography>
        )}
      </div>
    );
  };

  private handleHorizontal = () => {
    if (this.props._direction !== 'horizontal') return;
    setTimeout(() => {
      if (!this.lineRef.current) return;
      if (!this.titleRef.current) return;
      const tempRight = this.containerRef?.current?.style.marginRight || '-0px';
      const right = tempRight.toString().slice(1, tempRight.toString().length - 2);
      const width = this.props._size === 'default' ? 24 : 32;
      const titleWidth = this.titleRef.current.offsetWidth;
      this.lineRef.current.style.left = `${titleWidth + width}px`;
      this.lineRef.current.style.right = `${Number(right) + 8}px`;
    });
  };
}
