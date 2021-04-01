import React from 'react';

export interface RowContextProps {
  /* 栅格间隔 */
  gutter: number[];
}

const RowContenxt = React.createContext<RowContextProps>({ gutter: [0, 0] });
export const { Consumer: RowConsumer, Provider: RowProvider } = RowContenxt;
