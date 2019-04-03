import {
  ADD_WIDGET,
  RENAME_WIDGET,
  UPDATE_WIDGET,
  UPDATE_WIDGET_CONFIG
} from '@actions/types'
import { REHYDRATE } from 'redux-persist'

import {
  updateWidget,
  renameWidget
} from '../commons/widget'

import memoize from 'memoize-one'
import update from 'immutability-helper'
import WidgetType from '@enum/WidgetType'
import ModelMode from '@enum/ModelMode'
import ProviderType from '@enum/ProviderType'

const defaultConfig = {
  mode: ModelMode.CONTINUOUS,
  interval: 20.0,
  stepSize: 0.05,

  startTime: 0.0,
  stopAtStopTime: false,
  stopTime: 60.0,
  tolerance: 0.000005,

  destroyOnReset: false,

  id: null,
  name: null,
  originalName: null,
  js: null,
  hash: null,
  guid: null,
  identifier: null,
  modelName: null,
  parameters: null,
  variables: null,
  description: null,
  generationDateAndTime: null,
  generationTool: null
}

const addModel = (state, payload, type, defaultConfig) => {
  if (type !== payload.type) { return state }
  defaultConfig = update(defaultConfig, {
    id: { $set: payload.id },
    name: { $set: payload.name },
    originalName: { $set: payload.name },
    js: { $set: payload.js },
    hash: { $set: payload.hash },
    guid: { $set: payload.modelDescription.guid },
    identifier: { $set: payload.modelDescription.modelIdentifier },
    modelName: { $set: payload.modelDescription.modelName },
    variables: { $set: payload.modelDescription.variables },
    parameters: { $set: payload.modelDescription.parameters },
    arrays: { $set: payload.modelDescription.arrays },
    description: { $set: payload.modelDescription.description },
    generationDateAndTime: { $set: payload.modelDescription.generationDateAndTime },
    generationTool: { $set: payload.modelDescription.generationTool }
  })
  return update(state, {
    [payload.id]: { $set: defaultConfig }
  })
}

const updateModel = (state, payload, type) => {
  if (type !== payload.type) { return state }

  state = update(state, {
    [payload.id]: {
      js: { $set: payload.js },
      hash: { $set: payload.hash },
      guid: { $set: payload.modelDescription.guid },
      identifier: { $set: payload.modelDescription.modelIdentifier },
      modelName: { $set: payload.modelDescription.modelName },
      variables: { $set: payload.modelDescription.variables },
      parameters: { $set: payload.modelDescription.parameters },
      arrays: { $set: payload.modelDescription.arrays },
      description: { $set: payload.modelDescription.description },
      generationDateAndTime: { $set: payload.modelDescription.generationDateAndTime },
      generationTool: { $set: payload.modelDescription.generationTool }
    }
  })

  return state
}

const type = WidgetType.MODEL

export default function (state = {}, action) {
  switch (action.type) {
  case ADD_WIDGET:
    return addModel(state, action.payload, type, defaultConfig)
  case RENAME_WIDGET:
    return renameWidget(state, action.payload, type)
  case UPDATE_WIDGET:
    return updateModel(state, action.payload, type)
  case UPDATE_WIDGET_CONFIG:
    return updateWidget(state, action.payload, type)
  case REHYDRATE:
    return action.payload ? action.payload.config.models : state
  }
  return state
}

export const getAll = state => state
export const get = (state, id) => state[id]

const generateProviderID = (type, id, parent) => {
  return `{"type":${JSON.stringify(type)},` +
    `"id":${JSON.stringify(id)},` +
    `"parent":${JSON.stringify(parent)}}`
}

const getProvidersForDropdownMemoized = memoize(state => {
  const options = []
  Object.entries(state).forEach(([modelID, model]) => {
    Object.entries(model.parameters).forEach(([parameterID, parameter]) => {
      const ID = generateProviderID(ProviderType.MODEL_PARAMETER, parameterID, modelID)
      options.push({
        id: parameterID,
        text: `${model.name}: ${parameter.name}`,
        value: ID
      })
    })
    Object.entries(model.variables).forEach(([variableID, variable]) => {
      const ID = generateProviderID(ProviderType.MODEL_VARIABLE, variableID, modelID)
      options.push({
        id: variableID,
        text: `${model.name}: ${variable.name}`,
        value: ID
      })
    })
  })
  return options
})

export const getProvidersForDropdown = state => {
  return getProvidersForDropdownMemoized(state)
}
