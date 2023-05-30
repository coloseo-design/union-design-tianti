/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import React from 'react';
import classnames from 'classnames';
import omit from 'omit.js';
import { withGlobalConfig } from '../config-provider';
import {
  Icon,
  Checkbox,
  Pagination,
  Radio,
} from '..';
import { PaginationProps } from '../pagination/pagination';
import {
  ColumnsProps,
  FixedType,
  RenderReturnObjectType,
  RowProps,
  TableProps,
  TableRowSelectionType,
  TableState,
} from './type';
import Row from './row';
import ColGroup from './col-group';
import TableHeader from './header';
import {
  groupColums, sortColums, flattenColums,
} from './utils';
import NoDataSvg from './no-data';

@withGlobalConfig
export default class Table extends React.Component<TableProps, TableState> {
  leftTableBodyRef: React.RefObject<HTMLDivElement>;

  rightTableBodyRef: React.RefObject<HTMLDivElement>;

  mainTableHeaderRef: React.RefObject<HTMLDivElement>;

  mainTableBodyRef: React.RefObject<HTMLDivElement>;

  static defaultProps = {
    rowKey: 'key',
  }

  constructor(props: TableProps) {
    super(props);
    this.leftTableBodyRef = React.createRef<HTMLDivElement>();
    this.rightTableBodyRef = React.createRef<HTMLDivElement>();
    this.mainTableHeaderRef = React.createRef<HTMLDivElement>();
    this.mainTableBodyRef = React.createRef<HTMLDivElement>();
    const { rowSelection: { selectedRowKeys, defaultSelectedRowKeys } = {}, columns } = props;
    const flatColums: ColumnsProps[] = flattenColums(columns || []);
    const filters = flatColums.reduce<{[key: string]: string[]}>((c, i) => {
      // if (i.filteredValue || i.defaultFilteredValue) {
      const key = i.dataIndex || i.key || '';
      Object.assign(c, { [key]: i.filteredValue || i.defaultFilteredValue || [] });
      // }
      return c;
    }, {});
    this.state = {
      selectedRowKeys: selectedRowKeys || defaultSelectedRowKeys || [],
      selectedRowKey: '',
      filters,
      // eslint-disable-next-line react/no-unused-state
      pagination: props.pagination === undefined ? { current: 1, pageSize: 10 } : props.pagination,
      flatColums,
      theadHeight: undefined,
    };
  }

  componentDidMount() {
    const { scroll } = this.props;
    const bodyRef = this.mainTableBodyRef;
    const mainRef = this.mainTableHeaderRef;
    if (bodyRef.current && (!scroll || scroll.y === 0)) {
      const thead = bodyRef.current.getElementsByTagName('thead')[0];
      if (thead) {
        const { offsetHeight } = thead;
        this.setState({ theadHeight: offsetHeight });
      }
    }
    if (mainRef.current && scroll && scroll.y !== 0) {
      const thead = mainRef.current.getElementsByTagName('thead')[0];
      if (thead) {
        const { offsetHeight } = thead;
        this.setState({ theadHeight: offsetHeight });
      }
    }
  }

  componentDidUpdate(props: TableProps) {
    const { rowSelection: { selectedRowKeys } = {}, pagination } = this.props;
    if (props.rowSelection && props.rowSelection.selectedRowKeys !== selectedRowKeys) {
      this.setState({
        selectedRowKeys,
      });
    }
    if (props.pagination !== pagination) {
      this.setState({
        pagination,
      });
    }
  }

  // 渲染表头
  renderHeader = (
    columns: ColumnsProps[],
    propsColumns: ColumnsProps[],
    // ref: React.LegacyRef<HTMLDivElement> | undefined,
    isFixed?: boolean,
  ) => {
    const { filters, theadHeight } = this.state;
    const onSubmit = (name: string, values: string | string[]) => {
      this.setState({
        filters: {
          ...filters,
          [name]: values,
        },
      });
    };
    return (
      <TableHeader
        columns={columns}
        prefixCls={this.getPrefixCls()}
        filteredValueMap={filters}
        onChange={onSubmit}
        propsColumns={propsColumns}
        isFixed={isFixed}
        theadHeight={theadHeight}
      />
    );
  }

