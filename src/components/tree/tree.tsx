/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import classnames from 'classnames';
import { TreeNodeContext, TreeNode } from '@union-design/tree-select';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';
import { TreeProps, TreeDataType, TreeState } from './type';
import {
  flattenTree, flatChildrenTree, initKeys, translateDataToTree, checkedFun,
} from './utils';

class Tree extends React.Component<TreeProps, TreeState> {
  static TreeNode: typeof TreeNode;

  constructor(props: TreeProps) {
    super(props);
    const { multiple, checkable } = props;
    this.state = {
      childrenList: [],
      expandKeys: [],
      multiple: multiple || checkable || false,
      smooth: [],
      selectedKeys: [],
      checkedKeys: [],
    };
  }

  static getDerivedStateFromProps(nextProps: TreeProps, nextState: TreeState) {
    const {
      defaultExpandParent = false,
      autoExpandParent = false,
      treeData,
      checkedKeys,
      defaultCheckedKeys,
      checkable = false,
      checkStrictly = false,
      selectedKeys,
      defaultSelectedKeys,
      defaultExpandedKeys,
      children,
    } = nextProps;
    const { smooth } = nextState;
    if (treeData) {
      const sm = flattenTree(treeData);
      if (smooth && smooth.length === 0) {
        let expand: string[] = [];
        let finalKeys: any[] = [];
        const mergeKeys = [...(checkedKeys || []), ...(defaultCheckedKeys || [])];
        if (checkable && !checkStrictly) {
          finalKeys = initKeys(mergeKeys, sm);
        }
        if (defaultExpandParent || autoExpandParent) {
          expand = autoExpandParent && treeData && treeData.length === 1
            ? treeData.map((i) => i.key)
            : (treeData || []).filter((i) => i.key).map((i) => i.key);
        }
        return {
          smooth: sm,
          expandKeys: [...expand, ...(defaultExpandedKeys || [])],
          checkedKeys: checkable && !checkStrictly
            ? finalKeys.map((i: any) => (i.key || i.currentKey)) : mergeKeys,
          selectedKeys: [...(selectedKeys || []), ...(defaultSelectedKeys || [])],
        };
      }

      return {
        smooth: sm,
      };
    }
    if (children) {
      let finalKeys: any[] = [];
      let expand = [];
      const sm = flatChildrenTree(children) || [];
      const childrenList = translateDataToTree(sm) || [];
      if (smooth && smooth.length === 0) {
        const mergeKeys = [...(checkedKeys || []), ...(defaultCheckedKeys || [])];
        if (checkable && !checkStrictly) {
          finalKeys = initKeys(mergeKeys, sm);
        }
        if (defaultExpandParent || autoExpandParent) {
          if (children) {
            const list = childrenList;
            expand = autoExpandParent && list.length === 1 ? list.map((i: any) => i.currentKey)
              : list.filter((i: any) => i.currentKey).map((i: any) => i.currentKey);
          }
        }
        return {
          childrenList,
          smooth: sm,
          expandKeys: [...expand, ...(defaultExpandedKeys || [])],
          checkedKeys: checkable && !checkStrictly
            ? finalKeys.map((i: any) => (i.key || i.currentKey)) : mergeKeys,
          selectedKeys: [...(selectedKeys || []), ...(defaultSelectedKeys || [])],
        };
      }
      return {
        smooth: sm,
        childrenList,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps: TreeProps) {
    const { expandedKeys, selectedKeys, checkedKeys } = this.props;
    if (expandedKeys !== prevProps.expandedKeys) {
      this.setState({
        expandKeys: expandedKeys || [],
      });
    }
    if (selectedKeys !== prevProps.selectedKeys) {
      this.setState({
        selectedKeys: selectedKeys || [],
      });
    }
    if (checkedKeys !== prevProps.checkedKeys) {
      this.setState({
        checkedKeys: checkedKeys || [],
      });
    }
  }

  handleTreeExpand = (key: string, currentNode: any) => {
    const { expandKeys } = this.state;
    let lastkeys: string[] = expandKeys;
    let expand = false;
    if (expandKeys.indexOf(key) >= 0) {
      lastkeys = expandKeys.filter((i: string) => i !== key);
    } else {
      expand = true;
      lastkeys.push(`${key}`);
    }
    const { onExpand } = this.props;
    onExpand && onExpand(lastkeys, { expand, node: currentNode });
    this.setState({ expandKeys: lastkeys });
  };

  handleSelect = (key: string, node: any, other: {[key: string] : unknown}) => {
    const { selectedKeys, smooth, multiple } = this.state;
    const {
      onSelect,
    } = this.props;
    let lastSelected = selectedKeys;
    let selected = true;
    if (selectedKeys.indexOf(key) >= 0) {
      selected = false;
      lastSelected = selectedKeys.filter((i) => i !== key);
    } else if (multiple) {
      lastSelected.push(key);
    } else {
      lastSelected = [key];
    }
    onSelect && onSelect(lastSelected, {
      ...other,
      node,
      selected,
      selectedNodes: smooth.filter((i) => lastSelected.indexOf((i.key || i.currentKey) as string) >= 0),
    });
    this.setState({ selectedKeys: lastSelected });
  };

  handleChecked = (key: string, checked: boolean, other: {[key: string] : unknown}) => {
    const { smooth, checkedKeys } = this.state;
    const { onCheck, checkStrictly = false, children } = this.props;
    if (checkStrictly) { // 父子节点各选各的
      let singleKey = [...checkedKeys];
      if (checked) {
        if (checkedKeys.indexOf(`${key}`) >= 0) {
          singleKey = checkedKeys.filter((i) => i !== key);
        } else {
          singleKey.push(key);
        }
      } else {
        singleKey = checkedKeys.filter((i) => i !== key);
      }
      const checkNodes = checked ? smooth.filter((i) => i.key === key || i.currentKey === key) : [];
      onCheck && onCheck(
        singleKey,
        {
          ...other,
          checkedNodes: children
            ? checkNodes.map((i) => ({ ...i, key: i.currentKey })) : checkNodes,
        },
      );

      this.setState({ checkedKeys: singleKey });
    } else { // 父子节点关联选择
      const current = smooth.find((i) => i.key === key || i.currentKey === key);
      const list = checkedFun(current, checked, smooth, checkedKeys);
      onCheck && onCheck(
        list.map((i) => i.key || i.currentKey),
        {
          ...other,
          checkedNodes: children ? list.map((i) => ({ ...i, key: i.currentKey })) : list,
        },
      );
      this.setState({ checkedKeys: list.map((i) => i.key || i.currentKey) });
    }
  };

  renderTreeNode = (data: TreeDataType[] | any) => {
    const { checkable = false, defaultExpandAll = false, disabled = false } = this.props;
    const {
      expandKeys, selectedKeys, multiple, checkedKeys,
    } = this.state;
    return (
      <TreeNodeContext.Provider
        value={{
          handleTreeExpand: this.handleTreeExpand,
          treeCheckable: checkable,
          multiple,
          selectedKeys,
          expandKeys,
          handleSelect: this.handleSelect,
          handleChecked: this.handleChecked,
          treeType: 'tree-select',
          treeDisabled: disabled,
        }}
      >
        {data.map((item: TreeDataType) => (
          <div key={item.key || item.currentKey}>
            <TreeNode
              title={item.title}
              current={item.key || item.currentKey}
              prefixIcon={!!item.children}
              disabled={item.disabled}
              checkable={item.checkable}
              isLeaf={item.isLeaf}
              currentNode={item}
              disableCheckbox={item.disableCheckbox}
              isChecked={multiple
                ? (checkedKeys || []).some((i: string) => i === (item.key || item.currentKey))
                : false}
              isSelected={multiple
                ? (selectedKeys || []).some((i: string) => i === (item.key || item.currentKey))
                : (selectedKeys || []).indexOf((item.key || item.currentKey) as string) >= 0}
            >
              {(defaultExpandAll
              || expandKeys.some((e) => `${e}` === `${(item.key || item.currentKey)}`))
              && item.children
              && item.children.length
              && this.renderTreeNode(item.children)}
            </TreeNode>
          </div>
        ))}
      </TreeNodeContext.Provider>
    );
  };

  renderTree = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      treeData,
      style,
      className,
    } = this.props;
    const { childrenList } = this.state;
    const treeStyle = getPrefixCls('tree', prefixCls);
    const treewrapper = classnames(`${treeStyle}-wrapper`, className);
    return (
      <div className={treewrapper} style={style}>
        {this.renderTreeNode(treeData || childrenList)}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderTree}
      </ConfigConsumer>
    );
  }
}
Tree.TreeNode = TreeNode;

export default Tree;
