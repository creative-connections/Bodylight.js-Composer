import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Button, Checkbox } from 'semantic-ui-react'
import { getExportOptions } from '@reducers'
import { updateExportOption } from '@actions'
import { toast } from 'react-toastify'
import { saveAs } from 'file-saver'
import GridRow from '@components/GridRow'
import Builder from '@runtime'

import BusySignal from '@components/BusySignal'

class Export extends Component {
  constructor(props) {
    super(props)

    let pending = false

    this.state = {
      minify: true,
      pending
    }

    this.handleExport = this.handleExport.bind(this)
    this.handleMinimizeOption = this.handleMinimizeOption.bind(this)
    this.export = this.export.bind(this)
    this.handleUpdateExportOption = this.handleUpdateExportOption.bind(this)
  }

  build(minify) {
    const builder = new Builder()
    builder.setMinify(minify)
    builder.setExportPerformanceBlock(this.props.export.performance)
    builder.setBundleDependencies(this.props.export.bundleDependencies)
    return new Blob([builder.build()], { type: 'text/html;charset=utf-8' })
  }

  export() {
    let html = ''

    try {
      html = this.build(this.state.minify && true)
    } catch (err) {
      toast.error(`Could not export project: ${err}, disabling optimizations`)
      html = this.build(false)
    }

    const filename = `${this.props.export.name}.html`
    saveAs(html, filename)
    toast.success(`Project exported as ${filename}`)
    this.setState({ pending: false })
  }

  handleExport() {
    this.setState({ pending: true })
    window.setTimeout(this.export, 100)
  }

  handleUpdateExportOption(e, { name, value, checked }) {
    value = value || checked
    this.props.updateExportOption(name, value)
  }

  handleMinimizeOption(e, { checked }) {
    this.setState({minify: checked})
  }

  render() {
    return <Fragment>
      <BusySignal
        busy={this.state.pending}
        description="Exporting code, this will take a while..."
      />

      <GridRow label='Filename'>
        <Input
          name='name'
          value={this.props.export.name}
          onChange={this.handleUpdateExportOption}
        />
      </GridRow>
      <GridRow border label='Features'>
        <Checkbox
          label='Performance block'
          name='performance'
          checked={this.props.export.performance}
          onClick={this.handleUpdateExportOption}
        />
      </GridRow>

      <GridRow border label='Export options'>
        <Checkbox
          label='Minimize code'
          name='bundleDependencies'
          checked={this.state.minify}
          onClick={this.handleMinimizeOption}
        />
        <Checkbox
          label='Bundle dependencies (for offline usage)'
          name='bundleDependencies'
          checked={this.props.export.bundleDependencies}
          onClick={this.handleUpdateExportOption}
        />
      </GridRow>
      <GridRow>
        <Button onClick={this.handleExport}>Export</Button>
      </GridRow>

    </Fragment>
  }
}

export default connect(
  state => ({
    export: getExportOptions(state)
  }),
  dispatch => bindActionCreators({
    updateExportOption
  }, dispatch)
)(Export)
