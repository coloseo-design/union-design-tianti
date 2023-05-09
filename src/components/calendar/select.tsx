/* eslint-disable no-nested-ternary */
import React, { DOMAttributes } from 'react';
import classnames from 'classnames';
import Portal from '@union-design/portal';
import { BaseProps, BaseState } from '@union-design/base-component';
import { animation, uuid } from '@union-design/utils';
import Icon from '@union-design/icon';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';

export type SelectBaseData = {
  key: string | number;
  value: string;
};

export type SelectProps<T extends SelectBaseData> = {
  data: T[];
  value: string;
  onChange?: (item: T) => void;
  getPopupContainer?: () => HTMLElement | null;
  size?: 'default'|'large',
} & BaseProps;

export type SelectState = {
  popupVisible: boolean;
  left: number;
  top: number;
  width: number;
} & BaseState;

export class Select<T extends SelectBaseData> extends React.Component<SelectProps<T>, SelectState> {
  node: HTMLSpanElement | undefined;

  node1: HTMLSpanElement | undefined;

  public static defaultProps: Omit<SelectProps<SelectBaseData>, 'data' | 'value'> = {
    onChange: () => ({}),
  };

  protected classPrefix = 'calendar';

  private uuid = uuid();

  public constructor(props: SelectProps<T>) {
    super(props);
    this.state = {
      popupVisible: false,
      left: 0,
      top: 0,
      width: 0,
    };
  }

  public componentDidMount = () => {
    document.body.addEventListener('click', this.clickBody);
  };

  public componentWillUnmount = () => {
    document.body.removeEventListener('click', this.clickBody);
  };

  getNode = (node: HTMLDivElement) => {
    this.node = node;
  };

  getNode1 = (node: HTMLDivElement) => {
    this.node1 = node;
  };

  private clickSelect: DOMAttributes<HTMLDivElement>['onClick'] = (event) => {
    event.stopPropagation();
    const { popupVisible } = this.state;
    const { value } = this.props;
    const bodyH = document.body.scrollHeight;

    if (this.node && this.node1) {
      const { height: contentHeight } = this.node.getBoundingClientRect();
      const {
        left,
        top,
        width,
        height,
      } = this.node1.getBoundingClientRect();
      const offsetTop = Math.ceil(window.pageYOffset + top);
      const offsetLeft = Math.ceil(window.pageXOffset + left);
      let y = offsetTop + height + 4;
      if ((bodyH - offsetTop) < contentHeight + 4) {
        y = offsetTop - contentHeight - 4;
      }
      if (!popupVisible) {
        scrollToY(`${this.uuid}-container`, `${this.uuid}-${value}`, 200);
      }
      this.setState({
        top: y,
        left: offsetLeft,
        width,
        popupVisible: !popupVisible,
      });
      // this.setState({ popupVisible: !popupVisible }, () => {
      //   if (popupVisible) {
      //     scrollToY(`${this.uuid}-container`, `${this.uuid}-${value}`, 200);
      //   }
      // });
    }
  }

  private clickItem = (item: T) => {
    const { onChange } = this.props;

    onChange?.(item);

    this.setState({ popupVisible: false });
  }

  private handleClickBodyWithoutCur = (target: HTMLElement) => {
    if (target.getAttribute('data-uuid') === this.uuid) {
      return;
    }

    if (target.nodeName === 'BODY') {
      this.setState({ popupVisible: false });
      return;
    }

    if (target.parentNode) {
      this.handleClickBodyWithoutCur(target.parentNode as HTMLElement);
    }
  };

  private clickBody = (event: Event) => {
    const { popupVisible } = this.state;
    if (!popupVisible) return;
    event.target && this.handleClickBodyWithoutCur(event.target as HTMLElement);
  };

  renderSelect = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      data, value, getPopupContainer,
    } = this.props;
    const {
      popupVisible, left, top, width,
    } = this.state;
    const prefix = getPrefixCls('calendar');
    const tagPop = classnames(`${prefix}-tag-popup`, {
      [`${prefix}-tag-popup-show`]: popupVisible,
    });
    return (
      <div
        className={classnames(`${prefix}-select`)}
        onClick={this.clickSelect}
        ref={this.getNode1}
      >
        <div className={classnames(`${prefix}-tag-value`)}>
          {value}
          <div className={classnames(`${prefix}-tag-icon`)}><Icon type={popupVisible ? 'up' : 'down'} /></div>
        </div>
        <Portal {...({ getPopupContainer })}>
          <div
            id={`${this.uuid}-container`}
            className={tagPop}
            data-uuid={this.uuid}
            ref={this.getNode}
            style={{ left, top, width }}
          >
            {data.map((item) => (
              <div
                key={item.key}
                className={classnames(`${prefix}-tag-item`, {
                  [`${prefix}-tag-item-selected`]: item.value === value,
                })}
                id={`${this.uuid}-${item.value}`}
                onClick={() => this.clickItem(item)}
              >
                {item.value}
              </div>
            ))}
          </div>
        </Portal>
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderSelect}
      </ConfigConsumer>
    );
  }
}

const scrollToY = (containerId: string, targetId: string, duration: number) => {
  const target = document.getElementById(targetId);
  const container = document.getElementById(containerId);
  if (!target || !container) return;

  const startY = container.scrollTop;
  const endY = target.offsetTop;
  const distance = endY - startY;

  const func: Parameters<typeof animation>[0] = (percentage) => {
    container.scrollTop = startY + distance * percentage;
  };

  animation(func, duration);
};
