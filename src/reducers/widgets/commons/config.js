import update from 'immutability-helper'

export const addWidget = (state, payload, type, defaultConfig) => {
  if (type !== payload.type) { return state }
  defaultConfig = update(defaultConfig, {
    id: { $set: payload.id }
  })
  return update(state, {
    [payload.id]: { $set: defaultConfig }
  })
}

export const removeWidget = (state, payload, type) => {
  if (type !== payload.type) { return state }
  return update(state, {
    $unset: [payload.id]
  })
}

export const updateWidgetConfig = (state, { widget, key, value }, type) => {
  if (type !== widget.type) { return state }

  /*
   * We are splitting the key by separator, because we can receive nested keys
   * such as 'target.provider' in that case we are updating the value of
   * state[id][target]
   */
  const keys = key.split('.')
  const id = widget.id

  /*
   * Compose a nested update() object.
   * { [id]: { [keys[0]]: ... { [keys[n]]: { $set: value } } } }
   */
  const toUpdate = {[id]: {}}
  keys.reduce((accu, item, index, arr) => {
    if (index === arr.length - 1) {
      return accu[item] = {$set: value}
    }
    return accu[item] = {}
  }, toUpdate[id])


  return update(state, toUpdate)
}
