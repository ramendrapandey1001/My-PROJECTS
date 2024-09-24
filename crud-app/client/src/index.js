import React from 'react';
import ReactDOM from 'react-dom/client';
import {Toaster} from "react-hot-toast";
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

document.body.classList.add('bg-primary');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Toaster/>
  </React.StrictMode>
);
