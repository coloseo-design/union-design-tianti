import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';
import Checkbox from '@union-design/checkbox';
import { TransferItem, TransferDirection } from './type';

interface ItemProps {
  item: {[key: string] : any};
  prefixCls?: string,
  onChange?: (direction: TransferDirection, checked: boolean, key: string) => void;
  chDirection: TransferDirection;
  checked: boolean;
  disabled?: boolean;
  // render?: (record: {[key: string] : unknown}) => React.ReactNode;
  renderedText?: string | number;
  renderedEl?: React.ReactNode;
}

class Item extends Component<ItemProps> {
  renderItem = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      item,
      prefixCls,
      onChange,
      chDirection,
      checked,
      disabled,
      renderedEl,
    } = this.props;
    const prefix = getPrefixCls('transfer', prefixCls);
    const listItem = classNames(`${prefix}-list-body-content-item`, {
      [`${prefix}-list-body-content-item-selected`]: checked && !(item as unknown as TransferItem).disabled,
    });
    const handleChange = (check: boolean) => {
      onChange && onChange(chDirection, check, (item as unknown as TransferItem).key);
    };

    return (
      <div
        key={(item as unknown as TransferItem).key}
        className={listItem}
        title={(item as unknown as TransferItem).title}
      >
        <Checkbox
          disabled={(item as unknown as TransferItem).disabled || disabled}
          onChange={handleChange}
          checked={checked}
        >
          {/* {(item as TransferItem).title} */}
          {renderedEl || (item as unknown as TransferItem).title}
        </Checkbox>
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
