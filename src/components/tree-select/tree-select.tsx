/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import classNames from 'classnames';
import { TreeNodeContext } from './context';
import Icon from '../icon';
import TreeNode from './tree-node';
import TreePopup from './tree-popup';
import { TreeSelectProps, TreeSelectStates, TreeSelectData } from './type';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import {
  flattenTree, flatChildrenTree, checkedFun, initValues, translateDataToTree, commonInit,
} from './utils';

class TreeSelect extends React.Component<TreeSelectProps, TreeSelectStates> {
  node: HTMLSpanElement | undefined;

  constructor(props: TreeSelectProps) {
    super(props);
    const {
      treeExpandedKeys, treeDefaultExpandedKeys, treeCheckable, multiple,
    } = props;
    this.state = {
      border: false,
      left: 0,
      top: 0,
      width: 0,
      smooth: [],
      values: [],
      selectValues: [],
      expandKeys: treeExpandedKeys || treeDefaultExpandedKeys || [],
      childrenList: [],
      multiple: treeCheckable || multiple,
    };
  }

  // eslint-disable-next-line react/sort-comp
  static TreeNode: typeof TreeNode;

  static getDerivedStateFromProps(nextProps: TreeSelectProps, nextState: TreeSelectStates) {
    const {
      treeData,
      value,
      defaultValue,
      multiple = false,
      treeCheckable = false,
      showCheckedStrategy = 'SHOW_CHILD',
      children,
    } = nextProps;
    const { smooth } = nextState;
    if (treeData) {
      let sm: any[] = [];
      sm = flattenTree(treeData);
      if (smooth && smooth.length === 0) { // 第一次渲染的时候
        const { valuesList, selectList } = commonInit(value, defaultValue, multiple, treeCheckable, showCheckedStrategy, sm);
        return {
          smooth: sm,
          selectValues: selectList,
          values: valuesList,
        };
      }

      return {
        smooth: sm,
      };
    }
    if (children && React.isValidElement(children)) {
      let sm = [];
      let childrenList: any[] = [];
      sm = flatChildrenTree(children);
      childrenList = translateDataToTree(sm);
      if (smooth && smooth.length === 0) { // 第一次渲染的时候
        const { valuesList, selectList } = commonInit(value, defaultValue, multiple, treeCheckable, showCheckedStrategy, sm);
        return {
          childrenList,
          smooth: sm,
          selectValues: selectList,
          values: valuesList,
        };
      }
      return {
        smooth: sm,
      };
    }

    return null;
  }

  componentDidMount() {
    document.addEventListener('click', this.hideDrop, false);
  }

