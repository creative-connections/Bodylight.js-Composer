import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'
import localForage from 'localforage'
import reducers from './reducers'

let store
let persistor
let callbacks = []

const createMiddleware = () => {
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
  const persistConfig = {
    key: 'root',
    storage: localForage,
    throttle: '2048', // ms
  }
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

const getStore = (storeReplaceCallback = null) => {
  if (storeReplaceCallback) {
    callbacks.push(storeReplaceCallback)
  }

  if (!store) {
    createNewStore()
  }

  return { store, persistor }
}

export default getStore

export const observeStore = (select = null, onChange, ignoreFirst = false) => {
  const { store } = getStore()
  let currentState = null

  if (ignoreFirst === true) {
    currentState = select ? select(store.getState()) : store.getState()
  }

  const handleChange = () => {
    const { store } = getStore()
    const nextState = select ? select(store.getState()) : store.getState()
    // console.log('observeStore', select, 'changed', nextState !== currentState, nextState)
    if (nextState !== currentState) {
      currentState = nextState
      onChange(currentState, store.getState())
    }
  }

  const unsubscribe = store.subscribe(handleChange)
  handleChange()
  return unsubscribe
}