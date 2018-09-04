import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import { Route } from 'react-router-dom'

import Preview from '@scenes/Preview'
import Connect from '@scenes/Connect'
import Design from '@scenes/Design'
import AddModel from '@scenes/Add/AddModel'
import AddAnimate from '@scenes/Add/AddAnimate'

const DisplayContainer = () => {
  return <Fragment>
    <Container id='DisplayContainer'>
      <Route exact path={`${process.env.PATH}/`} component={Connect}/>
      <Route path={`${process.env.PATH}/design`} component={Design} />
      <Route path={`${process.env.PATH}/preview`} component={Preview} />
      <Route path={`${process.env.PATH}/add/model`} component={AddModel} />
      <Route path={`${process.env.PATH}/add/animate`} component={AddAnimate} />
    </Container>
  </Fragment>
}

export default DisplayContainer
