import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import { Grid, Form, Checkbox, Divider, Button } from 'semantic-ui-react'

import { addAnimate, updateAnimate } from '@actions'
import { configGetAllAnimates } from '@reducers'

class AddAnimate extends Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSelect = this.handleSelect.bind(this)

    this.state = { animates, selected: null }

    return this.handleAdd()
  }

  handleAdd() {
    const upload = this.grops.upload
    this.props.addAnimate(upload.js, upload.hash, upload.root, upload.components, this.props.id)
    toast.success(`Animate '${upload.root}' added`)
    this.props.onUpdate(true)
  }

  handleUpdate() {
    const upload = this.props.upload
    this.props.updateAnimate(
      this.state.selected,
      upload.js, upload.hash, upload.root, upload.components
    )
    toast.success(`Selected animate updated with '${upload.root}'`)
    this.props.onUpdate(true)
  }

  handleSelect(e, { value }) {
    this.setState({
      selected: value
    })
  }


  render() {
    return <Fragment>
      <Grid.Column style={{ marginTop: '2em', width: '85%' }}>
        <h2>Update selected</h2>
        { this.renderAnimateSelect() }
        <br/>
        {this.state.selected &&
          <Button onClick={this.handleUpdate}>Update selected Animate</Button>}

        <Divider/>

        <h2>Or add new</h2>
        <Button onClick={this.handleAdd}>Add new Animate</Button>
      </Grid.Column>
    </Fragment>
  }
}

export default connect(
  state => ({
    animates: configGetAllAnimates(state)
  }),
  dispatch => bindActionCreators({
    addAnimate,
    updateAnimate
  }, dispatch)
)(AddAnimate)