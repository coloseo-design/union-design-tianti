/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '@union-design/icon';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider/context';
import { BaseInputProps, InputState } from './input';

export const tuple = <T extends string[]>(...args: T) => args;

class Search extends Component<BaseInputProps, InputState> {
  static defaultProps: BaseInputProps = {
    value: '',
    defaultValue: '',
    onChange: () => {},
    onSearch: () => {},
  };

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
      forwardedRef, enterButton, onSearch, style, onChange, prefixCls: customizedPrefixCls, className, defaultValue, ...rest
    } = this.props;
    const { value } = this.state;
    const prefixCls = getPrefixCls('input', customizedPrefixCls);

    const classes: string = classNames(prefixCls, className);

    const type = 'search';
    const _enterButton = enterButton ? 'wrapper' : '';
    const containerClasses: string = classNames(className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${_enterButton}`]: _enterButton,
    });

    const onchange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      this.setState({ value: e.target.value });
      if (onChange) {
        (onChange as React.ChangeEventHandler<HTMLInputElement>)(e);
      }
    };

    const onsearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => {
      if (onSearch) {
        onSearch(this.state.value, e);
      }
    };

    const onKeyPress = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement> | undefined) => {
      let keyCode;
      if (e && (e as any).which) {
        keyCode = (e as any).which;
      } else if (e && (e as any).keyCode) {
        keyCode = (e as any).keyCode;
      }

      if (keyCode === 13 && onSearch) {
        onSearch(value, e);
      }
    };

    // if (enterButton) {
    //   return (
    //     <span className={containerClasses} style={style}>
    //       <input {...rest} value={value} className={classes} type="search" ref={forwardedRef} onChange={onchange} onKeyPress={onKeyPress} />
    //       <span onClick={onsearch} className="addon">{enterButton}</span>
    //     </span>
    //   );
    // }

    const res: any = rest;
    return (
      <span className={containerClasses} style={style}>
        <input {...res} value={value} style={{ width: '100%' }} className={classes} type="search" ref={forwardedRef} onChange={onchange} onKeyPress={onKeyPress} />
        <span onClick={onsearch}><Icon type="search" /></span>
      </span>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderInput}
      </ConfigConsumer>
    );
  }
}

export default React.forwardRef((props: BaseInputProps, ref) => (
  <Search {...props} forwardedRef={ref as any} />
));
