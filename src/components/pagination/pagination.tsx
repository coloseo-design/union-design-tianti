/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ReactNode } from 'react';
import { Icon } from '..';
import { Select, SelectBaseData, SelectProps } from '../calendar/select';
import { BaseComponent, BaseProps, BaseState } from '../common/base-component';

export type PaginationProps = {
    /** 当前页数 */
    current?: number;
    /** 默认的当前页数 */
    defaultCurrent?: number;
    /** 默认的每页条数 */
    defaultPageSize?: number;
    /** 只有一页时是否隐藏分页器 */
    hideOnSinglePage?: boolean;
    /** 每页条数 */
    pageSize?: number;
    /** 指定每页可以显示多少条 */
    pageSizeOptions?: number[];
    /** 是否可以快速跳转至某页 */
    showQuickJumper?: boolean;
    /** 是否展示 pageSize 切换器 */
    showSizeChanger?: boolean;
    /** 用于显示数据总量和当前数据顺序 */
    showTotal?: (page: number, pageSize: number) => ReactNode;
    /** 数据总数 */
    total?: number;
    /** 页码改变的回调，参数是改变后的页码及每页条数 */
    onChange?: (page: number, pageSize: number) => void;
} & BaseProps;

export type PaginationState = {
    current: number;
    pageSize: number;
    hoverDoubleLRIcon?: string;
} & BaseState;

export type PaginationItem = {
    key: number;
    value: string;
    type: 'num' | 'ell'
};

export default class Pagination extends BaseComponent<PaginationProps, PaginationState> {
    public static defaultProps: PaginationProps = {
      total: 0,
      showSizeChanger: false,
      showQuickJumper: false,
      hideOnSinglePage: false,
      pageSizeOptions: [10, 20, 50, 100],
    };

    protected classPrefix = 'pagination';

    public constructor(props: PaginationProps) {
      super(props);
      const {
        current, defaultCurrent, pageSize, defaultPageSize,
      } = props;

      this.state = {
        current: defaultCurrent ?? current ?? 1,
        pageSize: defaultPageSize ?? pageSize ?? 10,
      };
    }

    public componentDidUpdate(preProps: PaginationProps) {
      const { current, pageSize } = this.props;

      if (preProps.current && current && preProps.current !== current) {
        this.setState({ current }, this.callPropsOnChange);
      }

      if (preProps.pageSize && pageSize && preProps.pageSize !== pageSize) {
        this.setState({ pageSize }, this.callPropsOnChange);
      }
    }

    protected view = () => {
      const { current, hoverDoubleLRIcon } = this.state;

      return (
        <div className={this.getPrefixClass('wrap')}>
          {this.viewShowTotal()}
          <div className="icon" onClick={() => this.iconOnClick('left')}>
            <Icon type="left" />
          </div>
          {this.handleItem().map((item) => (item.type === 'num' ? (
            <div
              key={item.key}
              onMouseLeave={() => this.setState({ hoverDoubleLRIcon: undefined })}
              onClick={() => this.itemOnClick(item)}
              className={this.classNames('item', {
                'item-hover': current !== item.key,
                'item-selected': current === item.key,
              })}
            >
              {item.value}
            </div>
          ) : (
            <div
              key={item.key}
              className="icon"
              onMouseEnter={() => this.setState({ hoverDoubleLRIcon: item.value })}
              onMouseLeave={() => this.setState({ hoverDoubleLRIcon: undefined })}
              onClick={() => this.iconOnClick(item.value)}
            >
              <Icon type={item.value === hoverDoubleLRIcon ? item.value : 'more'} />
            </div>
          )))}
          <div className="icon" onClick={() => this.iconOnClick('right')}>
            <Icon type="right" />
          </div>
          {this.viewSizeChanger()}
          {this.viewQuickJumper()}
        </div>
      );
    };

    private viewShowTotal = () => {
      const { showTotal } = this.props;
      const { current, pageSize } = this.state;
      if (!showTotal) return null;

      return showTotal(current, pageSize);
    };

