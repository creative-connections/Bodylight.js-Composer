import {
  ADD_WIDGET,
  RENAME_WIDGET
} from '@actions/types'

import generateID from '@helpers/generateID'
import WidgetType from '@helpers/enum/WidgetType'

const getAnims = components => {
  const anims = {}
  components.anim.forEach(name => {
    const id = generateID()
    anims[id] = {
      id,
      name,
      parent: animateID,
      type: WidgetType.ANIMATE_ANIM
    }
  })
  return anims
}

const getTexts = components => {
  const texts = {}
  components.text.forEach(name => {
    const id = generateID()
    texts[id] = {
      id,
      name,
      parent: animateID,
      type: WidgetType.ANIMATE_TEXT
    }
  })
  return texts
}

export const addAnimate = (source, hash, animateName, components) => {
  return {
    type: ADD_WIDGET,
    payload: {
      id: generateID(),
      js: source,
      hash: hash,
      type: WidgetType.ANIMATE,
      name: animateName,
      originalName: animateName,
      anim: getAnims(components),
      text: getTexts(components)
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
      anim: getAnims(components),
      text: getTexts(components)
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
