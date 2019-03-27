import {
  SWITCH_SIDEBAR,
  SELECT_WIDGET
} from '@actions/types'

import SidebarType from '@enum/SidebarType'
import update from 'immutability-helper'

export default function (state = { type: SidebarType.WIDGET }, action) {
  /*
   * We use a object for the state here instead of a plain string so that repeated calls of
   * SWITCH_SIDEBAR with the same type notify <Design/> so that the sidabar can be displayed.
   */
  switch (action.type) {
  case SWITCH_SIDEBAR:
    state = update(state, { $set: { type: action.payload } })
    break
  case SELECT_WIDGET:
    state = update(state, { $set: { type: SidebarType.WIDGET } })
    break
  }
  return state
}

export const getSidebarType = state => state.type
