/* eslint-disable react/display-name */
import React from 'react';
import { TabsContextType } from './type';

const TabsContext = React.createContext<TabsContextType>({
  checkedKey: '',
});

// eslint-disable-next-line import/prefer-default-export
export const { Provider: TabsProvider, Consumer: TabsConsumer } = TabsContext;
// eslint-disable-next-line max-len
// export const withTabContext = <T extends TabsContextType>(Component: React.FC<T> | React.Component<T>) => (props: any) => (
//   <TabsContext.Consumer>
//     {
//       ({ checkedKey }) => <Component checkedKey={checkedKey} {...props} />
//     }
//   </TabsContext.Consumer>
// );
