import update from 'immutability-helper'

export const renameWidget = (state, payload, type) => {
  if (type !== payload.widget.type) { return state }
  return update(state, {
    [payload.widget.id]: {
      name: { $set: payload.name }
    }
  })
}
