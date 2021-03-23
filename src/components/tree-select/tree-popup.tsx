import React from 'react';
import ReactDOM from 'react-dom';
import { TreePopupProps } from './type';

class TreePopup extends React.Component<TreePopupProps> {
  root: HTMLDivElement;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.root = document.createElement('div');
    this.root.style.position = 'absolute';
    this.root.style.top = '0';
    this.root.style.left = '0';
    this.root.style.width = '100%';
  }

  componentDidMount() {
    const { getPopupContainer } = this.props;
    ((getPopupContainer && getPopupContainer()) || document.body).appendChild(this.root);
  }

  componentWillUnmount() {
    const { getPopupContainer } = this.props;
    ((getPopupContainer && getPopupContainer()) || document.body).removeChild(this.root);
  }

  render() {
    const { children } = this.props;
    return (
      ReactDOM.createPortal(children, this.root)
    );
  }
}

export default TreePopup;
