import {
  ADD_WIDGET,
  RENAME_WIDGET,
  REMOVE_WIDGET,
  UPDATE_WIDGET_CONFIG,
  ADD_WIDGET_ACTION,
  REMOVE_WIDGET_ACTION,
  UPDATE_WIDGET_ACTION,
  ADD_WIDGET_OPTION,
  REMOVE_WIDGET_OPTION,
  LOAD_STORE
} from '@actions/types'
import { REHYDRATE } from 'redux-persist'

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

import plotlyAddOption from './config/plotly/line/addOption'
import plotlyRemoveOption from './config/plotly/line/removeOption'

const addOption = (state, { id, widget, option }, type) => {
  if (type !== widget.type) { return state }
  widget = state[widget.id]
  switch (widget.library) {
  case 'plotly':
    return update(state, {
      [widget.id]: { $set: plotlyAddOption(widget, id, option) }
    })
  case 'gamblegram':
    console.warn('ADD_WIDGET_OPTION for gamblegram not implemented yet')
  }
  return state
}

const removeOption = (state, { id, widget, option }, type) => {
  if (type !== widget.type) { return state }
  widget = state[widget.id]
  switch (widget.library) {
  case 'plotly':
    return update(state, {
      [widget.id]: { $set: plotlyRemoveOption(widget, id, option) }
    })
  case 'gamblegram':
    console.warn('REMOVE_WIDGET_OPTION for gamblegram not implemented yet')
  }
  return state
}

const rehydrate = (oldstate, newstate) => {
  /*
   * This is an instead-of-migration fast-forward approach to data model updates. When features
   * are added to the data model, this ensures that project files from previous version of the
   * composer are brought up to date with current default configuration.
   *
   * Missing keys are added and initialized to their default values.
   */
  const charts = {}
  Object.entries(newstate.config.charts).forEach(([id, chart]) => {
    switch (chart.library) {
    case 'plotly':
      chart = line(chart, false)
      break
    case 'gamblegram':
      console.warn('REHYDRATE for gamblegram not implemented yet')
    }
    charts[id] = chart
  })


  return charts
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
  case ADD_WIDGET_OPTION:
    return addOption(state, action.payload, type)
  case REMOVE_WIDGET_OPTION:
    return removeOption(state, action.payload, type)
  case ADD_WIDGET_ACTION:
    return addWidgetAction(state, action.payload, type)
  case REMOVE_WIDGET_ACTION:
    return removeWidgetAction(state, action.payload, type)
  case UPDATE_WIDGET_ACTION:
    return updateWidgetAction(state, action.payload, type)
  case REHYDRATE:
  case LOAD_STORE:
    if (action != null && action.payload != null) {
      return rehydrate(state, action.payload)
    }
  }
  return state
}

export const getAll = state => state
export const get = (state, id) => state[id]