/* global models, widgets */
import generateTemplate from '@runtime/builders/generateTemplate'

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


export default () => {
  const script = `
  ${generateTemplate(getModelByID)}
  ${generateTemplate(getModelByName)}
  ${generateTemplate(getAnimateAnimByID)}
  ${generateTemplate(getAnimateTextByID)}
  ${generateTemplate(getButtonByID)}
  ${generateTemplate(getRangeByID)}
  ${generateTemplate(getToggleByID)}
  ${generateTemplate(getChartByID)}
  `
  const html = ''
  const css = ''

  return { script, html, css }
}
