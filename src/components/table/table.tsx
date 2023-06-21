/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import classnames from 'classnames';
import omit from 'omit.js';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
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

// @withGlobalConfig
export default class Table extends React.Component<TableProps, TableState> {
  leftTableBodyRef: React.RefObject<HTMLDivElement>;

  rightTableBodyRef: React.RefObject<HTMLDivElement>;

  mainTableHeaderRef: React.RefObject<HTMLDivElement>;

  mainTableBodyRef: React.RefObject<HTMLDivElement>;

  mainTableRef: React.RefObject<HTMLTableElement>;

  static defaultProps = {
    rowKey: 'key',
    isSingleCol: true,
    childrenColumnName: 'children',
  }

  constructor(props: TableProps) {
    super(props);
    this.leftTableBodyRef = React.createRef<HTMLDivElement>();
    this.rightTableBodyRef = React.createRef<HTMLDivElement>();
    this.mainTableHeaderRef = React.createRef<HTMLDivElement>();
    this.mainTableBodyRef = React.createRef<HTMLDivElement>();
    this.mainTableRef = React.createRef<HTMLTableElement>();
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
      observer: null,
      trHeights: [],
      openKeys: [],
      childrenData: [],
    };
  }

  componentDidMount() {
    const { scroll, columns, dataSource } = this.props;
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

    if (this.mainTableRef && this.mainTableRef.current && columns.some((i) => i.fixed)) {
      const t: number[] = [];
      const tbody = (
        this.mainTableRef.current as HTMLElement
      )?.getElementsByTagName('tbody')[0];
      if (tbody && tbody.childNodes && [...tbody.childNodes as any]) {
        [...tbody.childNodes as any].forEach((i) => {
          if (i) {
            t.push((i as HTMLElement).getBoundingClientRect().height);
          }
        });
      }
      if (t.length) { // 第一次mounted的时候
        this.setState({ trHeights: t });
      }
      const config = {
        childList: true,
        subtree: true,
        characterData: true,
      };
      const callback = (mutation: any) => { // 监听table得变化，获取tr的高度
        const tem: number[] = [];
        (mutation || []).forEach((i: any) => {
          if (i.type === 'childList') {
            const tr = i.addedNodes && i.addedNodes.length > 0 ? i.addedNodes[0] : null;
            if (tr && tr.localName === 'tr') {
              tem.push((tr as HTMLElement).getBoundingClientRect().height);
            }
          }
        });
        if (tem) {
          this.setState({ trHeights: tem });
        }
      };
      const ob = new MutationObserver(callback);
      this.setState({ observer: ob });
      ob.observe(this.mainTableRef.current as HTMLElement, config);
    }

    const childData = this.getChildrenData(dataSource);
    this.setState({ childrenData: childData });
  }

  componentDidUpdate(props: TableProps) {
    const { rowSelection: { selectedRowKeys } = {}, pagination, dataSource } = this.props;
    if (props.rowSelection && props.rowSelection.selectedRowKeys !== selectedRowKeys) {
      this.setState({
        selectedRowKeys: selectedRowKeys as any,
      });
    }
    if (props.pagination !== pagination) {
      this.setState({
        pagination: pagination as any,
      });
    }
    if (props.dataSource !== dataSource) {
      this.setState({ childrenData: this.getChildrenData(dataSource || []) });
    }
  }

  componentWillUnmount(): void {
    const { observer } = this.state;
    if (observer) {
      observer.disconnect();
    }
  }

  // 渲染表头
  renderHeader = (
    prefixCls: string,
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
        prefixCls={prefixCls}
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

  getChildrenData = (pData: any[]) => {
    const tempList: any[] = [];
    const { childrenColumnName } = this.props;
    const loopChild = (data: any[], level: number, parent: string[]) => data.forEach((item) => {
      const tem = { ...item, dataLevel: level, dataParent: parent };
      if (level > 1) {
        tempList.push(tem);
      }
      if (item[childrenColumnName as string] && item[childrenColumnName as string].length > 0) {
        loopChild(item[childrenColumnName as string] || [], level + 1, [
          ...parent,
          this.rowKey(item),
        ]);
      }
    });
    loopChild(pData, 1, []);
    return tempList;
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
        : (values as any[]).reduce((c, i) => {
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

  formateDataSource = (dataSource: unknown[], columns: ColumnsProps[], level = 1): RowProps[] => {
    // level 主要用于树形结构的层级
    const transformData = dataSource
      .map((data: any, index: number) => {
        const cols = columns.map((column) => {
          const {
            align = 'left',
            render,
            dataIndex,
            key: columnKey,
            fixed,
          } = column;
          let rendered: React.ReactNode | string = '';
          if (dataIndex) {
            // eslint-disable-next-line max-len
            rendered = (data as ({[key: string]: unknown}))[dataIndex] as string;
          }
          if (render) {
            rendered = render(rendered as React.ReactNode, data, index, level);
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
            fixed,
          };
        });
        return {
          key: this.rowKey(data),
          record: data,
          children: cols,
        } as RowProps;
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

  changeOpenKeys = (keys: unknown[]) => {
    this.setState({ openKeys: keys });
  }

  // 渲染表内容
  renderBody = (
    columns: ColumnsProps[],
    dataSource: unknown[],
    prefixCls: string,
    isFixedBody?: boolean,
  ) => {
    const {
      expandedRowRender,
      rowSelection,
      isSingleCol,
      onExpand,
      expandedRowStyle,
      childrenColumnName,
    } = this.props;
    const {
      selectedRowKey, trHeights, openKeys,
    } = this.state;
    const hoverable = columns.filter((column) => !!column.fixed).length > 0;
    const getRow = (data: RowProps[], level: number) => data.map((row: any, index) => (
      <Fragment key={row.key}>
        <Row
          key={row.key}
          prefixCls={prefixCls}
          {...(
            hoverable && level === 1 ? { onMouseOver: this.onMouseOver(row.key), onMouseOut: this.onMouseOut } : {}
          )}
          rowKey={row.key}
          columns={row.children}
          style={{ height: isFixedBody && trHeights.length > 0 ? trHeights[index] : undefined }}
          isFixedBody={isFixedBody}
          hover={row.key === selectedRowKey}
          openKeys={openKeys}
          currentRecord={row.record}
          rowSelection={rowSelection}
          isSingleCol={isSingleCol}
          handleExpand={onExpand}
          expandedRowRender={expandedRowRender}
          changeOpenKeys={this.changeOpenKeys}
          expandedRowStyle={expandedRowStyle}
          childrenColumnName={childrenColumnName}
          level={level}
          className={level > 1 ? `${prefixCls}-extraRow` : undefined}
        />
        {openKeys.includes(row.key) && row.record?.[childrenColumnName as string] && getRow(this.formateDataSource(row.record?.[childrenColumnName as string], columns, level + 1), level + 1)}
      </Fragment>
    ));
    const results = getRow(this.formateDataSource(dataSource, columns, 1), 1);
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
          {this.renderHeader(prefix, columns, propsColumns, isFixed)}
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
      dataSource = [],
      rowSelection,
    } = this.props;
    const { selectedRowKeys, childrenData = [] } = this.state;
    const {
      onChange,
      getCheckboxProps,
      selectedRowKeys: defaultSelectdRowKeys = [],
      onSelectAll,
    } = rowSelection as TableRowSelectionType;
    // 冻结不可操作的数据
    const disabledKeys = dataSource.filter((item) => {
      const props = getCheckboxProps?.(item) || {};
      return props.disabled && defaultSelectdRowKeys.indexOf(this.rowKey(item)) >= 0;
    }).map(this.rowKey);
    // 检查是否全都选中
    const selectedAll = [...dataSource, ...childrenData].reduce((composed, item) => {
      const key = this.rowKey(item);
      const props = getCheckboxProps?.(item) || {};
      let result = true;

      if (!props.disabled) {
        result = selectedRowKeys.indexOf(key) >= 0;
      }
      return result && composed;
    }, true);

    const someoneChecked = selectedRowKeys.length > defaultSelectdRowKeys.length;
    const allCheckboxProps = {
      indeterminate: someoneChecked && !selectedAll,
      checked: selectedAll as boolean,
      onChange: (checked: boolean) => {
        let currentSelectedRowKeys: unknown[] = [];
        if (!selectedAll) {
          const allcheckableKeys = [...dataSource, ...childrenData].filter((item) => {
            const props = getCheckboxProps?.(item) || {};
            return !props.disabled;
          }).map(this.rowKey);
          currentSelectedRowKeys = allcheckableKeys;
        }
        // 将冻结的数据还原回去
        const newState = {
          selectedRowKeys: [...currentSelectedRowKeys, ...disabledKeys],
        };
        this.setState(newState);
        const data = [...dataSource, ...childrenData].filter(
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
    const { selectedRowKeys, childrenData = [] } = this.state;
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
        const props: any = {};
        if (getCheckboxProps) {
          Object.assign(props, getCheckboxProps(record));
        }
        const key = this.rowKey(record);
        const index = selectedRowKeys.indexOf(key);
        const checked = index >= 0;
        const onCheckboxChange = (isChecked: boolean) => {
          const current = [...dataSource, ...childrenData].find((item) => this.rowKey(item) === key);
          let temK = [...selectedRowKeys];
          const childKey = childrenData.filter((i: any) => i.dataParent?.includes(key)).map((j) => this.rowKey(j));
          onSelect && onSelect(current, isChecked);
          if (!isChecked) {
            if (checked) {
              temK = selectedRowKeys.filter((i) => ![...childKey, key].includes(i as string));
            }
          } else {
            !checked && temK.push(key);
            !checked && temK.push(...childKey);
          }
          const newSelectedRowKeys = [...temK];
          this.setState({
            selectedRowKeys: newSelectedRowKeys,
          });
          onChange?.(
            newSelectedRowKeys,
            [...dataSource, ...childrenData].filter((item) => newSelectedRowKeys.indexOf(this.rowKey(item)) >= 0),
          );
        };
        const onRadioChange = (e: { target: { checked: boolean; }; }) => {
          const current = dataSource.find((item) => this.rowKey(item) === key);
          onSelect && onSelect(current, e.target.checked);
          this.setState({
            selectedRowKeys: [key],
          });
          onChange?.(
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
    prefixCls: string,
  ) => {
    const {
      columns,
      scroll,
      // dataSource,
      bordered,
      rowSelection,
      isSingleCol,
      expandedRowRender,
    } = this.props;
    const { flatColums, childrenData } = this.state;
    const prefix = prefixCls;
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
    if (isSingleCol && expandedRowRender && filteredColumns.length) {
      filteredColumns.unshift({
        title: '',
        key: 'expandRowKey',
        dataIndex: 'expandRowKey',
        width: 45,
      });
    }
    if (childrenData.length && filteredColumns.length) {
      filteredColumns.unshift({
        title: '',
        key: 'childrenRowKey',
        dataIndex: 'childrenRowKey',
        width: 45,
      });
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
              !scroll || scroll.y === 0 ? this.renderHeader(prefix, filteredColumns, columns, true) : null
            }
            {
              this.renderBody(filteredColumns, dataSource, prefixCls, true)
            }
          </table>
        </div>
      </div>
    );
  }

  /**
   * 对内容标的列进行排序
   * @param columns
   * @returns
   */
  getMainColums = (columns: ColumnsProps[]) => {
    const sortedColumns = sortColums(columns);
    const { rowSelection, isSingleCol, expandedRowRender } = this.props;
    const { childrenData } = this.state;
    if (rowSelection) {
      sortedColumns.unshift(this.selectionColumn());
    }
    if (isSingleCol && expandedRowRender) { // 展开行箭头
      sortedColumns.unshift({
        title: '',
        key: 'expandRowKey',
        dataIndex: 'expandRowKey',
        width: 45,
      });
    }
    if (childrenData.length) { // 树形结构箭头
      sortedColumns.unshift({
        title: '',
        key: 'childrenRowKey',
        dataIndex: 'childrenRowKey',
        width: 45,
      });
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

  renderTable = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      columns = [],
      dataSource = [],
      loading = false,
      scroll,
      bordered,
      prefixCls,
      pagination: _page,
      noDataStyle,
      noData,
      ...rest
    } = this.props;
    const restParams = omit(rest, [
      'rowKey',
      'rowSelection',
      'isSingleCol',
      'expandedRowRender',
      'onExpand',
      'expandedRowStyle',
      'childrenColumnName',
    ]);
    const prefix = getPrefixCls('table', prefixCls);
    const tableContainerCls = classnames(`${prefix}-spain-container`, {
      [`${prefix}-spain-container-blur`]: loading,
    });
    const {
      pagination,
      flatColums,
    } = this.state;
    const tableStyle = {};
    if (scroll && scroll.x) {
      Object.assign(tableStyle, { minWidth: scroll.x });
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
                <table
                  className={tableCls}
                  style={tableStyle}
                  ref={this.mainTableRef}
                >
                  <ColGroup columns={this.getMainColums(flatColums)} />
                  {
                    !scroll || scroll.y === 0
                      ? this.renderHeader(prefix, this.getMainColums(flatColums), this.getMainColums(columns))
                      : null
                  }
                  {
                    this.renderBody(
                      this.getMainColums(flatColums),
                      paginateDataSource,
                      prefix,
                    )
                  }
                </table>
              </div>
            </div>
            {
              this.renderSideTable('left', paginateDataSource, this.leftTableBodyRef, prefix)
            }
            {
              this.renderSideTable('right', paginateDataSource, this.rightTableBodyRef, prefix)
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
              <div className={`${prefix}-pagination`} style={(pagination as PaginationProps)?.style || {}}>
                <Pagination
                  {...pagination as PaginationProps}
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

  render() {
    return (
      <ConfigConsumer>
        {this.renderTable}
      </ConfigConsumer>
    );
  }
}
