/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
import Icon from '../icon';

export const tuple = <T extends string[]>(...args: T) => args;

export interface BaseTextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  // 用于表单的自动填充功能
  autocomplete?: string;
  // 文本是否自动首字母大写
  autocapitalize?: string;
  // 页面加载完毕之后是否自动给本元素添加焦点。只有跟表格关联的才能使本属性生效。
  autofocus?: boolean;
  // 文本域的可视宽度。必须为正数，默认为20 (HTML5)。
  cols?: number;
  // 禁用文本域。默认为false。如果未指定，也可以从父级上如<fieldset>继承而来。
  disabled?: boolean;
  // 指定跟自身相关联的表单。值必须为本文档内的表单的ID，如果未指定，就是跟当前所在的表单元素相关联。这就允许你在文档的任意地方放置文本域元素。
  form?: string;
  // 允许用户输入的最大字符长度 (Unicode) 。未指定表示无限长度。
  maxlength?: number;
  // 允许用户输入的最小字符长度(Unicode)
  minlength?: number;
  // 元素的名称。
  name?: string;
  // 向用户提示可以在控件中输入的内容。 在渲染提示时，占位符文本中的回车符(\r)或换行符(\n)一定会被作为行断（换行）处理。
  placeholder?: string;
  // 不允许用户修改元素内文本。和 disabled 属性不同的是，这个能让用户点击和选择元素内的文本。如果在表单里，这个元素的值还是会跟随表单一起提交。
  readonly?: boolean;
  // 提示用户这个元素的内容必填。
  required?: boolean;
  // 元素的输入文本的行数（显示的高度）。
  rows?: number;
  // 该属性设为true时，表明该元素会做拼写和语法检查。属性值为default时，表明元素有默认行为，可能会基于父元素的spellcheck值。属性值为false时，表明元素不做拼写和语法检查。
  spellcheck?: boolean;
  /* 指定文本换行的方式。默认为soft。可能的值为：
      hard: 在文本到达元素最大宽度的时候，浏览器自动插入换行符(CR+LF) 。比如指定 cols值。
      soft: 在到达元素最大宽度的时候，不会自动插入换行符。
  */
  wrap?: string;
  style?: {[key: string] : unknown};
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  /* 用户自定义类前缀，默认uni-textarea */
  prefixCls?: string;
  /* 用户自定义类 */
  className?: string;
  // 输入框默内容
  defaultValue?: string;
  // 输入框内容
  value?: string;
  forwardedRef?: React.ForwardedRef<HTMLTextAreaElement>;
  // 可以点击清除图标删除内容
  allowClear?: boolean;
}

interface TextAreaState {
  value?: string;
}
class TextArea extends Component<BaseTextAreaProps, TextAreaState> {
  static defaultProps: BaseTextAreaProps = {
    value: '',
    defaultValue: '',
    onChange: () => {},
  };

  node: HTMLTextAreaElement | undefined;

  constructor(props: BaseTextAreaProps) {
    super(props);
    // 劫持value
    this.state = {
      value: props.value || props.defaultValue,
    };
  }

  componentDidUpdate(prevProps: BaseTextAreaProps) {
    const { value } = this.props;
    if (value !== prevProps.value) {
      this.setState({
        value,
      });
    }
  }

  deletgateRef = (node: HTMLTextAreaElement) => {
    this.node = node;
  }

  renderTextArea = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      allowClear,
      forwardedRef,
      style,
      onChange,
      prefixCls: customizedPrefixCls,
      className,
      defaultValue,
      ...rest
    } = this.props;
    const { value } = this.state;
    const prefixCls = getPrefixCls('textarea', customizedPrefixCls);
    const clear: string = allowClear ? 'allowClear' : '';

    const classes: string = classNames(prefixCls, {
      // [`${prefixCls}-${type}`]: type,
    });

    const onchange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      this.setState({ value: e.target.value });
      if (onChange) {
        (onChange as React.ChangeEventHandler<HTMLTextAreaElement>)(e);
      }
    };

    const handleDelete = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      this.setState({ value: '' });
      if (onChange) {
        Object.assign(e, {
          target: this.node,
        });
        (onChange as React.ChangeEventHandler<HTMLTextAreaElement>)(e);
      }
      this.node?.focus();
    };

    const containerClasses: string = classNames(className, {
      [`${prefixCls}-${clear}`]: clear,
    });

    if (allowClear) {
      return (
        <span className={containerClasses}>
          <textarea {...rest} value={value} style={style} className={classes} ref={this.deletgateRef} onChange={onchange} />
          <span onClick={handleDelete} style={{ visibility: value ? 'visible' : 'hidden' }}>
            <Icon type="delete" />
          </span>
        </span>
      );
    }

    return (
      <textarea
        {...rest}
        value={value}
        style={style}
        className={classes}
        ref={forwardedRef}
        onChange={onchange}
      />
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderTextArea}
      </ConfigConsumer>
    );
  }
}

export default React.forwardRef((props: BaseTextAreaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => (
  <TextArea {...props} forwardedRef={ref} />
));
