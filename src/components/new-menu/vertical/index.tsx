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
  firstKeys: string[];
  popVisible: boolean;
}

class VerticalMenu extends React.Component<VMenuProps, VMenuState> {
  private menuRef = createRef<HTMLDivElement>();

  private popRef = createRef<HTMLDivElement>();

  private menuContentRef = createRef<HTMLDivElement>();

  constructor(props: VMenuProps) {
    super(props);
    const { openKeys = [], selectedKeys = [] } = props;
    this.state = {
      openKeys,
      selectedKeys,
      closed: false,
      firstKeys: [],
      popVisible: false,
    };
  }

  componentDidMount(): void {
    document.addEventListener('click', this.bodyClick, true);
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this.bodyClick, true);
  }

  changeOpenKeys = (key: string) => {
    const { openKeys } = this.state;
    const { mode = 'inline' } = this.props;
    this.setState({ popVisible: true });
    if (mode === 'inline') {
      if (openKeys.includes(key)) {
        this.setState({ openKeys: openKeys.filter((i: any) => i !== key) });
      } else {
        openKeys.push(key);
        this.setState({ openKeys: [...openKeys] });
      }
    } else if (openKeys.includes(key)) {
      this.setState({ openKeys: [] });
    } else {
      this.setState({ openKeys: [key] });
    }
  }

  changeSelectedKeys = (key: string, firstK: string) => {
    const { selectedKeys, firstKeys } = this.state;
    const { multiple } = this.props;
    if (selectedKeys?.includes(key)) {
      this.setState({
        selectedKeys: !multiple ? [] : selectedKeys.filter((i) => i !== key),
        firstKeys: !multiple ? [] : firstKeys?.filter((i) => i !== firstK),
      });
    } else {
      selectedKeys.push(key);
      firstKeys.push(firstK);
      this.setState({
        selectedKeys: !multiple ? [key] : selectedKeys,
        firstKeys: !multiple ? [firstK] : [...firstKeys],
      });
    }
  }

  handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const { closed } = this.state;
    this.setState({ closed: !closed });
  }

  bodyClick = (e: MouseEvent) => {
    const menuPop = this.popRef?.current;
    const menuContent = this.menuContentRef?.current;
    if (
      !(menuPop && (menuPop as HTMLElement)?.contains(e.target as HTMLElement))
      && !(menuContent && (menuContent as HTMLElement)?.contains(e.target as HTMLElement))
    ) {
      this.setState({ popVisible: false });
    }
  }

  changePopVisible = (v: boolean) => {
    this.setState({ popVisible: v });
  }

  render() {
    const {
      prefix, children, isTooltip, mode = 'inline', ...rest
    } = this.props;
    const {
      openKeys, selectedKeys, closed, firstKeys, popVisible,
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
          firstKeys,
          isTooltip,
          mode,
          parentIcon: Boolean(child?.props.icon),
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
        <div
          onClick={this.handleClose}
          className={classNames(`${prefix}-side`)}
        >
          <div className={classNames(`${prefix}-side-icon`)}>
            <Icon type={closed ? 'right' : 'left'} />
          </div>
        </div>
        <div
          className={`${prefix}-vertical-content`}
          ref={this.menuContentRef}
        >
          {TChildren}
        </div>
        {mode === 'tile' && openKeys.length > 0 && !closed && popVisible && (
          <PopItem
            allMenu={TChildren}
            openKeys={openKeys}
            popRef={this.popRef}
            selectedKeys={selectedKeys}
            changePopVisible={this.changePopVisible}
            changeSelectedKeys={this.changeSelectedKeys}
            changeOpenKeys={this.changeOpenKeys}
          />
        )}
      </div>
    );
  }
}

export default VerticalMenu;
