import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css/sanitize.css';
import './index.scss';
import AppRouter from './router';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
