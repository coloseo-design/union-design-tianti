/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/display-name */
import React, { Component } from 'react';

import DatePicker from './index';
import { PickerSize } from './types';

export default class extends Component {
  state = {
    size: 'middle' as PickerSize,
  }

  render = () => {
    const commonProps = {
      size: this.state.size,
      onChange: (...p: unknown[]) => console.log(p),
    };

    return (
      <div style={{ padding: '15px 30px' }}>
        <div style={{ margin: '15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>选择器大小</h1>
          <button onClick={() => this.changeSize('small')}>small</button>
          <button onClick={() => this.changeSize('middle')}>middle</button>
          <button onClick={() => this.changeSize('large')}>large</button>
        </div>
        <h1 style={{ textAlign: 'center' }}>type="single":时间选择器</h1>
        <div style={{ margin: '15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>mode='time-full'</h1>
          <DatePicker mode="time-full" {...commonProps} />
        </div>
        <div style={{ margin: '15px 0 15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>mode='time-ymd'</h1>
          <DatePicker mode="time-ymd" {...commonProps} />
        </div>
        <div style={{ margin: '15px 0 15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>mode='time-hms'</h1>
          <DatePicker mode="time-hms" {...commonProps} />
        </div>
        <div style={{ margin: '15px 0 15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>mode='year'</h1>
          <DatePicker mode="year" {...commonProps} />
        </div>
        <div style={{ margin: '15px 0 15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>mode='month'</h1>
          <DatePicker mode="month" {...commonProps} />
        </div>
        <div>
          {/* <DatePicker mode='week' disabled {...commonProps} /> */}
        </div>
        <div style={{ margin: '15px 0 15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>mode='date'</h1>
          <DatePicker mode="date" {...commonProps} />
        </div>
        <div style={{ margin: '15px 0 15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>mode='date-time'</h1>
          <DatePicker mode="date-time" {...commonProps} />
        </div>
        <div>
          {/* <DatePicker mode='quarter' disabled {...commonProps} /> */}
        </div>
        <h1 style={{ textAlign: 'center' }}>type="range":时间范围选择器</h1>
        <div style={{ margin: '15px 0 15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>mode='time-full-range'</h1>
          <DatePicker mode="time-full" type="range" {...commonProps} />
        </div>
        <div style={{ margin: '15px 0 15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>mode='time-ymd'</h1>
          <DatePicker mode="time-ymd" type="range" {...commonProps} />
        </div>
        <div style={{ margin: '15px 0 15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>mode='time-hms'</h1>
          <DatePicker mode="time-hms" type="range" {...commonProps} />
        </div>
        <div style={{ margin: '15px 0 15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>mode='year'</h1>
          <DatePicker mode="year" type="range" {...commonProps} />
        </div>
        <div style={{ margin: '15px 0 15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>mode='month'</h1>
          <DatePicker mode="month" type="range" {...commonProps} />
        </div>
        <div>
          {/* <DatePicker mode='week-range' disabled {...commonProps} /> */}
          {/* <DatePicker mode='quarter-range' disabled {...commonProps} /> */}
        </div>
        <div style={{ margin: '15px 0 15px 0' }}>
          <h1 style={{ display: 'inline-block', marginRight: 15 }}>mode='date'</h1>
          <DatePicker mode="date" type="range" {...commonProps} />
        </div>
        {/* <div style={{ margin: '15px 0 15px 0' }}>
          <h1 style={{ display: "inline-block", marginRight: 15 }}>mode='date-time'</h1>
          <DatePicker mode='date-time' type="range" {...commonProps} />
        </div> */}
        <div style={{ height: 600 }} />
      </div>
    );
  };

  changeSize = (size: PickerSize) => this.setState({ size });
}
