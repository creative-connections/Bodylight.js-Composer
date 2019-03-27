import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getApplicationKey, getPreview } from '@reducers'

import Preview from '@scenes/Preview'
import Design from '@scenes/Design'

class DisplayContainer extends Component {
  render () {
    return <div id='DisplayContainer'>
      {this.props.preview === false && <Design key={this.props.appkey}/>}
      {this.props.preview && <Preview/>}
    </div>
  }
}

export default connect(
  state => ({
    appkey: getApplicationKey(state),
    preview: getPreview(state),
  })
)(DisplayContainer)
