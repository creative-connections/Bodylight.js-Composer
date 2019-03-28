import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import { Grid, Form, Checkbox, Divider, Button } from 'semantic-ui-react'

import { addModel, updateModel } from '@actions'
import { configGetAllModels } from '@reducers'
import generateID from '@helpers/generateID'

class Updater extends Component {
  constructor (props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSelect = this.handleSelect.bind(this)

    const models = []
    Object.entries(this.props.models).forEach(([key, model]) => {
      if (model.originalName === this.props.upload.name) {
        models.push(model)
      }
    })

    this.state = { models, selected: null }

    // if not, add
    if (models.length === 0) {
      return this.handleAdd()
    }
  }

  handleAdd () {
    const upload = this.props.upload
    this.props.addModel(upload.name, upload.js, upload.hash, upload.modelDescription)
    toast.success(`Model '${upload.root}' added`)
    this.props.onUpdate(true)
  }

  handleUpdate () {
    const upload = this.props.upload
    this.props.updateModel(
      this.state.selected,
      upload.name, upload.js, upload.hash, upload.modelDescription
    )
    toast.success(`Selected model updated with '${upload.name}'`)
    this.props.onUpdate(true)
  }

  handleSelect (e, {value}) {
    this.setState({
      selected: value
    })
  }

  renderModels () {
    const out = []
    this.state.models.forEach(model => {
      out.push(
        <Form.Field key={generateID()}>
          <Checkbox radio
            label={model.name}
            name="model"
            value={model.id}
            checked={this.state.selected === model.id}
            onChange={this.handleSelect}
          />
        </Form.Field>
      )
    })
    return out
  }

  renderModelSelect () {
    if (!this.state.models) {
      return null
    }
    return <Form>{ this.renderModels() }</Form>
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
    addModel,
    updateModel
  }, dispatch)
)(Updater)
