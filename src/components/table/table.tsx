import React from 'react';
import classnames from 'classnames';
import { ConfigConsumerProps, withGlobalConfig } from '../config-provider';
import Icon from '../icon';
import Checkbox from '../checkbox';

type ColumnsAlign = 'left' | 'right' | 'center';
type FixedType = 'left' | 'right';

type RenderReturnObjectType = {
  props: {
    /** 列合并 */
    colSpan: number;
    /** 行合并 */
    rowSpan: number;
  };
  children: React.ReactNode;
};

interface ColumnsProps {
  /** 设置列的对齐方式 */
  align?: ColumnsAlign;
  /** 类名称 */
  className?: string;
  /** 列合并 */
  colSpan?: number;
  /** key */
  dataIndex?: string;
  /** 固定列 */
  fixed?: boolean | FixedType;
  /** key React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性 */
  key?: string;
  /** 列渲染函数 */
  // eslint-disable-next-line max-len
  render?: (text: React.ReactNode | string, record: unknown, index: number) => React.ReactNode | RenderReturnObjectType;
  /** 标题 */
  title: React.ReactNode;
  /** 宽度 */
  width: string | number;
}

type RowKeyType = string | ((record: unknown) => string);

interface TableProps extends ConfigConsumerProps {
  /** 是否包含边框 */
  bordered: boolean;
  columns: ColumnsProps[];
  rowKey: RowKeyType;
  dataSource: unknown[];
  /** 自定义类前缀 */
  prefixCls?: string;
  /** 是否加载中 */
  loading?: boolean;
  /** 表格行是否可选择 */
  rowSelection: {
    /** 用户手动选择/取消选择某行的回调 */
    onSelect: () => void;
    /** 用户手动选择/取消选择所有行的回调 */
    onSelectAll: () => void;
    /** 选中项发生变化时的回调 */
    onChange: (selectedRowKeys: unknown[], selectedRows: unknown[]) => void;
    /** 列宽 */
    columnWidth?: number;
    /** 列标题 */
    columnTitle?: React.ReactNode;
    /** checkbox默认设置 */
    getCheckboxProps: (record: unknown) => {
      disabled?: boolean;
      name?: React.ReactNode;
    };
    /** 默认选中 */
    selectedRowKeys: unknown[];
  }
  scroll: {
    /** 设置横向滚动，也可用于指定滚动区域的宽 */
    x?: number | boolean;
    /** 设置横向滚动，也可用于指定滚动区域的宽 */
    y?: number | boolean;
    /** 当分页、排序、筛选变化后是否滚动到表格顶部 */
    scrollToFirstRowOnChange?: boolean;
  };
}

interface TableState {
  /** 数据源 */
  // dataSource: unknown[];
  /** 列 */
  // columns: ColumnsProps[];
  /** 选中的列 */
  selectedRowKeys: unknown[];
  selectedRowKey: string,
}

interface ColProps {
  children: React.ReactNode,
  align: ColumnsAlign,
  key: string,
  props: {
    /** 列合并 */
    colSpan: number;
    /** 行合并 */
    rowSpan: number;
  };
}

