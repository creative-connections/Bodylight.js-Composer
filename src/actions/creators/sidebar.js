import { SWITCH_SIDEBAR } from '@actions/types'

import SidebarType from '@enum/SidebarType'

export const openSidebarWidget = () => ({ type: SWITCH_SIDEBAR, payload: SidebarType.WIDGET })
export const openSidebarExport = () => ({ type: SWITCH_SIDEBAR, payload: SidebarType.EXPORT })

export const openSidebarOpenProject = () => ({
  type: SWITCH_SIDEBAR,
  payload: SidebarType.OPEN_PROJECT
})

export const openSidebarSaveProject = () => ({
  type: SWITCH_SIDEBAR,
  payload: SidebarType.SAVE_PROJECT
})
