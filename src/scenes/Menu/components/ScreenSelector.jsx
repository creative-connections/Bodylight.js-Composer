import React, { Component, Fragment } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showPreview, hidePreview, } from '@actions/actions'
import { getPreview } from '@reducers'

class ScreenSelector extends Component {
  render () {
    return <Fragment>
      <Menu.Item className='link'
        active={!this.props.preview}
        onClick={this.props.hidePreview}>Design</Menu.Item>
      <Menu.Item className='link'
        active={this.props.preview}
        onClick={this.props.showPreview}>Preview</Menu.Item>
    </Fragment>
  }
}

export default connect(
  state => ({
    preview: getPreview(state),
  }),
  dispatch => bindActionCreators({
    showPreview,
    hidePreview
  }, dispatch)
)(ScreenSelector)
