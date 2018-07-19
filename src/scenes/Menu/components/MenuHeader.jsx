import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Menu, Dropdown } from 'semantic-ui-react'

import { newProject } from '@actions/actions'

class MenuHeader extends Component {
  constructor (props) {
    super(props)

    this.handleNew = this.handleNew.bind(this)
  }

  handleNew () {
    this.props.newProject()
  }

  render () {
    return (
      <div>
        <Menu.Item header>Bodylight.js Composer</Menu.Item>
        <Dropdown item text='File'>
          <Dropdown.Menu style={{ minWidth: 15 + 'em' }}>
            <Dropdown.Item onClick={this.handleNew}>New</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ newProject }, dispatch)
}

export default connect(undefined, mapDispatchToProps)(MenuHeader)
