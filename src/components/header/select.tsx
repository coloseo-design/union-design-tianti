import React, { useState } from 'react';
import Icon from '@union-design/icon';
import Dropdown from '@union-design/dropdown';
import { SelectProps, Option } from './type';

const SearchSelect: React.FC<{prefix?: string} & SelectProps> = (props) => {
  const {
    options = [],
    onChange,
    prefix: prefixCls,
  } = props;
  const prefix = `${prefixCls}-search`;
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  const handleClick = (key: string) => {
    onChange?.(key);
    setValue(key);
    setVisible(false);
  };

  const current = (options.find((i) => i.value === value) || {}) as Option;

  const test = (
    <div className="selectDown-content">
      {(options || []).map((item) => (
        <div
          className={value === item.value ? 'selectDown-content-selected' : undefined}
          key={item.key || item.value}
          onClick={() => handleClick(item.value)}
          title={item.label || ''}
        >
          {item.label}
        </div>
      ))}
    </div>
  );

  return (
    <Dropdown
      visible={visible}
      onVisibleChange={(v) => setVisible(v)}
      trigger={['click']}
      overlay={test}
      placement="bottomLeft"
      overlayClassName="selectDown"
    >
      <span
        className={`${prefix}-wrapper-select`}
      >
        <span>{current?.label || ''}</span>
        <Icon type={visible ? 'up2-line' : 'down2-line'} />
      </span>
    </Dropdown>
  );
};

export default SearchSelect;
