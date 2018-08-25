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

const AnimateInfo = ({config, animate}) => {
  return <Grid verticalAlign='middle' celled='internally'>
    <GridRow label='anims:'>
      <Segment style={segmentStyle}>
        <SimpleList
          data={transformElementsToArray(animate.anims)}
        />
      </Segment>
    </GridRow>
    <GridRow label='texts:'>
      <Segment style={segmentStyle}>
        <SimpleList
          data={transformElementsToArray(animate.texts)}
        />
      </Segment>
    </GridRow>
  </Grid>
}

export default AnimateInfo
