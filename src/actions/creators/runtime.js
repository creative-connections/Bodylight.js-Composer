import {
  CONFIG_ANIMATE_ANIM_UPDATE,
  CONFIG_ANIMATE_TEXT_UPDATE,
  CONFIG_ANIMATE_TEXT_REMOVE,
  CONFIG_RANGE_UPDATE,
  CONFIG_RANGE_REMOVE
} from '@actions/types'

export const configAnimateAnimUpdate = (name, parent, config) => ({
  type: CONFIG_ANIMATE_ANIM_UPDATE,
  payload: { name, parent, config }
})

export const configAnimateTextUpdate = (name, parent, config) => ({
  type: CONFIG_ANIMATE_TEXT_UPDATE,
  payload: { name, parent, config }
})

export const configAnimateTextRemove = (name, parent) => ({
  type: CONFIG_ANIMATE_TEXT_REMOVE,
  payload: { name, parent }
})

export const configRangeUpdate = (range, config) => ({
  type: CONFIG_RANGE_UPDATE,
  payload: { range, config }
})

export const configRangeRemove = (range) => ({
  type: CONFIG_RANGE_REMOVE,
  payload: { range }
})
