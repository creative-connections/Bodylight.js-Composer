import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown } from 'semantic-ui-react'
import {
  newProject,
  openSidebarExport,
  openSidebarSaveProject,
  openSidebarOpenProject
} from '@actions/actions'

class MenuHeader extends Component {
  constructor (props) {
    super(props)
    this.handleNew = this.handleNew.bind(this)
    this.handleExport = this.handleExport.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  handleNew () {
    this.props.newProject()
  }

  handleExport () {
    this.props.openSidebarExport()
  }

  handleSave () {
    this.props.openSidebarSaveProject()
  }

  handleOpen () {
    this.props.openSidebarOpenProject()
  }

  render () {
    return (
      <Fragment>
        <Dropdown item text='File'>
          <Dropdown.Menu style={{ minWidth: 15 + 'em' }}>
            <Dropdown.Item onClick={this.handleNew}>New</Dropdown.Item>
            <Dropdown.Item onClick={this.handleOpen}>Open</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={this.handleSave}>Save</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={this.handleExport}>Export</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    )
  }
}

export default connect(null, dispatch => bindActionCreators({
  newProject,
  openSidebarExport,
  openSidebarSaveProject,
  openSidebarOpenProject
}, dispatch))(MenuHeader)
