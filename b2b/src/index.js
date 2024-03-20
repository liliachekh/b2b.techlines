import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { AuthAdminContextProvider } from './context/AuthAdminContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <Provider store={store}>
        <AuthContextProvider>
          <AuthAdminContextProvider>
            <App />
          </AuthAdminContextProvider>
        </AuthContextProvider>
      </Provider>
    </BrowserRouter>

  </React.StrictMode>
);