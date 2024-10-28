import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  /**
   * Strict Mode does a couple of things that help with development but doesn't run in production.
   * It executes the component function twice to find any issues related to function impurity.
   *
   * Also, this can be wrapped around any component but typically is done at the root app level.
   */
  <StrictMode>
    <App />
  </StrictMode>
);
