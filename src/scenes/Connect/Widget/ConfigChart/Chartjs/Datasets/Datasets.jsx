import React, { Component, Fragment } from 'react'
import { Grid, Divider } from 'semantic-ui-react'

import GridRow from '@components/GridRow'
import Collapsable from '@components/Collapsable'
import ButtonLink from '@components/ButtonLink'
import generateID from '@helpers/generateID'
import update from 'immutability-helper'

import Dataset from './Dataset'

class Datasets extends Component {
  constructor (props) {
    super(props)
    this.handleDatasetAdd = this.handleDatasetAdd.bind(this)
    this.handleDatasetRemove = this.handleDatasetRemove.bind(this)
  }

  handleDatasetAdd () {
    let datasets = this.props.config
    const pos = Object.entries(datasets).length + 1

    let color = '#5DA5DA'

    switch (pos) {
      case 0: color = '#5DA5DA'; break
      case 1: color = '#FAA43A'; break
      case 2: color = '#60BD68'; break
      case 3: color = '#F17CB0'; break
      case 4: color = '#B276B2'; break
      case 5: color = '#DECF3F'; break
      case 6: color = '#F15854'; break
      case 7: color = '#B2912F'; break
      default: break
    }

    const id = generateID()
    const defaultConfig = {
      id,
      name: '',
      mode: 'lines',
      other: '() => ({})',
      line: {
        color: color,
        width: 2,
        shape: 'linear',
        smoothing: 1,
        dash: 'solid',
        simplify: true
      },
      x: {
        typeof: 'number',
        value: 0,
        time: true,
        provider: null,
        array: false,
        indexes: null,
        'function': null
      },
      y: {
        typeof: 'number',
        value: 0,
        time: false,
        provider: null,
        array: false,
        indexes: null,
        'function': null
      },
      maxSamples: {
        typeof: 'number',
        value: -1,
        complex: false,
        provider: null,
        array: false,
        indexes: null,
        'function': 'value => value'
      }
    }

    datasets = update(datasets, {
      [id]: {$set: defaultConfig}
    })

    this.props.onChange(null, {name: this.props.name, value: datasets})
  }

  handleDatasetRemove (e, {name, value}) {
    const datasets = update(this.props.config, { $unset: [name] })
    this.props.onChange(e, {name: this.props.name, value: datasets})
  }

  renderDatasets () {
    const out = []
    Object.entries(this.props.config).forEach(([id, dataset]) => {
      out.push(
        <Collapsable title={dataset.name} className='secondary' collapsed={true} key={id} >
          <Dataset
            name={`${this.props.name}.${id}`}
            config={dataset}
            onChange={this.props.onChange}
            onRemove={this.handleDatasetRemove}
          />
        </Collapsable>
      )
    })
    return out
  }

  render () {
    return <Fragment>
      {this.renderDatasets()}
      <GridRow label='' compact={true}>
        <ButtonLink onClick={this.handleDatasetAdd}>Add dataset</ButtonLink>
      </GridRow>
    </Fragment>
  }
}

export default Datasets
