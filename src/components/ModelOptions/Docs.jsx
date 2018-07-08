import React from 'react'
import { Header } from 'semantic-ui-react'

const doc = {
  'mode': <div>
    <Header as='h4'>Mode docs</Header>
    <p>mode docs test</p>
  </div>,
  'stepSize': <div>
    <Header as='h4'>Step size</Header>
    <p>stepsize docs test</p>
  </div>
}

const Docs = ({index = null}) => {
  if (index === null || doc[index] === undefined) {
    return null
  }
  return doc[index]
}

export default Docs
