import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider/context';

export interface BaseAvatarProps {
    src?: string;
    icon?: React.ReactNode;
    size?: number;
    className?: string;
    prefixCls?: string;
    style?: {[key: string]: unknown};
}

class Avatar extends React.Component<BaseAvatarProps> {
    renderAvatar = ({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        prefixCls, className, src, size, icon, children, style,
      } = this.props;

      const prefix = getPrefixCls('avatar', prefixCls);

      const clazzName = classNames(prefix, {
        [`${prefix}-text`]: children,
      }, className);
        // 初始宽高
      let [w, h] = icon ? [21, 21] : [24, 24];

      if (size) [w, h] = [size, size];
      if (children)[w, h] = [42, 20];

      return (
        <span className={clazzName} style={{ ...style, width: w, height: h }}>
          {
                    children || (icon || (src ? <img src={src} alt="" /> : null))
                }
        </span>
      );
    };

    render() {
      return (
        <ConfigConsumer>
          {this.renderAvatar}
        </ConfigConsumer>
      );
    }
}

export default Avatar;
