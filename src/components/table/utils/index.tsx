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
