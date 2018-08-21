import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Segment, Divider, Container, Menu, Input } from 'semantic-ui-react'

import Models from './components/Models'
import Animates from './components/Animates'
import Items from './components/Items'

import TreeNode from './components/TreeNode'

import { getWidgetsForTree, getSelectedWidget } from '@reducers'
import { selectWidget } from '@actions'

class Tree extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  renderSearch () {
    return <Menu.Item position='right'>
      <Input icon='search' placeholder='Search...' />
    </Menu.Item>
  }

  renderModels () {
    Object.entries(this.props.models)
  }

  onClick (e, v) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    const id = e.currentTarget.dataset.id
    this.props.selectWidget(id)
  }

  render () {
    return <Fragment>

      { this.renderSearch() }
      <Divider id='menu-tree-divider'/>
      <Segment id='menu-tree'>
        <Items
          name='Buttons'
          items={this.props.widgets.buttons}
          selected={this.props.selected}
          onClick={this.onClick}/>
        <Animates
          animates={this.props.widgets.animates}
          selected={this.props.selected}
          onClick={this.onClick}/>
      </Segment>
    </Fragment>
  }
}

export default connect(
  state => ({
    widgets: getWidgetsForTree(state),
    selected: getSelectedWidget(state)
  }),
  dispatch => bindActionCreators({
    selectWidget
  }, dispatch)
)(Tree)
