import React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { ConfigConsumerProps, withGlobalConfig } from '../config-provider/context';
import Icon from '../icon';
import { tuple, Omit } from '../utils/type';

export interface ButtonState {
  loading?: boolean | { delay?: number };
}
/**
 * button样式是基于以下一些状态的组合：
 * 5种基础按钮：默认按钮, 主按钮， 虚线按钮，文本按钮，链接按钮
 * 4种状态按钮：危险，幽灵，加载，禁用
 * 3种尺寸：默认，大号, 小号
 * 2种形状: circle, round
 */
const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'danger', 'link');
const ButtonShapes = tuple('circle', 'round');
const ButtonSizes = tuple('default', 'large', 'small');
const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
const ButtonTargets = tuple('_blank', '_parent', '_self', '_top');

export type ButtonType = (typeof ButtonTypes)[number];
export type ButtonShape = (typeof ButtonShapes)[number];
export type ButtonSize = (typeof ButtonSizes)[number];
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number];
export type ButtonTargetType = (typeof ButtonTargets)[number];

export interface BaseButtonProps {
  type?: ButtonType;
  /* 按钮的name属性，用于显示在按钮文本前 */
  icon?: string;
  /* 按钮形状 */
  shape?: ButtonShape;
  /* 按钮尺寸 */
  size?: ButtonSize;
  /* 加载中 */
  loading?: boolean | { delay?: number };
  /* 用户自定义类前缀，默认uni-btn */
  prefixCls?: string;
  /* 用户自定义类 */
  className?: string;
  /* 是否为幽灵按钮 */
  ghost?: boolean;
  /* 是否占满父级元素 */
  block?: boolean;
  children?: React.ReactNode;
  forwardedRef: React.ForwardedRef<HTMLAnchorElement | HTMLButtonElement>;
}

/**
 * 链接按钮属性，当type='link', 用button模拟出a标签
 * 忽略掉mine类型约束属性type, 此属性仅当设置href才有效
 */
export type AnchorButtonProps = {
  /* 跳转链接 */
  href: string;
  /* 类似于a标签的target */
  target?: ButtonTargetType;
  /* 单击行为 */
  onClick?: React.MouseEventHandler<HTMLElement>;
} & Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

/**
 * form中的原始button按钮角色
 * 当设置htmlType属性生效
 */
export type NativeButtonProps = {
  htmlType: ButtonHTMLType;
  onClick: React.MouseEventHandler<HTMLElement>;
} & Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<
  BaseButtonProps & AnchorButtonProps & NativeButtonProps & ConfigConsumerProps
>;

@withGlobalConfig
class Button extends React.Component<ButtonProps, ButtonState> {
  static defaultProps: ButtonProps = {
    loading: false,
    ghost: false,
    block: false,
    htmlType: 'button',
  };

  delayTimer: NodeJS.Timeout | undefined;

  /**
   * 托管loading属性
   * @param props
   */
  constructor(props: ButtonProps) {
    super(props);
    this.state = {
      loading: props.loading,
    };
  }

  /**
   * 接管loading属性
   * @param prevProps
   */
  componentDidUpdate(prevProps: BaseButtonProps) {
    const { loading } = this.props;
    if (prevProps.loading && typeof prevProps.loading !== 'boolean') {
      this.delayTimer && clearTimeout(this.delayTimer);
    } else if (loading && typeof loading !== 'boolean' && loading.delay) {
      this.delayTimer = setTimeout(() => {
        this.setState({
          loading,
        });
      }, loading.delay);
    } else if (loading !== prevProps.loading && typeof loading === 'boolean') {
      this.setState({
        loading,
      });
    }
  }

  /* 清除定时器 */
  componentWillUnmount() {
    this.delayTimer && clearTimeout(this.delayTimer);
  }

  /**
   * 代理按钮的click事件
   * 当状态为loading的时候，点击无效
   * @param e
   */
  onClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (e) => {
    const { loading } = this.state;
    const { onClick } = this.props;
    if (loading) return;
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  }

  render = () => {
    const ButtonSizeMap = {
      large: 'lg',
      small: 'sm',
      default: '',
    };
    const {
      children,
      size,
      className, // 自定义的className
      type,
      shape,
      icon,
      block,
      ghost,
      prefixCls: customizedPrefixCls,
      forwardedRef,
      getPrefixCls,
      ...rest
    } = this.props;
    const { loading } = this.state;
    let sizeCls = '';
    if (size) {
      sizeCls = ButtonSizeMap[size];
    }
    const prefixCls = getPrefixCls!('btn', customizedPrefixCls);

    const classes: string = classNames(prefixCls, className, {
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-loading`]: !!loading,
      [`${prefixCls}-background-ghost`]: ghost,
      [`${prefixCls}-block`]: block,
    });
    const iconName = loading ? 'loading' : icon;
    const iconElement = iconName ? <Icon type={iconName} /> : undefined;
    const linkButtonRestProps = omit(rest, ['htmlType']) as AnchorButtonProps;
    // link-like button
    if (typeof linkButtonRestProps.href !== 'undefined') {
      return (
        <a
          {...linkButtonRestProps}
          className={classes}
          href={linkButtonRestProps.href}
          onClick={this.onClick}
          ref={forwardedRef as React.ForwardedRef<HTMLAnchorElement>}
        >
          {iconElement}
          <span>{children}</span>
        </a>
      );
    }
    // TODO: htmlType属性将来用于form中进行劫持
    const { htmlType, ...otherProps } = rest as NativeButtonProps;
    // loading作用于图标
    /* eslint react/button-has-type: 0 */
    return (
      <button
        {...(otherProps)}
        type={htmlType}
        className={classes}
        onClick={this.onClick}
        ref={forwardedRef as React.ForwardedRef<HTMLButtonElement>}
      >
        {iconElement}
        <span>{children}</span>
      </button>
    );
  }
}

export default React.forwardRef((props: Omit<ButtonProps, 'forwardedRef'>, ref: React.ForwardedRef<HTMLAnchorElement | HTMLButtonElement>) => <Button {...props} forwardedRef={ref} />);
