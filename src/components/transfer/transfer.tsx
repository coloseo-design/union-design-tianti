import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
import {
  TransferProps, TransferItem, RenderResultObject, RenderResult, TransferDirection,
} from './type';
import Button from '../button';
import Icon from '../icon';
import Checkbox from '../checkbox';
import TItem from './item';
import Input from '../input';

export interface TransferState {
  targetKeys: string[]; // 右边里面keys的集合
  selectedKeys: string[]; // 左边列表选择的keys
  targetSelectedKeys: string[]; // 右边列表选择的key
  isLeftSearch: boolean;
  isRightSearch: boolean;
  searchRightData: TransferItem[];
  searchLeftData: TransferItem[];
  allRightChecked: boolean;
  allLeftChecked: boolean;
}

const defaultRender = () => null;
function isRenderResultPlainObject(result: RenderResult) {
  return (
    result
    && !React.isValidElement(result)
    && Object.prototype.toString.call(result) === '[object Object]'
  );
}

class Transfer extends React.Component<TransferProps, TransferState> {
  constructor(props: TransferProps) {
    super(props);
    const { targetKeys, selectedKeys } = this.props;
    this.state = {
      targetKeys: targetKeys || [],
      selectedKeys: selectedKeys || [],
      targetSelectedKeys: [],
      isRightSearch: false,
      isLeftSearch: false,
      searchRightData: [],
      searchLeftData: [],
      allRightChecked: false,
      allLeftChecked: false,
    };
  }

  componentDidUpdate(preProps: TransferProps) {
    const { selectedKeys, targetKeys } = this.props;
    if (selectedKeys && selectedKeys !== preProps.selectedKeys) {
      this.setState({ selectedKeys });
    }
    if (targetKeys && targetKeys !== preProps.targetKeys) {
      this.setState({ targetKeys });
    }
  }

  SelectChange = (direction: string, checked: boolean, key: string) => {
    const { onSelectChange, dataSource } = this.props;
    const {
      selectedKeys,
      targetSelectedKeys,
      isRightSearch,
      searchRightData,
      isLeftSearch,
      searchLeftData,
      targetKeys,
    } = this.state;
    let source = [...selectedKeys];
    let target = [...targetSelectedKeys];
    const tData = isRightSearch
      ? searchRightData
      : (dataSource || []).filter((i) => (targetKeys || []).indexOf(i.key) >= 0 && !i.disabled);
    const sData = (isLeftSearch
      ? searchLeftData
      : (dataSource || [])).filter((i) => (targetKeys || []).indexOf(i.key) === -1 && !i.disabled);
    if (checked) {
      if (direction === 'left') {
        source.push(key);
      } else {
        target.push(key);
      }
    } else if (direction === 'left') {
      source = source.filter((i) => i !== key);
    } else {
      target = target.filter((i) => i !== key);
    }
    onSelectChange && onSelectChange(source, target);
    this.setState({
      selectedKeys: source,
      targetSelectedKeys: target,
      allLeftChecked: checked && direction === 'left' && source.length === sData.length,
      allRightChecked: checked && direction === 'right' && target.length === tData.length,
    });
  };

  handleToRight = () => {
    const { onChange } = this.props;
    const { targetKeys, selectedKeys } = this.state;
    const target = [...targetKeys, ...selectedKeys];
    onChange && onChange(target, 'right', selectedKeys);
    this.setState({
      targetKeys: target,
      selectedKeys: [],
      allLeftChecked: false,
    });
  };

  handleToLeft = () => {
    const { onChange } = this.props;
    const {
      targetKeys, targetSelectedKeys, isRightSearch, searchRightData,
    } = this.state;
    const target = targetKeys.filter((i) => targetSelectedKeys.indexOf(i) === -1);
    const targetSearch = searchRightData
      .map((i) => i.key).filter((i) => targetSelectedKeys.indexOf(i) === -1);
    onChange && onChange(target, 'left', targetSelectedKeys);
    if (isRightSearch) {
      this.setState({
        searchRightData: searchRightData.filter((i) => targetSearch.indexOf(i.key) >= 0),
        targetSelectedKeys: [],
        targetKeys: target,
        allRightChecked: false,
      });
    } else {
      this.setState({
        targetKeys: target,
        targetSelectedKeys: [],
        allRightChecked: false,
      });
    }
  };

