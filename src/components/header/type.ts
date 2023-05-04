import { CSSProperties, ReactNode } from 'react';
import { SideNavProps } from '../top-nav/top-nav';

export type HeaderNavProps = SideNavProps<any>;

export interface HeaderProps {
  // type: 业务类business; 宣传类propaganda;综合类comprehensive;
  type?: 'business' |'propaganda' |'comprehensive';
  title: string;
  search: boolean | SearchProps; // 如果false则不展示search, 否则传入配置
  menus?: (Menu | ReactNode)[];
  showNav?: boolean; // 是否需要menu
  showBg?: boolean; // 是否展示背景
  topMenus?: (Menu | ReactNode)[]; // 只有综合类生效
  navProps?: SideNavProps<any>;
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
  options: Option[];
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
