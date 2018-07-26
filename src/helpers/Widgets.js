import configureStore from '@src/configureStore'
import WidgetTypes from '@helpers/WidgetTypes'

/*
TODO: optimize this class to use static variables with precalculated results and
      handle updates on store.subscribe
*/
class Widgets {
  constructor () {
    const {store} = configureStore()

    const state = store.getState()

    this.animates = state.animates
    this.models = state.models
  }

  static value (value) {
    if (value === '') {
      return value
    }
    return JSON.parse(value)
  }

  getForDropdown () {
    var options = []
    Object.entries(this.animates).forEach(([animateName, animate]) => {
      animate.components.anim.forEach(componentName => {
        const value = {
          type: WidgetTypes.ANIMATE_ANIM,
          name: componentName,
          parent: animateName
        }
        options.push({
          text: `${animateName}: ${componentName}`,
          value: JSON.stringify(value)
        })
      })

      animate.components.text.forEach(componentName => {
        const value = {
          type: WidgetTypes.ANIMATE_TEXT,
          name: componentName,
          parent: animateName
        }
        options.push({
          text: `${animateName}: ${componentName}`,
          value: JSON.stringify(value)
        })
      })
    })

    return options
  }
}

export default Widgets
