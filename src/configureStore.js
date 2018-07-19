import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import ReduxPromise from 'redux-promise'
import localForage from 'localforage'

import reducers from './reducers'

const persistConfig = {
  key: 'root',
  storage: localForage
}

export default () => {
  let store = createStore(
    persistReducer(persistConfig, reducers),
    compose(
      applyMiddleware(ReduxPromise)
    )
  )
  let persistor = persistStore(store)

  return { store, persistor }
}
