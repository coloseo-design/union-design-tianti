import './styles/index';
import Radio from './radio';
import Group from './group';

export type { RadioProps } from './type';

const ComposedRadio = Radio as typeof Radio & {
  Group: typeof Group;
};
ComposedRadio.Group = Group;
export default ComposedRadio;
