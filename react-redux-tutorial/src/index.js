import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import rootReducer from './modules';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { legacy_createStore } from 'redux';

const store = legacy_createStore(rootReducer, devToolsEnhancer());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