    private viewSizeChanger = () => {
      const {
        total, showSizeChanger, hideOnSinglePage, pageSizeOptions,
      } = this.props;
      const { pageSize } = this.state;
      const totalPage = Math.ceil(total! / pageSize);

      if (!showSizeChanger) return null;
      if (hideOnSinglePage && totalPage === 1) return null;

      return (
        <div className="size-changer">
          <Select
            onChange={this.selectOnChange}
            value={`${pageSize}条/页`}
            data={pageSizeOptions?.reduce((a, b) => {
              a.push({
                key: b,
                value: `${b}条/页`,
              });
              return a;
            }, [] as SelectBaseData[]) ?? []}
          />
        </div>
      );
    };

    private viewQuickJumper = () => {
      const { showQuickJumper } = this.props;
      if (!showQuickJumper) return null;

      return (
        <div className="quick-jumper">
          跳至
          <input onKeyDown={this.quickJumperOnKeyDown} />
          页
        </div>
      );
    };

    private quickJumperOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (event.key === 'Enter') {
        const { total } = this.props;
        const { pageSize } = this.state;
        const totalPage = Math.ceil(total! / pageSize);
        const input = event.target as HTMLInputElement;
        const { value } = input;
        input.value = '';
        const num = parseInt(value, 10);

        if (num && num >= 1 && num <= totalPage) {
          this.setState({ current: num }, this.callPropsOnChange);
        }
      }
    };

    private itemOnClick = (item: PaginationItem) => {
      this.setState({ current: item.key }, this.callPropsOnChange);
    };

    private iconOnClick = (type: string) => {
      const { total } = this.props;
      const { current, pageSize } = this.state;
      const totalPage = Math.ceil(total! / pageSize);
      let result = current;

      if (type === 'left') result -= 1;
      if (type === 'right') result += 1;
      if (type === 'double-left') result -= 5;
      if (type === 'double-right') result += 5;

      if (result <= 0) result = 1;
      if (result >= totalPage) result = totalPage;

      this.setState({ current: result }, this.callPropsOnChange);
    };

    private selectOnChange: SelectProps<SelectBaseData>['onChange'] = (item) => {
      const pageSize = item.key as number;
      const { total } = this.props;
      let { current } = this.state;
      const totalPage = Math.ceil(total! / pageSize);

      if (current > totalPage) current = totalPage;
      this.setState({ pageSize, current }, this.callPropsOnChange);
    };

    private handleItem = () => {
      const { total } = this.props;
      const { current, pageSize } = this.state;
      const totalPage = Math.ceil(total! / pageSize);
      const result: PaginationItem[] = [];

      for (let i = 0; i < totalPage; i += 1) {
        result.push({
          key: i + 1,
          value: `${i + 1}`,
          type: 'num',
        });
      }

      const initValueNull = (item:PaginationItem) => {
        const temp = item;
        temp.value = 'null';
      };

      /**
         * (1) 1 x x o x x x . e
         * (2) 1 . x x o x x . e
         * (3) 1 . x x x o x x e
         */
      if (totalPage > 9) {
        /** 第1种情况 */
        if (current <= 4 && totalPage - current >= 5) {
          const temp = result.slice(7, -1);
          temp.forEach(initValueNull);
          temp[0].value = 'double-right';
          temp[0].type = 'ell';
        } else if (current > 4 && totalPage - current >= 4) {
          /** 第2种情况 */
          let temp = result.slice(1, current - 3);
          temp.forEach(initValueNull);
          temp[0].value = 'double-left';
          temp[0].type = 'ell';
          temp = result.slice(current + 2, -1);
          temp.forEach(initValueNull);
          temp[0].value = 'double-right';
          temp[0].type = 'ell';
        } else if (current > 4 && totalPage - current < 5) { /** 第3种情况 */
          const temp = result.slice(1, -7);
          temp.forEach(initValueNull);
          temp[0].value = 'double-left';
          temp[0].type = 'ell';
        }
      }

      return result.filter((item) => item.value !== 'null');
    };

    private callPropsOnChange = () => {
      const { onChange } = this.props;
      const { current, pageSize } = this.state;
      onChange?.(current, pageSize);
    };
}
