import update from 'immutability-helper'

export const addWidgetAction = (state, {widget, id}, type) => {
  if (widget.type !== type) { return state }

  // default unconfigured action state
  const action = { id: id, event: null, action: null, args: [] }
  return update(state, {
    [widget.id]: { actions: {
      [id]: { $set: action }
    }}
  })
}

export const removeWidgetAction = (state, {widget, id}, type) => {
  if (widget.type !== type) { return state }
  return update(state, {
    [widget.id]: { actions: {
      $unset: [id]
    }}
  })
}

const updateWidgetActionArgument = (state, widget, id, value) => {
  return update(state, {
    [widget.id]: { actions: {
      [id]: { args: { [value.id]: { $set: value.value } } }
    }}
  })
}

export const updateWidgetAction = (state, {widget, id, key, value}, type) => {
  if (widget.type !== type) { return state }

  // updating function arguments
  if (key === 'args') {
    return updateWidgetActionArgument(state, widget, id, value)
  }

  return update(state, {
    [widget.id]: { actions: {
      [id]: { [key]: { $set: value } }
    }}
  })
}
