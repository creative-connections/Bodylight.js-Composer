import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Container, Menu, Input } from 'semantic-ui-react'

class Tree extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return <Fragment>
      <Menu.Item position='right'>
        <Input icon='search' placeholder='Search...' />
      </Menu.Item>
    </Fragment>
  }
}

export default Tree
