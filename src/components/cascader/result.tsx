/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-len */
import React from 'react';
import Empty from './empty';
import { ConfigConsumer } from '@union-design/config-provider';
import { CascaderOptionType, FieldNamesType } from './types/common';
import { getFieldName } from './utils';

export interface ResultProps {
  prefixCls?: string;
  flattenOptions?: CascaderOptionType[][];
  inputValue?: string;
  fieldNames?: FieldNamesType;
  onSelect: (targetOption: CascaderOptionType, index: number, e: React.MouseEvent<HTMLElement>) => void;
}

export interface ResultState {
  nodes: {[key: string] : unknown}[],
}

// 用于渲染默认的label展示
// const defaultDisplayRender = (label: string[]) => label.join(' / ');

class Result extends React.Component<ResultProps, ResultState> {
  displayRender = (labels: string[]) => {
    const { props } = this;
    const { inputValue, prefixCls } = props;

    return labels.map((label, index) => {
      let beforeStr = '';
      let title: any = label;
      let afterStr = '';
      const keyword = inputValue || '';
      const keywordIndex = label.indexOf(keyword);
      if (keywordIndex > -1) {
        beforeStr = label.substring(0, keywordIndex);
        title = <span className={`${prefixCls}-keyword`}>{keyword}</span>;
        afterStr = label.substring(keywordIndex + keyword.length);
      }
      return (
        <span>
          {beforeStr}
          {title}
          {afterStr}
          {index < labels.length - 1 ? ' / ' : ''}
        </span>
      );
    });
  };

  handleOptionClick = (selecteedOptions: CascaderOptionType[], e: React.MouseEvent<HTMLElement>) => {
    selecteedOptions.forEach((option, index) => {
      this.props.onSelect(option, index, e);
    });
  };

  renderResult = () => {
    const { props } = this;
    const {
      inputValue, prefixCls, flattenOptions,
    } = props;

    let renderContent = <Empty prefixCls={prefixCls} />;
    const result: CascaderOptionType[][] = [];
    const labelKeyName = getFieldName('label', this.props.fieldNames);
    flattenOptions?.forEach((flattenOption) => {
      const hasKeyword = flattenOption.some((obj: any) => obj[labelKeyName].includes(inputValue));
      if (hasKeyword) {
        result.push(flattenOption);
      }
    });
    if (result.length > 0) {
      renderContent = (
        <ul className={`${prefixCls}-menu`} style={{ width: '100%' }}>
          {result.map((arr, index) => {
            const isDisabled = arr.some((obj) => obj.disabled);
            const labels = arr.map((obj) => obj[labelKeyName]);
            const title = this.displayRender(labels as string[]);
            return (
              <li
                key={index}
                className={isDisabled ? 'disabled' : ''}
                role="menuitem"
                onMouseDown={(e) => e.preventDefault()}
                onClick={this.handleOptionClick.bind(this, arr)}
              >
                {title}
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <div style={{ height: '100%' }}>
        {renderContent}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderResult}
      </ConfigConsumer>
    );
  }
}

export default Result;
