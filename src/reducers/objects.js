import update from 'immutability-helper'
import { ADD_ANIMATE, ADD_MODEL } from '@actions/types'

const defaultState = {
  models: {},
  animates: {}
}

const processModel = (payload) => {
  const parameters = Object.keys(payload.modelDescriptionParser.parameters)
  const variables = Object.keys(payload.modelDescriptionParser.variables)
  return {parameters, variables}
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case ADD_ANIMATE:
      return update(state, {animates: {[action.payload.name]: {$set: action.payload.components}}})
    case ADD_MODEL:
      return update(state, {models: {[action.payload.name]: {$set: processModel(action.payload)}}})
  }

  return state
}
