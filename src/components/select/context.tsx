/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { obj } from './select';

export interface SelectConsumerProps {
  value?: string | string[],
  label?: string,
  multiple?: boolean,
  selectedOptions?: Array<obj>,
  onSelect: (value: string | string[], label: string | Array<obj>) => void,
}

export const SelectContext = React.createContext<SelectConsumerProps>({
  value: '',
  label: '',
  multiple: false,
  onSelect: () => {},
});
