import update from 'immutability-helper'

export default (chart, id, option, params) => {
  if (option === 'item') {
    const idColumn = params.idColumn
    return update(chart, {
      columns: {
        [idColumn]: {
          items: {
            $unset: [id]
          }
        }
      }
    })
  }

  return update(chart, {
    [`${option}s`]: { // this looks dumb but options follow the option{s} naming scheme
      $unset: [id]
    }
  })
}