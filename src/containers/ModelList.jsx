import React, { Component } from 'react'
import { connect } from 'react-redux'

import ModelLoader from './ModelLoader'

class ModelList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modelLoaderIsOpen: false
    }

    this.openModelLoader = this.openModelLoader.bind(this)
    this.closeModelLoader = this.closeModelLoader.bind(this)
  }

  openModelLoader () {
    console.log('open model loader')
    this.setState({modelLoaderIsOpen: true})
  }

  closeModelLoader () {
    console.log('close model loader')
    this.setState({modelLoaderIsOpen: false})
  }

  renderModelsOptions (model) {
    const name = model.name
    return <option key={name}>{name}</option>
  }

  renderModelLoader () {
    return <ModelLoader
      isOpen={this.state.modelLoaderIsOpen}
      closeCB={this.closeModelLoader}
    />
  }

  render () {
    if (this.props.models.length === 0) {
      return (
        <div>
          <button onClick={this.openModelLoader}>Load a model</button>
          {this.renderModelLoader()}
        </div>
      )
    }

    return (
      <div>
        <select>
          {this.props.models.map(this.renderModelsOptions)}
        </select>
        <button onClick={this.openModelLoader}>+</button>
        {this.renderModelLoader()}
      </div>
    )
  }
}

function mapStateToProps ({ models }) {
  return { models }
}

export default connect(mapStateToProps)(ModelList)
