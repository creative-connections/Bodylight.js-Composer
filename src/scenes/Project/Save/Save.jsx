import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Input, Button } from 'semantic-ui-react'
import { getProjectName } from '@reducers'
import { renameProject } from '@actions'
import update from 'immutability-helper'
import configureStore from '@src/configureStore'
import { saveAs } from 'file-saver'

class Save extends Component {
  constructor (props) {
    super(props)
    this.renameProject = this.renameProject.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  renameProject (e, {value}) {
    this.props.renameProject(value)
  }

  handleSave () {
    const {store} = configureStore()

    let state = update(store.getState(), {
      _persist: {$set: undefined}
    })

    const name = `${this.props.name}.bjp`
    const file = new Blob([JSON.stringify(state)], { type: 'application/json' })
    saveAs(file, name)
  }

  render () {
    return <Fragment>
      <div id='topBar' className='header'> </div>

      <Grid padded centered className='leftShadow topPadded'>
        <Grid.Row centered style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Grid.Column style={{ marginTop: '2em', width: '100%' }}>
            <Input
              name="name"
              value={this.props.name}
              onChange={this.renameProject}
            />
            <Button onClick={this.handleSave}>Save</Button>
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
)(Save)
