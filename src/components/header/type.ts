import { CSSProperties, ReactNode } from 'react';
import { SideNavProps } from '@union-design/top-nav';

export type HeaderNavProps = SideNavProps<any>;

export interface HeaderProps {
  size?: 'md' | 'lg';
  title?: string;
  search?: boolean | SearchProps; // 如果false则不展示search, 否则传入配置
  menus?: (Menu | ReactNode)[];
  showBg?: boolean | string; // 是否展示背景 或者背景图片src
  topMenus?: (Menu | ReactNode)[]; // 只有综合类生效
  bordered?: boolean;
  navProps?: SideNavProps<any>; // 顶部导航api
}

export interface SearchProps {
  placeholder?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
  onSearch?: (value: string) => void;
  select?: boolean | SelectProps;
  style?: CSSProperties;
  type?: 'primary' | 'default',
}

// select
export interface SelectProps {
  options?: Option[];
  onChange?: (value: string) => void;
}

export interface Option {
  key: string;
  value: string;
  label: string;
}

export interface Menu {
  key: string;
  title: string | React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (evt: React.MouseEvent<HTMLElement>, key: string) => void;
}
