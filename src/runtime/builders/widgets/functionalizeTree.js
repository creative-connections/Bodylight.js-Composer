import update from 'immutability-helper'
import processAction from './processAction'

// TODO: auto functionalize actions

const functionalize = config => {
  config = update(config, {
    function: { $set: Function(`return ${config.function}`)() }
  })
  return config
}


const functionalizeTree = config => {
  if (config['function']) { return functionalize(config) }
  if (config == null) { return config }
  Object.entries(config).forEach(([key, configuration]) => {
    if (configuration != null) {
      if (key !== 'actions' && typeof configuration === 'object') {
        config = update(config, {
          [key]: { $set: functionalizeTree(configuration) }
        })
      }

      if (key === 'actions') {
        Object.entries(configuration).forEach(([key, action]) => {
          config = update(config, {
            actions: {
              [key]: { $set: processAction(action) }
            }
          })
        })
      }
    }
  })

  return config
}

export default functionalizeTree