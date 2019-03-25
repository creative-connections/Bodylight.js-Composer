import {
  SWITCH_SIDEBAR,
  SELECT_WIDGET
} from '@actions/types'

import SidebarType from '@enum/SidebarType'

export default function (state = SidebarType.WIDGET, action) {
  switch (action.type) {
  case SWITCH_SIDEBAR:
    state = action.payload
    break
  case SELECT_WIDGET:
    state = SidebarType.WIDGET
    break
  }
  return state
}

export const getSidebarType = state => state
