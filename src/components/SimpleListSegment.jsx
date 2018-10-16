import React from 'react'
import SimpleList from '@components/SimpleList'
import { Segment } from 'semantic-ui-react'

const style = {
  overflow: 'auto',
  maxHeight: '10em'
}

const SimpleListSegment = ({data}) => {
  if (data.length === 0) {
    return 'none'
  }
  return <Segment style={style}>
    <SimpleList data={data} />
  </Segment>
}

export default SimpleListSegment
