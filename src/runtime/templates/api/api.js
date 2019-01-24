/* global models, widgets */

function getModelByID(id) {
  if (models[id]) { return models[id] }
  return null
}

function getAnimateAnimByID(id) {
  if (widgets[id]) { return widgets[id] }
  return null
}

function getAnimateTextByID(id) {
  if (widgets[id]) { return widgets[id] }
  return null
}

function getButtonByID(id) {
  if (widgets[id]) { return widgets[id] }
  return null
}

function getRangeByID(id) {
  if (widgets[id]) { return widgets[id] }
  return null
}

function getChartByID(id) {
  if (widgets[id]) { return widgets[id] }
  return null
}

function getToggleByID(id) {
  if (widgets[id]) { return widgets[id] }
  return null
}

function getModelByName(name) {
  let found = null
  Object.entries(models).forEach(([, model]) => {
    if (model.config.name === name) {
      found = model
    }
  })
  return found
}

export default function api(append, tpl) {
  append(tpl(getModelByID))
  append(tpl(getModelByName))
  append(tpl(getAnimateAnimByID))
  append(tpl(getAnimateTextByID))
  append(tpl(getButtonByID))
  append(tpl(getRangeByID))
  append(tpl(getToggleByID))
  append(tpl(getChartByID))
}
