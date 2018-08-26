import React from 'react'
import { Transition, Dimmer, Loader, Header } from 'semantic-ui-react'

const BusySignal = ({busy = true, description = null}) => {
  return <Transition visible={busy} animation='fade' duration={300} unmountOnHide={true}>
    <Dimmer active={busy} page>
      <Header as='h2' icon inverted>
        <Loader size='massive'/>
        {description && description}
      </Header>
    </Dimmer>
  </Transition>
}

export default BusySignal
