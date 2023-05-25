/* eslint-disable import/prefer-default-export */
export function getOffset(node: any, containter: any) {
  const box = node.getBoundingClientRect();
  const docElem = document.documentElement;
  if (containter) {
    const { left: containterLeft, top: containterTop } = containter.getBoundingClientRect();
    return {
      left: box.left - containterLeft + (containter?.scrollLeft || 0),
      top: box.top - containterTop + (containter?.scrollTop || 0),
    };
  }
  return {
    left: box.left + (window.pageXOffset || docElem.scrollLeft)
      - (docElem.clientLeft || document.body.clientLeft || 0),
    top: box.top + (window.pageYOffset || docElem.scrollTop)
      - (docElem.clientTop || document.body.clientTop || 0),
  };
}