  rowKey = (data: unknown) => {
    const { rowKey = 'key' } = this.props;
    let key = '';
    if (rowKey && typeof rowKey === 'string') {
      key = (data as ({[key: string]: unknown}))[rowKey] as string;
    }
    if (rowKey && typeof rowKey === 'function') {
      key = rowKey(data);
    }
    return key;
  }

  /**
   * 构造筛选器
   * @returns
   */
  filterDataSourceFilter = () => {
    // const { columns } = this.props;
    const { filters, flatColums } = this.state;
    return flatColums.reduce((composed, column) => {
      const { onFilter, dataIndex, key } = column;
      const name = dataIndex || key || '';
      const values = filters[name];
      let filter = (row: unknown) => (!values.length
        ? true
        : values.reduce((c, i) => {
          const r = onFilter ? onFilter(i, row) : true;
          return c || r;
        }, false));
      if (!values.length) {
        filter = () => true;
      }
      return (value: unknown, ...rest) => filter(value, ...rest) && composed(value, ...rest);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }, (value: unknown) => true);
  }

  paginateDataSource = (dataSource: unknown[]) => {
    const { pagination: paginationProps } = this.state;
    let paginatedData = dataSource;
    if (paginationProps !== false) {
      const pagination = { ...(paginationProps as PaginationProps) };
      const { current = 1, pageSize = 10 } = pagination as PaginationProps;
      const start = pageSize * (current - 1);
      paginatedData = dataSource.slice(start, start + pageSize);
    }
    return paginatedData;
  };

  formateDataSource = (dataSource: unknown[], columns: ColumnsProps[]): RowProps[] => {
    const transformData = dataSource
      .map((data, index) => {
        const cols = columns.map((column) => {
          const {
            align = 'left',
            render,
            dataIndex,
            key: columnKey,
          } = column;
          let rendered: React.ReactNode | string = '';
          if (dataIndex) {
            // eslint-disable-next-line max-len
            rendered = (data as ({[key: string]: unknown}))[dataIndex] as string;
          }
          if (render) {
            rendered = render(rendered as React.ReactNode, data, index);
          }
          const objectRendered = rendered as RenderReturnObjectType;
          let ext = {};
          if (objectRendered && typeof objectRendered === 'object' && 'children' in objectRendered) {
            const { children, props } = objectRendered;
            rendered = children;
            props && (ext = props);
          }
          return {
            children: rendered,
            align,
            key: columnKey || dataIndex,
            props: ext,
          };
        });
        return { key: this.rowKey(data), children: cols } as RowProps;
      });
    return transformData;
  }

  onMouseOver = (rowKey: string) => () => {
    this.setState({
      selectedRowKey: rowKey,
    });
  }

  onMouseOut = () => {
    this.setState({
      selectedRowKey: '',
    });
  }

  // 渲染表内容
  renderBody = (
    columns: ColumnsProps[],
    dataSource: unknown[],
  ) => {
    const { selectedRowKey } = this.state;
    const hoverable = columns.filter((column) => !!column.fixed).length > 0;
    const results = this.formateDataSource(dataSource, columns).map((row) => (
      <Row
        key={row.key}
        prefixCls={this.getPrefixCls()}
        {...(
          hoverable ? { onMouseOver: this.onMouseOver(row.key), onMouseOut: this.onMouseOut } : {}
        )}
        // onMouseOver={this.onMouseOver(row.key)}
        // onMouseOut={this.onMouseOut}
        rowKey={row.key}
        columns={row.children}
        hover={row.key === selectedRowKey}
      />
    ));
    return (
      <tbody>
        {results}
      </tbody>
    );
  }

  renderFixedHeader = (
    prefix: string,
    columns: ColumnsProps[],
    propsColumns: ColumnsProps[],
    tableStyle = {},
    ref?: React.LegacyRef<HTMLDivElement> | undefined,
    onScroll?: React.UIEventHandler<HTMLDivElement> | undefined,
    isFixed = true,
    position?: 'left' | 'right',
  ) => {
    const { scroll, bordered } = this.props;
    const tableCls = classnames(prefix, {
      [`${prefix}-bordered`]: bordered,
      [`${prefix}-fixed`]: scroll && (scroll.x || scroll.y),
    });
    return scroll && (scroll.x || scroll.y) ? (
      <div
        className={`${prefix}-header`}
        ref={ref}
        onScroll={onScroll}
        style={{ overflowY: scroll.y && (position === 'right' || !position) ? 'scroll' : 'auto' }}
      >
        <table className={tableCls} style={tableStyle}>
          <ColGroup columns={columns} />
          {this.renderHeader(columns, propsColumns, isFixed)}
        </table>
      </div>
    ) : null;
  }

  onScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const { scrollTop, scrollLeft } = e.target as HTMLDivElement;
    if (this.leftTableBodyRef.current) {
      (this.leftTableBodyRef.current as HTMLDivElement).scrollTop = scrollTop;
    }
    if (this.rightTableBodyRef.current) {
      (this.rightTableBodyRef.current as HTMLDivElement).scrollTop = scrollTop;
    }
    if (this.mainTableHeaderRef.current) {
      (this.mainTableHeaderRef.current as HTMLDivElement).scrollLeft = scrollLeft;
    }
    if (this.mainTableBodyRef.current) {
      const ele = (this.mainTableBodyRef.current as HTMLDivElement);
      ele.scrollTop = scrollTop;
      ele.scrollLeft = scrollLeft;
    }
  }

  selectAllCheckbox = () => {
    const {
      dataSource,
      rowSelection,
    } = this.props;
    const { selectedRowKeys } = this.state;
    const {
      onChange,
      getCheckboxProps,
      selectedRowKeys: defaultSelectdRowKeys = [],
      onSelectAll,
    } = rowSelection;
    // 冻结不可操作的数据
    const disabledKeys = dataSource.filter((item) => {
      const props = getCheckboxProps(item);
      return props.disabled && defaultSelectdRowKeys.indexOf(this.rowKey(item)) >= 0;
    }).map(this.rowKey);
    // 检查是否全都选中
    const selectedAll = dataSource.reduce((composed, item) => {
      const key = this.rowKey(item);
      const props = getCheckboxProps(item);
      let result = true;

      if (!props.disabled) {
        result = selectedRowKeys.indexOf(key) >= 0;
      }
      return result && composed;
    }, true);
    const someoneChecked = selectedRowKeys.length > defaultSelectdRowKeys.length;
    const allCheckboxProps = {
      indeterminate: someoneChecked && !selectedAll,
      checked: selectedAll,
      onChange: (checked: boolean) => {
        let currentSelectedRowKeys: unknown[] = [];
        if (!selectedAll) {
          const allcheckableKeys = dataSource.filter((item) => {
            const props = getCheckboxProps(item);
            return !props.disabled;
          }).map(this.rowKey);
          currentSelectedRowKeys = allcheckableKeys;
        }
        // 将冻结的数据还原回去
        const newState = {
          selectedRowKeys: [...currentSelectedRowKeys, ...disabledKeys],
        };
        this.setState(newState);
        const data = dataSource.filter(
          (item) => newState.selectedRowKeys.indexOf(this.rowKey(item)) >= 0,
        );
        onSelectAll && onSelectAll(data, checked);
        onChange && onChange(
          newState.selectedRowKeys,
          data,
        );
      },
    };
    return (<Checkbox {...allCheckboxProps} />);
  }

  /**
   * 初始化可选择列
   * @returns
   */
  selectionColumn = () => {
    const { rowSelection = {}, dataSource } = this.props;
    const { selectedRowKeys } = this.state;
    const {
      getCheckboxProps,
      columnTitle,
      columnWidth,
      onChange,
      selectedRowKeys: defaultSelectdRowKeys = [],
      onSelect,
      type = 'checkbox',
    } = rowSelection as TableRowSelectionType;
    return {
      title: columnTitle || (type === 'checkbox' && this.selectAllCheckbox()),
      dataIndex: 'selected',
      key: 'selected',
      width: columnWidth || 45,
      render: (_: unknown, record: unknown) => {
        const props = {};
        if (getCheckboxProps) {
          Object.assign(props, getCheckboxProps(record));
        }
        const key = this.rowKey(record);
        const index = selectedRowKeys.indexOf(key);
        const checked = index >= 0;
        const onCheckboxChange = (isChecked: boolean, ...args) => {
          const current = dataSource.find((item) => this.rowKey(item) === key);
          onSelect && onSelect(current, isChecked);
          if (!isChecked) {
            (checked && selectedRowKeys.splice(index, 1));
          } else {
            (!checked && selectedRowKeys.push(key));
          }
          const newSelectedRowKeys = [...selectedRowKeys];
          this.setState({
            selectedRowKeys: newSelectedRowKeys,
          });
          onChange(
            newSelectedRowKeys,
            dataSource.filter((item) => newSelectedRowKeys.indexOf(this.rowKey(item)) >= 0),
          );
        };
        const onRadioChange = (e: { target: { checked: boolean; }; }) => {
          const current = dataSource.find((item) => this.rowKey(item) === key);
          onSelect && onSelect(current, e.target.checked);
          this.setState({
            selectedRowKeys: [key],
          });
          onChange(
            [key],
            dataSource.filter((item) => [key].indexOf(this.rowKey(item)) >= 0),
          );
        };
        Object.assign(props, {
          checked,
        });
        if (props.disabled) {
          Object.assign(props, {
            checked: defaultSelectdRowKeys.indexOf(key) >= 0,
          });
        }
        if (type === 'radio') {
          return <Radio {...props} onChange={onRadioChange} />;
        }
        return (
          <Checkbox
            {...props}
            onChange={onCheckboxChange}
          />
        );
      },
    };
  }

  renderSideTable = (
    position: FixedType,
    dataSource: unknown[],
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    const {
      columns,
      scroll,
      // dataSource,
      bordered,
      rowSelection,
    } = this.props;
    const { flatColums } = this.state;
    const prefix = this.getPrefixCls();
    const filteredColumns = groupColums(flatColums, position);
    const tableOuterCls = classnames(`${prefix}-item`, {
      [`${prefix}-item-fixed-${position}`]: position,
    }, `${prefix}-item-fixed`);

    const tableCls = classnames(prefix, {
      [`${prefix}-bordered`]: bordered,
      [`${prefix}-fixed`]: scroll && (scroll.x || scroll.y),
    });

    // eslint-disable-next-line no-nested-ternary
    const maxHeight = scroll ? (typeof scroll.y === 'boolean' ? 'auto' : scroll.y) : 'auto';
    if (rowSelection && position === 'left' && filteredColumns.length) {
      filteredColumns.unshift(this.selectionColumn());
    }
    if (!filteredColumns.length) return null;
    return (
      <div className={tableOuterCls}>
        {
          this.renderFixedHeader(prefix, filteredColumns, columns, {}, undefined, undefined, true, position)
        }
        <div
          className={classnames(`${prefix}-body`)}
          style={{
            maxHeight,
            overflowX: scroll && scroll.x ? 'scroll' : 'auto',
            overflowY: scroll && scroll.y ? 'scroll' : 'auto',
          }}
          onScroll={this.onScroll}
          ref={ref}
        >
          <table className={tableCls}>
            <ColGroup columns={filteredColumns} />
            {
              !scroll || scroll.y === 0 ? this.renderHeader(filteredColumns, columns, true) : null
            }
            {
              this.renderBody(filteredColumns, dataSource)
            }
          </table>
        </div>
      </div>
    );
  }

  getPrefixCls = () => {
    const { getPrefixCls, prefixCls } = this.props;
    return getPrefixCls('table', prefixCls);
  };

  /**
   * 对内容标的列进行排序
   * @param columns
   * @returns
   */
  getMainColums = (columns: ColumnsProps[]) => {
    const sortedColumns = sortColums(columns);
    const { rowSelection } = this.props;
    if (rowSelection) {
      sortedColumns.unshift(this.selectionColumn());
    }
    return sortedColumns;
  }

  onPageChange = (current: number, pageSize: number) => {
    const { pagination } = this.state;
    this.setState({
      pagination: {
        ...(typeof pagination === 'boolean' ? {} : pagination),
        current,
        pageSize,
      },
    });
    // 调用原始的分页器的onchange
    if (typeof pagination !== 'boolean') {
      const page = (pagination as PaginationProps);
      page.onChange && page.onChange(current, pageSize);
    }
  }

  render() {
    const {
      columns = [],
      dataSource = [],
      loading = false,
      scroll,
      bordered,
      rowSelection,
      getPrefixCls,
      pagination: _page,
      noDataStyle,
      noData,
      ...rest
    } = this.props;
    const restParams = omit(rest, [
      'rowSelection',
      'getPrefixCls',
      'pagination',
      'rowKey',
    ]);
    const prefix = this.getPrefixCls();
    const tableContainerCls = classnames(`${prefix}-spain-container`, {
      [`${prefix}-spain-container-blur`]: loading,
    });
    const {
      pagination,
      flatColums,
    } = this.state;
    const tableStyle = {};
    if (scroll && scroll.x) {
      Object.assign(tableStyle, { width: scroll.x });
    }
    const scrollTableCls = classnames(`${prefix}-item`);
    const tableCls = classnames(prefix, {
      [`${prefix}-bordered`]: bordered,
      [`${prefix}-fixed`]: scroll && (scroll.x || scroll.y),
    });

    const filteredDataSource = dataSource.filter(this.filterDataSourceFilter());
    const paginateDataSource = this.paginateDataSource(filteredDataSource);

    // const mainColumns = columns.slice();
    // eslint-disable-next-line no-nested-ternary
    const maxHeight = scroll ? (typeof scroll.y === 'boolean' ? 'auto' : scroll.y) : 'auto';
    const hasNoData = dataSource.length === 0 || filteredDataSource.length === 0;
    /*
    不展示分页器的逻辑
    1.用户传false
    2. 用户没传pagination 但 dataSource 或者filteredDataSource为空数组
    3 用户传了pagination => {
      3.1:用户传了total，但total 等于 0
      3.2: 用户没有传total,但 ataSource 或者filteredDataSource为空数组
    }
    */
    const showPagination = () => {
      if (_page === false) {
        return false;
      }
      if (typeof _page === 'undefined' && hasNoData) {
        return false;
      }
      if (_page) {
        if (typeof (_page as PaginationProps)?.total !== 'undefined') {
          if ((_page as PaginationProps)?.total === 0) {
            return false;
          }
        } else if (hasNoData) {
          return false;
        }
      }
      return true;
    };

    return (
      <div {...restParams} className={`${prefix}-container`}>
        <div className={`${prefix}-container-with-spin`}>
          {
            loading && (
              <div className={`${prefix}-spin`}>
                <Icon type="loading" style={{ fontSize: 24 }} />
              </div>
            )
          }
          <div className={tableContainerCls}>
            <div className={scrollTableCls}>
              {
                // 固定头
                this.renderFixedHeader(
                  prefix,
                  this.getMainColums(flatColums),
                  this.getMainColums(columns),
                  tableStyle,
                  this.mainTableHeaderRef,
                  this.onScroll,
                  false,
                )
                // 最后一个参数是isFixed传false，表示虽然进入renderFixedHeader但他并不是fixed的thead
              }
              <div
                className={classnames(`${prefix}-body`)}
                style={{
                  maxHeight,
                  overflowX: scroll && scroll.x ? 'scroll' : 'auto',
                  overflowY: scroll && scroll.y ? 'scroll' : 'auto',
                }}
                onScroll={this.onScroll}
                ref={this.mainTableBodyRef}
              >
                <table className={tableCls} style={tableStyle}>
                  <ColGroup columns={this.getMainColums(flatColums)} />
                  {
                    !scroll || scroll.y === 0
                      ? this.renderHeader(this.getMainColums(flatColums), this.getMainColums(columns))
                      : null
                  }
                  {
                    this.renderBody(
                      this.getMainColums(flatColums),
                      paginateDataSource,
                    )
                  }
                </table>
              </div>
            </div>
            {
              this.renderSideTable('left', paginateDataSource, this.leftTableBodyRef)
            }
            {
              this.renderSideTable('right', paginateDataSource, this.rightTableBodyRef)
            }
          </div>
          {
            hasNoData && (
            <div className={classnames(`${prefix}-container-hasNoData`)} style={noDataStyle}>
              {noData || (
              <div>
                <NoDataSvg />
                <div>暂无数据</div>
              </div>
              )}
            </div>
            )
          }
          {
            showPagination() && (
              <div className={`${prefix}-pagination`} style={pagination?.style || {}}>
                <Pagination
                  {...pagination}
                  onChange={this.onPageChange}
                  total={filteredDataSource.length}
                />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
