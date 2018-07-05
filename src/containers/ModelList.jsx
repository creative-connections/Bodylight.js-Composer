import React, { Component } from 'react'
import { connect } from 'react-redux'

import ModelLoader from './ModelLoader'
import { Grid, Segment, Button, Header } from 'semantic-ui-react'

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
    return (
      <Grid.Row centered padded='horizontally'>
        <Grid.Column width={16} style={{ maxWidth: 100 + 'em' }} >
          <Segment>
            {!this.state.modelLoaderIsOpen && <Header as="h2"> Models </Header> }
            {this.state.modelLoaderIsOpen && <Header as="h2"> Adding a new model </Header> }
            {!this.state.modelLoaderIsOpen && <Button onClick={this.openModelLoader} >Load a model</Button> }
            {this.renderModelLoader()}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    )

    /*
    return (
      <div>
        <select>
          {this.props.models.map(this.renderModelsOptions)}
        </select>
        <button onClick={this.openModelLoader}>+</button>
        {this.renderModelLoader()}
      </div>
    )
    */
  }
}

function mapStateToProps ({ models }) {
  return { models }
}

export default connect(mapStateToProps)(ModelList)
