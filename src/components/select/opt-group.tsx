import React, { ReactNode, Component } from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider/context';

type OptGroupType = {
  label: string | ReactNode;
}

class OptGroup extends Component<OptGroupType> {
  renderOptGroup = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { children, label } = this.props;
    const prefix = getPrefixCls('select-opt-group');
    return (
      <div className={prefix}>
        <div className={`${prefix}-label`}>{label}</div>
        {children}
      </div>
    );
  }

  render() {
    return (
      <ConfigConsumer>
        {this.renderOptGroup}
      </ConfigConsumer>
    );
  }
}

export default OptGroup;
