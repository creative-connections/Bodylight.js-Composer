import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import Preview from '@scenes/Preview'
import Connect from '@scenes/Connect'
import Design from '@scenes/Design'

const DisplayContainer = () => {
  return <Fragment>
    <Route exact path="/" component={Connect}/>
    <Route path="/design" component={Design} />
    <Route path="/preview" component={Preview} />
  </Fragment>
}

export default DisplayContainer
