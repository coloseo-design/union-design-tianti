/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { createRef, CSSProperties } from 'react';
import { BaseComponent, BaseProps } from '../common/base-component';

export type TypographyLevel = 1 | 2 | 3 | 4 | 5;

export type TypographyType = 'link' | 'success' | 'warning' | 'danger';

export type TypographyProps = {
    /** 重要程度，相当于 h1、h2、h3、h4、h5 */
    level?: TypographyLevel;
    /** 添加删除线样式 */
    deleteline?: boolean;
    /** 添加下划线样式 */
    underline?: boolean;
    /** 是否加粗 */
    strong?: boolean;
    /** 文本类型 */
    type?: TypographyType;
    /** type为link 的 链接地址 */
    href?: string;
    /** 多少行 */
    rows?: number;
    /** css类 */
    className?: string;
    /** 行类 style */
    style?: CSSProperties;
} & BaseProps;

export default class Typography extends BaseComponent<TypographyProps> {
    public static defaultProps: TypographyProps = {
      level: 1,
      underline: false,
      deleteline: false,
      strong: false,
      className: '',
      style: {},
    };

    protected classPrefix = 'typography';

    private ref = createRef<HTMLElement>();

    public componentDidMount() {
      this.handleDescription();
    }

    protected view = () => {
      const {
        children, level, underline, deleteline, strong, type, href, className, style,
      } = this.props;

      let tag = '';
      const classNames = this.classNames(className, this.getPrefixClass(`level${level}`), {
        [this.getPrefixClass('underline')]: underline,
        [this.getPrefixClass('deleteline')]: deleteline,
        [this.getPrefixClass('strong')]: strong,
        [this.getPrefixClass('success')]: type === 'success',
        [this.getPrefixClass('warning')]: type === 'warning',
        [this.getPrefixClass('danger')]: type === 'danger',
        [this.getPrefixClass('link')]: type === 'link',
      });

      if (([1, 2] as TypographyLevel[]).includes(level!)) {
        tag = 'div';
      } else if (type === 'link') {
        tag = 'a';
      } else {
        tag = 'span';
      }

      this.handleDescription();

      return React.createElement(tag, {
        style,
        className: classNames,
        ref: this.ref,
        ...type === 'link' && href && { href },
      }, children);
    }

    private handleDescription = () => {
      if (!this.props.rows) return;
      setTimeout(() => {
        const { children } = this.props;
        if (typeof children !== 'string') return;
        if (!this.ref.current) return;
        const container = this.ref.current;
        const text = container.innerText;
        const { width, fontSize } = window.getComputedStyle(container);
        const lineWidth = parseInt(width.slice(0, -2), 10);
        const lineFontSize = parseInt(fontSize.slice(0, -2), 10);
        const maxFontNum = Math.floor(lineWidth / lineFontSize) * this.props.rows!;

        if (text.length > maxFontNum) {
          container.innerText = text.slice(0, maxFontNum - 3).concat('...');
        }
      });
    }
}
