import React from 'react';
import classnames from 'classnames';
import { ConfigConsumerProps, withGlobalConfig } from '../config-provider';
import Icon from '../icon';

type ColumnsAlign = 'left' | 'right' | 'center';
type FixedType = 'left' | 'right';
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
  render?: (text: string, record: unknown) => React.ReactNode;
  /** 标题 */
  title: string;
  /** 宽度 */
  width: string | number;
}

interface TableProps extends ConfigConsumerProps {
  /** 是否包含边框 */
  bordered: boolean;
  columns: ColumnsProps[];
  rowKey: string | ((record: unknown) => string);
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
    onChange: () => void;
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
  show: boolean,
}

@withGlobalConfig
export default class Table extends React.Component<TableProps, TableState> {
  render() {
    const {
      getPrefixCls, prefixCls,
      columns = [],
      dataSource = [],
      rowKey,
      bordered = false,
      loading = false,
      scroll = { x: 0, y: 0, scrollToFirstRowOnChange: false },
    } = this.props;
    const prefix = getPrefixCls('table', prefixCls);
    const tableContainerCls = classnames(`${prefix}-spain-container`, {
      [`${prefix}-spain-container-blur`]: loading,
    });
    const tableCls = classnames(prefix, {
      [`${prefix}-bordered`]: bordered,
      [`${prefix}-fixed`]: scroll.x || scroll.y,
    });

    const tableStyle = {};
    if (scroll.x) {
      Object.assign(tableStyle, { width: scroll.x });
    }
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
            {
              scroll.y && (
                <div className={`${prefix}-header`}>
                  <table className={tableCls} style={tableStyle}>
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
                    <thead>
                      <tr>
                        {
                          columns.map((column) => (
                            <th key={column.key || column.dataIndex}>
                              <span>{column.title}</span>
                            </th>
                          ))
                        }
                      </tr>
                    </thead>
                  </table>
                </div>
              )
            }
            <div className={`${prefix}-body`} style={{ maxHeight: typeof scroll.y === 'boolean' ? 0 : scroll.y, overflow: 'scroll' }}>
              <table className={tableCls} style={tableStyle}>
                <colgroup>
                  {
                    columns.map((item) => (item.width ? (
                      <col
                        key={item.key || item.dataIndex}
                        style={{ width: item.width, minWidth: item.width }}
                      />
                    ) : null))
                  }
                </colgroup>
                {
                  !scroll.y && (
                    <thead>
                      <tr>
                        {
                          columns.map((column) => (
                            <th key={column.key || column.dataIndex}>
                              <span>{column.title}</span>
                            </th>
                          ))
                        }
                      </tr>
                    </thead>
                  )
                }
                <tbody>
                  {
                    dataSource.map((data) => {
                      let key = '';
                      if (rowKey && typeof rowKey === 'string') {
                        key = (data as ({[key: string]: unknown}))[rowKey] as string;
                      }
                      if (rowKey && typeof rowKey === 'function') {
                        key = rowKey(rowKey);
                      }
                      return (
                        <tr key={key}>
                          {
                            columns.map((column) => {
                              const {
                                align = 'left',
                                render,
                                dataIndex,
                              } = column;
                              const tdCls = classnames(`${prefix}-td`, {
                                [`${prefix}-td-${align}`]: align,
                              });
                              let rendered: React.ReactNode | string = '';
                              if (dataIndex) {
                                // eslint-disable-next-line max-len
                                rendered = (data as ({[key: string]: unknown}))[dataIndex] as string;
                              }
                              if (render) {
                                rendered = render(rendered as string, data);
                              }
                              return (
                                <td key={column.key} className={tdCls}>{rendered}</td>
                              );
                            })
                          }
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
