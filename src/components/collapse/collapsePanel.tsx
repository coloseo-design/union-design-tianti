/* eslint-disable camelcase */
import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import Icon from '@union-design/icon';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider/context';

// export interface CollapsePanelProps {
//     key?: number;
//     header?:React.ReactNode;
//     className?: string;
//     prefixCls?: string;
//     style?: CSSProperties;
//     showArrow?:boolean;
//     collapsible?:boolean
// }

export interface CollapsePanelProps {
    activeKey?:number;
    k?:number;
    defaultActiveKey?:number;
    onChange?:(value:number| undefined, show:boolean) => void;
    className?: string;
    prefixCls?: string;
    style?: CSSProperties;
    header?:React.ReactNode;
    collapsible?: boolean;
    showArrow?: boolean;
}

export interface CollapsePanelState {
    show?:boolean;
    style?:CSSProperties;
    height?:number;
}

class CollapsePanel extends React.Component<CollapsePanelProps, CollapsePanelState> {
    private contentRef = React.createRef<HTMLDivElement>();

    constructor(props:CollapsePanelProps) {
      super(props);
      this.state = {
        show: false,
        style: {},
      };
    }

    componentDidMount() {
      this.getRef();
      this.update();
    }

    UNSAFE_componentWillReceiveProps() {
      this.update();
    }

    update = () => {
      const {
        defaultActiveKey, activeKey, k, collapsible,
      } = this.props;
      if (!collapsible && (defaultActiveKey === k || activeKey === k)) {
        this.setState({ show: true });
      }
    }

    headClick = () => {
      const { show } = this.state;
      const { onChange, collapsible, k } = this.props;
      if (collapsible) return;
      this.setState({
        show: !show,
        style: !show ? { transform: 'rotate(90deg)' } : {},
      });
      if (onChange) {
        onChange(k, !show);
      }
    };

    getRef = () => {
      const { current } = this.contentRef;
      if (current) {
        this.setState({ height: current.scrollHeight });
      }
    };

    renderCollapsePanel = ({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        prefixCls,
        header,
        className,
        children,
        style: styles,
        showArrow = true,
        collapsible = false,
      } = this.props;
      const { show, style, height } = this.state;
      const prefix = getPrefixCls('collapse-item', prefixCls);
      const clazzName = classNames(prefix, {
        [`${prefix}-collapsible`]: collapsible,
      }, className);
      const headerClass = classNames(`${prefix}-header`, {
        [`${prefix}-collapsible`]: collapsible,
      });
      const contentClass = classNames(`${prefix}-content`, {
        [`${prefix}-content-active`]: show,
        [`${prefix}-content-visibility`]: !show,
      });
      return (
        <div className={clazzName} style={{ ...styles }}>
          <div className={headerClass} onClick={this.headClick}>
            {
                        showArrow ? <Icon type="right" style={{ ...style }} /> : null
                    }
            <div style={{ paddingLeft: showArrow ? 8 : 0, display: 'inline-block' }}>{header}</div>
          </div>
          <div className={contentClass} ref={this.contentRef} style={{ height: show ? height : 0 }}>
            <div className={`${prefix}-content-box`}>
              { children }
            </div>
          </div>
        </div>
      );
    };

    render() {
      return (
        <ConfigConsumer>
          {this.renderCollapsePanel}
        </ConfigConsumer>
      );
    }
}

export default CollapsePanel;
