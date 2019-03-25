import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GridRow from '@components/GridRow'
import Collapsable from '@components/Collapsable'
import ButtonLink from '@components/ButtonLink'
import { chartAddOption, chartRemoveOption } from '@actions'

import Image from './Image'

class Images extends Component {
  constructor(props) {
    super(props)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
  }

  add() {
    this.props.chartAddOption(this.props.chart, 'image')
  }

  remove(e, { name }) {
    this.props.chartRemoveOption(this.props.chart, 'image', name)
  }

  renderImages() {
    const out = []
    if (this.props.config == null) {
      return out
    }
    Object.entries(this.props.config).forEach(([id, image]) => {
      out.push(<Collapsable key={id} title={image.name} className='secondary' collapsed={true}>
        <Image
          name={`${this.props.name}.${id}`}
          config={image}
          onChange={this.props.onChange}
          onRemove={this.remove}
        />
      </Collapsable>)
    })
    return out
  }

  render() {
    return <Fragment>
      {this.renderImages()}
      <GridRow label='' compact={true}>
        <ButtonLink onClick={this.add}>Add image</ButtonLink>
      </GridRow>
    </Fragment>
  }
}

export default connect(null,
  dispatch => bindActionCreators({ chartAddOption, chartRemoveOption }, dispatch)
)(Images)