import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GridRow from '../../../GridRow'
import Collapsable from '../../../Collapsable'
import ButtonLink from '@components/ButtonLink'
import { chartAddOption, chartRemoveOption } from '@actions'

import Shape from './Shape'

class Shapes extends Component {
  constructor(props) {
    super(props)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
  }

  add() {
    this.props.chartAddOption(this.props.chart, 'shape')
  }

  remove(e, { name }) {
    this.props.chartRemoveOption(this.props.chart, 'shape', name)
  }

  renderShapes() {
    const out = []
    Object.entries(this.props.config).forEach(([id, shape]) => {
      out.push(<Collapsable key={id} title={shape.type} className='secondary' collapsed={true}>
        <Shape
          name={`${this.props.name}.${id}`}
          config={shape}
          onChange={this.props.onChange}
          onRemove={this.remove}
        />
      </Collapsable>)
    })
    return out
  }

  render() {
    return <Fragment>
      {this.renderShapes()}
      <GridRow label='' compact={true}>
        <ButtonLink onClick={this.add}>Add shape</ButtonLink>
      </GridRow>
    </Fragment>
  }
}

export default connect(null,
  dispatch => bindActionCreators({ chartAddOption, chartRemoveOption }, dispatch)
)(Shapes)