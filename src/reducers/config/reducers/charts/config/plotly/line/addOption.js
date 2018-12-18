import update from 'immutability-helper'
import dataset from './config/dataset'
import annotation from './config/annotation'
import image from './config/image'
import shape from './config/shape'

const options = {
  dataset,
  annotation,
  image,
  shape
}

const addDataset = (chart, id) => {
  // We want our charts to share colors on dataset positions
  const colors = {
    0: '#5DA5DA',
    1: '#FAA43A',
    2: '#60BD68',
    3: '#F17CB0',
    4: '#B276B2',
    5: '#DECF3F',
    6: '#F15854',
    7: '#B2912F',
  }

  const position = Object.entries(chart.datasets).length
  const color = colors[position] || ''

  const config = update(dataset, {
    id: { $set: id },
    line: {
      color: { $set: color }
    }
  })

  return update(chart, {
    datasets: {
      [id]: { $set: config }
    }
  })
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
  case 'dataset':
    return addDataset(chart, id)
  default:
    return addOption(chart, id, option)
  }
}