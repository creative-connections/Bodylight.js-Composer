import React, { Component, Fragment } from 'react'
import GridRow from '@components/GridRow'
import ButtonLink from '@components/ButtonLink'

import AnimateInfo from './components/AnimateInfo'
import Upload from './components/Upload'

class ConfigAnimate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      upgrade: false
    }

    this.handleUpgradeClick = this.handleUpgradeClick.bind(this)
  }

  renderUpload() {
    return <Upload animate={this.props.widget}/>
  }

  handleUpgradeClick() {
    this.setState({ upgrade: true })
  }

  render() {
    if (this.props.widget.populated === false || this.state.upgrade) {
      return this.renderUpload()
    }

    return <Fragment>
      <AnimateInfo animate={this.props.widget}/>
      <GridRow border label='Actions'>
        <ButtonLink onClick={this.handleUpgradeClick}>Upgrade animate source</ButtonLink>
      </GridRow>
    </Fragment>
  }
}

export default ConfigAnimate
