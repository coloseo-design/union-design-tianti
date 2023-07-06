// import 'react-app-polyfill/ie9';
import 'core-js/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import Startup from './site/startup';
import './components/index.less';

ReactDOM.render(<Startup />, document.querySelector('#root'));
