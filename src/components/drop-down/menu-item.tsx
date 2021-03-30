import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface DropMenuItemProps {
  prefixCls?: string;
  disabled?: boolean;
  title?: string | React.ReactNode;
  key: string;
  danger?: boolean;
  icon?: React.ReactNode;
  currentKey?: string;
}

class DropMenuItem extends React.Component<DropMenuItemProps> {
  static menuType: string;

  renderDropMenuItem = ({ getPrefixCls } : ConfigConsumerProps) => {
    const {
      prefixCls,
      title,
      icon,
      danger,
      disabled,
    } = this.props;
    const prefix = getPrefixCls('drop-down-menu-item', prefixCls);
    const wrapper = classNames(`${prefix}`, {
      [`${prefix}-danger`]: danger,
      [`${prefix}-disabled`]: disabled,
    });
    const iconStyle = classNames(`${prefix}-icon`);

    return (
      <div className={wrapper}>
        {icon && <span className={iconStyle}>{icon}</span>}
        {title}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderDropMenuItem}
      </ConfigConsumer>
    );
  }
}

export default DropMenuItem;
