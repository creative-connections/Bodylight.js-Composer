import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GridRow from '../../../../GridRow'
import Collapsable from '../../../../Collapsable'
import ButtonLink from '@components/ButtonLink'
import { chartAddOption, chartRemoveOption } from '@actions'
import Annotation from './Annotation'

class Annotations extends Component {
  constructor(props) {
    super(props)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
  }

  add() {
    this.props.chartAddOption(this.props.chart, 'annotation')
  }

  remove(e, { name }) {
    this.props.chartRemoveOption(this.props.chart, 'annotation', name)
  }

  renderAnnotations() {
    const out = []
    if (this.props.config == null) {
      return out
    }
    Object.entries(this.props.config).forEach(([id, annotation]) => {
      out.push(<Collapsable key={id} title={annotation.text.value} className='secondary' collapsed={true}>
        <Annotation
          name={`${this.props.name}.${id}`}
          config={annotation}
          onChange={this.props.onChange}
          onRemove={this.remove}
        />
      </Collapsable>)
    })
    return out
  }

  render() {
    return <Fragment>
      {this.renderAnnotations()}
      <GridRow label='' compact={true}>
        <ButtonLink onClick={this.add}>Add annotation</ButtonLink>
      </GridRow>
    </Fragment>
  }
}

export default connect(null,
  dispatch => bindActionCreators({ chartAddOption, chartRemoveOption }, dispatch)
)(Annotations)