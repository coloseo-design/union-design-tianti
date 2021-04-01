import React from 'react';
import Pop, { PopProps } from '../pop-confirm/pop';

const PopOver: React.FC<PopProps> = (props: PopProps) => {
  const { trigger = 'hover' } = props;
  return (
    <Pop
      {...props}
      componentType="pop-over"
      trigger={trigger}
    />
  );
};

export default PopOver;
