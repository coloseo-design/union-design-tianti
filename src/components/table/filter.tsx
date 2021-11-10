import React from 'react';
import {
  Checkbox,
  Button,
  Radio,
} from '..';
import { CheckboxGroupProps } from '../checkbox';

export interface FilterProps {
  dataSource: {text: React.ReactNode; value: string}[];
  onChange?: (values: string | string[]) => void;
  values: string[];
  prefix?: string;
  filterMultiple: boolean,
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

  onChange = (values: string[] | React.ChangeEventHandler<HTMLInputElement>) => {
    const { filterMultiple } = this.props;
    if (filterMultiple) {
      this.setState({ values: values as string[] });
    } else {
      const { target: { value } } = (values as React.ChangeEventHandler<HTMLInputElement>);
      this.setState({
        values: [value],
      });
    }
  }

  onSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const { onChange } = this.props;
    const { values } = this.state;
    onChange && onChange(values);
  }

  onReset = () => {
    const { onChange } = this.props;
    onChange && onChange([]);
  }

  render() {
    const { dataSource, prefix = '', filterMultiple = true } = this.props;
    const { values } = this.state;
    const Group = filterMultiple ? Checkbox.Group : Radio.Group;
    const Selector = filterMultiple ? Checkbox : Radio;
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
          <Group
            style={{ padding: 5 }}
            onChange={this.onChange}
            value={filterMultiple ? values : values[0]}
          >
            {
              dataSource.map((item) => (
                <div className={`${prefix}-filter-item`} key={item.value}>
                  <Selector value={item.value}>{item.text}</Selector>
                </div>
              ))
            }
          </Group>
        </div>
        <div className={`${prefix}-filter-footer`}>
          <Button size="small" type="default" onClick={this.onReset}>重置</Button>
          <Button size="small" type="primary" onClick={this.onSubmit}>确认</Button>
        </div>
      </div>
    );
  }
}
