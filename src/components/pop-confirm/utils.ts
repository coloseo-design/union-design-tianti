
export type PlacementType = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

interface ChangeD {
  [x: string]: PlacementType;
}

export const changeTopDir: ChangeD = {
  'top': 'bottom',
  'topLeft': 'bottomLeft',
  'topRight': 'bottomRight',
};

export const changeLeftDir: ChangeD = {
  'left': 'right',
  'leftTop': 'rightTop',
  'leftBottom': 'rightBottom',
};
export const changeRightDir: ChangeD = {
  'right': 'left',
  'rightTop': 'leftTop',
  'rightBottom': 'leftBottom',
}
export const changeBottomDir: ChangeD = {
  'bottom': 'top',
  'bottomLeft': 'topLeft',
  'bottomRight': 'topRight',
};

export function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}