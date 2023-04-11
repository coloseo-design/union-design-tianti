import React, { ReactNode, isValidElement } from 'react';
import classNames from 'classnames';
import Icon from '../../icon';
import { ConfigConsumerProps, ConfigConsumer } from '../../config-provider/context';

export interface ItemProps {
  icon?: string | ReactNode;
  key: string;
  title: string;
  onClick?: (key: string) => void;
}

class Item extends React.Component<ItemProps> {
  renderItem = ({ getPrefixCls }: ConfigConsumerProps) => {
    const prefix = getPrefixCls('new-menu-item');
    const iconPrefix = getPrefixCls('new-menu-icon');
    const { title, key, icon } = this.props;
    return (
      <div className={prefix}>
        {icon && (
        <div className={classNames(`${iconPrefix}-left`)}>
          {isValidElement(icon) ? isValidElement(icon) : <Icon type={icon as string} />}
        </div>
        )}
        <div>{title}</div>
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

export default Item;
