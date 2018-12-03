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

export const renameWidget = (state, payload, type) => {
  if (type !== payload.widget.type) { return state }
  return update(state, {
    [payload.widget.id]: {
      name: { $set: payload.name }
    }
  })
}

const updateKeyValue = (state, id, key, value) => {
  return update(state, {
    [id]: {
      [key]: { $set: value }
    }
  })
}

const updateKeyKeyValue = (state, id, key1, key2, value) => {
  return update(state, {
    [id]: {
      [key1]: {
        [key2]: { $set: value }
      }
    }
  })
}

const updateKeyKeyKeyValue = (state, id, key1, key2, key3, value) => {
  return update(state, {
    [id]: {
      [key1]: {
        [key2]: {
          [key3]: { $set: value }
        }
      }
    }
  })
}

const updateKeyKeyKeyKeyValue = (state, id, key1, key2, key3, key4, value) => {
  return update(state, {
    [id]: {
      [key1]: {
        [key2]: {
          [key3]: {
            [key4]: { $set: value }
          }
        }
      }
    }
  })
}

const updateKeyKeyKeyKeyKeyValue = (state, id, key1, key2, key3, key4, key5, value) => {
  return update(state, {
    [id]: {
      [key1]: {
        [key2]: {
          [key3]: {
            [key4]: {
              [key5]: { $set: value }
            }
          }
        }
      }
    }
  })
}

const updateKeyKeyKeyKeyKeyKeyValue = (state, id, key1, key2, key3, key4, key5, key6, value) => {
  return update(state, {
    [id]: {
      [key1]: {
        [key2]: {
          [key3]: {
            [key4]: {
              [key5]: {
                [key6]: { $set: value }
              }
            }
          }
        }
      }
    }
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

  if (keys.length === 3) {
    state = updateKeyKeyKeyValue(state, widget.id, keys[0], keys[1], keys[2], value)
    if (keys[2] === 'complex' && value === false) {
      state = updateKeyKeyKeyValue(state, widget.id, keys[0], keys[1], 'provider', null)
      state = updateKeyKeyKeyValue(state, widget.id, keys[0], keys[1], 'function', null)
    }
    return state
  }

  if (keys.length === 4) {
    state = updateKeyKeyKeyKeyValue(state, widget.id, keys[0], keys[1], keys[2], keys[3], value)
    if (keys[3] === 'complex' && value === false) {
      state = updateKeyKeyKeyKeyValue(state, widget.id, keys[0], keys[1], keys[2], 'provider', null)
      state = updateKeyKeyKeyKeyValue(state, widget.id, keys[0], keys[1], keys[2], 'function', null)
    }
    return state
  }

  if (keys.length === 5) {
    state = updateKeyKeyKeyKeyKeyValue(state, widget.id, keys[0], keys[1], keys[2], keys[3], keys[4], value)
    if (keys[4] === 'complex' && value === false) {
      state = updateKeyKeyKeyKeyKeyValue(state, widget.id, keys[0], keys[1], keys[2], keys[3], 'provider', null)
      state = updateKeyKeyKeyKeyKeyValue(state, widget.id, keys[0], keys[1], keys[2], keys[3], 'function', null)
    }
    return state
  }

  if (keys.length === 6) {
    state = updateKeyKeyKeyKeyKeyKeyValue(state, widget.id, keys[0], keys[1], keys[2], keys[3], keys[4], keys[5], value)
    if (keys[5] === 'complex' && value === false) {
      state = updateKeyKeyKeyKeyKeyKeyValue(state, widget.id, keys[0], keys[1], keys[2], keys[3], keys[4], 'provider', null)
      state = updateKeyKeyKeyKeyKeyKeyValue(state, widget.id, keys[0], keys[1], keys[2], keys[3], keys[4], 'function', null)
    }
    return state
  }

  return state
}