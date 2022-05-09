/* eslint-disable no-param-reassign */
import { ColumnsProps } from '../type';

// eslint-disable-next-line import/prefer-default-export
export const sortColums = (columns: ColumnsProps[]) => {
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
  // 去掉filter组件, 挡在后面的filter不展示，提升性能
  const resultWithoutFilter = result.map((item: ColumnsProps) => {
    if (item.fixed && item.filters && item.filters?.length > 0) {
      return {
        ...item,
        filters: [],
      };
    }
    return item;
  });
  return resultWithoutFilter;
};

export const groupColums = (columns: ColumnsProps[], direction: 'left' | 'right' | 'center' = 'center') => columns.filter((column) => {
  let columDirection = column.fixed as string;
  if (column.fixed === true) {
    columDirection = 'left';
  }
  if (!column.fixed) {
    columDirection = 'center';
  }
  return direction === columDirection;
});

export const flattenColums = (data: ColumnsProps[] = []): any => data.reduce((pre, cur) => {
  const child = cur.children && cur.children.length > 0;
  return pre.concat(child ? flattenColums(cur.children) : cur);
}, []);

export const renderColumns = (propsColumns: ColumnsProps[], idx: number) => {
  const ColumnRows: ColumnsProps[][] = [];
  const fillColumns = (
    columns: ColumnsProps[],
    colIndex: number,
    rowIndex = 0,
  ): number[] => {
    ColumnRows[rowIndex] = ColumnRows[rowIndex] || [];

    let currentColIndex = colIndex;
    const colSpans: number[] = columns.filter(Boolean).map((column) => {
      const cell:any = {
        key: column.key || column.title,
        ...column,
      };

      let colSpan = 1;

      const subColumns = (column as ColumnsProps).children;
      if (subColumns && subColumns.length > 0) {
        colSpan = fillColumns(subColumns, currentColIndex, rowIndex + 1).reduce(
          (total, count) => total + count,
          0,
        );
        cell.hasSubColumns = true;
      }

      if ('colSpan' in column) {
        ({ colSpan = 1 } = column);
      }

      if ('rowSpan' in column) {
        cell.rowSpan = column.rowSpan;
      }

      cell.colSpan = colSpan;
      ColumnRows[rowIndex].push(cell);

      currentColIndex += colSpan;

      return colSpan;
    });

    return colSpans;
  };
  fillColumns(propsColumns, idx);
  const rowCount = ColumnRows.length;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    ColumnRows[rowIndex].forEach((cell) => {
      if (!('rowSpan' in cell) && !cell.hasSubColumns) {
        cell.rowSpan = rowCount - rowIndex;
      }
    });
  }
  return ColumnRows;
};
