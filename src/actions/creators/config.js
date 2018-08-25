import {
  UPDATE_WIDGET_CONFIG,

  ADD_WIDGET_ACTION,
  REMOVE_WIDGET_ACTION,
  UPDATE_WIDGET_ACTION
} from '@actions/types'

import uuid from 'uuid/v4'

export const updateConfig = (widget, key, value) => ({
  type: UPDATE_WIDGET_CONFIG,
  payload: { widget, key, value }
})

export const widgetActionAdd = (widget) => {
  const id = uuid()
  return {
    type: ADD_WIDGET_ACTION,
    payload: { id, widget }
  }
}

export const widgetActionRemove = (widget, id) => ({
  type: REMOVE_WIDGET_ACTION,
  payload: { id, widget }
})

export const widgetActionUpdate = (widget, id, key, value) => ({
  type: UPDATE_WIDGET_ACTION,
  payload: { id, widget, key, value }
})
