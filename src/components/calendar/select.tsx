import React, { DOMAttributes } from 'react';
import { BaseComponent, BaseProps, BaseState } from '../common/base-component';
import { animation } from '../utils/animation';
import { uuid } from '../cascader/utils';
import Icon from '../icon';

export type SelectBaseData = {
    key: string | number;
    value: string;
};

export type SelectProps<T extends SelectBaseData> = {
    data: T[];
    value: string;
    onChange?: (item: T) => void;
} & BaseProps;

export type SelectState = {
    popupVisible: boolean;
} & BaseState;

export class Select<T extends SelectBaseData> extends BaseComponent<SelectProps<T>, SelectState> {
    public static defaultProps: Omit<SelectProps<SelectBaseData>, 'data' | 'value'> = {
      onChange: () => ({ }),
    };

    protected classPrefix = 'calendar';

    private uuid = uuid();

    public constructor(props: SelectProps<T>) {
      super(props);
      this.state = {
        popupVisible: false,
      };
    }

    public componentDidMount = () => {
      document.body.addEventListener('click', this.clickBody);
    };

    public componentWillUnmount = () => {
      document.body.removeEventListener('click', this.clickBody);
    };

    protected view = () => {
      const { data, value } = this.props;
      const { popupVisible } = this.state;

      return (
        <div
          className={this.getPrefixClass('select')}
          onClick={this.clickSelect}
        >
          <div className="value">{value}</div>
          <div className="icon"><Icon type={popupVisible ? 'up' : 'down'} /></div>
          {popupVisible && (
            <div
              id={`${this.uuid}-container`}
              className="popup"
              data-uuid={this.uuid}
            >
              {data.map((item) => (
                <div
                  key={item.key}
                  className={this.classNames('item', {
                    'item-select': item.value === value,
                  })}
                  id={`${this.uuid}-${item.value}`}
                  onClick={() => this.clickItem(item)}
                >
                  {item.value}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

    private clickSelect: DOMAttributes<HTMLDivElement>['onClick'] = (event) => {
      event.stopPropagation();
      const { popupVisible } = this.state;
      this.setState({ popupVisible: !popupVisible }, () => {
        if (this.state.popupVisible) {
          scrollToY(`${this.uuid}-container`, `${this.uuid}-${this.props.value}`, 200);
        }
      });
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