  componentDidUpdate(prevProps: TreeSelectProps) {
    const { smooth } = this.state;
    const {
      treeCheckable = false, showCheckedStrategy = 'SHOW_CHILD', multiple = false, treeExpandedKeys,
      value,
    } = this.props;
    if (treeExpandedKeys !== prevProps.treeExpandedKeys) {
      this.setState({
        expandKeys: treeExpandedKeys || [],
      });
    }
    if (value !== prevProps.value) {
      let valuesList: string[] = [];
      let selectList: string[] = [];
      if (treeCheckable) {
        if (value) {
          const { values, checkedValues } = initValues(value, smooth, showCheckedStrategy);
          valuesList = values.map((i: any) => i.value);
          selectList = checkedValues.map((i: any) => i.value);
        } else {
          valuesList = [];
          selectList = [];
        }
      } else if (multiple) {
        valuesList = typeof value === 'string' ? [] : (value || []);
        selectList = typeof value === 'string' ? [] : (value || []);
      } else {
        valuesList = typeof value === 'string' ? [value] : [];
        selectList = typeof value === 'string' ? [value] : [];
      }
      this.setState({
        values: valuesList,
        selectValues: selectList,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDrop, false);
  }

  getNode = (node: HTMLDivElement) => {
    this.node = node;
  };

  hideDrop = () => {
    this.setState({
      border: false,
    });
  };

  getLocation = () => {
    setTimeout(() => {
      if (this.node?.getBoundingClientRect) {
        const {
          height, width, top, left,
        } = this.node.getBoundingClientRect();
        const offsetTop = Math.ceil(window.pageYOffset + top);
        const offsetLeft = Math.ceil(window.pageXOffset + left);
        this.setState({
          left: offsetLeft,
          top: offsetTop + height + 4,
          width,
        });
      }
    }, 30);
  };

  handleClick = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.stopPropagation();
    const { border } = this.state;
    this.setState({ border: !border });
    this.getLocation();
  };

  handleClose = (item: string) => (evt: React.MouseEvent) => {
    evt.stopPropagation();
    evt.preventDefault();
    const { onChange, treeCheckable, showCheckedStrategy = 'SHOW_CHILD' } = this.props;
    const {
      selectValues, multiple, smooth, values,
    } = this.state;
    const currentDelete = smooth.find((i: any) => i.value === item);
    let lastList: any[] = [];
    let checkList: any[] = [];
    if (treeCheckable) {
      const { checkedList, backFillList } = checkedFun(
        currentDelete,
        false,
        smooth,
        values,
        selectValues,
        showCheckedStrategy,
      );
      lastList = backFillList;
      checkList = checkedList;
    } else {
      const temp = (selectValues || []).filter((i: any) => i !== item);
      lastList = smooth.filter((i) => temp.indexOf(i.value) >= 0);
      checkList = smooth.filter((i) => temp.indexOf(i.value) >= 0);
    }
    const list = lastList.map((i) => i.value);
    const nodeList = smooth.filter((i) => list.indexOf(i.value) >= 0);
    onChange && onChange(list, nodeList.map((i) => ({ ...i, parent: undefined })));
    this.setState({ selectValues: checkList.map((i) => i.value), values: list });
    multiple && this.getLocation();
  };

  tags = (value: string, treeSelect: string, isSingle: boolean) => {
    const { smooth } = this.state;
    const current = (smooth || []).find((i: any) => `${i.value}` === `${value}`) || { title: '' };
    return (
      <span key={value}>
        {isSingle ? current.title
          : (
            <span className={`${treeSelect}-selection-tag`}>
              <span className={`${treeSelect}-selection-tag-value`} title={current?.title}>{current?.title}</span>
              <Icon
                type="close"
                style={{
                  cursor: 'pointer', fontSize: 12, color: '#ACAFB9', verticalAlign: 'text-top', marginTop: -1,
                }}
                onClick={this.handleClose(value)}
              />
            </span>
          )}
      </span>
    );
  };

  handleTreeExpand = (key: string) => {
    const { expandKeys } = this.state;
    let lastkeys: string[] = expandKeys;
    if (expandKeys.indexOf(key) >= 0) {
      lastkeys = expandKeys.filter((i: string) => i !== key);
    } else {
      lastkeys.push(`${key}`);
    }
    const { onTreeExpand } = this.props;
    onTreeExpand && onTreeExpand(lastkeys);
    this.setState({ expandKeys: lastkeys });
  };

  handleSelect = (value: string, nodeInfo: any) => {
    const {
      onSelect, onChange, treeCheckable = false, showCheckedStrategy = 'SHOW_CHILD',
    } = this.props;
    const {
      selectValues, smooth, multiple, values,
    } = this.state;
    if (!multiple) { // 单选
      // eslint-disable-next-line no-param-reassign
      delete nodeInfo.parent;
      onSelect && onSelect(value, nodeInfo);
      onChange && onChange(value, nodeInfo);
      this.setState({ selectValues: [value], border: false, values: [value] });
    } else if (treeCheckable) { // 可勾选的
      const flag = !(selectValues && selectValues.indexOf(value) >= 0);
      const current = smooth.find((i: any) => i.value === value) || {};
      const { checkedList, backFillList } = checkedFun(
        current,
        flag,
        smooth,
        values,
        selectValues,
        showCheckedStrategy,
      );
      const list = backFillList.map((i) => i.value);
      const nodeList = smooth.filter((i) => backFillList.indexOf(i.value) >= 0);
      onChange && onChange(list, nodeList.map((i) => ({ ...i, parent: undefined })));
      onSelect && onSelect(list, nodeList.map((i) => ({ ...i, parent: undefined })));
      this.setState({ selectValues: checkedList.map((i) => i.value), values: list });
    } else { // 多选的
      let temList: any = selectValues;
      if (selectValues && selectValues.indexOf(value) >= 0) {
        temList = selectValues.filter((i: string) => i !== value);
      } else {
        temList.push(value);
      }
      const nodeList = smooth.filter((i) => temList.indexOf(i.value) >= 0);
      onSelect && onSelect(temList, nodeList.map((i) => ({ ...i, parent: undefined })));
      onChange && onChange(temList, nodeList.map((i) => ({ ...i, parent: undefined })));
      this.setState({ selectValues: temList, values: temList });
    }
    multiple && this.getLocation();
  };

  handleChecked = (value: string, checked: boolean) => {
    const {
      smooth, selectValues, multiple, values,
    } = this.state;
    const { onChange, showCheckedStrategy = 'SHOW_CHILD' } = this.props;
    const current = smooth.find((i: any) => i.value === value) || {};
    const { checkedList, backFillList } = checkedFun(
      current,
      checked,
      smooth,
      values,
      selectValues,
      showCheckedStrategy,
    );
    const list = backFillList.map((i) => i.value);
    const nodeList = smooth.filter((i) => backFillList.indexOf(i.value) >= 0);
    onChange && onChange(list, nodeList.map((i) => ({ ...i, parent: undefined })));
    this.setState({
      selectValues: checkedList.map((i) => i.value),
      values: list,
    });
    multiple && this.getLocation();
  };

  renderTreeNode = (data: TreeSelectData[] | any) => {
    const { treeCheckable = false, treeDefaultExpandAll = false } = this.props;
    const { expandKeys, selectValues, multiple } = this.state;
    return (
      <TreeNodeContext.Provider
        value={{
          handleTreeExpand: this.handleTreeExpand,
          treeCheckable,
          multiple,
          selectValues,
          expandKeys,
          handleSelect: this.handleSelect,
          handleChecked: this.handleChecked,
          treeType: 'tree-select',
        }}
      >
        {data.map((item: TreeSelectData) => (
          <div key={item.value}>
            <TreeNode
              title={item.title}
              value={item.value}
              current={item.value}
              prefixIcon={!!item.children}
              disabled={item.disabled}
              checkable={item.checkable}
              isLeaf={item.isLeaf}
              currentNode={item}
              disableCheckbox={item.disableCheckbox}
              isChecked={multiple ? (selectValues || []).some((i: string) => i === item.value)
                : (selectValues || []).indexOf(item.value) >= 0}
              isSelected={multiple ? (selectValues || []).some((i: string) => i === item.value)
                : (selectValues || []).indexOf(item.value) >= 0}
            >
              {(treeDefaultExpandAll
              || expandKeys.some((e) => `${e}` === `${item.value}`))
              && item.children
              && item.children.length
              && this.renderTreeNode(item.children)}
            </TreeNode>
          </div>
        ))}
      </TreeNodeContext.Provider>
    );
  };

  renderTreeSelect = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      treeData,
      dropdownStyle,
      maxTagCount,
      placeholder = '请选择',
      getPopupContainer,
      style,
      dropdownClassName,
    } = this.props;
    const {
      border, left, top, width, values, childrenList, multiple,
    } = this.state;
    const treeSelect = getPrefixCls('tree-select', prefixCls);
    const selection = classNames(`${treeSelect}-selection`, {
      [`${treeSelect}-selection-focus`]: border,
    });
    const dropdown = classNames(`${treeSelect}-drop`, dropdownClassName, {
      [`${treeSelect}-drop-show`]: border,
    });

