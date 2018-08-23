import React, { Fragment } from 'react'
import SimpleList from '@components/SimpleList'
import { Segment, Grid, Header, List } from 'semantic-ui-react'
import GridRow from '../GridRow'

const transformElementsToArray = (elements) => {
  const data = []
  Object.keys(elements).forEach((el) => {
    data.push(elements[el].name)
  })
  return data
}

const ModelInfo = ({config}) => {
  return <Fragment>
    <Header as="h2">Model: {config.name}</Header>
    <Grid verticalAlign='middle' celled='internally'>
      <GridRow label='Name:'>
        <p>{config.name}</p>
      </GridRow>
      <GridRow label='Parameters:'>
        <Segment style={{overflow: 'auto', maxHeight: '20em', maxWidth: '30em'}}>
          <SimpleList
            rootname="parameters"
            data={transformElementsToArray(config.parameters)}
          />
        </Segment>
      </GridRow>
      <GridRow label='Variables:'>
        <Segment style={{overflow: 'auto', maxHeight: '20em', maxWidth: '30em'}}>
          <SimpleList
            rootname="variables"
            data={transformElementsToArray(config.variables)}
          />
        </Segment>
      </GridRow>
    </Grid>
  </Fragment>
}

export default ModelInfo
