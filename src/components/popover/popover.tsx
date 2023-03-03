import React from 'react';
import Pop, { PopProps } from '../popconfirm/pop';

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
