import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const Events = ({events, event, onChange}) => {
  const options = []
  events.forEach(name => {
    options.push({
      key: name,
      text: name,
      value: name
    })
  })

  return <Dropdown simple item inline
    style={{
      margin: '0.0em 0.4em 0.0em 0.2em',
      padding: '0.1em 0.0em 0.1em 0.6em'
    }}
    name='event'
    value={event}
    options={options}
    onChange={onChange}
  />
}

export default Events
