import React from 'react';
import classnames from 'classnames';
import { withGlobalConfig } from '../config-provider';
import {
  Icon,
  Checkbox,
  Pagination,
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
import { groupColums, sortColums } from './utils';

@withGlobalConfig
export default class Table extends React.Component<TableProps, TableState> {
  leftTableBodyRef: React.RefObject<HTMLDivElement>;

  rightTableBodyRef: React.RefObject<HTMLDivElement>;

  mainTableHeaderRef: React.RefObject<HTMLDivElement>;

  mainTableBodyRef: React.RefObject<HTMLDivElement>;

  constructor(props: TableProps) {
    super(props);
    this.leftTableBodyRef = React.createRef<HTMLDivElement>();
    this.rightTableBodyRef = React.createRef<HTMLDivElement>();
    this.mainTableHeaderRef = React.createRef<HTMLDivElement>();
    this.mainTableBodyRef = React.createRef<HTMLDivElement>();
    const { rowSelection: { selectedRowKeys = [] } = {}, columns } = props;
    const filters = columns.reduce<{[key: string]: string[]}>((c, i) => {
      // if (i.filteredValue || i.defaultFilteredValue) {
      const key = i.dataIndex || i.key || '';
      Object.assign(c, { [key]: i.filteredValue || i.defaultFilteredValue || [] });
      // }
      return c;
    }, {});
    this.state = {
      selectedRowKeys: [...selectedRowKeys] || [],
      selectedRowKey: '',
      filters,
      // eslint-disable-next-line react/no-unused-state
      pagination: props.pagination || { current: 1, pageSize: 10 },
    };
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
  renderHeader = (columns: ColumnsProps[]) => {
    const { filters } = this.state;
    const onSubmit = (name: string, values: string[]) => {
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
      />
    );
  }

  rowKey = (data: unknown) => {
    const { rowKey } = this.props;
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
    const { columns } = this.props;
    const { filters } = this.state;
    console.log('filters', filters);
    return columns.reduce((composed, column) => {
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
      const pagination = { ...paginationProps };
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
          if (typeof objectRendered === 'object' && 'children' in objectRendered) {
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
    tableStyle = {},
    ref?: React.LegacyRef<HTMLDivElement> | undefined,
    onScroll?: React.UIEventHandler<HTMLDivElement> | undefined,
  ) => {
    const { scroll, bordered } = this.props;
    const tableCls = classnames(prefix, {
      [`${prefix}-bordered`]: bordered,
      [`${prefix}-fixed`]: scroll && (scroll.x || scroll.y),
    });
    return scroll && scroll.y ? (
      <div className={`${prefix}-header`} ref={ref} onScroll={onScroll}>
        <table className={tableCls} style={tableStyle}>
          <ColGroup columns={columns} />
          {this.renderHeader(columns)}
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
      onChange: () => {
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
        onChange && onChange(
          newState.selectedRowKeys,
          dataSource.filter((item) => newState.selectedRowKeys.indexOf(this.rowKey(item)) >= 0),
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
    } = rowSelection as TableRowSelectionType;
    return {
      title: columnTitle || this.selectAllCheckbox(),
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
        const onCheckboxChange = (isChecked: boolean) => {
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
        Object.assign(props, {
          checked,
        });
        if (props.disabled) {
          Object.assign(props, {
            checked: defaultSelectdRowKeys.indexOf(key) >= 0,
          });
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
    const prefix = this.getPrefixCls();
    const filteredColumns = groupColums(columns, position);
    const tableOuterCls = classnames(`${prefix}-item`, {
      [`${prefix}-item-fixed-${position}`]: position,
    }, `${prefix}-item-fixed`);

    const tableCls = classnames(prefix, {
      [`${prefix}-bordered`]: bordered,
      [`${prefix}-fixed`]: scroll && (scroll.x || scroll.y),
    });

    // eslint-disable-next-line no-nested-ternary
    const maxHeight = scroll ? (typeof scroll.y === 'boolean' ? 'auto' : scroll.y) : 'auto';
    if (rowSelection && position === 'left') {
      filteredColumns.unshift(this.selectionColumn());
    }
    if (!filteredColumns.length) return null;
    return (
      <div className={tableOuterCls}>
        {
          this.renderFixedHeader(prefix, filteredColumns)
        }
        <div
          className={`${prefix}-body`}
          style={{ maxHeight, overflow: 'scroll' }}
          onScroll={this.onScroll}
          ref={ref}
        >
          <table className={tableCls}>
            <ColGroup columns={filteredColumns} />
            {
              !scroll || scroll.y === 0 ? this.renderHeader(filteredColumns) : null
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
    } = this.props;
    const prefix = this.getPrefixCls();
    const tableContainerCls = classnames(`${prefix}-spain-container`, {
      [`${prefix}-spain-container-blur`]: loading,
    });
    const {
      pagination = {
        pageSize: 10,
      },
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
    console.log('filteredDataSource', filteredDataSource);
    const paginateDataSource = this.paginateDataSource(filteredDataSource);

    const mainColumns = columns.slice();
    // eslint-disable-next-line no-nested-ternary
    const maxHeight = scroll ? (typeof scroll.y === 'boolean' ? 'auto' : scroll.y) : 'auto';

    console.log('filteredDataSource', filteredDataSource.length, paginateDataSource);
    return (
      <div className={`${prefix}-container`}>
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
                  this.getMainColums(columns),
                  tableStyle,
                  this.mainTableHeaderRef,
                  this.onScroll,
                )
              }
              <div
                className={`${prefix}-body`}
                style={{ maxHeight, overflow: 'scroll' }}
                onScroll={this.onScroll}
                ref={this.mainTableBodyRef}
              >
                <table className={tableCls} style={tableStyle}>
                  <ColGroup columns={this.getMainColums(columns)} />
                  {
                    !scroll || scroll.y === 0 ? this.renderHeader(mainColumns) : null
                  }
                  {
                    this.renderBody(
                      this.getMainColums(columns),
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
            pagination && (
              <div className={`${prefix}-pagination`}>
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
