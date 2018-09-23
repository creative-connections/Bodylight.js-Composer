import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Input, Button } from 'semantic-ui-react'
import { getProjectName } from '@reducers'
import { renameProject } from '@actions'
import { toast } from 'react-toastify'

import update from 'immutability-helper'

import { saveAs } from 'file-saver'
import Builder from '@runtime'

import BusySignal from '@components/BusySignal'

class Export extends Component {
  constructor (props) {
    super(props)

    let pending = false
    if (props.match.params.option === 'quick') {
      this.quickExport()
      pending = true
      this.props.history.goBack()
    }

    this.state = {
      pending
    }
  }

  renameProject (e, {value}) {
    this.props.renameProject(value)
  }

  quickExport () {
    const builder = new Builder()
    const html = new Blob([builder.build()], { type: 'text/html;charset=utf-8' })
    const filename = `${this.props.name}.html`
    saveAs(html, filename)
    toast.success(`Project exported as ${filename} without optimizations. Do not use in production`)
  }

  render () {
    return <Fragment>
      <div id='topBar' className='header'> </div>

      <BusySignal busy={this.state.pending} />

      <Grid padded centered className='leftShadow topPadded'>
        <Grid.Row centered style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Grid.Column style={{ marginTop: '2em', width: '100%' }}>
            <Input
              name="name"
              value={this.props.name}
              onChange={this.renameProject}
            />
            <Button onClick={this.handleSave}>Export</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  }
}

export default connect(
  state => ({
    name: getProjectName(state)
  }),
  dispatch => bindActionCreators({
    renameProject
  }, dispatch)
)(Export)
