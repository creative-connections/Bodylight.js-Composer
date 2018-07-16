import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const BusySignal = ({isBusy = true}) => {
  if (isBusy) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    )
  }
  return null
}

export default BusySignal
