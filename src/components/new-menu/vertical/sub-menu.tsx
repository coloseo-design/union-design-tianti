import React, { ReactNode, isValidElement } from 'react';
import classNames from 'classnames';
import Icon from '../../icon';
import { ConfigConsumerProps, ConfigConsumer } from '../../config-provider/context';

export interface SubMenuProps {
  icon?: string | ReactNode;
  key: string;
  title: string;
  onTitleClick?: (key: string) => void;
}

class SubMenu extends React.Component<SubMenuProps> {
  renderItem = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { children, icon } = this.props;
    const prefix = getPrefixCls('new-menu-submenu');
    const iconPrefix = getPrefixCls('new-menu-icon');
    return (
      <div className={prefix}>
        {icon && (
        <div className={classNames(`${iconPrefix}-left`)}>
          {isValidElement(icon) ? isValidElement(icon) : <Icon type={icon as string} />}
        </div>
        )}
        <div className={classNames(`${iconPrefix}-right`)}>
          <Icon type="right" />
        </div>
        {children}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderItem}
      </ConfigConsumer>
    );
  }
}

export default SubMenu;
