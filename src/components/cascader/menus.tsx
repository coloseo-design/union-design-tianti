/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-len */
import React from 'react';
import { ConfigConsumer } from '@union-design/config-provider';
import Icon from '@union-design/icon';
import { CascaderOptionType, FieldNamesType } from './types/common';
import { arrayTreeFilter, getFieldName } from './utils';

interface MenusProps {
  value?: (string | number)[];
  activeValue?: (string | number)[];
  options?: CascaderOptionType[];
  prefixCls?: string;
  // expandTrigger?: string;
  onSelect?: (targetOption: CascaderOptionType, index: number, e: React.MouseEvent<HTMLElement>) => void;
  dropdownMenuColumnStyle?: React.CSSProperties;
  fieldNames?: FieldNamesType;
  // expandIcon?: React.ReactNode;
  // loadingIcon?: React.ReactNode;
}

class Menus extends React.Component<MenusProps> {
  static defaultProps: MenusProps = {
    options: [],
    value: [],
    activeValue: [],
    onSelect: () => {},
    // expandTrigger: 'click',
  }

  getActiveOptions(values?: CascaderOptionType[]): CascaderOptionType[] {
    const { options } = this.props;
    const activeValue = values || this.props.activeValue;
    const valueKeyName = getFieldName('value', this.props.fieldNames);
    const childrenKeyName = getFieldName('children', this.props.fieldNames);
    if (activeValue && activeValue.length) {
      return arrayTreeFilter(
        options || [],
        (o, level) => o[valueKeyName] === activeValue[level],
        { childrenKeyName },
      );
    }
    return [];
  }

  getShowOptions(): CascaderOptionType[][] {
    const { options } = this.props;
    const childrenKeyName = getFieldName('children', this.props.fieldNames);
    const result = this.getActiveOptions()
      .map((activeOption) => activeOption[childrenKeyName])
      .filter((activeOption) => !!activeOption);
    result.unshift(options);
    return result as CascaderOptionType[][];
  }

  getOption = (option: CascaderOptionType, menuIndex: number) => {
    const { props } = this;
    const { prefixCls } = props;
    const menuIconCls = `${prefixCls}-icon`;
    const onSelect = this.props.onSelect?.bind(this, option, menuIndex);
    const childrenKeyName = getFieldName('children', this.props.fieldNames);
    const valueKeyName = getFieldName('value', this.props.fieldNames);
    const labelKeyName = getFieldName('label', this.props.fieldNames);
    let expandIconNode = null;
    const hasChildren = option[childrenKeyName] && (option[childrenKeyName] as any)?.length > 0;
    if (hasChildren) {
      expandIconNode = <Icon type="right" className={menuIconCls} />;
    }
    const isActive = this.props.activeValue?.includes(option[valueKeyName] as string);
    return (
      <li
        key={option[valueKeyName] as string}
        className={isActive ? 'active' : (option.disabled ? 'disabled' : '')}
        title={option[labelKeyName] as string}
        onClick={onSelect}
        role="menuitem"
        onMouseDown={(e) => e.preventDefault()}
      >
        {option[labelKeyName]}
        {expandIconNode}
      </li>
    );
  }

  renderMenus = () => {
    const { props } = this;
    const {
      prefixCls,
      dropdownMenuColumnStyle,
    } = props;

    return (
      <div style={{ height: '100%' }}>
        {this.getShowOptions().map((options, menuIndex) => (
          <ul className={`${prefixCls}-menu`} key={menuIndex} style={dropdownMenuColumnStyle}>
            {options.map((option) => this.getOption(option, menuIndex))}
          </ul>
        ))}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderMenus}
      </ConfigConsumer>
    );
  }
}

export default Menus;
