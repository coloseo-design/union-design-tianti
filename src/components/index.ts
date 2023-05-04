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
export { default as Alert } from './alert';
export { default as Anchor } from './anchor';
export { default as AutoComplete } from './auto-complete';
export { default as Avatar } from './avatar';
export { default as BackTop } from './back-top';
export { default as Badge } from './badge';
export { default as Breadcrumb } from './breadcrumb';
export { default as Button } from './button';
export { default as Calendar } from './calendar';
export { default as Card } from './card';
export { default as Carousel } from './carousel';
export { default as Cascader } from './cascader';
export { default as Checkbox } from './checkbox';
export { Col } from './grid';
export { default as Collapse } from './collapse';
// common-skip
// config-provider-skip
export { default as DatePicker } from './date-picker';
export { default as Descriptions } from './descriptions';
export { default as Divider } from './divider';
export { default as Drawer } from './drawer';
export { default as Dropdown } from './dropdown';
export { default as Form } from './form';
// grid-skip
export { default as Icon } from './icon';
export { default as Image } from './image';
export { default as Input } from './input';
export { default as InputNumber } from './input-number';
export { default as Layout } from './layout';
export { default as List } from './list';
export { default as Menu } from './menu';
export { default as Message } from './message';
export { default as Modal } from './modal';
export { default as Notification } from './notification';
export { default as PageHeader } from './page-header';
export { default as Pagination } from './pagination';
export { default as Popconfirm } from './popconfirm';
export { default as Popover } from './popover';
export { default as Progress } from './progress';
export { default as Radio } from './radio';
export { default as Rate } from './rate';
export { default as Result } from './result';
export { Row } from './grid';
export { default as Select } from './select';
export { default as Skeleton } from './skeleton';
export { default as Slider } from './slider';
export { default as Spin } from './spin';
export { default as Statistic } from './statistic';
export { default as Steps } from './steps';
// style-skip
export { default as Switch } from './switch';
export { default as Table } from './table';
export { default as Tabs } from './tabs';
export { default as Tag } from './tag';
export { default as Timeline } from './timeline';
export { default as Tooltip } from './tooltip';
export { default as Transfer } from './transfer';
export { default as Tree } from './tree';
export { default as TreeSelect } from './tree-select';
export { default as Typography } from './typography';
export { default as Upload } from './upload';
export { default as NewMenu } from './new-menu';

export { default as SideNav } from './side-nav';
export { default as TopNav } from './top-nav';
export { default as Header } from './header';
