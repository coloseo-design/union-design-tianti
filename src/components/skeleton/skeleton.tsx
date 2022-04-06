/* eslint-disable react/no-array-index-key */
import React from 'react';
import classnames from 'classnames';
import { BaseProps } from '../common/base-component';
import { withGlobalConfig } from '../config-provider/context';

interface SkeletonAvatarProps {
  /** 指定头像的形状 */
  shape: 'circle' | 'square';
}

interface SkeletonTitleProps {
  /** 设置标题占位图的宽度 */
  width: number | string;
}

interface SkeletonParagraphProps {
  /** 设置段落占位图的行数 */
  rows: number;
  /** 设置段落占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度 */
  width?: number | string | Array<string | number>;
}

interface SkeletonProps extends BaseProps {
  /* 为 true 时，显示占位图。反之则直接展示子组件 */
  loading?: boolean;
  /** 是否展示动画 */
  active?: boolean;
  /** 是否显示头像占位图 */
  avatar?: boolean | SkeletonAvatarProps;
  /** 是否显示标题占位图 */
  title?: boolean | SkeletonTitleProps;
  /** 是否显示段落占位图 */
  paragraph?: boolean | SkeletonParagraphProps;

  getPrefixCls?: string;
}

@withGlobalConfig
export default class extends React.Component<SkeletonProps> {
  composeRowProps = () => {
    let { paragraph = true } = this.props;
    if (paragraph === true) {
      paragraph = {
        rows: 4,
        width: '100%',
      };
    }
    if (paragraph === false) {
      paragraph = {
        rows: 0,
        width: '100%',
      };
    }
    return Array((paragraph as SkeletonParagraphProps).rows || 4).fill(0).map((_, index) => {
      const { width: rowWidth } = paragraph as SkeletonParagraphProps;
      const width = Array.isArray(rowWidth) ? rowWidth[index] : rowWidth;
      return (
        <li style={width ? { width: width || '100%' } : {}} key={index} />
      );
    });
  }

  render() {
    const {
      active = false,
      title = true,
      paragraph = true,
      loading = true,
      getPrefixCls,
      prefixCls: customizePrefixCls,
      children,
    } = this.props;
    let { avatar = false } = this.props;
    const prefx = getPrefixCls?.('skeleton', customizePrefixCls);
    const containerCls = classnames(prefx, {
      [`${prefx}-with-avatar`]: avatar,
      [`${prefx}-status-active`]: active,
    });
    const headerCls = `${prefx}-header`;
    const contentCls = `${prefx}-content`;

    // 处理头像样式
    if (avatar === true) {
      avatar = { shape: 'circle' };
    }
    const avatarCls = classnames(`${prefx}-header-avatar`, {
      ...(avatar === false ? {} : {
        [`${prefx}-header-avatar-${(avatar as SkeletonAvatarProps).shape}`]: (avatar as SkeletonAvatarProps).shape,
      }),
    });

    const titleCls = classnames(`${contentCls}-title`);
    const titleStyle = {
      ...(typeof title === 'boolean' ? {
        width: '38%',
      } : {
        width: title.width,
      }),
    };

    return loading ? (
      <div className={containerCls}>
        {
          avatar && (
            <div className={headerCls}>
              <span className={avatarCls} />
            </div>
          )
        }
        <div className={contentCls}>
          {
            title && (
              <div className={titleCls} style={titleStyle} />
            )
          }
          {
            paragraph && (
              <ul className={`${contentCls}-paragraph`}>
                {this.composeRowProps()}
              </ul>
            )
          }

        </div>
      </div>
    ) : children;
  }
}
