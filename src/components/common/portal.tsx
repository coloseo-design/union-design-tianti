import React from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  getPopupContainer?: () => HTMLElement | null;
}

class Portal extends React.Component<PortalProps> {
  root: HTMLDivElement;

  constructor(props: PortalProps) {
    super(props);
    // root为根目录
    this.root = document.createElement('div');
    this.root.style.position = 'absolute';
    this.root.style.top = '0';
    this.root.style.left = '0';
    this.root.style.width = '100%';
  }

  componentDidMount() {
    const { getPopupContainer = () => document.body } = this.props;
    const popupContaier = getPopupContainer();
    popupContaier && popupContaier.appendChild(this.root);
  }

  componentWillUnmount() {
    const { getPopupContainer = () => document.body } = this.props;
    const popupContaier = getPopupContainer();
    popupContaier && popupContaier.removeChild(this.root);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(
      children,
      this.root,
    );
  }
}

export default Portal;
