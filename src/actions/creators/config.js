import { CONFIG_ANIMATE_ANIM_UPDATE } from '@actions/types'

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
