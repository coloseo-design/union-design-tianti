const ENV = process.env.NODE_ENV;
/* eslint import/prefer-default-export: 0 */
if (
  ENV !== 'production'
  && ENV !== 'test'
  && typeof console !== 'undefined'
  && console.warn // eslint-disable-line no-console
  && typeof window !== 'undefined'
) {
  // eslint-disable-next-line no-console
  console.warn(
    `You are using a whole package of antd,
      please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.`,
  );
}

// 请在此处导出所有组件
export { default as Affix } from './affix';
export { default as Button } from './button';
export { default as Card } from './card';
export { default as Tag } from './tag';
export { default as Tabs } from './tabs';

export { default as Layout } from './layout';
export { default as Modal } from './modal';
export { default as Icon } from './icon';
export { default as Popconfirm } from './pop-confirm';
export { default as Result } from './result';
export { default as PageHeader } from './pageHeader';
export { default as Alert } from './alert';
export { default as AutoComplete } from './auto-complete';
export { default as Anchor } from './anchor';
export { default as Avatar } from './avatar';
export { default as Badge } from './badge';
export { default as Calendar } from './calendar';
export { default as Carousel } from './carousel';
export { default as Cascader } from './cascader';
export { default as Checkbox } from './checkbox';
export { default as Collapse } from './collapse';
export { default as Datepicker } from './date-picker';
export { default as Descriptions } from './descriptions';
export { default as Form } from './form';
export { Row, Col } from './grid';
export { default as Input } from './input';
export { default as InputNUmber } from './input-number';
export { default as List } from './list';
export { default as Radio } from './radio';
export { default as Rate } from './rate';
export { default as Select } from './select';
export { default as Slider } from './slider';
export { default as Statistic } from './statistic';
export { default as Switch } from './switch';
export { default as Table } from './table';
export { default as Tooltip } from './tooltip';
export { default as Transfer } from './transfer';
export { default as Tree } from './tree';
export { default as TreeSelect } from './tree-select';
export { default as Upload } from './upload';
export { default as Dropdown } from './drop-down';
export { default as Notification } from './notification';
export { default as Message } from './message';
export { default as Popover } from './pop-over';
export { default as Drawer } from './drawer';
