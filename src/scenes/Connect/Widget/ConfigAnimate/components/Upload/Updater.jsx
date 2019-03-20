import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateAnimate } from '@actions'
import { toast } from 'react-toastify'

class Updater extends Component {
  constructor(props) {
    super(props)
    return this.handleUpdate()
  }

  handleUpdate() {
    const { js, hash, root, components } = this.props.upload
    this.props.updateAnimate(this.props.id, js, hash, root, components)
    toast.success(`Animate updated with '${root}'`)
    this.props.onUpdate(true)
  }

  render() {
    return <Fragment>
    </Fragment>
  }
}

export default connect(null,
  dispatch => bindActionCreators({
    updateAnimate
  }, dispatch)
)(Updater)