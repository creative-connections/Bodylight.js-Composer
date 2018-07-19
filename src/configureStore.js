import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ReduxPromise from 'redux-promise'

import reducers from './reducers'

const persistConfig = {
  key: 'root',
  storage
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
