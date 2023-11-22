import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '@union-design/icon';
import { AdvancedSearchProps, SearchProps, SelectProps } from './type';
import SearchSelect from './select';

const Search: React.FC<{ prefix?: string } & SearchProps> = (props) => {
  const {
    placeholder,
    type = 'default',
    select,
    onChange,
    onSearch,
    prefix: prefixCls,
    advanced = false,
  } = props;
  const prefix = `${prefixCls}-search`;
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  const inputSearch = () => {
    onSearch?.(value);
  };

  const suffix = classNames(`${prefix}-suffix`);
  const advancedPrefix = classNames(`${prefix}-advanced`);
  return (
    <div className={`${prefix}-container`}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className={classNames(prefix, {
            [`${prefix}-primary`]: type === 'primary',
            [`${prefix}-focus`]: focus,
          })}
          onMouseOut={() => setFocus(false)}
        >
          {select && <SearchSelect {...select as SelectProps} prefix={prefixCls} />}
          <input
            placeholder={placeholder}
            onChange={inputChange}
            value={value}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
          <div className={suffix} onClick={inputSearch}>
            <Icon type="search-line" />
          </div>
        </div>
        {
          advanced && (<div className={`${advancedPrefix}-btn`} onClick={(advanced as AdvancedSearchProps).onClick}>{(advanced as AdvancedSearchProps).title}</div>)
        }
      </div>
      {
        advanced && (
          <div className={`${advancedPrefix}-tip`}>{(advanced as AdvancedSearchProps).tip}</div>
        )
      }
    </div>
  );
};

export default Search;
