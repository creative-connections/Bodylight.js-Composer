import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dropdown } from 'semantic-ui-react'
import { newProject, openSidebarExport } from '@actions/actions'
import { withRouter } from 'react-router-dom'

class ItemRedirect extends Component {
  constructor (props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  handleOnClick () {
    this.props.onClick(this.props.to)
  }

  render () {
    return <Dropdown.Item onClick={this.handleOnClick}>
      {this.props.children}
    </Dropdown.Item>
  }
}

class MenuHeader extends Component {
  constructor (props) {
    super(props)
    this.handleNew = this.handleNew.bind(this)
    this.redirect = this.redirect.bind(this)
    this.handleExport = this.handleExport.bind(this)
  }

  handleNew () {
    this.props.newProject()
    this.redirect('')
  }

  handleExport () {
    this.props.openSidebarExport()
    this.redirect('')
  }

  redirect (to) {
    this.props.history.push(`${process.env.PATH}/${to}`)
  }

  render () {
    return (
      <Fragment>
        <Dropdown item text='File'>
          <Dropdown.Menu style={{ minWidth: 15 + 'em' }}>

            <Dropdown.Item onClick={this.handleNew}>New</Dropdown.Item>

            <ItemRedirect to="open" onClick={this.redirect}>Open</ItemRedirect>

            <Dropdown.Divider />

            <ItemRedirect to="save" onClick={this.redirect}>Save</ItemRedirect>
            <ItemRedirect to="save/as" onClick={this.redirect}>Save as...</ItemRedirect>

            <Dropdown.Divider />

            <Dropdown.Item onClick={this.handleExport}>Export</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    )
  }
}

export default connect(
  state => ({
  }),
  dispatch => bindActionCreators({
    newProject,
    openSidebarExport
  }, dispatch)
)(withRouter(MenuHeader))
