/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { OptionType } from './select';

export interface SelectConsumerProps {
  multiple?: boolean,
  selectedOptions?: Array<OptionType>,
  onSelect: (current: OptionType) => void,
  valueObj?: OptionType | OptionType[],
}

export const SelectContext = React.createContext<SelectConsumerProps>({
  multiple: false,
  onSelect: () => {},
});
