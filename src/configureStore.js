import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

// Middlewares
import ReduxPromise from 'redux-promise'
import { createLogger } from 'redux-logger'

import localForage from 'localforage'

import reducers from './reducers'

let store
let persistor
let callbacks = []

const createMiddleware = () => {
  console.log('createMiddleware')
  let middleware = compose()

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({ collapsed: true, duration: true })
    middleware = compose(
      applyMiddleware(logger)
    )
  }

  return middleware
}

const createNewStore = (initialState = undefined) => {
  console.log('createStore')
  const persistConfig = { key: 'root', storage: localForage }
  store = createStore(
    persistReducer(persistConfig, reducers),
    initialState,
    createMiddleware()
  )
  persistor = persistStore(store)
}

const loadState = (state) => {
  createNewStore(state)
  callbacks.forEach(callback => {
    callback()
  })
}

export const loadStore = (json) => {
  return new Promise((resolve, reject) => {
    let state

    try {
      state = JSON.parse(json)
    } catch (err) {
      return reject(err)
    }

    if (!persistor) {
      return resolve(loadState(state))
    }
    persistor.purge().then(() => {
      return resolve(loadState(state))
    }).catch(() => {
      return resolve(loadState(state))
    })
  })
}

export default (storeReplaceCallback = null) => {
  if (storeReplaceCallback) {
    callbacks.push(storeReplaceCallback)
  }

  if (!store) {
    createNewStore()
  }

  return { store, persistor }
}
