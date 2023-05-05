/* eslint-disable max-len */
import React, {
  ReactNode, Component, forwardRef, createElement,
} from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';
import Icon from '@union-design/icon';
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
  forwardedRef?: React.RefObject<HTMLInputElement>,
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
      value: props.value || props.defaultValue || '',
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
      disabled, addonAfter, addonBefore, type = 'input', prefix, allowClear, suffix, forwardedRef, onChange, onFocus, onBlur, ..._rest
    } = this.props;
    const { focus, value } = this.state;
    const rest = omit(_rest, ['onSearch', 'onPressEnter', 'defaultValue']);

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

    const handleDelete = (e: any) => {
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
      this.node?.focus();
    };

    const onchange = (e: any) => {
      this.setState({ value: e.target.value });
      if (onChange) {
        onChange(e);
      }
    };

    const onfocus = (e: any) => {
      this.setState({ focus: true });
      onFocus && onFocus(e);
    };

    const onblur = (e: any) => {
      this.setState({ focus: false });
      onBlur && onBlur(e);
    };

    const handleRef = (node: any) => {
      this.node = node;
      if (forwardedRef?.current) {
        (forwardedRef.current as any) = node;
      }
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

const InputRef: any = forwardRef((props, ref) => <Input {...props} forwardedRef={ref as any} />);

// const InputRef: React.ForwardRefExoticComponent<BaseInputProps & React.RefAttributes<HTMLInputElement>> & { TextArea: any; Search: any} = React.forwardRef<HTMLInputElement, BaseInputProps>((props: BaseInputProps, ref: any) => <Input {...props} forwardedRef={ref} />) as any;
InputRef.TextArea = TextArea;
InputRef.Search = Search;

export default InputRef;
