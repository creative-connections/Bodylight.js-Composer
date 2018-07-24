import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Dropdown, Button, Header, Grid, Divider, Transition, Segment } from 'semantic-ui-react'

class WidgetMenu extends Component {
  render () {
    console.log(this.props.models)
    console.log(this.props.animates)

    return <Segment>
      <Button>Add range</Button>
    </Segment>
  }
}

function mapStateToProps ({models, animates}) {
  return {models, animates}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(WidgetMenu)
