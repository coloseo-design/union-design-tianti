import { tuple } from '@union-design/utils';

const PlacementTypes = tuple('top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop',
  'leftBottom', 'rightTop', 'rightBottom');
export type PlacementType = (typeof PlacementTypes)[number];
interface ChangeD {
  [x: string]: PlacementType;
}

export const changeTopDir: ChangeD = {
  top: 'bottom',
  topLeft: 'bottomLeft',
  topRight: 'bottomRight',
};

export const changeLeftDir: ChangeD = {
  left: 'right',
  leftTop: 'rightTop',
  leftBottom: 'rightBottom',
};
export const changeRightDir: ChangeD = {
  right: 'left',
  rightTop: 'leftTop',
  rightBottom: 'leftBottom',
};

export const changeBottomDir: ChangeD = {
  bottom: 'top',
  bottomLeft: 'topLeft',
  bottomRight: 'topRight',
};

export function uuid() {
  function S4() {
    /* eslint no-bitwise: 0 */
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  /* eslint prefer-template: 0 */
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
