import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import { Grid, Form, Checkbox, Divider, Button } from 'semantic-ui-react'

import { addModel } from '@actions'
import { configGetAllModels } from '@reducers'

class Updater extends Component {
  constructor (props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSelect = this.handleSelect.bind(this)

    // check if we already have an animate with the same rootComponent
    const models = []
    Object.entries(this.props.models).forEach(([key, model]) => {
    })

    this.state = { models, selected: null }

    // if not, add
    if (models.length === 0) {
      return this.handleAdd()
    }
  }

  handleAdd () {
    const upload = this.props.upload
    console.log(upload)
    this.props.addModel(upload.name, upload.js, upload.hash, upload.modelDescription)
    toast.success(`Model '${upload.root}' added`)
    this.props.onUpdate(true)
  }

  handleUpdate () {

  }

  handleSelect () {

  }

  renderModelSelect () {
    if (!this.state.models) {
      return null
    }
  }

  render () {
    return <Fragment>
      <Grid.Column style={{ marginTop: '2em', width: '85%' }}>
        <h2>Update selected</h2>
        { this.renderModelSelect() }
        <br/>
        {this.state.selected &&
          <Button onClick={this.handleUpdate}>Update selected Model</Button>}

        <Divider/>

        <h2>Or add new</h2>
        <Button onClick={this.handleAdd}>Add new Model</Button>
      </Grid.Column>
    </Fragment>
  }
}

export default connect(
  state => ({
    models: configGetAllModels(state)
  }),
  dispatch => bindActionCreators({
    addModel
  }, dispatch)
)(Updater)
