import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Dropdown, Button, Header, Grid, Divider, Transition, Segment } from 'semantic-ui-react'

class WidgetMenu extends Component {
  render () {
    return <Segment>
      <Button>Add range</Button>
    </Segment>
  }
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(WidgetMenu)
