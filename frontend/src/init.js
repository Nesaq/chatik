/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import ru from './locales/ru.js';
import App from './components/App.jsx';
import store from './store/index.js';
import ApiProvider from './providers/ApiProvider.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import initSocket from './sockets.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_PROCESS_ENV_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

export default async (socket) => {
  const socketAPI = initSocket(socket);
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      resources: {
        ru,
      },
    });
  filter.clearList();
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));
  const vdom = (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <ApiProvider socket={socketAPI}>
            <I18nextProvider i18n={i18n}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </I18nextProvider>
          </ApiProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>

  );
  return vdom;
};
