/* global models, widgets */

function getModelByID (id) {
  if (models[id]) { return models[id] }
  return null
}

function getAnimateAnimByID (id) {
  console.log(widgets)
  if (widgets[id]) { return widgets[id] }
  return null
}

function getAnimateTextByID (id) {
  if (widgets[id]) { return widgets[id] }
  return null
}

function getButtonByID (id) {
  if (widgets[id]) { return widgets[id] }
  return null
}

function getRangeByID (id) {
  if (widgets[id]) { return widgets[id] }
  return null
}

function getToggleByID (id) {
  if (widgets[id]) { return widgets[id] }
  return null
}

function getModelByName (name) {
  Object.entries(models).forEach(([id, model]) => {
    if (model.name === name) {
      return model
    }
  })
  return null
}

export default function api (append, tpl) {
  append(tpl(getModelByID))
  append(tpl(getModelByName))
  append(tpl(getAnimateAnimByID))
  append(tpl(getAnimateTextByID))
  append(tpl(getButtonByID))
  append(tpl(getRangeByID))
  append(tpl(getToggleByID))
}
