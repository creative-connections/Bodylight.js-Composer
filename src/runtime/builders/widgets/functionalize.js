import update from 'immutability-helper'

const functionalize = (configuration, attribute) => {
  let config = configuration[attribute]
  if (config.function !== null) {
    const fn = Function(`return ${config.function}`)()
    config = update(config, {
      function: {$set: fn}
    })
    configuration = update(configuration, {
      [attribute]: {$set: config}
    })
  }
  return configuration
}

export default functionalize
