import React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/context';
import Icon from '../icon';
import { tuple } from '../utils/type';

export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never;
export type LiteralUnion<T extends U, U> = T | U;

// 预设color值效果
export const PresetColorTypes = tuple(
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
);

// color录入格式校验
export type PresetColorType = ElementOf<typeof PresetColorTypes>;

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  // 用户自定义类前缀，默认uni-tag
  prefixCls?: string;
  // 自定义样式类名
  className?: string;
  // 自定义样式颜色
  color?: LiteralUnion<PresetColorType, string>;
  // 标签是否可关闭
  closable?: boolean;
  // 标签是否可见
  visible?: boolean;
  // 点击关闭图标响应函数
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  // 用户自定义样式
  style?: React.CSSProperties;
  // 标签前插入icon
  icon?: React.ReactNode;
}

// 校验color是否为预设值正则表达式
const PresetColorRegex = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`);

// React.forwardRef((props,ref)={})
const InternalTag: React.ForwardRefRenderFunction<HTMLSpanElement, TagProps> = (
  {
    prefixCls: customizePrefixCls,
    className,
    style,
    children,
    icon,
    color,
    onClose,
    closable = false,
    ...props
  },
  // React.forwardRef传递函数组件ref到dom
  ref,
) => {
  // 获取getPrefixCls函数修改classname
  const { getPrefixCls } = React.useContext(ConfigContext);
  // 预设标签可见
  const [visible, setVisible] = React.useState(true);

  // 绑定visible变化副作用函数
  React.useEffect(() => {
    if ('visible' in props) {
      setVisible(props.visible!);
    }
  }, [props.visible]);

  // 判断color存在且为预设值
  const isPresetColor = (): boolean => {
    if (!color) {
      return false;
    }
    return PresetColorRegex.test(color);
  };

  // 当color存在且不为预设值时设置背景色
  const tagStyle = {
    backgroundColor: color && !isPresetColor() ? color : undefined,
    ...style,
  };

  const presetColor = isPresetColor();
  const prefixCls = getPrefixCls('tag', customizePrefixCls);
  const tagClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${color}`]: presetColor, //  color存在且为预设值
      [`${prefixCls}-has-color`]: color && !presetColor, // color存在且不为预设值
      [`${prefixCls}-hidden`]: !visible, // 是否可见
    },
    className,
  );

  // 点击关闭icon后的改变visible值
  const handleCloseClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.(e);

    if (e.defaultPrevented) {
      return;
    }
    if (!('visible' in props)) {
      setVisible(false);
    }
  };

  // 标签closable，可关闭标签的icon与绑定事件
  const renderCloseIcon = () => {
    if (closable) {
      return (
        <Icon type="close" className={`${prefixCls}-close-icon`} onClick={handleCloseClick} />
      );
    }
    return null;
  };

  // 剔除原生visible属性
  const tagProps = omit(props, ['visible']);
  const iconNode = icon || null;
  const kids = iconNode ? (
    <>
      <span className={`${prefixCls}-iconNode`}>{iconNode}</span>
      <span>{children}</span>
    </>
  ) : (
    children
  );

  const tagNode = (
    <span {...tagProps} ref={ref} className={tagClassName} style={tagStyle}>
      {kids}
      {renderCloseIcon()}
    </span>
  );

  return tagNode;
};

const Tag = React.forwardRef<unknown, TagProps>(InternalTag) as
React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLElement>>;

Tag.displayName = 'Tag';

export default Tag;
