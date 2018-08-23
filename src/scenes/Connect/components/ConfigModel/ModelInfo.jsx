import React from 'react'
import SimpleList from '@components/SimpleList'
import { Segment, Grid } from 'semantic-ui-react'
import GridRow from '../GridRow'

const transformElementsToArray = (elements) => {
  const data = []
  Object.keys(elements).forEach((el) => {
    data.push(elements[el].name)
  })
  return data
}

const segmentStyle = {
  overflow: 'auto',
  maxHeight: '10em',
  maxWidth: '40em',
  paddingTop: '0.2em',
  paddingBottom: '0.2em'
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
      <Segment style={segmentStyle}>
        <SimpleList
          rootname="parameters"
          data={transformElementsToArray(config.parameters)}
        />
      </Segment>
    </GridRow>
    <GridRow label='Variables:'>
      <Segment style={segmentStyle}>
        <SimpleList
          rootname="variables"
          data={transformElementsToArray(config.variables)}
        />
      </Segment>
    </GridRow>
  </Grid>
}

export default ModelInfo
