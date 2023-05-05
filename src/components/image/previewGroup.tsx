/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '@union-design/config-provider';

export interface PreviewGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
}

export const context = React.createContext({
  isPreviewGroup: false,
  previewUrls: [] as any[],
});

const { Provider } = context;

class PreviewGroup extends Component<PreviewGroupProps> {
  renderPreviewGroup = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls, children, className, ...rest
    } = this.props;

    const prefix = getPrefixCls('image-preview-group', prefixCls);
    const mainClass = classNames(prefix, className, {
      // [`${prefix}-error`]: error,
    });

    const previewUrls: any[] = React.Children.toArray(children).map((child: any) => child?.props?.src);
    const toArrayChildren = React.Children.toArray(children);
    let _children = children;
    if (toArrayChildren.length) {
      _children = React.Children.map(children,
        (child: any, index) => React.cloneElement(child, { current: index }));
    }

    return (
      <Provider value={{ isPreviewGroup: true, previewUrls }}>
        <div {...rest} className={mainClass}>
          {_children}
        </div>
      </Provider>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {this.renderPreviewGroup}
      </ConfigConsumer>
    );
  }
}

export default PreviewGroup;
