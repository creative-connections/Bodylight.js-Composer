import {
  ADD_WIDGET,
  UPDATE_WIDGET_CONFIG
} from '@actions/types'

import {
  updateWidget
} from '../commons/widget'

import update from 'immutability-helper'
import WidgetType from '@helpers/enum/WidgetType'
import ModelMode from '@helpers/enum/ModelMode'

const defaultConfig = {
  mode: ModelMode.CONTINUOUS,
  interval: 20.0,
  stepSize: 0.05,

  id: null,
  name: null,
  js: null,
  guid: null,
  identifier: null,
  parameters: null,
  variables: null,
  description: null,
  generationDateAndTime: null,
  generationTool: null
}

const addModel = (state, payload, type, defaultConfig) => {
  if (type !== payload.type) { return state }
  defaultConfig = update(defaultConfig, {
    id: {$set: payload.id},
    name: {$set: payload.modelDescription.modelName},
    js: {$set: payload.js},
    guid: {$set: payload.modelDescription.guid},
    identifier: {$set: payload.modelDescription.modelIdentifier},
    variables: {$set: payload.modelDescription.variables},
    parameters: {$set: payload.modelDescription.parameters},
    description: {$set: payload.modelDescription.description},
    generationDateAndTime: {$set: payload.modelDescription.generationDateAndTime},
    generationTool: {$set: payload.modelDescription.generationTool}
  })
  return update(state, { [payload.id]: {$set: defaultConfig} })
}

const type = WidgetType.MODEL

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_WIDGET:
      return addModel(state, action.payload, type, defaultConfig)
  }
  return state
}

export const getAll = state => state
export const get = (state, id) => state[id]
