import React, { Component, Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { getApplicationKey } from '@reducers'

import Preview from '@scenes/Preview'
import Design from '@scenes/Design'
import AddModel from '@scenes/Add/AddModel'
import AddAnimate from '@scenes/Add/AddAnimate'
import Save from '@scenes/Project/Save'
import Open from '@scenes/Project/Open'
import Export from '@scenes/Project/Export'

class DisplayContainer extends Component {
  constructor (props) {
    super(props)
    this.getDesignKey = this.getDesignKey.bind(this)
  }

  getDesignKey () {
    return <Design key={this.props.appkey}/>
  }

  render () {
    return <Fragment>
      <div id='DisplayContainer'>
        <Route exact path={`${process.env.PATH}/`} render={this.getDesignKey} />
        <Route path={`${process.env.PATH}/preview`} component={Preview} />
        <Route path={`${process.env.PATH}/add/model`} component={AddModel} />
        <Route path={`${process.env.PATH}/add/animate/:id`} component={AddAnimate} />
        <Route path={`${process.env.PATH}/save`} component={Save} />
        <Route path={`${process.env.PATH}/open`} component={Open} />
        <Route path={`${process.env.PATH}/export`} component={Export} />
        <Route path={`${process.env.PATH}/export/:option`} component={Export} />
      </div>
    </Fragment>
  }
}

export default connect(
  state => ({ appkey: getApplicationKey(state) })
)(DisplayContainer)
