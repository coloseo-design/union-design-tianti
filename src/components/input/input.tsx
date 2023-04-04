import React, {
  ReactNode, Component, forwardRef, createElement,
} from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
import Icon from '../icon';
import TextArea from './textarea';
import Search from './search';

export interface BaseInputProps {
  value?: string,
  defaultValue?: string,
  disabled?: boolean;
  addonAfter?: ReactNode, // 后缀
  addonBefore?: ReactNode, // 前缀
  allowClear?: boolean; // 可以点击清除图标删除内容
  prefix?: ReactNode, // 带有前缀图标的 input
  suffix?: ReactNode, // 带有后缀图标的 input
  type?: string,
  ref?: React.RefObject<HTMLInputElement>,
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onSearch?: (value: string, event: Event) => void;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: (e: Event) => void;
}

export interface InputState {
  value?: string;
  focus?: boolean;
}

class Input extends Component<BaseInputProps, InputState> {
  node: any;

  constructor(props: BaseInputProps) {
    super(props);
    // 劫持value
    this.state = {
      value: props.value || props.defaultValue,
    };
  }

  componentDidUpdate(prevProps: BaseInputProps) {
    const { value } = this.props;
    if (value !== prevProps.value) {
      this.setState({
        value,
      });
    }
  }

  renderInput = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      disabled, addonAfter, addonBefore, type = 'input', prefix, allowClear, suffix, ref, onChange, onFocus, onBlur, ..._rest
    } = this.props;
    const { focus, value } = this.state;
    const rest = omit(_rest, ['onSearch', 'onPressEnter', 'defaultValue', 'onKeyPress']);

    const prefixCls = getPrefixCls('input');
    const containerClasses = classNames(`${prefixCls}-container`, {
      [`${prefixCls}-container-focused`]: focus,
      [`${prefixCls}-container-disabled`]: disabled,
    });

    const wrapClass = classNames(`${prefixCls}-wrap`, {
      [`${prefixCls}-wrap-addonAfter`]: addonAfter,
      [`${prefixCls}-wrap-addonBefore`]: addonBefore,
      [`${prefixCls}-wrap-textarea`]: type === 'textarea',
    });

    const handleDelete = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      this.setState({ value: '' });
      if (onChange) {
        Object.assign(e, {
          target: this.node,
          currentTarget: this.node,
        });
        Object.assign(this.node, {
          value: '',
        });
        onChange(e);
      }
      this.node.focus();
    };

    const onchange = (e: { preventDefault?: () => void; target?: any; }) => {
      this.setState({ value: e.target.value });
      if (onChange) {
        onChange(e);
      }
    };

    const onfocus = (e) => {
      this.setState({ focus: true });
      onFocus && onFocus(e);
    };

    const onblur = (e) => {
      this.setState({ focus: false });
      onBlur && onBlur(e);
    };

    const handleRef = (node: any) => {
      this.node = node;
      ref?.current = node;
    };

    const input = createElement(type, {
      ...rest, disabled, value, ref: handleRef, className: prefixCls, onChange: onchange, onFocus: onfocus, onBlur: onblur,
    });

    return (
      <div className={wrapClass}>
        {addonBefore && <div className={`${prefixCls}-addonBefore`}>{addonBefore}</div>}
        <div className={containerClasses}>
          {prefix && <span className={`${prefixCls}-prefix`}>{prefix}</span>}
          {input}
          {allowClear && <span className={`${prefixCls}-allowClear`} style={{ visibility: value ? 'visible' : 'hidden' }} onClick={handleDelete}><Icon type="delete" /></span>}
          {suffix && <span className={`${prefixCls}-suffix`}>{suffix}</span>}
        </div>
        {addonAfter && <div className={`${prefixCls}-addonAfter`}>{addonAfter}</div>}
      </div>
    );
  }

  render(): React.ReactNode {
    return (
      <ConfigConsumer>
        {this.renderInput}
      </ConfigConsumer>
    );
  }
}

const InputRef = forwardRef((props, ref) => <Input {...props} ref={ref} />);

InputRef.TextArea = TextArea;
InputRef.Search = Search;

export default InputRef;

// /* eslint-disable no-nested-ternary */
// /* eslint-disable max-len */
// /* eslint-disable react/destructuring-assignment */
// /* eslint-disable @typescript-eslint/no-empty-function */
// /* eslint-disable @typescript-eslint/ban-types */
// import React, { Component, ReactNode } from 'react';
// import classNames from 'classnames';
// import omit from 'omit.js';
// import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
// import TextArea from './textarea';
// import Search from './search';
// import Icon from '../icon';

// export const tuple = <T extends string[]>(...args: T) => args;

// const InputTypes = tuple('button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week');

// export type InputType = (typeof InputTypes)[number];

