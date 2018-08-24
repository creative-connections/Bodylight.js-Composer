import React from 'react'
import { Transition, Dimmer, Loader, Header } from 'semantic-ui-react'

const BusySignal = ({busy = true}) => {
  return <Transition visible={busy} animation='fade' duration={300} unmountOnHide={true}>
    <Dimmer active={busy} page>
      <Header as='h2' icon inverted>
        <Loader size='massive'/>
      </Header>
    </Dimmer>
  </Transition>
}

export default BusySignal
