import update from 'immutability-helper'
import column from './config/column'
import annotation from './config/annotation'
import image from './config/image'
import shape from './config/shape'

const options = {
  annotation,
  image,
  shape
}

const addOption = (chart, id, option) => {
  return update(chart, {
    [`${option}s`]: {
      [id]: { $set: update(options[option], { id: { $set: id } }) }
    }
  })
}

export default (chart, id, option) => {
  switch (option) {
  default:
    return addOption(chart, id, option)
  }
}