import React from 'react'
import { Transition, Dimmer, Loader, Header } from 'semantic-ui-react'

const BusySignal = ({ busy = true, description = null }) => {
  return <Dimmer active={busy} page>
    <Loader size='massive'/>
    <h2 style={{marginTop: '4em'}}>
      {description && description}
    </h2>
  </Dimmer>
}

export default BusySignal
