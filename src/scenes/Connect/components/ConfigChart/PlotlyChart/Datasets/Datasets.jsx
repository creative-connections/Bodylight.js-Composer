import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GridRow from '../../../GridRow'
import Collapsable from '../../../Collapsable'
import ButtonLink from '@components/ButtonLink'
import { chartAddOption } from '@actions'
import Dataset from './Dataset'

class Datasets extends Component {
  constructor(props) {
    super(props)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
  }

  add() {
    this.props.chartAddOption(this.props.chart, 'dataset')
  }

  remove(e, { name }) {
    this.props.chartRemoveOption(this.props.chart, 'dataset', name)
  }

  renderDatasets() {
    const out = []
    Object.entries(this.props.config).forEach(([id, dataset]) => {
      out.push(
        <Collapsable title={dataset.name} className='secondary' collapsed={true} key={id} >
          <Dataset
            name={`${this.props.name}.${id}`}
            config={dataset}
            onChange={this.props.onChange}
            onRemove={this.remove}
          />
        </Collapsable>
      )
    })
    return out
  }

  render() {
    return <Fragment>
      {this.renderDatasets()}
      <GridRow label='' compact={true}>
        <ButtonLink onClick={this.add}>Add dataset</ButtonLink>
      </GridRow>
    </Fragment>
  }
}

export default connect(null,
  dispatch => bindActionCreators({ chartAddOption }, dispatch)
)(Datasets)