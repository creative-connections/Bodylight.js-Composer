import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET,
  UPDATE_WIDGET_CONFIG,
  ADD_WIDGET_ACTION,
  REMOVE_WIDGET_ACTION,
  UPDATE_WIDGET_ACTION
} from '@actions/types'

import WidgetType from '@helpers/enum/WidgetType'
import update from 'immutability-helper'

import {
  addWidgetAction,
  removeWidgetAction,
  updateWidgetAction
} from '../../commons/actions'

import {
  addWidget,
  renameWidget,
  removeWidget,
  updateWidget
} from '../../commons/widget'

import defaultConfig from './config/default'

import line from './config/plotly/line'
import gamblegram from './config/plotly/gamblegram'

const changeLibrary = (state, payload) => {
  const library = payload.value
  const id = payload.widget.id
  const config = state[id]

  switch (library) {
  case 'plotly':
    return update(state, {
      [id]: { $set: line(config, true) }
    })
  case 'gamblegram':
    return update(state, {
      [id]: { $set: gamblegram(config, true) }
    })
  }
  return state
}

const type = WidgetType.CHART

const updateChart = (state, payload, type) => {
  if (type !== payload.widget.type) { return state }

  if (payload.key === 'library') {
    return changeLibrary(state, payload)
  }
  return updateWidget(state, payload, type)
}

export default function (state = {}, action) {
  switch (action.type) {
  case ADD_WIDGET:
    return addWidget(state, action.payload, type, defaultConfig)
  case RENAME_WIDGET:
    return renameWidget(state, action.payload, type)
  case REMOVE_WIDGET:
    return removeWidget(state, action.payload, type)
  case UPDATE_WIDGET_CONFIG:
    return updateChart(state, action.payload, type)
  case ADD_WIDGET_ACTION:
    return addWidgetAction(state, action.payload, type)
  case REMOVE_WIDGET_ACTION:
    return removeWidgetAction(state, action.payload, type)
  case UPDATE_WIDGET_ACTION:
    return updateWidgetAction(state, action.payload, type)
  }
  return state
}

export const getAll = state => state
export const get = (state, id) => state[id]