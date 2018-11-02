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
import {
  addWidgetAction,
  removeWidgetAction,
  updateWidgetAction
} from '../commons/actions'

import {
  addWidget,
  renameWidget,
  removeWidget,
  updateWidget
} from '../commons/widget'

import update from 'immutability-helper'

const plotlyConfig = {
  datasets: {},
  shapes: {},
  xaxis: {
    visible: true,
    color: '#444',
    title: '',
    type: 'linear',
    autorange: true,
    rangemode: 'normal',
    range: null,
    fixedrange: false,
    tickmode: 'auto',
    nticks: 0,
    tickvals: null,
    ticktext: null,
    ticks: null,
    mirror: null,
    ticklen: 5,
    tickwidth: 1,
    tickcolor: '#444',
    tickfont: null,
    tickangle: 'auto',
    tickprefix: '',
    showtickprefix: 'all',
    ticksuffix: '',
    showticksuffix: 'all',
    showexponent: 'all',
    exponentformat: 'e',
    separatethousands: false,
    showticklabels: true,
    automargin: true,
    showspikes: false,
    spikethickness: 3,
    spikedash: 'dash',
    spikemode: 'toaxis',
    spikesnap: 'data',
    showline: false,
    linecolor: '#444',
    linewidth: 1,
    showgrid: true,
    gridcolor: '#eee',
    gridwidth: 1,
    zeroline: false,
    zerolinecolor: '#444',
    zerolinewidth: 1,
    side: 'left',
    rangeslider: null,
    rangeselector: null
  },
  yaxis: {
    visible: true,
    color: '#444',
    title: '',
    type: 'linear',
    autorange: true,
    rangemode: 'normal',
    range: null,
    fixedrange: false,
    tickmode: 'auto',
    nticks: 0,
    tickvals: null,
    ticktext: null,
    ticks: null,
    mirror: null,
    ticklen: 5,
    tickwidth: 1,
    tickcolor: '#444',
    tickfont: null,
    tickangle: 'auto',
    tickprefix: '',
    showtickprefix: 'all',
    ticksuffix: '',
    showticksuffix: 'all',
    showexponent: 'all',
    exponentformat: 'e',
    separatethousands: false,
    showticklabels: true,
    automargin: true,
    showspikes: false,
    spikethickness: 3,
    spikedash: 'dash',
    spikemode: 'toaxis',
    spikesnap: 'data',
    showline: false,
    linecolor: '#444',
    linewidth: 1,
    showgrid: true,
    gridcolor: '#eee',
    gridwidth: 1,
    zeroline: false,
    zerolinecolor: '#444',
    zerolinewidth: 1,
    side: 'left',
    rangeslider: null,
    rangeselector: null
  }

}

const chartjsConfig = {

}

const defaultConfig = {
  name: 'unnamed',
  library: null,
  events: ['change'],
  actions: {},
  attributes: [
    'enabled'
  ],
  enabled: {
    typeof: 'boolean',
    value: true,
    complex: false,
    provider: null,
    array: false,
    indexes: null,
    'function': null
  }
}

const type = WidgetType.CHART

const updateWidgetChart = (state, payload, type) => {
  if (type !== payload.widget.type) { return state }

  // only care when changing libraries
  if (payload.key !== 'library') {
    return updateWidget(state, payload, type)
  }

  const old = state[payload.widget.id]
  // copy common properties
  let newconfig = update(defaultConfig, {
    id: {$set: old.id},
    name: {$set: old.name},
    library: {$set: payload.value},
    events: {$set: old.events},
    actions: {$set: old.actions},
    attributes: {$set: old.attributes},
    enabled: {$set: old.enabled}
  })

  // add library specific properties
  if (payload.value === 'chartjs') {
    newconfig = update(newconfig, {
    })
  } else if (payload.value === 'plotly') {
    newconfig = update(newconfig, {
      datasets: {$set: plotlyConfig.datasets},
      shapes: {$set: plotlyConfig.shapes},
      xaxis: {$set: plotlyConfig.xaxis},
      yaxis: {$set: plotlyConfig.yaxis}
    })
  }

  return update(state, { [payload.widget.id]: {$set: newconfig} })
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
      return updateWidgetChart(state, action.payload, type)
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
