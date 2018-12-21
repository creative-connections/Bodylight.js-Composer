import update from 'immutability-helper'
import column from './config/column'
import item from './config/item'
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

const addColumn = (chart, id) => {
  const position = Object.entries(chart.columns).length + 1
  const config = update(column, {
    id: { $set: id },
    position: { $set: position },
    name: { $set: `column ${position}` }
  })
  return update(chart, {
    columns: {
      [id]: { $set: config }
    }
  })
}

const addItem = (chart, id, { idColumn }) => {
  const position = Object.entries(chart.columns).length + 1
  const config = update(item, {
    id: { $set: id },
    position: { $set: position },
    name: { $set: `item ${position}` }
  })
  return update(chart, {
    columns: {
      [idColumn]: {
        items: {
          [id]: { $set: config }
        }
      }
    }
  })
}

export default (chart, id, option, params) => {
  switch (option) {
  case 'column':
    return addColumn(chart, id)
  case 'item':
    return addItem(chart, id, params)
  default:
    return addOption(chart, id, option)
  }
}