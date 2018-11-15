import React, { Fragment } from 'react'
import SimpleListSegment from '@components/SimpleListSegment'
import { Grid } from 'semantic-ui-react'
import GridRow from '../GridRow'

const transformElementsToArray = (elements = {}) => {
  const data = []
  Object.keys(elements).forEach((el) => {
    data.push(elements[el].name)
  })
  return data
}

const AnimateInfo = ({ animate }) => {
  return <Fragment>
    <GridRow label='anims:'>
      <SimpleListSegment data={transformElementsToArray(animate.anims)}/>
    </GridRow>
    <GridRow label='texts:'>
      <SimpleListSegment data={transformElementsToArray(animate.texts)}/>
    </GridRow>
  </Fragment>
}

export default AnimateInfo
