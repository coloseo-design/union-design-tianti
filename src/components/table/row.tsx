import React from 'react';
import classnames from 'classnames';
import { ColProps } from './type';

interface TableRowProps {
  rowKey: string;
  columns: ColProps[];
  hover: boolean;
  prefixCls: string;
  className?: string;
}

const Row: React.FC<TableRowProps> = (fcProps) => {
  const {
    rowKey,
    columns = [],
    prefixCls: prefix,
    hover = false,
    className,
    ...rest
  } = fcProps;
  return (
    <tr
      {...rest}
      data-tr-key={rowKey}
      className={classnames({ [`${prefix}-row-hover`]: hover }, className)}
    >
      {
        columns.map((col) => {
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
          return (
            <td data-td-key={key} key={key} className={tdCls} {...props}>{children}</td>
          );
        })
      }
    </tr>
  );
};

export default Row;
