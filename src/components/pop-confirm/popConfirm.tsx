import React from 'react';
import Pop, { PopProps} from './pop';


class PopConfim extends React.Component<PopProps> {
  render() {
    const { trigger } = this.props;
    return (
      <Pop
        {...this.props}
        componentType="pop-confirm"
        trigger={trigger ? trigger : 'click'}
      />
    );
  }
}

export default PopConfim;


