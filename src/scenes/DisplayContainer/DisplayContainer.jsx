import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import { Route } from 'react-router-dom'

import Preview from '@scenes/Preview'
import Connect from '@scenes/Connect'
import Design from '@scenes/Design'
import AddModel from '@scenes/AddModel'

const DisplayContainer = () => {
  return <Fragment>
    <Container>
      <Route exact path="/" component={Connect}/>
      <Route path="/design" component={Design} />
      <Route path="/preview" component={Preview} />
      <Route path="/add/model" component={AddModel} />
    </Container>
  </Fragment>
}

export default DisplayContainer
