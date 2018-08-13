import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

// Middlewares
import ReduxPromise from 'redux-promise'
import { createLogger } from 'redux-logger'

import localForage from 'localforage'

import reducers from './reducers'

const persistConfig = {
  key: 'root',
  storage: localForage
}

var store
var persistor

export default () => {
  const logger = createLogger({
    collapsed: true,
    duration: true
  })

  store = store || createStore(
    persistReducer(persistConfig, reducers),
    compose(
      applyMiddleware(logger)
    )
  )
  persistor = persistor || persistStore(store)

  return { store, persistor }
}
