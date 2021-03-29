import React from 'react';

interface ExpandIconState {
  expanded: boolean;
}

interface ExpandIconProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default class ExpandIcon extends React.Component<ExpandIconProps, ExpandIconState> {
  constructor(props: ExpandIconProps) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  onClick = () => {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

  render() {
    const { expanded } = this.state;
    return (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        {...this.props}
        role="button"
        onClick={this.onClick}
      >
        { expanded ? '+' : '-'}
      </div>
    );
  }
}