    return (
      <>
        <span className={treeSelect}>
          <span className={selection} style={style} onClick={this.handleClick} ref={this.getNode}>
            {
              values && values.length > 0
                ? (
                  <span style={{ marginRight: 24, display: 'inline-block' }}>
                    {!multiple
                      ? this.tags(values[0], treeSelect, true)
                      : values.slice(0, maxTagCount).map((item: string) => this.tags(item, treeSelect, false))}
                    {
                  maxTagCount && multiple && values.length > maxTagCount && <span>...</span>
                }
                  </span>
                )
                : <span className={`${treeSelect}-selection-placholder`}>{placeholder}</span>
            }
          </span>
          <span className={`${treeSelect}-icon`}>
            <Icon type={border ? 'up' : 'down'} style={{ color: '#ACAFB9', fontSize: 16 }} />
          </span>
        </span>
        <TreePopup {...({ getPopupContainer })}>
          <div
            className={dropdown}
            style={{
              left, top, width, ...dropdownStyle,
            }}
          >
            {this.renderTreeNode(treeData || childrenList)}
          </div>
        </TreePopup>
      </>
    );
  };

  render() {
    return (
      <ConfigConsumer>{this.renderTreeSelect}</ConfigConsumer>
    );
  }
}

TreeSelect.TreeNode = TreeNode;

export default TreeSelect;
