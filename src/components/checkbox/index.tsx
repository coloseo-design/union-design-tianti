import './styles/index';
import Checkbox from './checkbox';
import Group from './group';

export type { CheckboxGroupProps, CheckboxProps } from './type';

const ComposedCheckbox = Checkbox as typeof Checkbox & {
  Group: typeof Group;
};
ComposedCheckbox.Group = Group;
export default ComposedCheckbox;
