import {
  UPDATE_WIDGET_CONFIG,

  CONFIG_ANIMATE_ANIM_UPDATE,
  CONFIG_ANIMATE_TEXT_UPDATE,
  CONFIG_ANIMATE_TEXT_REMOVE,
  CONFIG_RANGE_UPDATE,
  CONFIG_RANGE_REMOVE,
  CONFIG_BUTTON_UPDATE,
  CONFIG_BUTTON_REMOVE,
  WIDGET_ACTION_ADD,
  WIDGET_ACTION_REMOVE,
  WIDGET_ACTION_UPDATE
} from '@actions/types'

import uuid from 'uuid/v4'

export const updateConfig = (widget, key, value) => ({
  type: UPDATE_WIDGET_CONFIG,
  payload: { widget, key, value }
})

export const configAnimateAnimUpdate = (anim, key, value) => ({
  type: CONFIG_ANIMATE_ANIM_UPDATE,
  payload: { anim, key, value }
})

export const configAnimateTextUpdate = (text, key, value) => ({
  type: CONFIG_ANIMATE_TEXT_UPDATE,
  payload: { text, key, value }
})

export const configAnimateTextRemove = (name, parent) => ({
  type: CONFIG_ANIMATE_TEXT_REMOVE,
  payload: { name, parent }
})

export const configRangeUpdate = (range, key, value) => ({
  type: CONFIG_RANGE_UPDATE,
  payload: { range, key, value }
})

export const configRangeRemove = (range) => ({
  type: CONFIG_RANGE_REMOVE,
  payload: { range }
})

export const configButtonUpdate = (button, key, value) => ({
  type: CONFIG_BUTTON_UPDATE,
  payload: { button, key, value }
})

export const configButtonRemove = (button) => ({
  type: CONFIG_BUTTON_REMOVE,
  payload: { button }
})

export const widgetActionAdd = (widget) => {
  const id = uuid()
  return {
    type: WIDGET_ACTION_ADD,
    payload: { id, widget }
  }
}

export const widgetActionRemove = (widget, id) => ({
  type: WIDGET_ACTION_REMOVE,
  payload: { id, widget }
})

export const widgetActionUpdate = (widget, id, key, value) => ({
  type: WIDGET_ACTION_UPDATE,
  payload: { id, widget, key, value }
})
