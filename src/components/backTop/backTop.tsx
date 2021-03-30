import React, { Component, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon';
import { scrollToTop } from '../utils/animation';

export interface BackTopProps {
  /* 自定义样式 */
  style?: CSSProperties;
  /* 用户自定义类前缀，默认uni-backTop */
  prefixCls?: string;
  /* 回到顶部所需时间（ms） */
  duration?: number;
  /* 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target?: () => HTMLElement;
  /* 滚动高度达到此参数值才出现 BackTop */
  visibilityHeight?: number;
  /* 点击按钮的回调函数 */
  onClick?: () => void;
}

interface BackTopState {
  scrollTop: number;
}

class BackTop extends Component<BackTopProps, BackTopState> {
  static defaultProps: BackTopProps = {
    duration: 450,
    visibilityHeight: 400,
  };

  constructor(props: BackTopProps) {
    super(props);
    this.state = {
      scrollTop: 0,
    };
  }

  componentDidMount() {
    const { target } = this.props;
    const container = target ? target() : window;
    container && container.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    const { target } = this.props;
    const container = target ? target() : window;
    container && container.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    /**
     * clientHeight: 可视区域高度
     * scrollTop: 滚动条滚动高度
     * scrollHeight: 滚动内容高度
     */
    const { scrollTop } = document.documentElement || document.body;
    this.setState({ scrollTop });
  };

  renderBackTop = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, style, onClick, visibilityHeight = 400, duration = 450,
    } = this.props;
    const { scrollTop = 0 } = this.state;

    const classPrefix = getPrefixCls('backTop', prefixCls);
    const mainClass = classNames(classPrefix, {
      // [`${prefix}-has-sider`]: siders.length > 0,
    });

    const handleClick = () => {
      scrollToTop('body', duration);
      if (onClick) {
        onClick();
      }
    };

    return (
      <div className={mainClass} style={style}>
        {scrollTop >= visibilityHeight && (
          <span onClick={handleClick}>
            <Icon type="top" />
          </span>
        )}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderBackTop}
      </ConfigConsumer>
    );
  }
}

export default BackTop;
