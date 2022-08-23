import React from 'react';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';

import ru from './locales/ru.js';
import App from './components/App.jsx';
import store from './store/index.js';

export default async () => {
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
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  const vdom = (
            <I18nextProvider i18n={i18n}>
               <Provider store={store}>
                <App />
               </Provider>
            </I18nextProvider>
  );
  return vdom;
};
