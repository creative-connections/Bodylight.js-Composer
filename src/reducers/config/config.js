import { combineReducers } from 'redux'
import buttons, * as buttonsSelectors from './reducers/buttons'
import memoize from 'memoize-one'

export default combineReducers({
  buttons
})

export const configGetAllButtons = state => buttonsSelectors.getAll(state.buttons)
export const configGetButton = (state, id) => buttonsSelectors.get(state.buttons, id)
