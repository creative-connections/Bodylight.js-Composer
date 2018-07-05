import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const BusySignal = ({isBusy = true, children}) => {
  if (isBusy) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    )
  }

  return children
}

export default BusySignal
