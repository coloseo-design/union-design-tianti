/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { ChangeEvent, createRef } from 'react';
import classNames from 'classnames';
import Input from '@union-design/input';
import { getOffset } from '@union-design/utils';
import Portal from '@union-design/portal';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';
import { AutoCompleteProps } from './type';
import Option from './option';
import OptGroup from './opt-group';

const { isValidElement } = React;

const { Search, TextArea } = Input;
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

  popRef = createRef<HTMLDivElement>();

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
    document.addEventListener('click', this.documentBodyOnClick, true);
  };

  componentDidUpdate(prevProps: AutoCompleteProps) {
    const { value } = this.props;
    if (value !== prevProps.value) {
      this.setState({ inputValue: value });
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.documentBodyOnClick, true);
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

  documentBodyOnClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const popRef = this.popRef?.current as HTMLElement;
    if (!(popRef && popRef.contains(target))) {
      this.setState({ showAutoDrop: false });
    }
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
    if (this.node) {
      const {
        height, width,
      } = this.node.getBoundingClientRect();
      const container = getPopupContainer && getPopupContainer();
      const { left: offsetLeft, top: offsetTop } = getOffset(this.node, container);
      this.setState({
        left: offsetLeft,
        top: offsetTop + height + 4,
        width,
      });
    }
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
    const wrapperContainer = classNames(`${prefix}-wrapper`, className);
    const dropSelect = classNames(`${prefix}-select`);

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
      onBlur: handleBlur,
      disabled,
      autoFocus,
    };

    const Tag = multiInput ? TextArea : showSearch ? Search : Input;
    return (
      <div
        className={wrapperContainer}
        style={style}
        ref={this.getNode}
        onClick={this.handleClick}
      >
        {multiInput ? (
          <Tag
            ref={forwardedRef as any}
            {...params as any}
            style={{
              height: style && style.height ? style.height : rows * 32,
            }}
          />
        )
          : <Tag ref={forwardedRef as any} {...params as any} />}

        {showAutoDrop && optionChildren && optionChildren.length > 0 && (
        <Portal {...({ getPopupContainer })}>
          <div
            className={dropSelect}
            ref={this.popRef}
            style={{
              ...dropdownMenuStyle,
              top,
              left,
              width,
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
