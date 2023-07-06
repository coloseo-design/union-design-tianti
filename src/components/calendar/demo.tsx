import React from 'react';
// import './styles/index';
import { Calendar } from '../index';

const CalendarDemo = () => (
  <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'flex-start' }}>
    <h1>Base</h1>
    <Calendar
      mode="month"
      onSelect={(date) => console.log('onSelect:', date.format())}
      onChange={(date) => console.log('onChange:', date.format())}
      onPanelChange={(date, mode) => console.log('onPanelChange:', date.format(), mode)}
    />
    <h1>monthCellRender</h1>
    <Calendar
      mode="year"
      monthCellRender={(date) => <div>{date.format('YYYY-MM-DD')}</div>}
      onSelect={(date) => console.log('onSelect:', date.format())}
      onChange={(date) => console.log('onChange:', date.format())}
      onPanelChange={(date, mode) => console.log('onPanelChange:', date.format(), mode)}
    />
    <h1>monthFullCellRender</h1>
    <Calendar
      mode="year"
      monthFullCellRender={(date) => <div>{date.format('YYYY-MM-DD')}</div>}
      onSelect={(date) => console.log('onSelect:', date.format())}
      onChange={(date) => console.log('onChange:', date.format())}
      onPanelChange={(date, mode) => console.log('onPanelChange:', date.format(), mode)}
    />
    <h1>dateCellRender</h1>
    <Calendar
      mode="year"
      dateCellRender={() => (
        <div style={{
          position: 'absolute',
          top: -1,
          right: 9,
          width: 4,
          height: 4,
          backgroundColor: '#B30000',
          borderRadius: '50%',
        }}
        />
      )}
      onSelect={(date) => console.log('onSelect:', date.format())}
      onChange={(date) => console.log('onChange:', date.format())}
      onPanelChange={(date, mode) => console.log('onPanelChange:', date.format(), mode)}
    />
    <h1>dateFullCellRender</h1>
    <Calendar
      mode="year"
      dateFullCellRender={(date) => <span>{date.format('@DD')}</span>}
      onSelect={(date) => console.log('onSelect:', date.format())}
      onChange={(date) => console.log('onChange:', date.format())}
      onPanelChange={(date, mode) => console.log('onPanelChange:', date.format(), mode)}
    />
  </div>
);

export default CalendarDemo;
