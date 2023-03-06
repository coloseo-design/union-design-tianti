/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import Icon from '@union-design/icon';
import { getOffset } from '@union-design/utils/getOffset';
import Portal from '@union-design/portal';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider/context';
import { AutoCompleteProps } from './type';
import Option from './option';
import OptGroup from './opt-group';

const { isValidElement } = React;

export interface DataSourceItemObject {
  value: string;
  label: string | React.ReactNode;
}
export type DataSourceItemType = DataSourceItemObject | React.ReactNode;
interface autoState {
  showAutoDrop?: boolean;
  inputValue: unknown;
  isSearch?: boolean;
  searchData?: DataSourceItemType;
  dropStyleP?: React.CSSProperties;
  left: number,
  top: number,
  width: number,
}

class AutoComplete extends React.Component<AutoCompleteProps, autoState> {
  static Option: typeof Option;

  static OptGroup: typeof OptGroup;

  static isSelectOptGroup: boolean;

  node: HTMLSpanElement | undefined;

  constructor(props: AutoCompleteProps) {
    super(props);
    const {
      open, defaultOpen, value, defaultValue,
    } = props;
    this.state = {
      showAutoDrop: open || defaultOpen || false,
      inputValue: value || defaultValue || '',
      searchData: [],
      isSearch: false,
      left: 0,
      top: 0,
      width: 0,
    };
  }

  componentDidMount = () => {
    const { open, defaultOpen } = this.props;
    if (open || defaultOpen) {
      this.getLocation();
    }
    document.addEventListener('click', this.documentBodyOnClick);
  };

  componentDidUpdate(prevProps: AutoCompleteProps) {
    const { value } = this.props;
    if (value !== prevProps.value) {
      this.setState({ inputValue: value });
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.documentBodyOnClick);
  }

  onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      onChange, onSearch, showSearch, dataSource,
    } = this.props;
    onChange && onChange(e.target.value);
    onSearch && onSearch(e.target.value);
    this.setState({
      inputValue: e.target.value,
      showAutoDrop: e.target.value !== '',
    });
    if (showSearch) {
      if (e.target.value !== '') {
        const data = (dataSource || []).filter((i: any) => {
          const flag = i.props ? (Object.prototype.toString.call(i.props.children) !== '[object Object]' && i.props.children.indexOf(e.target.value) >= 0)
            : typeof i === 'string' ? i.indexOf(e.target.value) >= 0 : i.label && i.label.indexOf(e.target.value) >= 0;
          return flag;
        });
        this.setState({ isSearch: true, searchData: data });
      } else {
        this.setState({ isSearch: false });
      }
    }
  };

  onFocus = () => {
    const { onFocus } = this.props;
    onFocus && onFocus();
  };

  onSelect = (value: string, option: any) => {
    const { onSelect, onChange } = this.props;
    onSelect && onSelect(value, option);
    onChange && onChange(Object.prototype.toString.call(option) === '[object String]' ? option
      : Object.prototype.toString.call(option) === '[object Array]' ? option[0] : value);
    this.setState({
      inputValue: Object.prototype.toString.call(option) === '[object String]' ? option
        : Object.prototype.toString.call(option) === '[object Array]' ? option[0] : value,
      showAutoDrop: false,
      isSearch: false,
    });
  };

  documentBodyOnClick = () => {
    this.setState({ showAutoDrop: false });
  }

  handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const { disabled } = this.props;
    if (!disabled) {
      this.setState({ showAutoDrop: true });
      this.getLocation();
    }
  }

  getNode = (node: HTMLDivElement) => {
    this.node = node;
  };

  getLocation = () => {
    const { getPopupContainer } = this.props;
    // if (this.node) {
    //   const {
    //     height, width,
    //   } = this.node.getBoundingClientRect();
    //   const containter = getPopupContainer && getPopupContainer();
    //   const { top: offsetTop, left: offsetLeft } = getOffset(this.node, containter);
    //   this.setState({
    //     left: offsetLeft,
    //     top: offsetTop + height + 4,
    //     width,
    //   });
    // }
    setTimeout(() => {
      if (this.node) {
        const {
          height, width,
        } = this.node.getBoundingClientRect();
        const containter = getPopupContainer && getPopupContainer();
        const { left: offsetLeft, top: offsetTop } = getOffset(this.node, containter);
        this.setState({
          left: offsetLeft,
          top: offsetTop + height + 4,
          width,
        });
      }
    }, 30);
  };

  renderAuto = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      disabled,
      autoFocus,
      placeholder,
      style = {},
      dataSource,
      showSearch,
      multiInput,
      forwardedRef,
      className,
      rows = 2,
      dropdownMenuStyle = {},
      getPopupContainer,
    } = this.props;
    const {
      showAutoDrop, inputValue, isSearch, searchData, left, top, width,
    } = this.state;

    /*  =====  className  */
    const prefix = getPrefixCls('auto-complete', prefixCls);
    const serachCls = classNames(`${prefix}-input-search`);
    const wrapperContainer = classNames(`${prefix}-wrapper`, className);
    const inputClass = classNames(multiInput ? `${prefix}-textarea` : `${prefix}-input`, {
      [`${prefix}-disabled`]: disabled,
      [`${prefix}-active`]: autoFocus,
    });

    const dropSelect = classNames(multiInput ? `${prefix}-select-textarea` : `${prefix}-select`);

    /*  =====  children dataSource  */
    let optionChildren: React.ReactNode[];
    const data = isSearch ? searchData : dataSource;

    if (dataSource && dataSource.length && isValidElement(dataSource[0])) {
      optionChildren = React.Children.map(data, (child) => React.cloneElement(child, { onClick: this.onSelect }));
    } else {
      optionChildren = data
        ? data.map((item: string | DataSourceItemObject) => {
          switch (Object.prototype.toString.call(item)) {
            case '[object String]':
              return (
                <Option
                  value={item as any}
                  key={item as any}
                  onClick={this.onSelect}
                >
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
      disabled,
    };

    return (
      <div
        className={wrapperContainer}
        style={style}
      >
        <div onClick={this.handleClick} ref={this.getNode}>
          {
          multiInput && (
            <textarea
              ref={forwardedRef as any}
              {...params as any}
              style={{
                height: style && style.height ? style.height : rows * 32,
              }}
            />
          )
        }
          {
          !multiInput && (
            <>
              <input ref={forwardedRef as any} {...params as any} />
              {showSearch && <div className={serachCls} style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}><Icon type="search" /></div>}
            </>
          )
        }
        </div>

        {showAutoDrop && optionChildren && optionChildren.length > 0 && (
        <Portal {...({ getPopupContainer })}>
          <div
            className={dropSelect}
            style={{
              ...dropdownMenuStyle,
              top,
              left,
              width,
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
            }}
          >
            {optionChildren}
          </div>
        </Portal>
        )}
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
// const AutoCompleteRef = React.forwardRef((props: AutoCompleteProps, ref: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement>) => <AutoComplete {...props} forwardedRef={ref} />);
// const AutoCompleteRef: React.ForwardRefExoticComponent<AutoCompleteProps & React.RefAttributes<HTMLInputElement | HTMLTextAreaElement>> & { Option: any; OptGroup: any; isSelectOptGroup: boolean} = React.forwardRef<HTMLInputElement, AutoCompleteProps>((props: AutoCompleteProps, ref: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement>) => <AutoComplete {...props} forwardedRef={ref} />);

const AutoRef = React.forwardRef<HTMLInputElement, AutoCompleteProps>((props: AutoCompleteProps, ref) => <AutoComplete {...props} forwardedRef={ref as any} />);
const AutoCompleteRef = AutoRef as typeof AutoRef & {
  Option: typeof Option,
  OptGroup: typeof OptGroup,
  isSelectOption: boolean,
  isSelectOptGroup: boolean,
};

AutoCompleteRef.Option = Option;
AutoCompleteRef.Option.isSelectOption = true;
AutoCompleteRef.OptGroup = OptGroup;
AutoCompleteRef.isSelectOptGroup = true;

export default AutoCompleteRef;
