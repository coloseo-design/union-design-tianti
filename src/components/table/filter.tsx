import React from 'react';
import {
  Checkbox,
  Button,
} from '..';

export interface FilterProps {
  dataSource: {text: React.ReactNode; value: string}[];
  onChange?: (values: string[]) => void;
  values: string[];
  prefix?: string;
}

interface FilterState {
  values: string[];
}

export default class Filter extends React.Component<FilterProps, FilterState> {
  constructor(props: FilterProps) {
    super(props);
    this.state = {
      values: props.values || [],
    };
  }

  componentDidUpdate(props: FilterProps) {
    const { values } = this.props;
    if (values !== props.values) {
      this.setState({ values });
    }
  }

  onChange = (values: string[]) => {
    this.setState({ values });
  }

  onSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const { onChange } = this.props;
    const { values } = this.state;
    onChange && onChange(values);
  }

  onReset = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const { onChange } = this.props;
    onChange && onChange([]);
  }

  render() {
    const { dataSource, prefix = '' } = this.props;
    const { values } = this.state;
    return (
      <div
        className={`${prefix}-filter`}
      >
        <div
          className={`${prefix}-filter-body`}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
          }}
        >
          <Checkbox.Group
            style={{ padding: 5 }}
            onChange={this.onChange}
            value={values}
          >
            {
              dataSource.map((item) => (
                <div className={`${prefix}-filter-item`} key={item.value}>
                  <Checkbox value={item.value}>{item.text}</Checkbox>
                </div>
              ))
            }
          </Checkbox.Group>
        </div>
        <div className={`${prefix}-filter-footer`}>
          <Button size="small" type="default" onClick={this.onReset}>重置</Button>
          <Button size="small" type="primary" onClick={this.onSubmit}>确认</Button>
        </div>
      </div>
    );
  }
}
