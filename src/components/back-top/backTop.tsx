import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';
import Icon from '@union-design/icon';
import { Omit } from '@union-design/utils';

export interface BackTopProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /* 用户自定义类前缀，默认uni-backTop */
  prefixCls?: string;
  /* 回到顶部所需时间（ms） */
  duration?: number;
  /* 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target?: () => HTMLElement | null;
  /* 滚动高度达到此参数值才出现 BackTop */
  visibilityHeight?: number;
  /* 点击按钮的回调函数 */
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
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

  onScroll = (e: any) => {
    const { target } = this.props;
    // const { scrollTop } = document.documentElement;
    const scrollTop = target && target() ? e.target.scrollTop : document.documentElement.scrollTop;
    this.setState({ scrollTop });
  };

  renderBackTop = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, onClick, visibilityHeight = 400, duration = 450, className, target,
      ...rest
    } = this.props;
    const { scrollTop = 0 } = this.state;

    const classPrefix = getPrefixCls('backTop', prefixCls);
    const mainClass = classNames(classPrefix, className, {
      // [`${prefix}-has-sider`]: siders.length > 0,
    });

    const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      const container = target ? target() : window;
      container?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <div {...rest} className={mainClass}>
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