  handleALlLeft = (checked: boolean) => {
    const { onSelectChange, dataSource } = this.props;
    const {
      isLeftSearch, searchLeftData, targetKeys, targetSelectedKeys,
    } = this.state;
    const sData = (isLeftSearch
      ? searchLeftData
      : (dataSource || [])).filter((i) => (targetKeys || []).indexOf(i.key) === -1 && !i.disabled);
    onSelectChange && onSelectChange(checked ? sData.map((i) => i.key) : [], targetSelectedKeys);
    this.setState({
      allLeftChecked: checked,
      selectedKeys: checked ? sData.map((i) => i.key) : [],
    });
  };

  handleAllRight = (checked: boolean) => {
    const { onSelectChange, dataSource } = this.props;
    const {
      isRightSearch, searchRightData, targetKeys, selectedKeys,
    } = this.state;
    const tData = isRightSearch
      ? searchRightData
      : (dataSource || []).filter((i) => (targetKeys || []).indexOf(i.key) >= 0 && !i.disabled);
    onSelectChange && onSelectChange(selectedKeys, checked ? tData.map((i) => i.key) : []);
    this.setState({
      allRightChecked: checked,
      targetSelectedKeys: checked ? tData.map((i) => i.key) : [],
    });
  }

  handleLeftSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { dataSource, onSearch, filterOption } = this.props;
    const { targetKeys } = this.state;
    onSearch && onSearch('left', event.target.value);
    const optionSearchTrue: TransferItem[] = [];
    if (filterOption) { // 自定义搜索
      (dataSource || []).filter((i) => targetKeys.indexOf(i.key) === -1).forEach((j) => {
        const flag = filterOption(event.target.value, j);
        flag && optionSearchTrue.push(j);
      });
    }
    if (event.target.value !== '') {
      this.setState({
        isLeftSearch: true,
        searchLeftData: filterOption
          ? optionSearchTrue
          : (dataSource || []).filter((i) => i.title.indexOf(event.target.value) >= 0),
      });
    } else {
      this.setState({ isLeftSearch: false });
    }
  };

  handleRightSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { dataSource, onSearch, filterOption } = this.props;
    const { targetKeys } = this.state;
    onSearch && onSearch('right', event.target.value);
    const tData = (dataSource || []).filter((i) => targetKeys.indexOf(i.key) >= 0);
    const optionSearchTrue: TransferItem[] = [];
    if (filterOption) { // 自定义搜索
      (tData || []).forEach((j) => {
        const flag = filterOption(event.target.value, j);
        flag && optionSearchTrue.push(j);
      });
    }
    if (event.target.value !== '') {
      this.setState({
        isRightSearch: true,
        searchRightData: filterOption
          ? optionSearchTrue
          : tData.filter((i) => i.title.indexOf(event.target.value) >= 0),
      });
    } else {
      this.setState({ isRightSearch: false });
    }
  }

  handleScroll = (
    direction: TransferDirection,
  ) => (
    event: React.UIEvent<HTMLDivElement, UIEvent>,
  ) => {
    const { onScroll } = this.props;
    onScroll && onScroll(direction, event);
  };

  renderList = (
    data: TransferItem[],
    direction: TransferDirection,
    tranList: string,
    tranBody: string,
    tranContent: string,
  ) => {
    const {
      listStyle,
      showSearch,
      titles = ['', ''],
      disabled,
      showSelectAll = true,
      render = defaultRender,
    } = this.props;
    const {
      allLeftChecked,
      selectedKeys,
      allRightChecked,
      targetSelectedKeys,
      isRightSearch,
      searchRightData,
      targetKeys,
    } = this.state;
    return (
      <div className={tranList} style={listStyle}>
        <div className={`${tranList}-header`}>
          <div className={`${tranList}-header-left`}>
            {showSelectAll && (
            <Checkbox
              onChange={direction === 'left' ? this.handleALlLeft : this.handleAllRight}
              checked={direction === 'left' ? allLeftChecked : allRightChecked}
            >
              {showSearch && direction === 'left' && (
              <span>
                {selectedKeys ? selectedKeys.length : 0 }
                /
                {data.length}
                条
              </span>
              )}
              {showSearch && direction === 'right' && (
              <span>
                {isRightSearch ? searchRightData.length : targetKeys.length}
                条
              </span>
              )}
            </Checkbox>
            )}
          </div>
          <div
            className={`${tranList}-header-right`}
            title={direction === 'left' ? titles[0] : titles[1]}
            style={{ maxWidth: showSearch ? '50%' : '80%' }}
          >
            {direction === 'left' ? titles[0] : titles[1]}
          </div>
        </div>
        <div className={tranBody}>
          {showSearch
            && (
            <div style={{ padding: '0px 12px' }}>
              <Input.Search
                style={{ width: '100%', marginBottom: 4 }}
                onChange={direction === 'left' ? this.handleLeftSearch : this.handleRightSearch}
                placeholder="请输入搜索内容"
                disabled={disabled}
              />
            </div>
            )}
          <div className={tranContent} onScroll={this.handleScroll(direction)}>
            {data.map((item) => {
              const renderResult: RenderResult = render(item);
              const isRenderResultPlain = isRenderResultPlainObject(renderResult);
              return (
                <TItem
                  item={item}
                  onChange={this.SelectChange}
                  chDirection={direction}
                  checked={(direction === 'left' ? selectedKeys : targetSelectedKeys).indexOf(item.key) >= 0}
                  disabled={disabled}
                  key={item.key}
                  renderedText={isRenderResultPlain
                    ? (renderResult as RenderResultObject).value
                    : (renderResult as string)}
                  renderedEl={isRenderResultPlain
                    ? (renderResult as RenderResultObject).label
                    : renderResult}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  renderTransfer = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      dataSource,
      operations,
      disabled,
      showSearch,
      className,
      style,
    } = this.props;
    const {
      targetKeys,
      selectedKeys,
      targetSelectedKeys,
      isLeftSearch,
      isRightSearch,
      searchLeftData,
      searchRightData,
    } = this.state;
    const targetData = isRightSearch
      ? searchRightData
      : (dataSource || []).filter((i) => (targetKeys || []).indexOf(i.key) >= 0);
    const sourceData = (isLeftSearch
      ? searchLeftData
      : (dataSource || [])).filter((i) => (targetKeys || []).indexOf(i.key) === -1);
    const prefix = getPrefixCls('transfer', prefixCls);
    const tranContainer = classNames(`${prefix}`, className);
    const tranList = classNames(`${prefix}-list`);
    const operationStyle = classNames(`${prefix}-operation`);
    const btn = classNames(`${prefix}-operation-btn`);
    const tranBody = classNames(`${prefix}-list-body`, {
      [`${prefix}-list-body-disabled`]: disabled,
      [`${prefix}-list-body-search`]: showSearch,
    });
    const tranContent = classNames(`${prefix}-list-body-content`);

    return (
      <div className={tranContainer} style={style}>
        {this.renderList(sourceData, 'left', tranList, tranBody, tranContent)}
        <div className={operationStyle}>
          <Button
            size="small"
            type="primary"
            disabled={!(selectedKeys.length > 0)}
            className={btn}
            onClick={this.handleToRight}
          >
            <Icon type="right" />
            {operations && operations.length > 0 && <span>{operations[0]}</span>}
          </Button>
          <Button
            size="small"
            type="primary"
            disabled={!(targetSelectedKeys.length > 0)}
            className={btn}
            onClick={this.handleToLeft}
          >
            <Icon type="left" />
            {operations && operations.length > 1 && <span>{operations[1]}</span>}
          </Button>
        </div>
        {this.renderList(targetData, 'right', tranList, tranBody, tranContent)}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderTransfer}
      </ConfigConsumer>
    );
  }
}

export default Transfer;