interface RowProps {
  key: string;
  children: ColProps[];
}

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
    const { rowSelection: { selectedRowKeys = [] } = {} } = props;
    this.state = {
      selectedRowKeys: [...selectedRowKeys] || [],
      selectedRowKey: '',
    };
  }

  componentDidUpdate(props: TableProps) {
    const { rowSelection: { selectedRowKeys } } = this.props;
    if (props.rowSelection.selectedRowKeys !== selectedRowKeys) {
      this.setState({
        selectedRowKeys,
      });
    }
  }

  // 渲染colgroup
  renderColgroup = (columns: ColumnsProps[]) => (
    <colgroup>
      {
        columns.map((item) => (
          <col
            key={item.key || item.dataIndex}
            style={{ width: item.width, minWidth: item.width }}
          />
        ))
      }
    </colgroup>
  )

  // 渲染表头
  renderHeader = (columns: ColumnsProps[]) => (
    <thead>
      <tr>
        {
          columns.map((column) => {
            const { colSpan = 1 } = column;
            if (colSpan === 0) {
              return null;
            }
            return (
              <th key={column.key || column.dataIndex} colSpan={column.colSpan}>
                <span>{column.title}</span>
              </th>
            );
          })
        }
      </tr>
    </thead>
  );

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

  formateDataSource = (dataSource: unknown[], columns: ColumnsProps[]): RowProps[] => {
    const transformData = dataSource.map((data, index) => {
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
    prefix: string,
    columns: ColumnsProps[],
    dataSource: unknown[],
  ) => {
    const { selectedRowKey } = this.state;
    const results = this.formateDataSource(dataSource, columns).map((row) => (
      <tr
        key={row.key}
        data-tr-key={row.key}
        onMouseOver={this.onMouseOver(row.key)}
        onMouseOut={this.onMouseOut}
        className={classnames({ [`${prefix}-row-hover`]: row.key === selectedRowKey })}
      >
        {
          row.children.map((col) => {
            const {
              align,
              key,
              children,
              props = { rowSpan: 1, colSpan: 1 },
            } = col;
            const tdCls = classnames(`${prefix}-td`, {
              [`${prefix}-td-${align}`]: align,
            });
            const { colSpan = 1, rowSpan = 1 } = props;
            if (!colSpan || !rowSpan) {
              return null;
            }
            return (
              <td data-td-key={key} key={key} className={tdCls} {...props}>{children}</td>
            );
          })
        }
      </tr>
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
          {this.renderColgroup(columns)}
          {this.renderHeader(columns)}
        </table>
      </div>
    ) : null;
  }

  groupColums = (columns: ColumnsProps[], direction: 'left' | 'right' | 'center' = 'center') => columns.filter((column) => {
    let columDirection = column.fixed as string;
    if (column.fixed === true) {
      columDirection = 'left';
    }
    if (!column.fixed) {
      columDirection = 'center';
    }
    return direction === columDirection;
  });

  onScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const { scrollTop, scrollLeft } = e.target as HTMLDivElement;
    if (this.leftTableBodyRef) {
      (this.leftTableBodyRef.current as HTMLDivElement).scrollTop = scrollTop;
    }
    if (this.rightTableBodyRef) {
      (this.rightTableBodyRef.current as HTMLDivElement).scrollTop = scrollTop;
    }
    if (this.mainTableHeaderRef) {
      (this.mainTableHeaderRef.current as HTMLDivElement).scrollLeft = scrollLeft;
    }
    if (this.mainTableBodyRef) {
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
    // eslint-disable-next-line max-len
    const allCheckboxProps = {
      indeterminate: !selectedAll,
      checked: someoneChecked,
      onChange: (checked: boolean) => {
        let currentSelectedRowKeys: unknown[] = [];
        if (!selectedAll || checked) {
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
    } = rowSelection;
    return {
      title: columnTitle || this.selectAllCheckbox(),
      dataIndex: 'selected',
      key: 'selected',
      width: columnWidth || 20,
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

  renderSideTable = (position: FixedType, ref: React.RefObject<HTMLDivElement>) => {
    const {
      columns,
      scroll,
      dataSource,
      bordered,
      rowSelection,
    } = this.props;
    const prefix = this.getPrefixCls();
    const filteredColumns = this.groupColums(columns, position);
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
            {this.renderColgroup(filteredColumns)}
            {
              !scroll || scroll.y === 0 ? this.renderHeader(filteredColumns) : null
            }
            {
              this.renderBody(prefix, filteredColumns, dataSource)
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
    const { rowSelection } = this.props;
    const all = columns.reduce<ColumnsProps[][]>((composed, item) => {
      const [leftColumns, mainColumns, rightColumns] = composed;
      if (item.fixed === 'left' || item.fixed === true) {
        leftColumns.push(item);
      } else if (item.fixed === 'right') {
        rightColumns.push(item);
      } else {
        mainColumns.push(item);
      }
      return composed;
    }, [[/* left  */], [/* center  */], [/* right  */]]);
    const result = [...all[0], ...all[1], ...all[2]];
    if (rowSelection) {
      result.unshift(this.selectionColumn());
    }
    return result;
  }

  render() {
    const {
      getPrefixCls,
      prefixCls,
      columns = [],
      dataSource = [],
      loading = false,
      scroll,
      bordered,
    } = this.props;
    const prefix = getPrefixCls('table', prefixCls);
    const tableContainerCls = classnames(`${prefix}-spain-container`, {
      [`${prefix}-spain-container-blur`]: loading,
    });

    const tableStyle = {};
    if (scroll && scroll.x) {
      Object.assign(tableStyle, { width: scroll.x });
    }
    const scrollTableCls = classnames(`${prefix}-item`);
    const tableCls = classnames(prefix, {
      [`${prefix}-bordered`]: bordered,
      [`${prefix}-fixed`]: scroll && (scroll.x || scroll.y),
    });

    const mainColumns = columns.slice();
    // eslint-disable-next-line no-nested-ternary
    const maxHeight = scroll ? (typeof scroll.y === 'boolean' ? 'auto' : scroll.y) : 'auto';
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
                  {this.renderColgroup(this.getMainColums(columns))}
                  {
                    !scroll || scroll.y === 0 ? this.renderHeader(mainColumns) : null
                  }
                  {
                    this.renderBody(prefix, this.getMainColums(columns), dataSource)
                  }
                </table>
              </div>
            </div>
            {
              this.renderSideTable('left', this.leftTableBodyRef)
            }
            {
              this.renderSideTable('right', this.rightTableBodyRef)
            }
          </div>
        </div>
      </div>
    );
  }
}
