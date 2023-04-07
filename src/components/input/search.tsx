import React, { Component, createRef } from 'react';
import Input, { BaseInputProps, InputState } from './input';
import Icon from '../icon';

class Search extends Component<BaseInputProps, InputState> {
  render(): React.ReactNode {
    const { onSearch, onPressEnter } = this.props;
    const ref = createRef();
    const handleSearch = (e: Event) => {
      onSearch && onSearch(ref.current.value, e);
    };

    const onKeyPress = (e: { key: string; }) => {
      // e.preventDefault();
      // e.stopPropagation();
      if (e.key === 'Enter') {
        onSearch && onSearch(ref.current.value, ref.current);
        onPressEnter && onPressEnter(ref.current.value, ref.current);
      }
    };

    return <Input onKeyPress={onKeyPress} {...this.props} ref={ref} suffix={<Icon type="search" style={{ cursor: 'pointer' }} onClick={handleSearch} />} />;
  }
}

export default Search;
