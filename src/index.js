import React from 'react';
import ReactDOM from 'react-dom/client';

import '../src/index.css'

import Loginform from './components/loginform/loginforms.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Loginform />
  </React.StrictMode>
);
