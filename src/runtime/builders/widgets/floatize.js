import update from 'immutability-helper'

const floatize = (configuration, attributes) => {
  attributes.forEach(attribute => {
    configuration = update(configuration, {
      [attribute]: {
        value: { $set: parseFloat(configuration[attribute].value) }
      }
    })
  })
  return configuration
}

export default floatize