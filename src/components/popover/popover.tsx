import React from 'react';
import { PopProps, Pop } from '@union-design/popconfirm';

const Popover: React.FC<PopProps> = (props: PopProps) => {
  const { trigger = 'hover' } = props;
  return (
    <Pop
      {...props}
      componentType="pop-over"
      trigger={trigger}
    />
  );
};

export default Popover;
