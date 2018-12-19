import update from 'immutability-helper'

export default (chart, id, option) => {
  return update(chart, {
    [`${option}s`]: { // this looks dumb but options follow the option{s} naming scheme
      $unset: [id]
    }
  })
}