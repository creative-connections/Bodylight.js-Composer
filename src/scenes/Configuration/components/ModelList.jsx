import React, { Component } from 'react'
import { connect } from 'react-redux'

import ModelLoader from './ModelLoader'
import { Grid, Segment, Button, Header } from 'semantic-ui-react'
import { Dropdown, Menu } from 'semantic-ui-react'

class ModelList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modelLoaderIsOpen: false
    }

    this.openModelLoader = this.openModelLoader.bind(this)
    this.closeModelLoader = this.closeModelLoader.bind(this)
    this.getModelsAsOptions = this.getModelsAsOptions.bind(this)
  }

  openModelLoader () {
    this.setState({modelLoaderIsOpen: true})
  }

  closeModelLoader () {
    this.setState({modelLoaderIsOpen: false})
  }

  renderModelsOptions (model) {
    const name = model.name
    return <option key={name}>{name}</option>
  }

  getModelsAsOptions () {
    var options = []
    Object.keys(this.props.models).forEach(name => {
      options.push({
        key: name,
        text: name,
        value: name
      })
    })
    return options
  }

  renderModelLoader () {
    if (!this.state.modelLoaderIsOpen) {
      return null
    }
    return <div>
      <Header as="h2"> Adding a new model </Header>
      <ModelLoader
        isOpen={this.state.modelLoaderIsOpen}
        closeCB={this.closeModelLoader}/>
    </div>
  }

  renderModelList () {
    if (this.state.modelLoaderIsOpen) {
      return null
    }

    return <div>
      <Header as="h2"> Models </Header>
      <Menu compact>
        <Dropdown placeholder='Select or add a model' options={this.getModelsAsOptions()} selection />
      </Menu>
      <Button onClick={this.openModelLoader}>+</Button>
    </div>
  }

  render () {
    return (
      <div>
        <Segment>
          {this.renderModelList()}
          {this.renderModelLoader()}
        </Segment>

      </div>
    )
  }
}

function mapStateToProps ({ models }) {
  return { models }
}

export default connect(mapStateToProps)(ModelList)
