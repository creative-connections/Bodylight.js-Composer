import React, { Component } from 'react'
import { connect } from 'react-redux'

import AnimateLoader from '@components/AnimateLoader'
import { Grid, Segment, Button, Header } from 'semantic-ui-react'

class AnimateList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loaderIsOpen: false
    }

    this.openLoader = this.openLoader.bind(this)
    this.closeLoader = this.closeLoader.bind(this)
  }

  openLoader () {
    this.setState({loaderIsOpen: true})
  }

  closeLoader () {
    this.setState({loaderIsOpen: false})
  }

  render () {
    return (
      <Segment>
        {!this.state.loaderIsOpen &&
          <div>
            <Header as="h2">Animate components</Header>
            <Button onClick={this.openLoader} >Load a component</Button>
          </div>
        }
        <AnimateLoader onClose={this.closeLoader} display={this.state.loaderIsOpen}/>
      </Segment>
    )
  }
}

function mapStateToProps ({ models }) {
  return { models }
}

export default connect(mapStateToProps)(AnimateList)
