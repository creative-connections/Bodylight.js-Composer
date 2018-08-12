import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Dropdown, Button, Header, Grid, Divider, Transition, Segment } from 'semantic-ui-react'

import { getAvailableRangeName } from '@reducers'
import { addRange } from '@actions'

class WidgetMenu extends Component {
  constructor (props) {
    super(props)
    this.addRange = this.addRange.bind(this)
  }

  addRange () {
    const name = this.props.getAvailableRangeName()
    this.props.addRange(name)
  }

  render () {
    console.log(this.props.getAvailableRangeName())
    return (
      <Segment>
        <Button onClick={this.addRange}>Add range</Button>
      </Segment>
    )
  }
}

export default connect(
  state => ({
    'getAvailableRangeName': () => getAvailableRangeName(state)
  }),
  dispatch => bindActionCreators({
    addRange
  }, dispatch)
)(WidgetMenu)
