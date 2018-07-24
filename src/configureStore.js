import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import ReduxPromise from 'redux-promise'
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
      applyMiddleware(ReduxPromise)
    )
  )
  persistor = persistor || persistStore(store)

  return { store, persistor }
}
