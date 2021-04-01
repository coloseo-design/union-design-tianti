/* eslint-disable react/button-has-type */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import Switch from './index';

export default class demo extends React.Component {
  state = {
    update: false,
  };

  render() {
    const { update } = this.state;
    return (
      <>
        1:
        {' '}
        <Switch checked={update} disabled={!update} />
        2:
        {' '}
        <Switch checked={false} onChange={(a, b) => { console.log(a); console.log(b); }} />
        3:
        {' '}
        <Switch checked />
        4:
        {' '}
        <Switch checked disabled />
        5:
        {' '}
        <Switch defaultChecked disabled />
        6:
        {' '}
        <Switch />
        7:
        {' '}
        <Switch type="icon" />
        8:
        {' '}
        <Switch type="text" />
        8:
        {' '}
        <Switch type="default" />
        <button onClick={() => {
          this.setState({ update: !update });
        }}
        >
          测试
        </button>
      </>
    );
  }
}
