import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Menu, Dropdown } from 'semantic-ui-react'
import { newProject } from '@actions/actions'
import { saveAs } from 'file-saver'

import Builder from '@runtime'

class MenuHeader extends Component {
  constructor (props) {
    super(props)

    this.handleNew = this.handleNew.bind(this)
  }

  handleNew () {
    this.props.newProject()
  }

  handleQuickExport () {
    const builder = new Builder()
    const html = new Blob([builder.build()], { type: 'text/html;charset=utf-8' })
    saveAs(html, 'export.html')
  }

  render () {
    return (
      <Fragment>
        <Dropdown item text='File'>
          <Dropdown.Menu style={{ minWidth: 15 + 'em' }}>
            <Dropdown.Item onClick={this.handleNew}>New</Dropdown.Item>
            <Dropdown.Item onClick={this.handleQuickExport}>Quick export</Dropdown.Item>
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
    newProject
  }, dispatch)
)(MenuHeader)
