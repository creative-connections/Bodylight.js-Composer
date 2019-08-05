import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'
import localForage from 'localforage'
import reducers from './reducers'
import { loadStore as loadStoreAction } from '@actions'
import migrations from './migrations'

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

const migrateState = state => {
  if (state == null) {
    return Promise.resolve(state)
  }

  // returns migrations to be performed for the current store version
  const getMigrationsToRun = (migrations, state) => {
    const torun = []
    const currentVersion = Date.parse(state.version)
    migrations.forEach(record => {
      if (isNaN(currentVersion) || currentVersion < record.version) {
        torun.push(record)
      }
    })
    return torun
  }

  return new Promise(resolve => {
    const torun = getMigrationsToRun(migrations, state)
    torun.forEach(record => {
      console.log(`Running migration ${record.version}`)
      state = record.migration(state)
    })
    resolve(state)
  })
}

const createNewStore = (initialState = undefined) => {
  const persistConfig = {
    key: 'root',
    storage: localForage,
    throttle: '512', // ms
    migrate: migrateState,
  }
  store = createStore(
    persistReducer(persistConfig, reducers),
    initialState,
    createMiddleware()
  )
  persistor = persistStore(store)
  store.dispatch(loadStoreAction(store.getState()))
}

const purgePersistor = () => {
  return new Promise((resolve) => {
    if (!persistor) {
      return resolve()
    }
    persistor.purge().then(resolve)
  })
}

const loadState = state => {
  return purgePersistor().then(() => {
    createNewStore(state)
    callbacks.forEach(callback => { callback() })
  })
}

/**
 * Loads store from file.
 * @param  json JSON encoded file (.bjp)
 */
export const loadStore = json => {
  return Promise.resolve(json)
    .then(JSON.parse)
    .then(migrateState)
    .then(loadState)
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

const invalidationGroups = {}

export const observeStore = (select = null, onChange, ignoreFirst = false, group = null) => {
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

  if (group != null) {
    if (invalidationGroups[group] == null) {
      invalidationGroups[group] = []
    }
    invalidationGroups[group].push(unsubscribe)
  }

  return unsubscribe
}

export const storeInvalidateGroup = group => {
  if (group != null && invalidationGroups[group] != null) {
    invalidationGroups[group].forEach(unsubscribe => {
      unsubscribe()
    })
    invalidationGroups[group] = []
  }
}
