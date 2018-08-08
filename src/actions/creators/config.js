import {
  CONFIG_ANIMATE_ANIM_UPDATE,
  CONFIG_ANIMATE_TEXT_UPDATE,
  CONFIG_ANIMATE_TEXT_REMOVE
} from '@actions/types'

export const configAnimateAnimUpdate = (name, parent, config) => {
  return {
    type: CONFIG_ANIMATE_ANIM_UPDATE,
    payload: {
      name,
      parent,
      config
    }
  }
}

export const configAnimateTextUpdate = (name, parent, config) => {
  return {
    type: CONFIG_ANIMATE_TEXT_UPDATE,
    payload: {
      name,
      parent,
      config
    }
  }
}

export const configAnimateTextRemove = (name, parent) => {
  return {
    type: CONFIG_ANIMATE_TEXT_REMOVE,
    payload: {
      name,
      parent
    }
  }
}
