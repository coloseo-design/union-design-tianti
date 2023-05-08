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

  return (
    <span
      className={classNames(prefix, {
        [`${prefix}-primary`]: type === 'primary',
      })}
    >
      <span className={`${prefix}-wrapper`}>
        {select && <SearchSelect {...select as SelectProps} prefix={prefixCls} />}
        <input
          placeholder={placeholder}
          onChange={inputChange}
          value={value}
        />
        <span
          className={type === 'primary' ? `${prefix}-wrapper-suffix` : `${prefix}-wrapper-icon`}
          onClick={inputSearch}
        >
          <Icon type="search-line" lineWidth={3.6} />
        </span>
      </span>
    </span>
  );
};

export default Search;
