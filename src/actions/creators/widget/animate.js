import {
  ADD_WIDGET,
  RENAME_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

const getAnims = (components, parent) => {
  const anims = {}
  components.anim.forEach(name => {
    const id = generateID()
    anims[id] = {
      id,
      name,
      parent,
      type: WidgetType.ANIMATE_ANIM
    }
  })
  return anims
}

const getTexts = (components, parent) => {
  const texts = {}
  components.text.forEach(name => {
    const id = generateID()
    texts[id] = {
      id,
      name,
      parent,
      type: WidgetType.ANIMATE_TEXT
    }
  })
  return texts
}

export const addAnimate = (source, hash, animateName, components) => {
  const id = generateID()
  return {
    type: ADD_WIDGET,
    payload: {
      id,
      js: source,
      hash: hash,
      type: WidgetType.ANIMATE,
      name: animateName,
      originalName: animateName,
      anim: getAnims(components, id),
      text: getTexts(components, id)
    }
  }
}

export const updateAnimate = (id, source, hash, animateName, components) => {
  return {
    type: ADD_WIDGET,
    payload: {
      id,
      js: source,
      hash: hash,
      type: WidgetType.ANIMATE,
      name: animateName,
      originalName: animateName,
      anim: getAnims(components, id),
      text: getTexts(components, id)
    }
  }
}

export const renameAnimate = (model, name) => ({
  type: RENAME_WIDGET,
  payload: {
    widget: model,
    name
  }
})
