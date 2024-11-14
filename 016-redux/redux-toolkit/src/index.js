import React from 'react';
import ReactDOM from 'react-dom/client';

// Note the import is from react-redux which is integration of redux for react
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
