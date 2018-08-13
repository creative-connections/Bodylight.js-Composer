import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

// Middlewares
import ReduxPromise from 'redux-promise'
import logger from 'redux-logger'

import localForage from 'localforage'

import reducers from './reducers'

const persistConfig = {
  key: 'root',
  storage: localForage
}

var store
var persistor

export default () => {
  store = store || createStore(
    persistReducer(persistConfig, reducers),
    compose(
      applyMiddleware(logger)
    )
  )
  persistor = persistor || persistStore(store)

  return { store, persistor }
}
