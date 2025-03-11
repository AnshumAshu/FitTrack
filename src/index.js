import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import store from './redux/store'; // Import Redux store
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Wrap App with Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
