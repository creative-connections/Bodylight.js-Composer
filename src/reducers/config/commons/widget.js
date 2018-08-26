import update from 'immutability-helper'
import WidgetType from '@helpers/enum/WidgetType'

export const addWidget = (state, payload, type, defaultConfig) => {
  if (type !== payload.type) { return state }
  defaultConfig = update(defaultConfig, {
    id: {$set: payload.id}
  })
  return update(state, { [payload.id]: {$set: defaultConfig} })
}

export const renameWidget = (state, payload, type) => {
  if (type !== payload.widget.type) { return state }
  return update(state, {
    [payload.widget.id]: {
      name: {$set: payload.name}
    }
  })
}

const updateKeyValue = (state, id, key, value) => {
  return update(state, {
    [id]: {[key]: {$set: value}}
  })
}

const updateKeyKeyValue = (state, id, key1, key2, value) => {
  return update(state, {
    [id]: {[key1]: {[key2]: {$set: value}}}
  })
}

export const updateWidget = (state, { widget, key, value }, type) => {
  if (type !== widget.type) { return state }

  /*
   * We are splitting the key by separator, because we can receive nested keys
   * such as 'target.provider' in that case we are updating the value of
   * state[id][target]
   */
  const keys = key.split('.')

  if (keys.length === 1) {
    return updateKeyValue(state, widget.id, keys[0], value)
  }

  if (keys.length === 2) {
    state = updateKeyKeyValue(state, widget.id, keys[0], keys[1], value)
    /*
     * If we get a 'complex' key, we know we are setting a ComplexAttribute.
     * We also need to clean up key[0][provider] and key[0][function]
     */
    if (keys[1] === 'complex' && value === false) {
      state = updateKeyKeyValue(state, widget.id, keys[0], 'provider', null)
      state = updateKeyKeyValue(state, widget.id, keys[0], 'function', null)
    }
    return state
  }

  return state
}