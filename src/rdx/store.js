import persistPlugin from '@rematch/persist';
import { init } from '@rematch/core';
import storage from 'redux-persist/lib/storage';

import * as models from './models';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['apikey'],
  version: '1',
};

const store = init({
  plugins: [persistPlugin(persistConfig, onLoad)],
  models,
});

function onLoad() {
  if (store.getState()?.apikey?.key) {
    store.dispatch.apikey.validateAndSetKey();
  }
}

export default store;
