import React, { Fragment } from 'react'
import { Grid } from 'semantic-ui-react'
import GridRow from '../GridRow'
import SimpleListSegment from '@components/SimpleListSegment'

const transformElementsToArray = (elements) => {
  const data = []
  Object.keys(elements).forEach((el) => {
    if (elements[el].name) {
      data.push(elements[el].name)
    } else if (elements[el].cname) {
      data.push(`${elements[el].cname} (${Object.keys(elements[el].providers).length})`)
    }
  })

  return data
}

const ModelInfo = ({ config }) => {
  const parameters = transformElementsToArray(config.parameters)
  const variables = transformElementsToArray(config.variables)
  const arrays = transformElementsToArray(config.arrays)

  return <Fragment>
    <GridRow border label='Model name'>
      {`${config.modelName} (${config.identifier})`}
    </GridRow>
    <GridRow border label='Generator'>
      {`${config.generationTool} (${config.generationDateAndTime})`}
    </GridRow>

    {parameters.length !== 0 &&
      <GridRow border label='Parameters'>
        <SimpleListSegment data={parameters} />
      </GridRow>}

    {variables.length !== 0 &&
      <GridRow border label='Variables'>
        <SimpleListSegment data={variables} />
      </GridRow>}

    {arrays.length !== 0 &&
      <GridRow border label='Arrays'>
        <SimpleListSegment data={arrays} />
      </GridRow>}
  </Fragment>
}

export default ModelInfo