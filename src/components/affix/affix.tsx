/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import React from 'react';
import omitProps from 'omit.js';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider/context';

export interface AffixProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  prefixCls?: string;
  target?: () => HTMLElement | null;
  offsetBottom?: number;
  offsetTop?: number;
  onChange?: (affixed: boolean) => void;
}

export interface AffixState {
  fixStyle: React.CSSProperties | undefined;
  containterStyle: React.CSSProperties | undefined;
}

export type BindElement = HTMLElement | Window | null | undefined;
export type Rect = ClientRect | DOMRect;

const getTargetRect = (target: BindElement): ClientRect => (target !== window
  ? (target as HTMLElement).getBoundingClientRect()
  : ({ top: 0, bottom: window.innerHeight } as ClientRect));

const getFixedTop = (
  placeholderReact: Rect,
  targetRect: Rect,
  offsetTop: number | undefined,
) => {
  if (offsetTop !== undefined && targetRect.top > placeholderReact.top - offsetTop) {
    return offsetTop + targetRect.top;
  }
  return undefined;
};

const getDefaultTarget = () => (typeof window !== 'undefined' ? window : null);

const getFixedBottom = (
  placeholderReact: Rect,
  targetRect: Rect,
  offsetBottom: number | undefined,
) => {
  if (offsetBottom !== undefined && targetRect.bottom < placeholderReact.bottom + offsetBottom) {
    const targetBottomOffset = window.innerHeight - targetRect.bottom;
    return offsetBottom + targetBottomOffset;
  }
  return undefined;
};

class Affix extends React.Component<AffixProps, AffixState> {
  node: HTMLSpanElement | undefined;

  containterNode: HTMLSpanElement | undefined;

  constructor(props: AffixProps) {
    super(props);
    this.state = {
      fixStyle: undefined,
      containterStyle: undefined,
    };
  }

  componentDidMount() {
    const { target = (() => window) } = this.props;
    if (target) {
      const targetProp = target();
      targetProp && targetProp.addEventListener('scroll', this.getScroll);
      window.addEventListener('scroll', this.getScroll);
    }
  }

  componentDidUpdate(preProps: AffixProps) {
    const { target } = this.props;
    if (preProps.target !== target) {
      const targetProp = target ? target() : null;
      targetProp && targetProp.addEventListener('scroll', this.getScroll);
    }
  }

  componentWillUnmount() {
    const { target = (() => window) } = this.props;
    if (target) {
      const targetProp = target();
      targetProp && targetProp.removeEventListener('scroll', this.getScroll);
      window.removeEventListener('scroll', this.getScroll);
    }
  }

  getNode = (node: HTMLDivElement) => {
    this.node = node;
  };

  getContainterNode = (node: HTMLDivElement) => {
    this.containterNode = node;
  }

   getTargetFunc = () => {
     const { target } = this.props;
     if (target !== undefined) {
       return target;
     }

     return getDefaultTarget;
   }

  getScroll = () => {
    const {
      offsetTop, offsetBottom, onChange,
    } = this.props;
    const targetNode = this.getTargetFunc();
    if (targetNode && this.containterNode) {
      const targetRect = getTargetRect(targetNode());
      const placeholderReact = getTargetRect(this.containterNode);
      const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
      const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);
      if (fixedTop !== undefined) {
        this.setState({
          fixStyle: {
            position: 'fixed',
            top: fixedTop,
            width: placeholderReact.width,
            height: placeholderReact.height,
            zIndex: 10,
          },
        });
        this.setState({
          containterStyle: {
            width: placeholderReact.width,
            height: placeholderReact.height,
          },
        });
      } else if (fixedBottom !== undefined) {
        this.setState({
          fixStyle: {
            position: 'fixed',
            zIndex: 10,
            bottom: fixedBottom,
            width: placeholderReact.width,
            height: placeholderReact.height,
          },
        });
        this.setState({
          containterStyle: {
            width: placeholderReact.width,
            height: placeholderReact.height,
          },
        });
      } else {
        this.setState({ fixStyle: undefined, containterStyle: undefined });
      }
      if (fixedTop !== undefined || fixedBottom !== undefined) {
        onChange && onChange(true);
      } else {
        onChange && onChange(false);
      }
    }
  };

  renderAffix = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls,
      children,
      ...rest
    } = this.props;
    const restProps = omitProps(rest, ['offsetTop', 'offsetBottom', 'target', 'onChange']) as Omit<AffixProps, 'offsetTop'| 'offsetBottom'| 'target'| 'onChange'>;
    const { fixStyle, containterStyle } = this.state;
    const prefix = getPrefixCls('affix', prefixCls);
    return (
      <div {...restProps} ref={this.getContainterNode}>
        {fixStyle && <div style={containterStyle} aria-hidden="true" />}
        <div
          className={prefix}
          style={fixStyle}
          ref={this.getNode}
        >
          {children}
        </div>
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderAffix}
      </ConfigConsumer>
    );
  }
}

export default Affix;
