import { combineReducers } from 'redux'
import WidgetType from '@helpers/WidgetType'

import animates, * as animatesSelectors from './reducers/animates'
import ranges, * as rangesSelectors from './reducers/ranges'
import app, * as appSelectors from './reducers/app'

export default combineReducers({
  animates,
  ranges,
  app
})

export const getAnimates = state => animatesSelectors.getAnimates(state.animates)
export const getRanges = state => rangesSelectors.getRanges(state.ranges)

export const getAvailableRangeName = state => rangesSelectors.getAvailableRangeName(state.ranges)

export const getSelectedWidget = state => appSelectors.getSelectedWidget(state.app)

export const generateWidgetId = (type, name, parent = null) => {
  /*
   * Since JSON.stringify does not guarantee any particular order, we have to
   * create our own stringification. We only rely on it for string escapement.
   */
  let output = '{'
  output += `"type":${JSON.stringify(type)}`
  output += `,"name":${JSON.stringify(name)}`
  // some widgets do not require a parent (e.g. ranges)
  if (parent !== null) {
    output += `,"parent":${JSON.stringify(parent)}`
  }
  output += `}`

  return output
}

export const getWidgetsForDropdown = state => {
  var options = []
  Object.entries(state.ranges).forEach(([name, range]) => {
    options.push({
      text: `range: ${name}`,
      value: generateWidgetId(WidgetType.RANGE, name)
    })
  })

  Object.entries(state.animates).forEach(([animateName, animate]) => {
    animate.components.anim.forEach(componentName => {
      options.push({
        text: `${animateName}: ${componentName}`,
        value: generateWidgetId(WidgetType.ANIMATE_ANIM, componentName, animateName)
      })
    })

    animate.components.text.forEach(componentName => {
      options.push({
        text: `${animateName}: ${componentName}`,
        value: generateWidgetId(WidgetType.ANIMATE_TEXT, componentName, animateName)
      })
    })
  })

  return options
}
