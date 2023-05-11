import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '@union-design/icon';
import { SearchProps, SelectProps } from './type';
import SearchSelect from './select';

const Search: React.FC<{prefix?: string} & SearchProps> = (props) => {
  const {
    placeholder,
    type = 'default',
    select,
    onChange,
    onSearch,
    prefix: prefixCls,
  } = props;
  const prefix = `${prefixCls}-search`;
  const [value, setValue] = useState('');
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  const inputSearch = () => {
    onSearch?.(value);
  };

  const suffix = classNames(`${prefix}-suffix`);

  return (
    <div
      className={classNames(prefix, {
        [`${prefix}-primary`]: type === 'primary',
      })}
    >
      {select && <SearchSelect {...select as SelectProps} prefix={prefixCls} />}
      <input placeholder={placeholder} onChange={inputChange} value={value} />
      <div className={suffix} onClick={inputSearch}>
        <Icon type="search-line" lineWidth={3} />
      </div>
    </div>
  );
};

export default Search;
