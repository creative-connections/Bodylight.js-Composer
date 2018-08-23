import { combineReducers } from 'redux'
import models, * as modelsSelectors from './reducers/models'
import buttons, * as buttonsSelectors from './reducers/buttons'
import ranges, * as rangesSelectors from './reducers/ranges'

import memoize from 'memoize-one'

export default combineReducers({
  models,
  buttons,
  ranges
})

export const configGetAllModels = state => modelsSelectors.getAll(state.models)
export const configGetModel = (state, id) => modelsSelectors.get(state.models, id)

export const configGetAllButtons = state => buttonsSelectors.getAll(state.buttons)
export const configGetButton = (state, id) => buttonsSelectors.get(state.buttons, id)

export const configGetAllRanges = state => rangesSelectors.getAll(state.ranges)
export const configGetRange = (state, id) => rangesSelectors.get(state.ranges, id)

const getProvidersForDropdownMemoized = memoize(state => {
  const options = [ { text: 'none', value: null } ]
  return options.concat(
    modelsSelectors.getProvidersForDropdown(state.models)
  )
})

export const getProvidersForDropdown = (state) => {
  console.log(getProvidersForDropdownMemoized(state))
  return getProvidersForDropdownMemoized(state)
}
