import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Container, Menu, Input, List } from 'semantic-ui-react'

import TreeNode from './TreeNode'

import {
  getModels
} from '@reducers'

class Models extends Component {
  constructor (props) {
    super(props)
  }

  renderModels () {
    const models = []
    Object.entries(this.props.models).forEach(([key, model]) => {
      models.push(<li key={key}>{key}</li>)
    })
    return models
  }

  render () {
    console.log('models render')
    return <Fragment>
    </Fragment>
  }
}

export default connect(
  state => ({
    models: getModels(state)
  }),
  dispatch => bindActionCreators({

  }, dispatch)
)(Models)
