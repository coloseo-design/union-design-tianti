/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-types */
import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Link from './link';
import { AnchorContext } from './context';

export interface AnchorProps {
  /* 自定义样式 */
  style?: CSSProperties;
  /* 用户自定义类前缀，默认uni-anchor */
  prefixCls?: string;
  /* 监听锚点链接改变 */
  onChange?: (currentActiveLink: string) => void;
  /* click 事件的 handler */
  onClick?: (e: unknown, link: {[key: string] : unknown}) => void;
  /* 指定滚动的容器 */
  getContainer?: () => HTMLElement;
}

interface AnchorState {
  currentHref: string;
  linkElementHeight?: number;
}

const { Provider } = AnchorContext;
class Anchor extends Component<AnchorProps, AnchorState> {
  static Link: typeof Link;

  constructor(props: AnchorProps) {
    super(props);
    this.state = {
      currentHref: '',
      linkElementHeight: 0,
    };
  }

  componentDidMount() {
    const linkElementHeight = document.querySelector('.uni-anchor-link')?.clientHeight;
    this.setState({ linkElementHeight });
  }

  updateHref = (href: string) => {
    this.setState({ currentHref: href });
  }

  renderAnchor = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, children, style, getContainer, onChange, onClick,
    } = this.props;
    const { currentHref, linkElementHeight = 0 } = this.state;
    const classPrefix = getPrefixCls('anchor', prefixCls);
    const mainClass = classNames(classPrefix, {
      // [`${prefix}-has-sider`]: siders.length > 0,
    });

    const toArrayChildren = React.Children.toArray(children);

    const childrenProps = React.Children.map(toArrayChildren, (child) => (React.isValidElement(child) ? child.props : {}));
    const hrefIndex = childrenProps.findIndex((i) => i.href === currentHref);

    return (
      <Provider value={{
        updateHref: this.updateHref,
        currentHref,
        getContainer,
        onChange,
        onClick,
      }}
      >
        <div style={style}>
          <div className={`${classPrefix}-wrapper`}>
            <div className={mainClass}>
              <div className={`${classPrefix}-ink`}>
                {(toArrayChildren || []).map((_item, index) => (
                  <span key={`${index}`} className={`${classPrefix}-ink-ball-gray`} style={{ top: (index * linkElementHeight) + linkElementHeight / 2 - 4 }} />
                ))}
                <span className={`${classPrefix}-ink-ball`} style={{ display: currentHref ? 'inline-block' : 'none', top: (hrefIndex * linkElementHeight) + linkElementHeight / 2 - 4 }} />
              </div>
              {children}
            </div>
          </div>
        </div>
      </Provider>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderAnchor}
      </ConfigConsumer>
    );
  }
}

Anchor.Link = Link;

export default Anchor;
