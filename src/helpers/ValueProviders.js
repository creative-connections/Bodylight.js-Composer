import configureStore from '@src/configureStore'
import ValueProviderType from '@helpers/ValueProviderType'

class ValueProviders {
  constructor () {
    const {store} = configureStore()
    const state = store.getState()

    this.models = state.models
  }

  static value (value) {
    return JSON.parse(value)
  }

  getForDropdown () {
    var options = []
    options.push({ text: 'none', value: null })
    Object.entries(this.models).forEach(([modelName, model]) => {
      Object.entries(model.parameters).forEach(([componentName, component]) => {
        const value = {
          type: ValueProviderType.MODEL_PARAMETER,
          name: componentName,
          parent: modelName
        }
        options.push({
          text: `${modelName} (parameter): ${componentName}`,
          value: JSON.stringify(value)
        })
      })
    })

    Object.entries(this.models).forEach(([modelName, model]) => {
      Object.entries(model.variables).forEach(([componentName, component]) => {
        const value = {
          type: ValueProviderType.MODEL_VARIABLE,
          name: componentName,
          parent: modelName
        }
        options.push({
          text: `${modelName} (variable): ${componentName}`,
          value: JSON.stringify(value)
        })
      })
    })

    return options
  }
}

export default ValueProviders
