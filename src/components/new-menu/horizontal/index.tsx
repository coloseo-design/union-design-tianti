import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { MenuProps } from '../index';

export type HMenuProps = {
  prefix?: string;
} & MenuProps;

class HorizontalMenu extends PureComponent<HMenuProps> {
  render() {
    const { prefix } = this.props;
    return (
      <div className={classNames(prefix, `${prefix}-horizontal`)}>
        水平 menu
      </div>
    );
  }
}

export default HorizontalMenu;
