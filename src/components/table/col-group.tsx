import React from 'react';
import { ColumnsProps } from './type';

interface ColGroupProps {
  columns: ColumnsProps[];
}

const ColGroup: React.FC<ColGroupProps> = (props: ColGroupProps) => {
  const { columns } = props;
  return (
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
  );
};

export default ColGroup;
