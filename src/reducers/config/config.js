import { combineReducers } from 'redux'
import models, * as modelsSelectors from './reducers/models'
import buttons, * as buttonsSelectors from './reducers/buttons'
import ranges, * as rangesSelectors from './reducers/ranges'
import animates, * as animatesSelectors from './reducers/animates'
import animateTexts, * as animateTextsSelectors from './reducers/animateTexts'
import animateAnims, * as animateAnimsSelectors from './reducers/animateAnims'
import toggles, * as togglesSelectors from './reducers/toggles'
import charts, * as chartsSelectors from './reducers/charts'
import labels, * as labelsSelectors from './reducers/labels'
import actions, * as actionsSelectors from './reducers/actions'

import memoize from 'memoize-one'

export default combineReducers({
  models,
  buttons,
  ranges,
  animates,
  animateTexts,
  animateAnims,
  toggles,
  charts,
  labels,
  actions
})

export const configGetAllModels = state => modelsSelectors.getAll(state.models)
export const configGetModel = (state, id) => modelsSelectors.get(state.models, id)

export const configGetAllButtons = state => buttonsSelectors.getAll(state.buttons)
export const configGetButton = (state, id) => buttonsSelectors.get(state.buttons, id)

export const configGetAllRanges = state => rangesSelectors.getAll(state.ranges)
export const configGetRange = (state, id) => rangesSelectors.get(state.ranges, id)

export const configGetAllAnimates = state => animatesSelectors.getAll(state.animates)
export const configGetAnimate = (state, id) => animatesSelectors.get(state.animates, id)
export const configGetAllAnimateTexts = state => animateTextsSelectors.getAll(state.animateTexts)
export const configGetAnimateText = (state, id) => animateTextsSelectors.get(state.animateTexts, id)
export const configGetAllAnimateAnims = state => animateAnimsSelectors.getAll(state.animateAnims)
export const configGetAnimateAnim = (state, id) => animateAnimsSelectors.get(state.animateAnims, id)

export const configGetAllToggles = state => togglesSelectors.getAll(state.toggles)
export const configGetToggle = (state, id) => togglesSelectors.get(state.toggles, id)

export const configGetAllCharts = state => chartsSelectors.getAll(state.charts)
export const configGetChart = (state, id) => chartsSelectors.get(state.charts, id)

export const configGetAllLabels = state => labelsSelectors.getAll(state.labels)
export const configGetLabel = (state, id) => labelsSelectors.get(state.labels, id)

export const configGetAllActions = state => actionsSelectors.getAll(state.actions)
export const configGetAction = (state, id) => actionsSelectors.get(state.actions, id)

const getProvidersForDropdownMemoized = memoize(state => {
  const options = [ { text: 'none', value: null } ]
  return options.concat(
    modelsSelectors.getProvidersForDropdown(state.models)
  )
})

export const getProvidersForDropdown = (state) => {
  return getProvidersForDropdownMemoized(state)
}

export const getArrayProvidersFromProvider = (state, provider) => {
  let providers = {}
  if (typeof provider !== 'string') {
    return providers
  }
  const parsed = JSON.parse(provider)
  const id = parsed.id
  const modelId = parsed.parent

  // parse common name out of the provider ('cname[32]' becomes 'cname')
  const name = id.match(/(.*)\[[0-9]*\]$/)[1]

  if (typeof state.models[modelId] === 'undefined' ||
      typeof state.models[modelId].arrays[name] === 'undefined') {
    return providers
  }

  return state.models[modelId].arrays[name].providers
}
