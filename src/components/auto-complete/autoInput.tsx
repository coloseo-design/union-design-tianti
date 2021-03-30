/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable @typescript-eslint/ban-types */
import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';
import { AutoCompleteProps } from './type';
import Option from './option';
import OptGroup from './opt-group';
import Icon from '../icon';

const { isValidElement } = React;

export interface DataSourceItemObject {
  value: string;
  label: string | React.ReactNode;
}
export type DataSourceItemType = DataSourceItemObject | React.ReactNode;
interface autoState {
  showDrop?: boolean;
  inputValue: unknown;
  searchChildren?: React.ReactNode;
  isSearch?: boolean;
  searchData?: DataSourceItemType;
  dropStyleP?: {[key: string] : unknown};
}
function isSelectOptionOrSelectOptGroup(child: unknown): Boolean {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

class AutoComplete extends React.Component<AutoCompleteProps, autoState> {
  static Option: typeof Option;

  state: autoState = {
    showDrop: this.props.open || this.props.defaultOpen || false,
    inputValue: this.props.value || this.props.defaultValue || '',
    searchChildren: [],
    searchData: [],
    isSearch: false,
    dropStyleP: this.props.dropdownMenuStyle ? { ...this.props.dropdownMenuStyle } : {},
  }

  componentDidUpdate(prevProps: AutoCompleteProps) {
    const { value } = this.props;
    if (value !== prevProps.value) {
      this.setState({ inputValue: value });
    }
  }

  onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      onChange, onSearch, showSearch, children, dataSource,
    } = this.props;
    // const len = React.Children.toArray(children);
    onChange && onChange(e.target.value);
    onSearch && onSearch(e.target.value);
    this.setState({
      inputValue: e.target.value,
      showDrop: e.target.value !== '',
    });
    if (showSearch) {
      if (e.target.value !== '') {
        if (dataSource) {
          const data = (dataSource || []).filter((i) => {
            const flag = i.props ? (Object.prototype.toString.call(i.props.children) !== '[object Object]' && i.props.children.indexOf(e.target.value) >= 0)
              : typeof i === 'string' ? i.indexOf(e.target.value) >= 0 : i.label && i.label.indexOf(e.target.value) >= 0;
            return flag;
          });
          this.setState({ isSearch: true, searchData: data });
        } else if (children) {
          const searchChild = (children || []).filter((i: { props: { children: string | string[]; }; }) => i.props.children.indexOf(e.target.value) >= 0);
          this.setState({ isSearch: true, searchChildren: searchChild });
        }
      } else {
        this.setState({ isSearch: false });
      }
    }
  };

  onFocus = () => {
    const { children, dataSource, onFocus } = this.props;
    onFocus && onFocus();
    const len = React.Children.toArray(children);
    if (dataSource && dataSource.length > 0 || React.Children.count(len) > 0) {
      this.setState({ showDrop: true });
    }
  };

  onSelect = (value: string, option: any) => {
    const { onSelect } = this.props;
    onSelect && onSelect(value, option);
    this.setState({
      inputValue: Object.prototype.toString.call(option) === '[object String]' ? option
        : Object.prototype.toString.call(option) === '[object Array]' ? option[0] : value,
      showDrop: false,
      isSearch: false,
    });
  };

  documentBodyOnClick = (self: any) => (e: Event) => {
    e.preventDefault();
    self.setState({ showDrop: false });
  }

  componentDidMount = () => {
    const _this = this;
    document.body.addEventListener('click', this.documentBodyOnClick(_this));
  };

  componentWillUnmount = () => {
    const _this = this;
    document.body.removeEventListener('click', this.documentBodyOnClick(_this));
  }

  handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
  }

  renderAuto = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      disabled,
      autoFocus,
      placeholder,
      style,
      dataSource,
      children,
      // dropdownMenuStyle,
      showSearch,
      multiInput,
      forwardedRef,
      className,
      rows = 2,
    } = this.props;
    const {
      showDrop, inputValue, searchChildren, isSearch, searchData, dropStyleP,
    } = this.state;

    /*  =====  className  */
    const prefix = getPrefixCls('auto-complete', prefixCls);
    const serachCls = classNames(`${prefix}-input-search`);
    const wrapperContainer = classNames(`${prefix}-wrapper`, className);
    const inputClass = classNames(multiInput ? `${prefix}-textarea` : `${prefix}-input`, {
      [`${prefix}-disabled`]: disabled,
      [`${prefix}-active`]: autoFocus,
    });

    const dropdownContainer = classNames(`${prefix}-dropdown`);
    const dropStyle = showDrop;
    const dropSelect = classNames(multiInput ? `${prefix}-select-textarea` : `${prefix}-select`, {
      [`${prefix}-select-hide`]: !dropStyle,
      [`${prefix}-select-show`]: dropStyle,
    });

    /*  =====  children dataSource  */
    const childNodes = React.Children.toArray(isSearch ? searchChildren : children);
    let optionChildren: React.ReactNode[];
    const data = isSearch ? searchData : dataSource;

    if (childNodes.length && isSelectOptionOrSelectOptGroup(childNodes[0]) && isValidElement(childNodes[0])) {
      optionChildren = React.Children.map(isSearch ? searchChildren : children, (child) => React.cloneElement(child, { onClick: this.onSelect }));
    } else if (dataSource && dataSource.length && isValidElement(dataSource[0])) {
      optionChildren = React.Children.map(data, (child) => React.cloneElement(child, { onClick: this.onSelect }));
    } else {
      optionChildren = data
        ? data.map((item: string | DataSourceItemObject) => {
          switch (Object.prototype.toString.call(item)) {
            case '[object String]':
              return (
                <Option key={item} value={item} onClick={this.onSelect}>
                  {item}
                </Option>
              );
            case '[object Object]': {
              const { value: optionValue } = item as DataSourceItemObject;
              return (
                <Option key={optionValue} value={optionValue} onClick={this.onSelect}>
                  {(item as DataSourceItemObject).label}
                </Option>
              );
            }
            default:
              throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
          }
        })
        : [];
    }
    const handleBlur = () => {
      const { onBlur } = this.props;
      onBlur && onBlur();
    };
    const params = {
      placeholder,
      onChange: this.onChange,
      onFocus: this.onFocus,
      value: inputValue,
      className: inputClass,
      onBlur: handleBlur,
      style: style && style.height ? { height: style.height } : multiInput ? { height: rows * 32 } : {},
    };
    const drop = {
      ...dropStyleP,
      top: multiInput ? (style && style.height ? (Number(style.height) + 4) : (rows * 32) + 4)
        : (style && style.height ? Number(style.height) + 4 : 36),
    };

    return (
      <div className={wrapperContainer} style={style} onClick={this.handleClick}>
        {!multiInput
          && (
            <>
              <input
                ref={forwardedRef}
                {...params}
              />
              {showSearch && <span className={serachCls}><Icon type="search" /></span>}
            </>
          )}
        {multiInput
          && (
          <textarea
            ref={forwardedRef}
            {...params}
          />
          )}
        <div className={dropdownContainer}>
          <div
            className={dropSelect}
            style={{ ...drop }}
          >
            {optionChildren}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderAuto}
      </ConfigConsumer>
    );
  }
}
const AutoCompleteRef = React.forwardRef((props: AutoCompleteProps | autoState, ref: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement>) => <AutoComplete {...props} forwardedRef={ref} />);
AutoCompleteRef.Option = Option;
AutoCompleteRef.Option.isSelectOption = true;
AutoCompleteRef.OptGroup = OptGroup;
AutoCompleteRef.isSelectOptGroup = true;

export default AutoCompleteRef;
