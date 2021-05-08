/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/prefer-default-export */
import React from 'react';

export interface contextProps {
  updateLinkElementHeight?: (height: number) => void;
  updateHref?: (href: string) => void;
  currentHref?: string;
  getContainer?: () => HTMLElement;
  onChange?: (currentActiveLink: string) => void;
  onClick?: (e: unknown, link: {[key: string] : unknown}) => void;
}

export const AnchorContext = React.createContext<contextProps>({
  updateHref: () => {},
  currentHref: '',
});
