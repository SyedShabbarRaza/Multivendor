import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './redux/store.js';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);