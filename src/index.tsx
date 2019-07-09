import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/App';
import store from './App/store';

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
