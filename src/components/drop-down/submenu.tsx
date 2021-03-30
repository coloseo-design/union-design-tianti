/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import classNames from 'classnames';
import MenuItem from './menu-item';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface DropSubMenuProps {
  prefixCls?: string;
  popupClassName?: string;
  children?: any;
  disabled?: boolean;
  key: string;
  title?: string | React.ReactNode;
  onTitleClick?: (key: string, domEvent: Event) => void;
  componentType?: string;
  currentKey?: string;
  danger?: boolean;
  handleExpand?: (key: string | undefined) => void;
  currentItem?: any;
  expandkeys?: string[];
}

class DropSubMenu extends React.Component<DropSubMenuProps> {
  static menuType: string;

  handleExpand = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.stopPropagation();
    const { handleExpand, currentKey } = this.props;
    handleExpand && handleExpand(currentKey);
  };

  renderSubMenu = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      children,
      componentType,
      title,
      disabled,
      currentKey = '',
      danger,
      expandkeys,
    } = this.props;
    const prefix = getPrefixCls('drop-down-menu-submenu', prefixCls);
    const wrapper = classNames(`${prefix}`);
    const currentSub = classNames(`${prefix}-sub`);
    return (
      <div className={wrapper}>
        {componentType === 'item'
          ? (
            <MenuItem
              title={title}
              disabled={disabled}
              currentKey={currentKey}
              danger={danger}
              key={currentKey || ''}
            />
          )
          : (
            <div className={currentSub}>
              <div style={{ float: 'left' }}>
                {title}
              </div>
              <Icon
                type={(expandkeys || []).indexOf(currentKey) >= 0 ? 'down' : 'right'}
                style={{ float: 'right' }}
                onClick={this.handleExpand}
              />
            </div>
          )}
        {children}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderSubMenu}
      </ConfigConsumer>
    );
  }
}

export default DropSubMenu;
