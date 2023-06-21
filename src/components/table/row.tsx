/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
import React, { CSSProperties, ReactNode } from 'react';
import classnames from 'classnames';
import { ColProps } from './type';
import Icon from '../icon';

interface TableRowProps {
  rowKey: string;
  columns: ColProps[];
  hover: boolean;
  prefixCls: string;
  className?: string;
  style?: CSSProperties;
  isFixedBody?: boolean;
  openKeys: unknown[]; // 展开行的keys
  changeOpenKeys?: (keys: unknown[]) => void; // 改变展开行的keys
  currentRecord?: any; // 当前数据
  expandedRowRender?: (record: any) => ReactNode | string | null; // 展开行内容
  expandedRowStyle?: CSSProperties; // 展开行样式
  rowSelection?: any;
  isSingleCol?: boolean; // 为true表示展开图标单独占一列
  handleExpand?: (record: any) => void; // 点击展开图标事件
  childrenColumnName?: string;
  level?: number,
}

const ICON_SIZE = 12;
const ICON_GAP = 4;
const PADDING_LEFT = 8;
const INDENT_SIZE = ICON_SIZE + ICON_GAP;

const Row: React.FC<TableRowProps> = (fcProps) => {
  const {
    rowKey,
    columns = [],
    prefixCls: prefix,
    hover = false,
    className,
    isFixedBody,
    openKeys = [],
    changeOpenKeys,
    currentRecord,
    level = 1,
    expandedRowStyle = {},
    expandedRowRender,
    rowSelection,
    isSingleCol,
    handleExpand,
    childrenColumnName,
    ...rest
  } = fcProps;
  const expandRow = expandedRowRender?.(currentRecord);
  let paddingLeft = PADDING_LEFT; // 8 是td more的间距
  if (rowSelection) {
    const { columnWidth = 45 } = rowSelection;
    paddingLeft += columnWidth + (isSingleCol && expandedRowRender ? 0 : INDENT_SIZE);
  }
  if (isSingleCol && expandedRowRender) {
    paddingLeft += 45;
  }
  if (!rowSelection && !isSingleCol) {
    paddingLeft += INDENT_SIZE;
  }

  return (
    <>
      <tr
        {...rest}
        data-tr-key={rowKey}
        className={classnames({ [`${prefix}-row-hover`]: hover }, className)}
      >
        {
        columns.map((col, index) => {
          const {
            align,
            key,
            children,
            props = { rowSpan: 1, colSpan: 1 },
          } = col;
          const tdCls = classnames(`${prefix}-td`, {
            [`${prefix}-td-${align}`]: align,
          });
          // eslint-disable-next-line react/prop-types
          const { colSpan = 1, rowSpan = 1 } = props;
          if (!colSpan || !rowSpan) {
            return null;
          }
          let indexCol = 0; // 第一列
          if (isSingleCol) {
            indexCol += 1;
          }
          if (rowSelection) {
            indexCol += 1;
          }
          let showIcon = false;
          const childLen = currentRecord?.[childrenColumnName as string]?.length;
          if (isSingleCol) {
            showIcon = col.key === 'expandRowKey' || (childLen && level === 1 && col.key === 'childrenRowKey');
            if (level > 1) {
              showIcon = childLen && (rowSelection ? index === 2 : index === 1);
            }
          } else if (rowSelection) {
            showIcon = (childLen && index === 1) || Boolean(expandRow && index === 1);
          } else {
            showIcon = (childLen && index === 0) || Boolean(expandRow && index === 0);
          }

          return (
            <td
              data-td-key={key}
              key={key}
              className={tdCls}
              {...props}
              style={{ paddingLeft: level > 2 && index === indexCol ? (level - 2) * INDENT_SIZE + PADDING_LEFT : undefined }}
            >
              <>
                {showIcon && (
                  <Icon
                    type={openKeys.includes(rowKey) ? 'fill-down' : 'fill-right'}
                    style={{ fontSize: 12, marginRight: 4, cursor: 'pointer' }}
                    onClick={() => {
                      let temKeys = [...openKeys];
                      if (openKeys.includes(rowKey)) {
                        temKeys = openKeys.filter((i) => i !== rowKey);
                      } else {
                        handleExpand?.(currentRecord);
                        temKeys.push(rowKey);
                      }
                      changeOpenKeys?.(temKeys);
                    }}
                  />
                )}
                {!isFixedBody && col.fixed ? '' : children}
              </>
            </td>
          );
        })
      }
      </tr>
      {expandRow && openKeys.includes(rowKey) && (
        <tr className={`${prefix}-extraRow`}>
          <td
            colSpan={columns.length}
            style={{
              paddingLeft,
              ...expandedRowStyle,
            }}
          >
            {expandRow}
          </td>
        </tr>
      )}
    </>
  );
};

export default Row;
