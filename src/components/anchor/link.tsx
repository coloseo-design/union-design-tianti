import React, { Component, ReactNode } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { AnchorContext } from './context';
import { scrollToTop } from '../utils/animation';

export interface LinkProps {
  /* 用户自定义类前缀，默认uni-anchor-link */
  prefixCls?: string;
  /* 锚点链接 */
  href?: string;
  /* 文字内容 */
  title?: ReactNode;
  nextHref?: string;
}

class Link extends Component<LinkProps> {
  static contextType = AnchorContext;

  private animating: boolean | undefined;

  componentDidMount() {
    const { getContainer } = this.context;
    const container = getContainer ? getContainer() : window;
    container && container.addEventListener('scroll', this.onScroll);
  }

  componentDidUpdate() {
    const { getContainer } = this.context;
    const container = getContainer ? getContainer() : window;
    container && container.removeEventListener('scroll', this.onScroll);
    container && container.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    const { getContainer } = this.context;
    const container = getContainer ? getContainer() : window;
    container && container.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    /**
     * clientHeight: 可视区域高度
     * scrollTop: 滚动条滚动高度
     * scrollHeight: 滚动内容高度
     */
    if (this.animating) {
      return;
    }
    const { scrollTop, scrollHeight } = document.documentElement || document.body;
    // const headerElement = document.querySelector('header');
    // const headerHeight = headerElement ? headerElement.clientHeight : 0;
    const { updateHref, onChange } = this.context;
    const { href = '' } = this.props;
    const element = document.querySelector(href);
    const nextElement = element?.nextElementSibling;
    const elementScrollTop = element
      ? element.getBoundingClientRect().top + window.pageYOffset
      : 0;
    const nextElementScrollTop = nextElement
      ? nextElement.getBoundingClientRect().top + window.pageYOffset
      : scrollHeight;

    if (scrollTop >= (Math.floor(elementScrollTop))
    && scrollTop < (Math.floor(nextElementScrollTop))) {
      updateHref(href);
      if (onChange) {
        onChange(href);
      }
    }
  };

  renderLink = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, title, href = '',
    } = this.props;
    const { updateHref, onChange, onClick } = this.context;

    const classPrefix = getPrefixCls('anchor-link', prefixCls);
    const mainClass = classNames(classPrefix, {
      // click,
    });

    const handleClick = (e: unknown) => {
      this.animating = true;
      updateHref(href);
      scrollToTop(href, 300);
      // const element = document.querySelector(href);
      // element && element.scrollIntoView({ behavior: 'smooth' });
      this.animating = false;
      if (onChange) {
        onChange(href);
      }
      if (onClick) {
        onClick(e, {
          href,
          title,
        });
      }
    };

    return (
      <AnchorContext.Consumer>
        {({ currentHref }) => (
          <div className={mainClass} onClick={handleClick}>
            <span style={{ color: currentHref === href ? '#b30000' : 'black' }}>{title}</span>
          </div>
        )}
      </AnchorContext.Consumer>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderLink}
      </ConfigConsumer>
    );
  }
}

Link.contextType = AnchorContext;

export default Link;
