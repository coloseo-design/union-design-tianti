/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface PreviewGroupProps {
  prefixCls?: string;
}

export const context = React.createContext({
  isPreviewGroup: false,
  previewUrls: [],
});

const { Provider } = context;

class PreviewGroup extends Component<PreviewGroupProps> {
  renderPreviewGroup = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls, children } = this.props;

    const prefix = getPrefixCls('image-preview-group', prefixCls);
    const mainClass = classNames(prefix, {
      // [`${prefix}-error`]: error,
    });

    const previewUrls = React.Children.toArray(children).map((child) => child?.props?.src);
    const toArrayChildren = React.Children.toArray(children);
    let _children = children;
    if (toArrayChildren.length) {
      _children = React.Children.map(children,
        (child, index) => React.cloneElement(child, { current: index }));
    }

    return (
      <Provider value={{ isPreviewGroup: true, previewUrls }}>
        <div className={mainClass}>
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
