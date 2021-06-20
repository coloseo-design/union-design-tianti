/* eslint-disable no-shadow */
import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { scrollToTop } from '../utils/animation';

const duration = 300;
interface AnchorState {
  link?: { id: string, name: string };
  linkElementHeight?: number;
  isClick?: boolean;
}
export interface AnchorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onClick'> {
  // 锚点选项
  options: { id: string, name: string }[];
  /* 用户自定义类前缀，默认uni-anchor */
  prefixCls?: string;
  /* 监听锚点链接改变 */
  onChange?: (currentActiveLink: string) => void;
  /* click 事件的 handler */
  onClick?: (link: { id: string, name: string }, e: Event) => void;
  /* 指定滚动的容器 */
  getContainer?: () => HTMLElement;
}

class Anchor extends Component<AnchorProps, AnchorState> {
  constructor(props: AnchorProps) {
    super(props);
    this.state = {
      linkElementHeight: 0,
      isClick: false,
    };
  }

  componentDidMount() {
    const linkElementHeight = document.querySelector('.uni-anchor-link')?.clientHeight || 0;
    this.setState({ linkElementHeight });

    const { getContainer } = this.props;
    const container = getContainer ? getContainer() : window;
    container && container.addEventListener('scroll', this.scroll);
  }

  componentWillUnmount() {
    const { getContainer } = this.context;
    const container = getContainer ? getContainer() : window;
    container && container.removeEventListener('scroll', this.scroll);
  }

  scroll = () => {
    const { isClick, link } = this.state;
    const { options, onChange } = this.props;
    if (isClick) return;
    const { scrollTop } = document.documentElement;
    const offsetTop = (document.querySelectorAll('.g-header')[0]?.getBoundingClientRect().height ?? 0);
    let activedId = '';
    let activedLink = { id: '', name: '' };
    options.forEach((item) => {
      if (scrollTop + offsetTop > (document.getElementById(item.id)?.offsetTop ?? 0)) {
        activedId = item.id;
        activedLink = { ...item };
      }
    });
    if (activedId !== link?.id) {
      this.setState({ link: { ...activedLink } });
      if (onChange) {
        onChange(activedLink.id);
      }
    }
  };

  renderAnchor = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, onChange, onClick, options, className, ...rest
    } = this.props;
    const { linkElementHeight = 0, link } = this.state;

    const classPrefix = getPrefixCls('anchor', prefixCls);
    const mainClass = classNames(classPrefix, className, {
      // [`${prefix}-has-sider`]: siders.length > 0,
    });

    let timer: NodeJS.Timeout | null = null;

    const handleClick = (link: { id: string; name: string; }) => (e) => {
      this.setState({ link, isClick: true });
      scrollToTop(link.id, duration);
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.setState({ isClick: false });
      }, duration + 100);
      if (onClick) {
        onClick(link, e);
      }
      if (onChange) {
        onChange(link.id);
      }
    };

    const currentIndex = options.findIndex((item) => item.id === link?.id);

    return (
      <div {...rest} className={mainClass}>
        <div className={`${classPrefix}-wrapper`}>
          {(options || []).map((item, index) => (
            <span key={`${index}`} className={`${classPrefix}-ball-gray`} style={{ top: (index * linkElementHeight) + linkElementHeight / 2 - 4 }} />
          ))}
          <span className={`${classPrefix}-ball-red`} style={{ display: link?.id ? 'inline-block' : 'none', top: (currentIndex * linkElementHeight) + linkElementHeight / 2 - 4 }} />
        </div>
        {options.map((item) => (
          <div
            key={item.id}
            className={`${classPrefix}-link`}
            onClick={handleClick(item)}
            title={item.name}
          >
            {item.name}
          </div>
        ))}
      </div>
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

export default Anchor;
