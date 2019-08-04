import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Router } from 'react-router-dom';

import './config/ReactotronConfig';
import GlobalStyle from './styles/global';

/**
 * o store tem que vim depois de config/Reactotron
 * parar ter as funções do saga monitor e create Enhancer
 */

import { store, persistor } from './store';

import Routes from './routes';
import history from './services/history';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}
