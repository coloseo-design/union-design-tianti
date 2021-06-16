import React from 'react';
import Pop, { PopProps } from './pop';

const PopConfim: React.FC<PopProps> = (props: PopProps) => {
  const { trigger = 'click', ...rest } = props;
  return (
    <Pop
      {...rest}
      componentType="pop-confirm"
      trigger={trigger}
    />
  );
};

export default PopConfim;
