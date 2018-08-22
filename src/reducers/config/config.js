import { combineReducers } from 'redux'
import buttons, * as buttonsSelectors from './reducers/buttons'
import ranges, * as rangesSelectors from './reducers/ranges'

export default combineReducers({
  buttons,
  ranges
})

export const configGetAllButtons = state => buttonsSelectors.getAll(state.buttons)
export const configGetButton = (state, id) => buttonsSelectors.get(state.buttons, id)

export const configGetAllRanges = state => rangesSelectors.getAll(state.ranges)
export const configGetRange = (state, id) => rangesSelectors.get(state.ranges, id)
