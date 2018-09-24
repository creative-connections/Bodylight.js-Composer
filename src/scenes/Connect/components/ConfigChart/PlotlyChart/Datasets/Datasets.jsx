import React, { Component, Fragment } from 'react'
import { Dropdown, Grid, Header, Divider } from 'semantic-ui-react'

import ComplexAttribute from '../../../ComplexAttribute'
import GridRow from '../../../GridRow'
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
        'function': 'value => value'
      },
      y: {
        typeof: 'number',
        value: 0,
        time: false,
        provider: null,
        'function': 'value => value'
      },
      maxSamples: {
        typeof: 'number',
        value: 100,
        complex: false,
        provider: null,
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
        <Dataset key={id}
          name={`${this.props.name}.${id}`}
          config={dataset}
          onChange={this.props.onChange}
          onRemove={this.handleDatasetRemove}
        />
      )
    })
    return out
  }

  render () {
    return <Fragment>
      {this.renderDatasets()}
      <Divider hidden/>
      <Grid verticalAlign='middle' celled='internally'>
        <GridRow label='' compact={true}>
          <ButtonLink onClick={this.handleDatasetAdd}>Add dataset</ButtonLink>
        </GridRow>
      </Grid>
    </Fragment>
  }
}

export default Datasets
