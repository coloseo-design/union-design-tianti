import React, { PureComponent, ReactNode, isValidElement } from 'react';
import classNames from 'classnames';
import Icon from '../../icon';
import { MenuProps } from '../index';

export type VMenuProps = {
  prefix?: string;
} & MenuProps;

type VMenuState = {
  openKeys: string[];
}

class VerticalMenu extends PureComponent<VMenuProps, VMenuState> {
  constructor(props: VMenuProps) {
    super(props);
    const { openKeys = [] } = props;
    this.state = {
      openKeys,
    };
  }

  render() {
    const { prefix, children } = this.props;
    const { openKeys } = this.state;
    const TChildren = React.Children.map(children, (child: ReactNode) => {
      if (isValidElement(child)) {
        return React.cloneElement(child as any, {
          openKeys,
        });
      }
      return null;
    });

    return (
      <div className={classNames(prefix, `${prefix}-vertical`)}>
        <div className={classNames(`${prefix}-side`)}>
          <div className={classNames(`${prefix}-side-icon`)}>
            <Icon type="right" />
          </div>
        </div>
        {TChildren}
      </div>
    );
  }
}

export default VerticalMenu;
