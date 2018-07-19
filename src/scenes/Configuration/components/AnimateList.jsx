import React, { Component } from 'react'
import { connect } from 'react-redux'

import AnimateLoader from './AnimateLoader'
import { Dropdown, Menu, Grid, Segment, Button, Header } from 'semantic-ui-react'

class AnimateList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loaderIsOpen: false
    }

    this.openLoader = this.openLoader.bind(this)
    this.closeLoader = this.closeLoader.bind(this)
    this.renderAnimateList = this.renderAnimateList.bind(this)
    this.renderAnimateLoader = this.renderAnimateLoader.bind(this)
  }

  openLoader () {
    this.setState({loaderIsOpen: true})
  }

  closeLoader () {
    this.setState({loaderIsOpen: false})
  }

  getAnimatesAsOptions () {
    var options = []
    Object.keys(this.props.animates).forEach(name => {
      options.push({
        key: name,
        text: name,
        value: name
      })
    })
    return options
  }

  renderAnimateLoader () {
    if (!this.state.loaderIsOpen) {
      return null
    }
    return <div>
      <Header as="h2"> Adding a new Animate </Header>
      <AnimateLoader
        display={this.state.loaderIsOpen}
        onClose={this.closeLoader}/>
    </div>
  }

  renderAnimateList () {
    if (this.state.loaderIsOpen) {
      return null
    }

    return <div>
      <Header as="h2">Animates</Header>
      <Menu compact>
        <Dropdown placeholder='Select or add an animate' options={this.getAnimatesAsOptions()} value={this.props.selectedAnimate} selection />
      </Menu>
      <Button onClick={this.openLoader}>+</Button>
    </div>
  }

  render () {
    return (
      <div>
        <Segment>
          {this.renderAnimateLoader()}
          {this.renderAnimateList()}
        </Segment>
      </div>
    )
  }
}

function mapStateToProps ({ animates, configurationScreen }) {
  return {
    animates,
    selectedAnimate: configurationScreen.selectedAnimate
  }
}

export default connect(mapStateToProps)(AnimateList)
