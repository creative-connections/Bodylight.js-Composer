import React from 'react'
import SimpleListSegment from '@components/SimpleListSegment'
import { Grid } from 'semantic-ui-react'
import GridRow from '../GridRow'

const transformElementsToArray = (elements) => {
  const data = []
  Object.keys(elements).forEach((el) => {
    data.push(elements[el].name)
  })
  return data
}

const AnimateInfo = ({config, animate}) => {
  return <Grid verticalAlign='middle' celled='internally'>
    <GridRow label='anims:'>
      <SimpleListSegment data={transformElementsToArray(animate.anims)}/>
    </GridRow>
    <GridRow label='texts:'>
      <SimpleListSegment data={transformElementsToArray(animate.texts)}/>
    </GridRow>
  </Grid>
}

export default AnimateInfo
