/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
import React from 'react';
import classNames from 'classnames';
import { TreeNodeProps } from './type';
import { TreeNodeContext } from './context';
import Icon from '../icon';
import Checkbox from '../checkbox';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

class TreeNode extends React.Component<TreeNodeProps> {
  handleExpand = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
    const { handleTreeExpand } = this.context;
    const { current, currentNode } = this.props;
    handleTreeExpand && handleTreeExpand(current, currentNode);
  };

  handleSelect = (evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    evt.stopPropagation();
    evt.nativeEvent.stopImmediatePropagation();
    const { handleSelect } = this.context;
    const { current, disabled, currentNode } = this.props;
    if (!disabled) {
      handleSelect && handleSelect(current, currentNode, { event: 'select', nativeEvent: evt.nativeEvent });
    }
  };

  handleChecked = (checked: boolean) => {
    const { handleChecked } = this.context;
    const { currentNode, current } = this.props;
    handleChecked && handleChecked(
      current,
      checked,
      { event: 'check', checked, node: currentNode },
    );
  };

  renderTreeNode = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      disableCheckbox = false,
      children,
      title,
      prefixIcon,
      current,
      disabled,
      checkable = true,
      isLeaf = false,
      isSelected,
      isChecked,
      style,
      className,
    } = this.props;
    const { treeType, treeDisabled } = this.context;
    const tree = getPrefixCls(`${treeType}`, prefixCls);
    const treeNodeClass = classNames(tree, className);
    const titleStyle = classNames(`${tree}-node-title`, {
      [`${tree}-node-title-selected`]: isSelected,
      [`${tree}-node-title-disabled`]: disabled || treeDisabled,
    });

    return (
      <TreeNodeContext.Consumer>
        {({ treeCheckable, expandKeys }) => (
          <div
            className={treeNodeClass}
            onClick={(evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => { evt.stopPropagation(); evt.nativeEvent.stopImmediatePropagation(); }}
            style={style}
          >
            <div className={`${tree}-node`}>
              {prefixIcon && !isLeaf && (
                <span
                  className={`${tree}-node-switch`}
                >
                  <Icon
                    type={`fill-${expandKeys.some((i: string) => `${i}` === `${current}`) ? 'down' : 'right'}`}
                    style={{ fontSize: 12, color: '#444A5E' }}
                    onClick={this.handleExpand}
                  />
                </span>
              )}
              {
              treeCheckable && checkable && (
                <span
                  className={`${tree}-node-checkbox`}
                  onClick={(evt: React.MouseEvent<HTMLSpanElement, MouseEvent>) => { evt.stopPropagation(); evt.nativeEvent.stopImmediatePropagation(); }}
                >
                  <Checkbox
                    disabled={disableCheckbox || disabled || treeDisabled}
                    checked={isChecked}
                    onChange={this.handleChecked}
                  />
                </span>
              )
            }
              <span
                className={titleStyle}
                style={{
                  width: `calc(100% - ${(treeCheckable && checkable) ? 56 : 24}px)`,
                  marginLeft: treeCheckable ? 8 : 0,
                }}
                title={title}
                onClick={this.handleSelect}
              >
                {title}
              </span>
            </div>
            {children}
          </div>
        )}
      </TreeNodeContext.Consumer>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderTreeNode}
      </ConfigConsumer>
    );
  }
}

TreeNode.contextType = TreeNodeContext;

export default TreeNode;
