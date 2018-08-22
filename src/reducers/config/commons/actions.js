import update from 'immutability-helper'

export const widgetActionAdd = (state, {widget, id}) => {
  const empty = {
    id: id,
    event: null,
    action: null,
    args: []
  }

  return update(state, {
    [widget.name]: {
      actions: {
        [id]: { $set: empty }
      }
    }
  })
}

export const widgetActionRemove = (state, {widget, id}) => {
  return update(state, {
    [widget.name]: {
      actions: {
        $unset: [id]
      }
    }
  })
}

export const widgetActionUpdate = (state, {widget, id, key, value}) => {
  if (key === 'args') {
    return update(state, {
      [widget.name]: {
        actions: {
          [id]: {
            args: {
              [value.id]: { $set: value.value }
            }
          }
        }
      }
    })
  }

  return update(state, {
    [widget.name]: {
      actions: {
        [id]: {
          [key]: { $set: value }
        }
      }
    }
  })
}