// export interface BaseInputProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'forwardedRef'> {
//   type?: InputType;
//   /* 用户自定义类前缀，默认uni-input */
//   prefixCls?: string;
//   /* 用户自定义类 */
//   className?: string;
//   /* 当表单控件为空时，控件中显示的内容 */
//   placeholder?: string;
//   /* 存在时表示控件的值不可编辑 */
//   readonly?: boolean;
//   /* 表单控件的值 */
//   value?: any;
//   // value 的最大长度（最多字符数目）
//   maxlength?: number;
//   // value 的最小长度（最少字符数目）
//   minlength?: number;
//   // input表单控件的名字。以名字/值对的形式随表单一起提交
//   name?: string;
//   // 匹配有效 value 的模式
//   pattern?: string;
//   // 用于表单的自动填充功能
//   autocomplete?: string;
//   // 用于规定文件上传控件中期望的文件类型
//   accept?: string;
//   // image type的alt属性，是可访问性的要求。
//   alt?: string;
//   // 页面加载时自动聚焦到此表单控件
//   autofocus?: boolean;
//   // 文件上传控件中媒体拍摄的方式
//   capture?: string;
//   // 用于控制控件是否被选中
//   checked?: boolean;
//   // 表单区域的一个名字，用于在提交表单时发送元素的方向性
//   dirname?: string;
//   // 表单控件是否被禁用
//   disabled?: boolean;
//   // 将控件和一个form元素联系在一起
//   form?: string;
//   // 用于提交表单的URL
//   formaction?: string;
//   // 表单数据集的编码方式，用于表单提交
//   formenctype?: string;
//   // 用于表单提交的HTTP方法
//   formmethod?: string;
//   // 提交表单时绕过对表单控件的验证
//   formnovalidate?: boolean;
//   // 表单提交的浏览上下文
//   formtarget?: any;
//   height?: string | number;
//   // 自动填充选项的<datalist> 的id值
//   list?: string;
//   // 最大值
//   max?: number;
//   // 最小值
//   min?: number;
//   //  是否允许多个值
//   multiple?: boolean;
//   // 表示此值为必填项或者提交表单前必须先检查该值
//   required?: boolean;
//   // 和<img> 的 src 属性一样；图像资源的地址
//   src?: string;
//   // 有效的递增值
//   step?: number;
//   width?: string | number;
//   // 输入框内容变化时的回调
//   onChange?: React.ChangeEventHandler<HTMLInputElement>;
//   onBlur?: React.FocusEventHandler<HTMLInputElement>;
//   onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
//   // 输入框默认内容
//   defaultValue?: string | number;
//   // 带标签的 input，设置后置标签
//   addonAfter?: ReactNode;
//   // 带标签的 input，设置前置标签
//   addonBefore?: ReactNode;
//   // 点击搜索图标、清除图标，或按下回车键时的回调
//   onSearch?: (
//     value: string,
//     event?:
//       | React.ChangeEvent<HTMLInputElement>
//       | React.MouseEvent<HTMLElement>
//       | React.KeyboardEvent<HTMLInputElement>,
//   ) => void;
//   // 是否有确认按钮，可设为按钮文字。
//   enterButton?: boolean | Node;
//   forwardedRef?: React.MutableRefObject<HTMLInputElement>;
//   // 可以点击清除图标删除内容
//   allowClear?: boolean;
// }
// export interface InputState {
//   value: string;
// }
// class Input extends Component<BaseInputProps, InputState> {
//   static defaultProps: BaseInputProps = {
//     value: '',
//     defaultValue: '',
//     onChange: () => {},
//     onSearch: () => {},
//     onBlur: () => {},
//     onPressEnter: () => {},
//   };

//   node: HTMLInputElement | undefined;

//   constructor(props: BaseInputProps) {
//     super(props);
//     // 劫持value
//     this.state = {
//       value: props.value || props.defaultValue,
//     };
//   }

//   componentDidUpdate(prevProps: BaseInputProps) {
//     const { value } = this.props;
//     if (value !== prevProps.value) {
//       this.setState({
//         value,
//       });
//     }
//   }

//   deletgateRef = (node: HTMLInputElement) => {
//     this.node = node;
//     this.props.forwardedRef?.current = node;
//   }

//   renderInput = ({ getPrefixCls }: ConfigConsumerProps) => {
//     const {
//       allowClear, style, addonAfter, addonBefore, onChange, prefixCls: customizedPrefixCls, className, type,
//       // defaultValue, onSearch, onPressEnter, ...rest
//     } = this.props;
//     const rest = omit(this.props, ['defaultValue', 'onSearch', 'onPressEnter', 'allowClear', 'forwardedRef', 'addonBefore', 'addonAfter']);
//     const { value } = this.state;
//     const group: string = (addonAfter || addonBefore) ? 'group' : '';
//     const clear: string = allowClear ? 'allowClear' : '';
//     const prefixCls = getPrefixCls('input', customizedPrefixCls);

