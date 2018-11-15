import React, { Component, Fragment } from 'react'
import GridRow from '../GridRow'
import ButtonLink from '@components/ButtonLink'

import AnimateInfo from './components/AnimateInfo'
import Upload from './components/Upload'

class ConfigAnimate extends Component {
  constructor(props) {
    super(props)
  }

  renderUpload() {
    return <Upload animate={this.props.widget}/>
  }

  render() {
    if (this.props.widget.populated === false) {
      return this.renderUpload()
    }

    return <Fragment>
      <AnimateInfo animate={this.props.widget}/>

      <GridRow label='Actions:'>
        <ButtonLink>Upgrade animate source</ButtonLink>
      </GridRow>
    </Fragment>
  }
}

export default ConfigAnimate