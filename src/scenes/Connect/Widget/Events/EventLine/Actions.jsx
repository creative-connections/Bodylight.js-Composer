import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const Actions = ({actions, action, onChange}) => {
  const options = []
  Object.entries(actions).forEach(([name, action]) => {
    options.push({
      key: name,
      text: action.label,
      value: name})
  })

  return <Dropdown simple item inline
    style={{
      margin: '0.0em 0.4em 0.0em 0.2em',
      padding: '0.1em 0.0em 0.1em 0.6em'
    }}
    name='action'
    value={action}
    options={options}
    onChange={onChange}
  />
}

export default Actions
