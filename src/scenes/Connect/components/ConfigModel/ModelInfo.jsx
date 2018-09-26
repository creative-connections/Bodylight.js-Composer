import React from 'react'
import { Grid } from 'semantic-ui-react'
import GridRow from '../GridRow'
import SimpleListSegment from '@components/SimpleListSegment'

const transformElementsToArray = (elements) => {
  const data = []
  Object.keys(elements).forEach((el) => {
    data.push(elements[el].name)
  })
  return data
}

const ModelInfo = ({config}) => {
  return <Grid verticalAlign='middle' celled='internally'>
    <GridRow label='Model name:'>
      {`${config.modelName} (${config.identifier})`}
    </GridRow>
    <GridRow label='Generator:'>
      {`${config.generationTool} (${config.generationDateAndTime})`}
    </GridRow>
    <GridRow label='Parameters:'>
      <SimpleListSegment data={transformElementsToArray(config.parameters)} />
    </GridRow>
    <GridRow label='Variables:'>
      <SimpleListSegment data={transformElementsToArray(config.variables)} />
    </GridRow>
  </Grid>
}

export default ModelInfo
