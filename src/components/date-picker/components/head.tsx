/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode } from 'react';
import { BaseComponent, BaseProps } from '../../common/base-component';

import Icon from '../../icon';

export type PopupHeadProps = {
  showDoubleLeft?: boolean;
  showLeft?: boolean;
  showDoubleRight?: boolean;
  showRight?: boolean;
  content?: ReactNode;
  onIconClick?: (tag: 'doubleLeft' | 'doubleRight' | 'left' | 'right') => void;
} & BaseProps;

export class PopupHead extends BaseComponent<PopupHeadProps> {
  protected classPrefix = 'datepicker';

  public static defaultProps: PopupHeadProps = {
    showDoubleLeft: true,
    showLeft: true,
    showDoubleRight: true,
    showRight: true,
    onIconClick: () => {},
  };

  protected view = () => {
    const {
      showDoubleLeft, showLeft, showDoubleRight, showRight, content,
    } = this.props;

    return (
      <div className={this.getClass('popuphead')}>
        {showDoubleLeft && (
          <div data-class="icon double-left" onClick={this.clickDoubleLeftIcon}>
            <Icon type="double-left" />
          </div>
        )}
        {showLeft && (
          <div data-class="icon left" onClick={this.clickLeftIcon}>
            <Icon type="left" />
          </div>
        )}
        {showDoubleRight && (
          <div data-class="icon double-right" onClick={this.clickonDoubleRightIcon}>
            <Icon type="double-right" />
          </div>
        )}
        {showRight && (
          <div data-class="icon right" onClick={this.clickRightIcon}>
            <Icon type="right" />
          </div>
        )}
        {content}
      </div>
    );
  };

  private clickDoubleLeftIcon = () => {
    const { showDoubleLeft, onIconClick } = this.props;

    showDoubleLeft && onIconClick?.('doubleLeft');
  };

  private clickonDoubleRightIcon = () => {
    const { showDoubleRight, onIconClick } = this.props;

    showDoubleRight && onIconClick?.('doubleRight');
  };

  private clickLeftIcon = () => {
    const { showLeft, onIconClick } = this.props;

    showLeft && onIconClick?.('left');
  };

  private clickRightIcon = () => {
    const { showRight, onIconClick } = this.props;

    showRight && onIconClick?.('right');
  };
}
