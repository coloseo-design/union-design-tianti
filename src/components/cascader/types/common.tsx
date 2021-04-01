export interface CascaderOptionType {
  value?: string;
  label?: React.ReactNode;
  disabled?: boolean;
  // isLeaf?: boolean;
  // loading?: boolean;
  children?: CascaderOptionType[];
  [key: string]: unknown;
}

export interface FieldNamesType {
  value: string;
  label: string;
  children: string;
}
