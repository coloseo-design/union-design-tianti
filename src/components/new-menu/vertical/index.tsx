import React, { ReactNode, isValidElement, createRef } from 'react';
import classNames from 'classnames';
import Icon from '../../icon';
import { MenuProps } from '../index';
import PopItem from './pop-item';

export type VMenuProps = {
  prefix?: string;
  selectedKeys?: string[];
  multiple?: boolean;
  isTooltip?: boolean;
  mode?: 'inline' | 'tile';
} & MenuProps;

type VMenuState = {
  openKeys: string[];
  visible?: boolean;
  selectedKeys: string[];
  closed: boolean;
  firstSelected: boolean;
}

class VerticalMenu extends React.Component<VMenuProps, VMenuState> {
  private menuRef = createRef<HTMLDivElement>();

  constructor(props: VMenuProps) {
    super(props);
    const { openKeys = [], selectedKeys = [] } = props;
    this.state = {
      openKeys,
      selectedKeys,
      closed: false,
      firstSelected: false,
    };
  }

  changeOpenKeys = (key: string) => {
    const { openKeys } = this.state;
    const { mode = 'inline' } = this.props;
    if (openKeys.includes(key)) {
      this.setState({ openKeys: openKeys.filter((i: any) => i !== key) });
    } else {
      openKeys.push(key);
      this.setState({ openKeys: mode === 'tile' ? [key] : [...openKeys] });
    }
  }

  hasFirstSelected = (b: boolean) => {
    this.setState({ firstSelected: b });
  }

  changeSelectedKeys = (key: string) => {
    const { selectedKeys } = this.state;
    const { multiple } = this.props;
    if (selectedKeys?.includes(key)) {
      this.setState({ selectedKeys: !multiple ? [] : selectedKeys.filter((i) => i !== key) });
    } else {
      selectedKeys.push(key);
      this.setState({ selectedKeys: !multiple ? [key] : selectedKeys });
    }
  }

  handleClose = () => {
    const { closed } = this.state;
    this.setState({ closed: !closed });
  }

  render() {
    const {
      prefix, children, isTooltip, mode = 'inline', ...rest
    } = this.props;
    const {
      openKeys, selectedKeys, closed, firstSelected,
    } = this.state;
    const TChildren = React.Children.map(children, (child: ReactNode) => {
      if (isValidElement(child)) {
        return React.cloneElement(child as any, {
          openKeys,
          itemKey: child.key,
          changeOpenKeys: this.changeOpenKeys,
          level: 1,
          selectedKeys,
          changeSelectedKeys: this.changeSelectedKeys,
          AllKeys: [child.key],
          hasFirstSelected: this.hasFirstSelected,
          firstSelected,
          isTooltip,
          mode,
        });
      }
      return null;
    });

    return (
      <div
        className={classNames(prefix, `${prefix}-vertical`, {
          [`${prefix}-vertical-closed`]: closed,
        })}
        {...rest}
        ref={this.menuRef}
      >
        <div onClick={this.handleClose} className={classNames(`${prefix}-side`)}>
          <div className={classNames(`${prefix}-side-icon`)}>
            <Icon type={closed ? 'right' : 'left'} />
          </div>
        </div>
        <div className={`${prefix}-vertical-content`}>
          {TChildren}
        </div>
        {mode === 'tile' && <PopItem menuRef={this.menuRef} allMenu={TChildren} openKeys={openKeys} />}
      </div>
    );
  }
}

export default VerticalMenu;
