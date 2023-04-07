import React, { Component } from 'react';
import Input, { BaseInputProps, InputState } from './input';

class TextArea extends Component<BaseInputProps, InputState> {
  render(): React.ReactNode {
    return <Input {...this.props} type="textarea" />;
  }
}

export default TextArea;