//     const inputClassName: string = classNames(prefixCls, className, {
//       [`${prefixCls}-${type}`]: type,
//     });

//     const containerClasses: string = classNames({
//       [`${prefixCls}-${group}`]: group,
//     });

//     const inputWrapperClassName = classNames({
//       [`${prefixCls}-${clear}`]: clear,
//     });

//     const onchange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
//       this.setState({ value: e.target.value });
//       if (onChange) {
//         (onChange as React.ChangeEventHandler<HTMLInputElement>)(e);
//       }
//     };

//     const handleDelete = (e: React.MouseEvent<HTMLSpanElement>) => {
//       e.preventDefault();
//       this.setState({ value: '' });
//       if (onChange) {
//         Object.assign(e, {
//           target: this.node,
//           currentTarget: this.node,
//         });
//         Object.assign(this.node, {
//           value,
//         });
//         (onChange as React.ChangeEventHandler<HTMLInputElement>)(e as unknown as React.ChangeEvent<HTMLInputElement>);
//       }
//       this.node.focus();
//     };

//     const cleanButton = (
//       <span onClick={handleDelete} style={{ visibility: value ? 'visible' : 'hidden' }}>
//         <Icon type="delete" />
//       </span>
//     );

//     return (
//       // <span className={containerClasses} style={style}>
//       //   {addonBefore && <span className="addon">{addonBefore}</span>}
//       //   <span className={containerClasses} style={style}>
//       //     <input
//       //       {...rest}
//       //       value={value}
//       //       className={classes}
//       //       style={{
//       //         borderTopLeftRadius: (!addonBefore && !addonAfter) ? '3px' : (addonBefore && !addonAfter) ? 0 : (addonBefore && addonAfter ? 0 : '3px'),
//       //         borderTopRightRadius: (!addonBefore && !addonAfter) ? '3px' : (addonBefore && !addonAfter) ? '3px' : '0',
//       //         borderBottomLeftRadius: (!addonBefore && !addonAfter) ? '3px' : (addonBefore && !addonAfter) ? 0 : (addonBefore && addonAfter ? 0 : '3px'),
//       //         borderBottomRightRadius: (!addonBefore && !addonAfter) ? '3px' : (addonBefore && !addonAfter) ? '3px' : '0',
//       //       }}
//       //       type={type}
//       //       ref={this.deletgateRef}
//       //       onChange={onchange}
//       //     />
//       //     { allowClear && cleanButton}
//       //   </span>
//       //   {addonAfter && <span className="addon">{addonAfter}</span>}
//       // </span>
//       <span className={`${prefixCls}-container ${containerClasses}`} style={{ ...style, display: containerClasses ? 'flex' : 'inline-block' }}>
//         {addonBefore && <span className="addon">{addonBefore}</span>}
//         <span className={inputWrapperClassName} style={{ flex: '1', position: 'relative' }}>
//           <input
//             {...rest}
//             value={value}
//             className={inputClassName}
//             style={{
//               borderTopLeftRadius: (!addonBefore && !addonAfter) ? '3px' : (addonBefore && !addonAfter) ? 0 : (addonBefore && addonAfter ? 0 : '3px'),
//               borderTopRightRadius: (!addonBefore && !addonAfter) ? '3px' : (addonBefore && !addonAfter) ? '3px' : '0',
//               borderBottomLeftRadius: (!addonBefore && !addonAfter) ? '3px' : (addonBefore && !addonAfter) ? 0 : (addonBefore && addonAfter ? 0 : '3px'),
//               borderBottomRightRadius: (!addonBefore && !addonAfter) ? '3px' : (addonBefore && !addonAfter) ? '3px' : '0',
//             }}
//             type={type}
//             ref={this.deletgateRef}
//             onChange={onchange}
//           />
//           {allowClear && cleanButton}
//         </span>
//         {addonAfter && <span className="addon">{addonAfter}</span>}
//       </span>
//     );
//   };

//   render() {
//     return (
//       <ConfigConsumer>
//         {this.renderInput}
//       </ConfigConsumer>
//     );
//   }
// }

// const InputRef: React.ForwardRefExoticComponent<BaseInputProps & React.RefAttributes<HTMLInputElement>> & { TextArea: any; Search: any} = React.forwardRef<HTMLInputElement, BaseInputProps>((props: BaseInputProps, ref: React.MutableRefObject<HTMLInputElement>) => <Input {...props} forwardedRef={ref} />);

// InputRef.TextArea = TextArea;
// InputRef.Search = Search;

// export default InputRef;
