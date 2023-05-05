import React, { Component, createRef } from 'react';
import Icon from '@union-design/icon';
import Input, { BaseInputProps, InputState } from './input';

class Search extends Component<BaseInputProps, InputState> {
  render(): React.ReactNode {
    const { onSearch, onPressEnter } = this.props;
    const ref = createRef();
    const handleSearch = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      onSearch && onSearch((ref.current as any)?.value, e as any);
    };

    const onKeyPress = (e: { key: string; }) => {
      // e.preventDefault();
      // e.stopPropagation();
      if (e.key === 'Enter' && ref.current) {
        onSearch && onSearch((ref.current as any)?.value, ref.current as any);
        onPressEnter && onPressEnter((ref.current as any)?.value);
      }
    };

    return <Input onKeyPress={onKeyPress} {...this.props} ref={ref} suffix={<Icon type="search" style={{ cursor: 'pointer' }} onClick={handleSearch} />} />;
  }
}

export default Search;
